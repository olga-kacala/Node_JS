// 4. **Graph**: Implement a class for a graph data structure. Include methods for adding vertices and edges, performing depth-first search (DFS), and breadth-first search (BFS).

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
        this.addVertex(vertex1); // Add vertex1 if it doesn't exist
      }
      if (!this.adjacencyList[vertex2]) {
        this.addVertex(vertex2); // Add vertex2 if it doesn't exist
      }
      this.adjacencyList[vertex1].push(vertex2); // Add vertex2 to the adjacency list of vertex1
      this.adjacencyList[vertex2].push(vertex1); // Add vertex1 to the adjacency list of vertex2
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
  }
  
  module.exports = Graph;
  