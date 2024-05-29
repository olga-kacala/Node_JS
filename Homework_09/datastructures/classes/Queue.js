/** Task */
// 2. **Queue**: Implement a class for a queue data structure. Include methods for enqueue, dequeue, and peek.

/**
 * Queue class represents a first-in-first-out (FIFO) queue of elements.
 * It allows adding elements to the back, removing elements from the front,
 * and peeking at the front element without removing it.
 */

class Queue {
  constructor() {
    // Initializes an empty array to hold queue elements.
    this.queue = [];
  }

  /**
   * Adds an element to the back of the queue.
   * @param {any} item - The element to be added to the queue.
   * @returns {number} The new length of the queue.
   * @timeComplexity O(1)
   */
  enqueue(item) {
    return this.queue.push(item);
  }

  /**
   * Removes and returns the front element of the queue.
   * @returns {any} The front element of the queue.
   * @throws Will throw an error if the queue is empty (underflow).
   * @timeComplexity O(n) - Due to the need to shift all other elements one position to the left.
   */
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Underflow: Cannot dequeue from an empty queue");
    }
    return this.queue.shift();
  }

  /**
   * Returns the front element of the queue without removing it.
   * @returns {any} The front element of the queue.
   * @throws Will throw an error if the queue is empty.
   * @timeComplexity O(1)
   */
  peek() {
    if (this.isEmpty()) {
      throw new Error("No elements in queue");
    }
    return this.queue[0];
  }

  /**
   * Checks if the queue is empty.
   * @returns {boolean} True if the queue is empty, false otherwise.
   * @timeComplexity O(1)
   */
  isEmpty() {
    return this.queue.length === 0;
  }
}

// Exporting the Queue class for use in other files
module.exports = Queue;
