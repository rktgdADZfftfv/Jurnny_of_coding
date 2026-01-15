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


// nst va1 = [];
//  const product1 = {
//     Name: "iphone1",
//     price: 500,
//     buy: true
//  };
 
//  const product2 = {
//     Name: "iphone2",
//     price: 500,
//     buy: true
//  };

//  const product3 = {
//     Name: "iphone3",
//     price: 500,
//     buy: true
//  };

//  // add in empty array
 
//  va1.push(product1)
//  va1.push(product2)
//  va1.push(product3)

//  // show in terminal
//  console.log(va1);
 


//  // and access object product1 and show in screen
//  console.log(va1[0]);
 
//  // and access object product1 price and show in screen

//  console.log(va1[0].price );


//  const arr1 = []

//  const customer5 ={
//     Name: "Raj",
//     add: "VivekClonay",
//     product: "Font",
//     price: 999,
//     discount: 666
//  }
//  const customer6 ={
//     Name: "Raj",
//     add: "kClonay",
//     product: "Font",
//     price: 999,
//     discount: 666
//  }
//  const customer8 ={
//     Name: "Raj",
//     add: "vClonay",
//     product: "Font",
//     price: 999,
//     discount: 666
//  }

// arr1.push(customer5)
// arr1.push(customer6)
// arr1.push(customer8)
// // console.log(arr1);

// console.log( customer6.price +customer8.price );


 
 const manu = [{id: 1, name: "rahul", price2: 500}, {id: 1, name: "Badal", price2: 500}, {id: 1, name: "Monty", price2: 500},]

manu.map((item) => {
   console.log(`all price is: ${item.price2} and all name: ${item.name}`);
});

// const arr1  = [1,  2, 3, 4, 5, 6, 7, 8, 9, 10]; const a = Math.max(...arr1); console.log(a);


