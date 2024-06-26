// 1. **Stack**: Implement a class for a stack data structure. Include methods for push, pop, and peek.

class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    return this.items.push(item);
  }

  pop() {
    if (this.items.length === 0) {
      throw new Error("Empty");
    }
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }
}

// const arr   = new Stack;
// console.log(arr.push(55))
// console.log(arr.push(5))
// console.log(arr.pop())
// console.log(arr.peek())

// 2. **Queue**: Implement a class for a queue data structure. Include methods for enqueue, dequeue, and peek.

class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(item) {
    return this.queue.push(item);
  }
  dequeue() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
  }
}

// const q = new Queue;

// console.log(q.enqueue(33))
// console.log(q.enqueue(11))
// console.log(q.dequeue())
// console.log(q.peek(33))

// 3. **Binary Tree**: Implement a class for a binary tree data structure. Include methods for inserting nodes, searching for a node, and traversing the tree (e.g., in-order, pre-order, post-order).

class BinaryTree {
  constructor(value) {
    this.root = null;
    if (value !== undefined) {
      this.root = { value, left: null, right: null };
    }
  }

  insert(value) {
    const newNode = { value, left: null, right: null };
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (node.value > newNode.value) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  searchPrimo(node) {
    if (node.value === this.root.value) {
      return true;
    } else {
      this.search(root.value, node.value);
    }
  }
}

// 4. **Graph**: Implement a class for a graph data structure. Include methods for adding vertices and edges, performing depth-first search (DFS), and breadth-first search (BFS).

class Graph {
  constructor() {
    this.list = {};
  }

  addVertex(vertex) {
    if (!this.list[vertex]) {
      this.list[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.list[vertex1]) {
      this.addVertex(vertex1);
    }
    this.list[vertex1].push(vertex2);
  }
}

// 5. **Linked List**: Implement a class for a singly linked list data structure. Include methods for inserting nodes, deleting nodes, and searching for a node.
class Node {
  constructor(){
    this.value = value;
    this.next = null
  }
}
class LinkedList {
  constructor(){
    this.head = null;
    this.tail = null;
    this.lenght = 0;
  }


addNode (value){
  const newNode = new Node; 
if(!this.head) {
this.head = newNode;
this.tail = newNode
} else {
  this.tail.next = newNode
  this.tail = newNode
}
this.length ++
}

deletes (value){
  if(!this.head){
    return false
  } 
  let current = this.head;
  while(current.next && current.naxt.value !== value){
    current = current.next
  }

  if(current.next){

  }
}

search (value){
  let current = this.head;
  while(current.value !== value){
    current = current.next
  }
  return current
}
}

class MinMaxStack {
  constructor(){
    this.minStack = [];
    this.maxStack = [];
    this.items = [];
  }
}
