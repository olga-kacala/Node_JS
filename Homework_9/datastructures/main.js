const Stack = require("./classes/Stack");
const Queue = require("./classes/Queue");
const BinaryTree = require("./classes/BinaryTree");
const Graph = require("./classes/Graph");
const LinkedList = require("./classes/LinkedList");
const MinMaxStack = require("./classes/MinMaxStack");
const { TreeNode, isBST } = require("./classes/BinarySearchTree");

// ### **Part 1: Stack**

const stackPushPop = new Stack();
stackPushPop.push(0);
stackPushPop.push("you are out soon");
console.log(stackPushPop);
stackPushPop.pop();
console.log(stackPushPop);

const stackPeek = new Stack();
stackPeek.push(0);
stackPeek.push(1);
stackPeek.push("I am on the top!");
console.log(stackPeek.peek());

// ### **Part 1: Queue**

const queue = new Queue();
queue.enqueue("I am 1st in the line, can't wait any longer");
queue.enqueue("I am 2nd in the line, will be the 1st soon");
queue.enqueue("I am 3th in the line");
console.log(queue);

queue.dequeue();
console.log(queue);
console.log(queue.peek());

// ### **Part 1: Binary Tree**

const tree = new BinaryTree();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(12);
tree.insert(18);

console.log("Search for 10:", tree.search(10)); // Should return the node with value 10
console.log("Search for 100:", tree.search(100)); // Should return null

console.log("In-order traversal:", tree.inOrderTraversal()); // Should print [3, 5, 7, 10, 12, 15, 18]
console.log("Pre-order traversal:", tree.preOrderTraversal()); // Should print [10, 5, 3, 7, 15, 12, 18]
console.log("Post-order traversal:", tree.postOrderTraversal()); // Should print [3, 7, 5, 12, 18, 15, 10]

// ### **Part 1: Graph**

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("D", "F");
graph.addEdge("E", "F");

console.log("DFS starting from A:", graph.depthFirstSearch("A"));
console.log("BFS starting from A:", graph.breadthFirstSearch("A"));

// ### **Part 1: Linked List*

const list = new LinkedList();

// Insert elements into the linked list
list.insert(1);
list.insert(2);
list.insert(3);
list.insert(4);
list.insert(5);

// Log the linked list as an array
console.log("Linked List after insertions:", list.toArray()); // Expected: [1, 2, 3, 4, 5]

// Search for an element
console.log("Search for value 3:", list.search(3)); // Expected: Node with value 3
console.log("Search for value 10:", list.search(10)); // Expected: null (not found)

// Delete elements from the linked list
list.delete(3); // Delete value 3
console.log("Linked List after deleting 3:", list.toArray()); // Expected: [1, 2, 4, 5]

list.delete(1); // Delete head (value 1)
console.log("Linked List after deleting head (1):", list.toArray()); // Expected: [2, 4, 5]

list.delete(5); // Delete tail (value 5)
console.log("Linked List after deleting tail (5):", list.toArray()); // Expected: [2, 4]

// Try to delete a non-existing element
console.log("Delete value 10 (non-existing):", list.delete(10)); // Expected: false
console.log(
  "Linked List after trying to delete non-existing value 10:",
  list.toArray()
); // Expected: [2, 4]

// Final state of the linked list
console.log("Final Linked List:", list.toArray()); // Expected: [2, 4]

// ### **Part 2: Min/Max Stack**

const stack = new MinMaxStack();

// Push elements into the stack
stack.push(2);
stack.push(1);
stack.push(3);
stack.push(0);

console.log("Stack after pushes:", stack.items); // Expected: [2, 1, 3, 0]
console.log("Minimum value:", stack.getMin()); // Expected: 0
console.log("Maximum value:", stack.getMax()); // Expected: 3

// Pop elements from the stack
console.log("Popped element:", stack.pop()); // Expected: 0
console.log("Minimum value after pop:", stack.getMin()); // Expected: 1
console.log("Maximum value after pop:", stack.getMax()); // Expected: 3
console.log("Stack after pop:", stack.items); // Expected: [2, 1, 3]

// Push another element
stack.push(4);

console.log("Stack after another push:", stack.items); // Expected: [2, 1, 3, 4]
console.log("Minimum value:", stack.getMin()); // Expected: 1
console.log("Maximum value:", stack.getMax()); // Expected: 4

// ### **Part 2: Binary Search Tree**

// Example 1: A valid BST
const root1 = new TreeNode(10);
root1.left = new TreeNode(5);
root1.right = new TreeNode(15);
root1.left.left = new TreeNode(3);
root1.left.right = new TreeNode(7);
root1.right.left = new TreeNode(12);
root1.right.right = new TreeNode(18);

console.log(isBST(root1)); // Expected output: true

// Example 2: An invalid BST
const root2 = new TreeNode(10);
root2.left = new TreeNode(5);
root2.right = new TreeNode(15);
root2.left.left = new TreeNode(3);
root2.left.right = new TreeNode(7);
root2.right.left = new TreeNode(12);
root2.right.right = new TreeNode(8); // Invalid: 8 is not greater than 10

console.log(isBST(root2)); // Expected output: false

// ### **Part 2: Graph Algorithms**

const graphAlgorithms = new Graph();
graphAlgorithms.addVertex("A");
graphAlgorithms.addVertex("B");
graphAlgorithms.addVertex("C");
graphAlgorithms.addVertex("D");
graphAlgorithms.addVertex("E");
graphAlgorithms.addVertex("F");

graphAlgorithms.addEdge("A", "B", 4);
graphAlgorithms.addEdge("A", "C", 2);
graphAlgorithms.addEdge("B", "E", 3);
graphAlgorithms.addEdge("C", "D", 2);
graphAlgorithms.addEdge("C", "F", 4);
graphAlgorithms.addEdge("D", "E", 3);
graphAlgorithms.addEdge("D", "F", 1);
graphAlgorithms.addEdge("E", "F", 1);

console.log(
  "Dijkstra's shortest path from A to E:",
  graphAlgorithms.dijkstra("A", "E")
); // Test Dijkstra's algorithm
console.log(
  "BFS shortest path from A to E:",
  graphAlgorithms.bfsShortestPath("A", "E")
); // Test BFS shortest path algorithm

// ### **Part 2: Linked List Cycle**

const listWithCycle = new LinkedList();
listWithCycle.insert(1);
listWithCycle.insert(2);
listWithCycle.insert(3);
listWithCycle.insert(4);
listWithCycle.insert(5);

// Create a cycle for testing: 5 -> 2
listWithCycle.tail.next = listWithCycle.head.next;

console.log(
  "Does the linked list have a cycle? (Expected: true):",
  listWithCycle.hasCycle()
); // Should return true

const listWithoutCycle = new LinkedList();
listWithoutCycle.insert(1);
listWithoutCycle.insert(2);
listWithoutCycle.insert(3);
listWithoutCycle.insert(4);
listWithoutCycle.insert(5);

console.log(
  "Does the linked list have a cycle? (Expected: false):",
  listWithoutCycle.hasCycle()
); // Should return false
