import { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import './App.css';
const containerStyle = { width: '100%', height: '100vh' };
const center = { lat: 20.5937, lng: 78.9629 };
// Backend URL (Localhost)
const API_BASE = "http://localhost:5000/api/tasks";
function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d * 1000;
}


function deg2rad(deg) { return deg * (Math.PI / 180); }
function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGOLE_APIkEY // <--- APNI KEY YAHAN DALO
  });
  const [map, setMap] = useState(null);
  const [tasks, setTasks] = useState([]); // Data ab Database se aayega
  const [taskName, setTaskName] = useState("");
  const [selectedPos, setSelectedPos] = useState(null);
  const [searchText, setSearchText] = useState("");
  const alarmSound = useRef(new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3"));
  // --- 1. Load Tasks from Backend (Database) ---
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };
  // Tracking Logic (Same as before)
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          checkProximity(latitude, longitude);
        },
        (error) => console.error("Location Error:", error),
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [tasks]);
  const checkProximity = (userLat, userLng) => {
    tasks.forEach(task => {
      // Backend schema uses 'lat'/'lng'
      if (!task.completed && task.lat && task.lng) {
        const distance = getDistanceFromLatLonInMeters(userLat, userLng, task.lat, task.lng);
        if (distance < 500) {
          alarmSound.current.play().catch(e => console.log(e));
          if (Notification.permission === "granted") new Notification(`📍 Pahocho! ${task.name}`);
        }
      }
    });
  };
  // --- Map Handlers ---
  const onLoad = useCallback((map) => setMap(map), []);
  const onUnmount = useCallback(() => setMap(null), []);
  const onMapClick = (e) => setSelectedPos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  const handleSearch = async () => {
    if (!searchText) return;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const newPos = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        setSelectedPos(newPos);
        map.panTo(newPos);
        map.setZoom(15);
      } else { alert("Location nahi mili!"); }
    } catch (error) { console.error(error); }
  };
  // --- 2. Add Task (Send to Backend) ---
  const addTask = async () => {
    if (!taskName || !selectedPos) {
      alert("Naam aur Location select karo!");
      return;
    }
    // Backend Schema se match karna chahiye
    const newTask = {
      name: taskName,
      lat: selectedPos.lat,
      lng: selectedPos.lng,
      completed: false
    };
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
      });
      const savedTask = await res.json();

      setTasks([...tasks, savedTask]); // List update karo
      setTaskName("");
      setSearchText("");
    } catch (err) {
      console.error("Error saving task:", err);
      alert("Task save nahi ho paya!");
    }
  };
  // --- 3. Delete Task (Delete from Backend) ---
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      setTasks(tasks.filter(task => task._id !== id)); // MongoDB '_id' use karta hai
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };
  return isLoaded ? (
    <div className="main-wrapper">
      <div className="sidebar">
        <h1 className="logo">📍 No-Forget</h1>
        <div className="input-group">
          <input type="text" placeholder="Search Place..." value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
          <button className="btn-search" onClick={handleSearch}>Go</button>
        </div>
        <div className="input-group">
          <input type="text" placeholder="Task Name..." value={taskName}
            onChange={(e) => setTaskName(e.target.value)} />
          <button className="btn-add" onClick={addTask}>Add</button>
        </div>
        <div className="divider"></div>
        <div className="task-container">
          <h3>Cloud Missions ☁️</h3>
          {tasks.length === 0 && <p className="empty-msg">No tasks yet.</p>}
          {tasks.map(task => (
            <div key={task._id} className="task-card" onClick={() => {
              map.panTo({ lat: task.lat, lng: task.lng });
              map.setZoom(16);
            }}>
              <div className="task-info">
                <span>{task.name}</span>
                <small>📍 Tracking On</small>
              </div>
              <button className="btn-del" onClick={(e) => {
                e.stopPropagation();
                deleteTask(task._id);
              }}>Done</button>
            </div>
          ))}
        </div>
      </div>
      <div className="map-container">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}
          onLoad={onLoad} onUnmount={onUnmount} onClick={onMapClick}
          options={{
            disableDefaultUI: true, zoomControl: true, styles: [
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
              { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
            ]
          }}>
          {selectedPos && <MarkerF position={selectedPos} />}
          {tasks.map(task => (
            <MarkerF key={task._id} position={{ lat: task.lat, lng: task.lng }} />
          ))}
        </GoogleMap>
      </div>
    </div>
  ) : <div>Loading...</div>;
}
export default App;
