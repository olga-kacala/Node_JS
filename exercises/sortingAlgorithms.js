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
const arr = [88, 20, -2, 4, -6];
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


