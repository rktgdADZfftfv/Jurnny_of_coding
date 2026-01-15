import { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import './App.css';
// Map ki settings
const containerStyle = {
  width: '100%',
  height: '100vh' // Full Screen
};
const center = {
  lat: 20.5937,
  lng: 78.9629
};
// --- Distance Calculator Helper ---
function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  var R = 6371; 
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; 
  return d * 1000;
}
function deg2rad(deg) { return deg * (Math.PI / 180); }
function App() {
  // --- 1. Load Google Maps ---
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyC5KhC0jbXYEXt30p2U6OR8WJS_8LjQrrY" // <--- YAHA APNI KEY DALO
  });
  const [map, setMap] = useState(null);

  // Local Storage se Tasks Load
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("no-forget-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [taskName, setTaskName] = useState("");
  const [selectedPos, setSelectedPos] = useState(null);
  const [searchText, setSearchText] = useState("");
  const alarmSound = useRef(new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3")); 
  // Save Tasks
  useEffect(() => {
    localStorage.setItem("no-forget-tasks", JSON.stringify(tasks));
  }, [tasks]);
  // Tracking Logic
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
      if (!task.completed) {
        const distance = getDistanceFromLatLonInMeters(userLat, userLng, task.lat, task.lng);
        if (distance < 500) {
alarmSound.current.play().catch(e => console.log(e));
          if (Notification.permission === "granted") {
            new Notification(`📍 Pahocho! ${task.name} is here!`);
          }
        }
      }
    });
  };
  // --- Map Handlers ---
  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  const onMapClick = (e) => {
    setSelectedPos({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
  };
  const handleSearch = async () => {
    if (!searchText) return;
    // Free Search API (Google Places API bachane ke liye)
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        const newPos = { lat, lng: lon };

        setSelectedPos(newPos);
        map.panTo(newPos); // Google Map ko fly karvayenge
        map.setZoom(15);
      } else {
        alert("Location nahi mili!");
      }
    } catch (error) { console.error(error); }
  };
  const addTask = () => {
    if (!taskName || !selectedPos) {
      alert("Naam aur Location map par select karo!");
      return;
    }
    const newTask = {
      id: Date.now(),
      name: taskName,
      lat: selectedPos.lat,
      lng: selectedPos.lng,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setTaskName("");
    setSearchText("");
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  return isLoaded ? (
    <div className="main-wrapper">

      {/* --- FLOATING SIDEBAR (Tasks & Input) --- */}
      <div className="sidebar">
        <h1 className="logo">📍 No-Forget</h1>

        <div className="input-group">
          <input 
            type="text" placeholder="Search Place..." 
            value={searchText} onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn-search" onClick={handleSearch}>Go</button>
        </div>
        <div className="input-group">
          <input 
            type="text" placeholder="Task Name..." 
            value={taskName} onChange={(e) => setTaskName(e.target.value)}
          />
          <button className="btn-add" onClick={addTask}>Add</button>
        </div>

        <div className="divider"></div>
        <div className="task-container">
          <h3>Your Missions</h3>
          {tasks.length === 0 && <p className="empty-msg">No tasks yet.</p>}
          {tasks.map(task => (
            <div key={task.id} className="task-card" onClick={() => {
              map.panTo({lat: task.lat, lng: task.lng});
              map.setZoom(16);
            }}>
              <div className="task-info">
                <span>{task.name}</span>
                <small>📍 Tracking On</small>
              </div>
              <button className="btn-del" onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
              }}>Done</button>
            </div>
          ))}
        </div>
      </div>
      {/* --- GOOGLE MAP BACKGROUND --- */}
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={onMapClick}
          options={{
            disableDefaultUI: true, // Clean look (no standard buttons)
            zoomControl: true,
            styles: [ // Dark Mode Map Style
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
              { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
            ]
          }}
        >
          {/* Jahan click kiya waha ka marker */}
          {selectedPos && <MarkerF position={selectedPos} />}
          {/* Saved Tasks ke markers */}
          {tasks.map(task => (
            <MarkerF 
              key={task.id} 
              position={{ lat: task.lat, lng: task.lng }}
              onClick={() => alert(task.name)}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  ) : <div>Loading Google Maps...</div>;
}
export default App;
