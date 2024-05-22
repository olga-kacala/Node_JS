# Data Structures and Algorithms Project

## Overview

This project implements various data structures and algorithms in JavaScript, including Stack, Queue, Binary Tree, Graph, LinkedList, Min/Max Stack, and Binary Search Tree. It demonstrates their usage through examples and operations like push, pop, insertion, deletion, traversal, and cycle detection.

## Project Structure

datastructures/
    classes/
        Stack.js
        Queue.js
        BinaryTree.js
        Graph.js
        LinkedList.js
        MinMaxStack.js
        BinarySearchTree.js
    main.js
    README.md

## Classes

### Stack

Represents a stack data structure.

#### Operations:

- `push(item)`: Adds an item to the top of the stack.
- `pop()`: Removes and returns the top item from the stack.
- `peek()`: Returns the top item from the stack without removing it.

### Queue

Represents a queue data structure.

#### Operations:

- `enqueue(item)`: Adds an item to the rear of the queue.
- `dequeue()`: Removes and returns the item from the front of the queue.
- `peek()`: Returns the item from the front of the queue without removing it.

### Binary Tree

Represents a binary tree data structure.

#### Operations:


- `insert(value)`: Inserts a value into the binary tree.
- `search(value)`: Searches for a value in the binary tree.
- `inOrderTraversal()`: Performs in-order traversal of the binary tree.
- `preOrderTraversal()`: Performs pre-order traversal of the binary tree.
- `postOrderTraversal()`: Performs post-order traversal of the binary tree.

### Graph

Represents a graph data structure.

#### Operations:

- `addVertex(vertex)`: Adds a vertex to the graph.
- `addEdge(fromVertex, toVertex)`: Adds an edge between two vertices in the graph.
- `depthFirstSearch(startingVertex)`: Performs depth-first search traversal of the graph.
- `breadthFirstSearch(startingVertex)`: Performs breadth-first search traversal of the graph.

### LinkedList

Represents a linked list data structure.

#### Operations:

- `insert(value)`: Inserts a value into the linked list.
- `search(value)`: Searches for a value in the linked list.
- `delete(value)`: Deletes a value from the linked list.
- `toArray()`: Converts the linked list to an array.

### Min/Max Stack

Represents a stack with additional methods to retrieve the minimum and maximum elements efficiently.

#### Operations:

- `push(item)`: Adds an item to the stack.
- `pop()`: Removes and returns the top item from the stack.
- `getMin()`: Returns the minimum item from the stack.
- `getMax()`: Returns the maximum item from the stack.

### Binary Search Tree

Represents a binary search tree data structure.

#### Operations:

- `isBST(root)`: Checks if a binary tree is a binary search tree.

## Demonstration

- Each data structure and algorithm is demonstrated with examples showcasing their operations and functionality.
