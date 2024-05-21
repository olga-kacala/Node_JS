// 5. **Linked List**: Implement a class for a singly linked list data structure. Include methods for inserting nodes, deleting nodes, and searching for a node.

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
     */
    insert(value) {
      const newNode = new Node(value);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
      this.length++;
    }
  
    /**
     * Deletes the first node with the specified value.
     * @param {*} value - The value of the node to be deleted.
     * @returns {boolean} - True if the node was deleted, otherwise false.
     */
    delete(value) {
      if (!this.head) return false;
  
      if (this.head.value === value) {
        this.head = this.head.next;
        this.length--;
        if (this.length === 0) {
          this.tail = null;
        }
        return true;
      }
  
      let current = this.head;
      while (current.next && current.next.value !== value) {
        current = current.next;
      }
  
      if (current.next) {
        current.next = current.next.next;
        this.length--;
        if (!current.next) {
          this.tail = current;
        }
        return true;
      }
  
      return false;
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
  }
module.exports = LinkedList;