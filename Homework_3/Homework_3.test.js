const calculateDiscountedPrice = require("./Homework_3");

const products = [
    { name: "Product 1", price: 100 },
    { name: "Product 2", price: 50 },
    { name: "Product 3", price: 200 }
];

test("pure function discount 20%", ()=> {
    expect(calculateDiscountedPrice(products, 20)).toEqual( [{ name: "Product 1", price: 80 },
    { name: "Product 2", price: 40 },
    { name: "Product 3", price: 160 }])
});
test("pure function discount 2.35%", ()=> {
    expect(calculateDiscountedPrice(products, 2.35)).toEqual( [{ name: "Product 1", price: 97.65 },
    { name: "Product 2", price: 48.825  },
    { name: "Product 3", price: 195.3 }])
});
test("pure function discount 0%", ()=> {
    expect(calculateDiscountedPrice(products, 0)).toEqual( [{ name: "Product 1", price: 100 },
    { name: "Product 2", price: 50 },
    { name: "Product 3", price: 200 }])
});
test("pure function discount 100%", ()=> {
    expect(calculateDiscountedPrice(products, 100)).toEqual( [{ name: "Product 1", price: 0 },
    { name: "Product 2", price: 0 },
    { name: "Product 3", price: 0 }])
});



