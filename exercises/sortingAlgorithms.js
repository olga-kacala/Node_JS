//Bubble sort
function bubbleSort(arr) {
  let sorted;
  do {
    sorted = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        sorted = true;
      }
    }
  } while (sorted);
}
const arr = [88, 20, -9, 4, -6, 9];
// bubbleSort(arr);
// console.log(arr)

//insertion sort

function insertion(arr) {
  for (let i = 1; i < arr.length; i++) {
    let numberToInsert = arr[i];
    let j = i - 1; //sorted element
    while (arr[j] > numberToInsert && j >= 0) {
      arr[j + 1] = arr[j];
      j = j - 1; //traversing left section (sorted)
    }
    arr[j + 1] = numberToInsert;
  }
}

// insertion(arr);
// console.log(arr);

function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let pivot = arr[arr.length - 1];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// console.log(quickSort(arr))

function mergeSort(arr) {
  if(arr.length <2) {return arr}
  let mid = Math.floor(arr.length/2);
  let left = arr.slice(0,mid);
  let right = arr.slice(mid);
return merge(mergeSort(left), mergeSort(right))
}

function merge (left, right) {
  let sorted = [];
  while (left.length && right.length){
    if(left[0]< right[0]){
      sorted.push(left.shift())
    } else {sorted.push(right.shift())}
  }
  return [...sorted, ...left, ...right]
}

console.log(mergeSort(arr));
