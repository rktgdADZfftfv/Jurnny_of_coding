// const and let and Arrow function

const shopNmae = "Style Salon";
let dailyIncome = 0;
console.log(shopNmae);
console.log(dailyIncome);


const custumerBill = (price, discount) =>{
    if (discount>100){
       return("Your discount upto 100, change the value of discount");
    }
    if (discount<0){
       return("discount cannot be nagative");
       
    }
    const finalPrice = price -(price*discount/100)
    return finalPrice;
};
const billAmount = custumerBill(440, 440);
if (billAmount !== undefined)
console.log("Paytm per mile: " ,billAmount)

// challange day 1

let haircutPrice = 200;
let shavePrice = 100;

// not take same valu of variable in parameter
const generateReceipt = (price1, price2) => {
   const TotalPrice = price1 + price2;
   // console.log(TotalPrice);
   return TotalPrice;
   
}
const myBill = generateReceipt(haircutPrice, shavePrice)
console.log("Total price is", myBill);
let a ="b";
