const calculateDiscountedPrice = require("./Homework_3");
test("pure function 1", ()=> {
    expect(calculateDiscountedPrice([100,25], 50)).toEqual([50,12.5])
});
test("pure function 1", ()=> {
    expect(calculateDiscountedPrice([100,34,2], 10)).toEqual([90, 30.6,1.8])
});

