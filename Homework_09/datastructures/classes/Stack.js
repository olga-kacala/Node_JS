/** Task */
// 1. **Stack**: Implement a class for a stack data structure. Include methods for push, pop, and peek.

/**
 * Stack class represents a last-in-first-out (LIFO) stack of elements.
 * It allows adding elements to the top, removing elements from the top,
 * and peeking at the top element without removing it.
 */

class Stack {
  constructor() {
    // Initializes an empty array to hold stack elements.
    this.items = [];
  }

  /**
   * Adds an element to the top of the stack.
   * @param {any} item - The element to be added to the stack.
   * @returns {number} The new length of the stack.
   * @timeComplexity O(1)
   */
  push(item) {
    return this.items.push(item);
  }

  /**
   * Removes and returns the top element of the stack.
   * @returns {any} The top element of the stack.
   * @throws Will throw an error if the stack is empty (underflow).
   * @timeComplexity O(1)
   */
  pop() {
    if (this.isEmpty()) {
      throw new Error("Underflow: Cannot pop from an empty stack");
    }
    return this.items.pop();
  }

  /**
   * Returns the top element of the stack without removing it.
   * @returns {any} The top element of the stack.
   * @throws Will throw an error if the stack is empty.
   * @timeComplexity O(1)
   */
  peek() {
    if (this.isEmpty()) {
      throw new Error("No elements in stack");
    }
    return this.items[this.items.length - 1];
  }

  /**
   * Checks if the stack is empty.
   * @returns {boolean} True if the stack is empty, false otherwise.
   * @timeComplexity O(1)
   */
  isEmpty() {
    return this.items.length === 0;
  }
}

// Exporting the Stack class for use in other files
module.exports = Stack;
