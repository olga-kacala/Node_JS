class BinaryTree {
  constructor(value) {
    // Initialize the root of the binary tree. If a value is provided, create a root node with that value.
    this.root = null;
    if (value !== undefined) {
      this.root = { value, left: null, right: null };
    }
  }

  // Method to insert a new node into the binary tree
  insert(value) {
    const newNode = { value, left: null, right: null };

    // If the tree is empty, the new node becomes the root
    if (!this.root) {
      this.root = newNode;
    } else {
      // Otherwise, call the helper function to recursively insert the new node
      this.insertNode(this.root, newNode);
    }
  }

  // Helper function to recursively insert a new node into the binary tree
  insertNode(node, newNode) {
    // If the value of the new node is less than the current node, go left
    if (newNode.value < node.value) {
      // If there's no left child, insert the new node here
      if (!node.left) {
        node.left = newNode;
      } else {
        // Otherwise, continue traversing left
        this.insertNode(node.left, newNode);
      }
    } else {
      // If the value of the new node is greater than or equal to the current node, go right
      if (!node.right) {
        // If there's no right child, insert the new node here
        node.right = newNode;
      } else {
        // Otherwise, continue traversing right
        this.insertNode(node.right, newNode);
      }
    }
  }

  // Method to search for a value in the binary tree
  search(value) {
    // Call the helper function to perform the search starting from the root
    return this.searchNode(this.root, value);
  }

  // Helper function to recursively search for a value in the binary tree
  searchNode(currNode, value) {
    // If the current node is null, the value is not found
    if (!currNode) {
      return null;
    } else {
      // If the value is found at the current node, return the node
      if (currNode.value === value) {
        return currNode;
      } else {
        // If the value is less than the current node's value, search left
        if (currNode.value > value) {
          return this.searchNode(currNode.left, value);
        } else {
          // If the value is greater than the current node's value, search right
          return this.searchNode(currNode.right, value);
        }
      }
    }
  }

  // Method to perform an in-order traversal of the binary tree
  inOrderTraversal(node = this.root, result = []) {
    if (node) {
      // Traverse the left subtree
      this.inOrderTraversal(node.left, result); // Time Complexity: O(n)
      // Visit the root node
      result.push(node.value); // Time Complexity: O(1)
      // Traverse the right subtree
      this.inOrderTraversal(node.right, result); // Time Complexity: O(n)
    }
    return result;
  }

  // Method to perform a pre-order traversal of the binary tree
  preOrderTraversal(node = this.root, result = []) {
    if (node) {
      // Visit the root node
      result.push(node.value); // Time Complexity: O(1)
      // Traverse the left subtree
      this.preOrderTraversal(node.left, result); // Time Complexity: O(n)
      // Traverse the right subtree
      this.preOrderTraversal(node.right, result); // Time Complexity: O(n)
    }
    return result;
  }

  // Method to perform a post-order traversal of the binary tree
  postOrderTraversal(node = this.root, result = []) {
    if (node) {
      // Traverse the left subtree
      this.postOrderTraversal(node.left, result); // Time Complexity: O(n)
      // Traverse the right subtree
      this.postOrderTraversal(node.right, result); // Time Complexity: O(n)
      // Visit the root node
      result.push(node.value); // Time Complexity: O(1)
    }
    return result;
  }
}

module.exports = BinaryTree;
