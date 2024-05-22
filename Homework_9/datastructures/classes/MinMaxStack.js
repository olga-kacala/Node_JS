// 1. **Min/Max Stack**: Implement a class for a stack that supports finding the minimum and maximum elements in constant time (O(1)). Include methods for push, pop, getMin, and getMax.

class MinMaxStack {
  constructor() {
    // Initializes an empty array to hold stack elements.
    this.items = [];
    // Initializes an empty array to track minimum values.
    this.minStack = [];
    // Initializes an empty array to track maximum values.
    this.maxStack = [];
  }

  /**
   * Adds an element to the top of the stack.
   * @param {any} item - The element to be added to the stack.
   * @timeComplexity O(1)
   */
  push(item) {
    // Push the item onto the main stack.
    this.items.push(item);

    // If the minStack is empty or the new item is less than or equal to the current minimum, push it onto the minStack.
    if (this.minStack.length === 0 || item <= this.getMin()) {
      this.minStack.push(item);
    }

    // If the maxStack is empty or the new item is greater than or equal to the current maximum, push it onto the maxStack.
    if (this.maxStack.length === 0 || item >= this.getMax()) {
      this.maxStack.push(item);
    }
  }

  /**
   * Removes and returns the top element of the stack.
   * @returns {any} The top element of the stack.
   * @throws Will throw an error if the stack is empty (underflow).
   * @timeComplexity O(1)
   */
  pop() {
    // If the stack is empty, throw an error indicating underflow.
    if (this.isEmpty()) {
      throw new Error("Underflow: Cannot pop from an empty stack");
    }

    // Pop the item from the main stack.
    const item = this.items.pop();

    // If the popped item is equal to the current minimum, pop it from the minStack as well.
    if (item === this.getMin()) {
      this.minStack.pop();
    }

    // If the popped item is equal to the current maximum, pop it from the maxStack as well.
    if (item === this.getMax()) {
      this.maxStack.pop();
    }

    // Return the popped item.
    return item;
  }

  /**
   * Checks if the stack is empty.
   * @returns {boolean} True if the stack is empty, false otherwise.
   * @timeComplexity O(1)
   */
  isEmpty() {
    // Return true if the main stack has no elements, false otherwise.
    return this.items.length === 0;
  }

  /**
   * Retrieves the minimum element in the stack.
   * @returns {any} The minimum element in the stack.
   * @throws Will throw an error if the stack is empty.
   * @timeComplexity O(1)
   */
  getMin() {
    // If the stack is empty, throw an error.
    if (this.isEmpty()) {
      throw new Error("No elements in stack");
    }
    // Return the top element of the minStack, which is the current minimum.
    return this.minStack[this.minStack.length - 1];
  }

  /**
   * Retrieves the maximum element in the stack.
   * @returns {any} The maximum element in the stack.
   * @throws Will throw an error if the stack is empty.
   * @timeComplexity O(1)
   */
  getMax() {
    // If the stack is empty, throw an error.
    if (this.isEmpty()) {
      throw new Error("No elements in stack");
    }
    // Return the top element of the maxStack, which is the current maximum.
    return this.maxStack[this.maxStack.length - 1];
  }
}

// Exporting the MinMaxStack class for use in other files
module.exports = MinMaxStack;
