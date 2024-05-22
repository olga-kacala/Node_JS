// PriorityQueue class to manage the priority of vertices
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  // Method to enqueue a value with its priority
  enqueue(val, priority) {
    this.values.push({ val, priority }); // Time Complexity: O(1)
    this.sort(); // Time Complexity: O(n log n) (due to sorting)
  }

  // Method to dequeue and return the first element in the queue
  dequeue() {
    return this.values.shift(); // Time Complexity: O(1)
  }

  // Method to sort values based on priority
  sort() {
    this.values.sort((a, b) => a.priority - b.priority); // Time Complexity: O(n log n)
  }
}

/**
 * Graph class representing an undirected graph using an adjacency list.
 */
class Graph {
  /**
   * Creates an instance of Graph.
   */
  constructor() {
    this.adjacencyList = {}; // Object to store the adjacency list of the graph
  }

  /**
   * Adds a vertex to the graph.
   * @param {string} vertex - The vertex to be added.
   */
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = []; // Initialize an empty array for the new vertex
    }
  }

  /**
   * Adds an undirected edge between two vertices in the graph.
   * @param {string} vertex1 - The first vertex.
   * @param {string} vertex2 - The second vertex.
   */
  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) {
      this.addVertex(vertex1); // Time Complexity: O(1)
    }
    if (!this.adjacencyList[vertex2]) {
      this.addVertex(vertex2); // Time Complexity: O(1)
    }
    this.adjacencyList[vertex1].push(vertex2); // Time Complexity: O(1)
    this.adjacencyList[vertex2].push(vertex1); // Time Complexity: O(1)
  }

  /**
   * Performs a depth-first search (DFS) starting from a given vertex.
   * @param {string} start - The starting vertex.
   * @returns {Array} result - The vertices visited during DFS in the order they were visited.
   */
  depthFirstSearch(start) {
    const result = []; // Array to store the order of visited vertices
    const visited = {}; // Object to track visited vertices
    const adjacencyList = this.adjacencyList; // Reference to the adjacency list

    /**
     * Helper function for DFS.
     * @param {string} vertex - The current vertex being visited.
     */
    (function dfs(vertex) {
      if (!vertex) return null;
      visited[vertex] = true; // Mark the vertex as visited
      result.push(vertex); // Add the vertex to the result array
      adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          dfs(neighbor); // Recursively visit unvisited neighbors
        }
      });
    })(start);

    return result;
  }

  /**
   * Performs a breadth-first search (BFS) starting from a given vertex.
   * @param {string} start - The starting vertex.
   * @returns {Array} result - The vertices visited during BFS in the order they were visited.
   */
  breadthFirstSearch(start) {
    const queue = [start]; // Initialize the queue with the starting vertex
    const result = []; // Array to store the order of visited vertices
    const visited = {}; // Object to track visited vertices
    visited[start] = true; // Mark the starting vertex as visited

    while (queue.length) {
      const currentVertex = queue.shift(); // Dequeue the first vertex
      result.push(currentVertex); // Add the current vertex to the result array

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true; // Mark the neighbor as visited
          queue.push(neighbor); // Enqueue the neighbor
        }
      });
    }

    return result;
  }

  /**
   * Finds the shortest path between two vertices using Dijkstra's algorithm.
   * @param {string} start - The starting vertex.
   * @param {string} end - The ending vertex.
   * @returns {Array} path - The shortest path from start to end.
   */
  dijkstra(start, end) {
    const distances = {}; // Object to store distances from start to each vertex
    const priorityQueue = new PriorityQueue(); // Priority queue to manage vertices to explore
    const previous = {}; // Object to store the previous vertex in the shortest path
    let path = []; // Array to store the shortest path
    let smallest; // Variable to track the vertex with the smallest distance

    // Initialize distances and priority queue
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0; // Distance to start vertex is 0
        priorityQueue.enqueue(vertex, 0); // Enqueue start vertex with priority 0
      } else {
        distances[vertex] = Infinity; // Distance to other vertices is infinity
        priorityQueue.enqueue(vertex, Infinity); // Enqueue other vertices with infinite priority
      }
      previous[vertex] = null; // Previous vertex is initially null
    }

    // Process vertices in priority queue
    while (priorityQueue.values.length) {
      smallest = priorityQueue.dequeue().val; // Dequeue vertex with smallest distance
      if (smallest === end) {
        // Construct path by backtracking from end vertex
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }

      if (smallest || distances[smallest] !== Infinity) {
        // Explore neighbors of the current vertex
        for (let neighbor in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbor];
          let candidate = distances[smallest] + 1; // Distance to neighbor
          let nextNeighbor = nextNode;

          if (candidate < distances[nextNeighbor]) {
            distances[nextNeighbor] = candidate; // Update distance to neighbor
            previous[nextNeighbor] = smallest; // Update previous vertex for neighbor
            priorityQueue.enqueue(nextNeighbor, candidate); // Enqueue neighbor with updated distance
          }
        }
      }
    }

    return path.concat(smallest).reverse(); // Return the shortest path
  }

  /**
   * Finds the shortest path between two vertices using Breadth-First Search (BFS).
   * @param {string} start - The starting vertex.
   * @param {string} end - The ending vertex.
   * @returns {Array} path - The shortest path from start to end.
   */
  bfsShortestPath(start, end) {
    const queue = [start]; // Initialize the queue with the starting vertex
    const distances = { [start]: 0 }; // Object to store distances from start to each vertex
    const previous = {}; // Object to store the previous vertex in the shortest path
    const visited = new Set(); // Set to track visited vertices
    visited.add(start); // Mark the starting vertex as visited

    while (queue.length) {
      const vertex = queue.shift(); // Dequeue the first vertex
      if (vertex === end) {
        // Construct path by backtracking from end vertex
        const path = [];
        let current = end;
        while (current !== start) {
          path.push(current);
          current = previous[current];
        }
        path.push(start);
        return path.reverse(); // Return the shortest path
      }

      // Explore neighbors of the current vertex
      this.adjacencyList[vertex].forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor); // Mark the neighbor as visited
          queue.push(neighbor); // Enqueue the neighbor
          distances[neighbor] = distances[vertex] + 1; // Update distance to neighbor
          previous[neighbor] = vertex; // Update previous vertex for neighbor
        }
      });
    }

    return null; // Return null if no path is found
  }
}

module.exports = Graph;
