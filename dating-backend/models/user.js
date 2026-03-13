const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  bio: { type: String, default: "" },
  image: { type: String, required: true },
  gender: { type: String, required: true },
  interestedIn: { type: String, required: true },
  
  // To track swipes so we don't show the same cards again
  likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  passedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
"use Strict"


let a = null;
let b = function(){};
let c = parseInt("3jsdoij", 16);
let d = "Hello";
console.log(d.length);


console.log(typeof(b));

    

// console.log(typeof(c));
/*
gdsokk
*/

// if (a == b ){
//   console.log("YES");
 
// }
// else{
//   console.log("NO");
  
// }

// if (a === b ){
//   console.log("string");
 
// }
// else{
//   console.log("NO");
  
// }