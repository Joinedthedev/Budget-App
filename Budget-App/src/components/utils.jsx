export const currencyFormatter = new Intl.NumberFormat(undefined,{
    currency: "NGN",
    style: "currency",
    minimumFractionDigits: 0 /** Prevents decimal value from showing up when number is zero. 
    The only time it'll show up is when it's actually a decimal value*/


})