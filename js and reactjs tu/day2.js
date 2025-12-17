// Array (list)

const service = ["Haircut", "shave", "Massage", "Hair Color"];
console.log(service[0]);
console.log(service[1]);
console.log(service.length);

// .push (for add list in array)

const waitingList = ["Rahul", "Amit"];

// using .push add new name or number
console.log(waitingList.push("vikash"));

console.log(waitingList);

// after (In Array use object) use index value to acces array object

const customer = [{id: 1, name1: "Rahul1", bill: 200}, {id: 2, nmae: "Amit", bill: 500}];
console.log(customer[0].name1);
console.log(customer[1].nmae);
console.log(customer[0].bill);
console.log(customer[1].bill);

// chalange

let todaysbills = [];
// console.log(todaysbills.push("Rahuu", "shani", "Mangal"));
console.log(todaysbills.push(200));
console.log(todaysbills.push(150));
console.log(todaysbills.push(300));
console.log(todaysbills);

let Total = [200, 150, 300]
console.log(todaysbills[0]);
console.log(todaysbills[1]);
console.log(todaysbills[2]);
console.log(Total);

// Add three or sum three
let Total1 = todaysbills[0]+todaysbills[1]+todaysbills[2];
console.log(Total1);

