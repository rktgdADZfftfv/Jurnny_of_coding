import React from "react";
function Student(props) {
    return (

        <div style={{ border: "2px solid black", padding: "10px", margin: "10px", width: "300px", display: "flex" }}>
            <div className="box"> <h3>Name: {props.name}</h3>
                <p>Skill: {props.skill}</p>
                <p>qualification: {props.qualification}</p>
            </div>
            <div className="input">
                <input type="text" placeholder="Enter Your Name" />
                <input type="text" placeholder="Enter Your skill" />
                <input type="text" placeholder="Enter Your Qualification" />
            </div>

        </div>
    );
}
export default Student;