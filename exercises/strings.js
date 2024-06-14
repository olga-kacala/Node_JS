
// Your task is to implement arithmetic operations on strings without relying on bigint or arithmetic libraries. You need to create functions that perform arithmetic operations as string functions, considering only positive integers (negative numbers can be avoided, as all numbers will be positive integers).

// Constraints:
// All input and output numbers will be positive integers.
// For subtraction, ensure that the first parameter is always greater than the second parameter.
// Division should only result in an integer value.

const str1 = "100"; // string1 has to be > string2
const str2 = "2";

// String.plus(string): This function should take another string as input and return the result of adding the two strings together.

function string_plus (str1, str2) {
    let rev1 = str1.split('').reverse();
    let rev2 = str2.split('').reverse();
    let rev2prezero=rev2;
    for(let i =1; i<str1.length;i++){
rev2prezero += "0"
    }
    let arr1 = [...rev1];
    let arr2 = [...rev2prezero];
    let sumarr = [arr1, arr2];

   const sum = sumarr[0].reduce(
    (acc, cur, ind)=> {
    const a = cur;
    const b = sumarr[1][ind];
    const c = acc.leftover;
    const result = [a,b,c].map(Number).reduce(summary,0);
    const newDigit = String(result).at(-1);
    const newDigits = [newDigit, ...acc.digits];
    const newLeftover = String(result).slice(0,-1);
    return {digits:newDigits, leftover: newLeftover};
    },
    {
        digits:[],
        leftover:0,
    }
   );  

    return sum.leftover + sum.digits.join('');
}
const summary = (a,c)=> a+c;
// const ok = string_plus(str1, str2);
// console.log(ok);


// String.minus(string): This function should take another string as input and return the result of subtracting the second string from the first string. Note that the first parameter will always be greater than the second parameter.

const StringMinus = (str1, str2) => {
    const maxLength = str1.length > str2.length ? str1.length : str2.length;
    str1 = str1.padStart(maxLength,"0");
    str2 = str2.padStart(maxLength,"0");
    
    let borrow = 0;
    result="";

    for (let i=maxLength-1; i>=0; i--){
const digit1 = str1[i].charCodeAt(0) - "0".charCodeAt(0);
const digit2 = str2[i].charCodeAt(0) - "0".charCodeAt(0);
let diff = digit1 - digit2 - borrow;

if(diff <0){
    borrow=1;
    diff +=10
}
let charDiff  = String.fromCharCode(diff + '0'.charCodeAt(0))
result = charDiff + result

    }
    
    result = result.replace(/^0+/, "");
    return result || '0'
}

console.log(StringMinus(str1, str2))