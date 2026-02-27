// // Array (list)

// import { log } from "node:console";

// const service = ["Haircut", "shave", "Massage", "Hair Color"];
// console.log(service[0]);
// console.log(service[1]);
// console.log(service.length);

// // .push (for add list in array)

// const waitingList = ["Rahul", "Amit"];

// // using .push add new name or number
// console.log(waitingList.push("vikash"));

// console.log(waitingList);

// // after (In Array use object) use index value to acces array object

// const customer = [{id: 1, name1: "Rahul1", bill: 200}, {id: 2, nmae: "Amit", bill: 500}];
// console.log(customer[0].name1);
// console.log(customer[1].nmae);
// console.log(customer[0].bill);
// console.log(customer[1].bill);

// // chalange

// let todaysbills = [];
// // console.log(todaysbills.push("Rahuu", "shani", "Mangal"));
// console.log(todaysbills.push(200));
// console.log(todaysbills.push(150));
// console.log(todaysbills.push(300));
// console.log(todaysbills);

// let Total = [200, 150, 300]
// console.log(todaysbills[0]);
// console.log(todaysbills[1]);
// console.log(todaysbills[2]);
// console.log(Total);

// Add three or sum three
// let Total1 = todaysbills[0]+todaysbills[1]+todaysbills[2];
// console.log(Total1);

const user = {
    name : "A",
    name : "A",
    name : "A",
    adress:{
        stret : "Jhariya Chock",
        ciy : "Jhariya",
    }
}
console.log(user.adress.ciy);
console.log(user.gf);

const mySkill = ["HTML", "CSS", "JAVASCRIPT", "REACT"];
console.log(mySkill[2]);
console.log(mySkill.length);

const newsFead = [
    {title: "Google ai", views: "500",},
    {title: "New Iphone", views: "5000",},
    {title: "React 19", views: "200",}

];

console.log(newsFead[1].title);
console.log(newsFead[1].views);

const prices = [100, 200, 300];
const pricesgst = prices.map((pri => pri * 1.18))
console.log(pricesgst);
const age = [100, 200, 300];
const voter = age.filter((voter => voter>=18))
console.log(voter);
