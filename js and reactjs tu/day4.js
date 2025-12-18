// loops (the .map Mathod    )
// Most Popular function in react 

const salonQueue = [];

const customer = {
    name: "vally",
    price: 200,
}

const customer2 = {
    name: "Ramu",
    price: 2100,
}

salonQueue.push(customer);
salonQueue.push(customer2);
console.log(salonQueue);

console.log(salonQueue[0].name);
console.log(salonQueue[0].price);
console.log(salonQueue[1].name);
console.log(salonQueue[1].price);

const totalMoney = salonQueue[0].price + salonQueue[1].price;
console.log(totalMoney);

