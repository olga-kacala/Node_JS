class Node {
  constructor(value) {
    this.value = value; // Value of the node
    this.next = null; // Reference to the next node
  }
}

/**
 * LinkedList class representing a singly linked list.
 */
class LinkedList {
  constructor() {
    this.head = null; // Head of the list
    this.tail = null; // Tail of the list
    this.length = 0; // Length of the list
  }

  /**
   * Inserts a new node at the end of the list.
   * @param {*} value - The value to be inserted.
   *  * @timeComplexity O(1) - Constant time complexity as insertion always occurs at the end of the list.
   */
  insert(value) {
    const newNode = new Node(value); // Create a new node with the given value
    if (!this.head) {
      // If the list is empty
      this.head = newNode; // The new node becomes the head
      this.tail = newNode; // The new node also becomes the tail
    } else {
      // If the list is not empty
      this.tail.next = newNode; // Link the current tail node to the new node
      this.tail = newNode; // Update the tail to be the new node
    }
    this.length++; // Increment the length of the list
  }

  /**
   * Deletes the first node with the specified value.
   * @param {*} value - The value of the node to be deleted.
   * @returns {boolean} - True if the node was deleted, otherwise false.
   * @timeComplexity O(n) - Linear time complexity in the worst case as it may need to traverse the entire list.
   */
  delete(value) {
    if (!this.head) {
      return false; // If the list is empty, return false
    }

    if (value === this.head.value) {
      this.head = this.head.next; // Update head to the next node
      this.length--;
      if (this.length === 0) {
        this.tail = null; // If the list becomes empty, update the tail to null
      }
      return true;
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next; // Traverse to the node before the one to be deleted
    }

    if (current.next) {
      current.next = current.next.next; // Bypass the node to be deleted
      this.length--;
      if (!current.next) {
        this.tail = current; // Update the tail if the last node was deleted
      }
      return true;
    }

    return false; // Return false if the node to be deleted was not found
  }

  /**
   * Searches for a node with the specified value.
   * @param {*} value - The value to search for.
   * @returns {Node|null} - The node if found, otherwise null.
   */
  search(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  /**
   * Converts the linked list to an array.
   * @returns {Array} - An array containing the values of the linked list nodes.
   * @timeComplexity O(n) - Linear time complexity as it needs to traverse the entire list to convert it to an array.
   */
  toArray() {
    const array = [];
    let current = this.head;
    while (current) {
      array.push(current.value);
      current = current.next;
    }
    return array;
  }

  /**
   * Detects if the linked list has a cycle using Floyd's Cycle Detection Algorithm.
   * @returns {boolean} - True if a cycle is detected, otherwise false.
   * @timeComplexity O(n) - Linear time complexity as it may need to traverse the entire list to detect a cycle.
   */
  hasCycle() {
    if (!this.head) return false; // An empty list has no cycle

    let slow = this.head; // The "tortoise" moves one step at a time
    let fast = this.head; // The "hare" moves two steps at a time

    while (fast && fast.next) {
      slow = slow.next; // Move tortoise one step
      fast = fast.next.next; // Move hare two steps

      if (slow === fast) {
        return true; // A cycle is detected
      }
    }

    return false; // No cycle detected
  }
}

module.exports = LinkedList;
