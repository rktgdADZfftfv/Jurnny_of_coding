// Object use curly Brackets {}

const customer = {
    name: "Ranhul",
    service: "Haircut",
    price: 200,
    IsPaid: true
};
// acces uing . of object
console.log(customer.name);
console.log(customer.service);
console.log(customer.price);

console.log(`${customer.name} has a bill of ${customer.price}`);

// challange

const SalonQueue = [];

const custome1 = {
    name: "Villy",
    price: 200,
};

const custome2 = {
    name: "Ramully",
    price: 300,
};

SalonQueue.push(custome1);
SalonQueue.push(custome2);
console.log(`Custumer Name is: ${SalonQueue[0].name}`);

const totalMoney = SalonQueue[0].price + SalonQueue[1].price;
console.log(totalMoney);

   