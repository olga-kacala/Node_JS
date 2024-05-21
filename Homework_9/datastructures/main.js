const Stack = require('./classes/Stack');
const Queue = require('./classes/Queue');
const BinaryTree = require('./classes/BinaryTree');
const Graph = require('./classes/Graph');

// const stackPushPop = new Stack();
// stackPushPop .push(0);
// stackPushPop .push("you are out soon");
// console.log(stackPushPop );
// stackPushPop .pop();
// console.log(stackPushPop );

// const stackPeek = new Stack();
// stackPeek.push(0);
// stackPeek.push(1);
// stackPeek.push("I am on the top!");
// console.log(stackPeek.peek());

// const queue = new Queue;
// queue.enqueue("I am 1st in the line, can't wait any longer");
// queue.enqueue("I am 2nd in the line, will be the 1st soon");
// queue.enqueue("I am 3th in the line");
// console.log(queue);

// queue.dequeue();
// console.log(queue);
// console.log(queue.peek());


// const tree = new BinaryTree();
// tree.insert(10);
// tree.insert(5);
// tree.insert(15);
// tree.insert(3);
// tree.insert(7);
// tree.insert(12);
// tree.insert(18);

// console.log("Search for 10:", tree.search(10)); // Should return the node with value 10
// console.log("Search for 100:", tree.search(100)); // Should return null

// console.log("In-order traversal:", tree.inOrderTraversal()); // Should print [3, 5, 7, 10, 12, 15, 18]
// console.log("Pre-order traversal:", tree.preOrderTraversal()); // Should print [10, 5, 3, 7, 15, 12, 18]
// console.log("Post-order traversal:", tree.postOrderTraversal()); // Should print [3, 7, 5, 12, 18, 15, 10]

const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');
graph.addEdge('D', 'E');
graph.addEdge('D', 'F');
graph.addEdge('E', 'F');

console.log("DFS starting from A:", graph.depthFirstSearch('A')); 
console.log("BFS starting from A:", graph.breadthFirstSearch('A')); 