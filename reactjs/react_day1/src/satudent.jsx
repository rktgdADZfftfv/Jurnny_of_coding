import React from "react";
function Student(props){
    return(

        <div style={{border: "2px solid black", padding: "10px", margin:"10px", width: "200px"}}>
            <h3>Name: {props.name}</h3>
            <p>Skill: {props.skill}</p>

        </div>
    );
}
export default Student;