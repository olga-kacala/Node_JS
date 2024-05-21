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
    if (newNode.value < node.value) {
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

  search(value) {
    return this.searchNode(this.root, value);
  }

  searchNode(currNode, value) {
    if (!currNode) {
      return null;
    } else {
      if (currNode.value === value) {
        return currNode;
      } else {
        if (currNode.value > value) {
          return this.searchNode(currNode.left, value);
        } else {
          return this.searchNode(currNode.right, value);
        }
      }
    }
  }

  // In-order traversal: Left, Root, Right
  inOrderTraversal(node = this.root, result = []) {
    if (node) {
      this.inOrderTraversal(node.left, result); // Traverse the left subtree
      result.push(node.value); // Visit the root node
      this.inOrderTraversal(node.right, result); // Traverse the right subtree
    }
    return result;
  }

  // Pre-order traversal: Root, Left, Right
  preOrderTraversal(node = this.root, result = []) {
    if (node) {
      result.push(node.value); // Visit the root node
      this.preOrderTraversal(node.left, result); // Traverse the left subtree
      this.preOrderTraversal(node.right, result); // Traverse the right subtree
    }
    return result;
  }

  // Post-order traversal: Left, Right, Root
  postOrderTraversal(node = this.root, result = []) {
    if (node) {
      this.postOrderTraversal(node.left, result); // Traverse the left subtree
      this.postOrderTraversal(node.right, result); // Traverse the right subtree
      result.push(node.value); // Visit the root node
    }
    return result;
  }
}

module.exports = BinaryTree;
