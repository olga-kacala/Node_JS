class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

/**
 * Helper function to check if a binary tree is a BST.
 * @param {TreeNode} node - The current node being checked.
 * @param {number|null} min - The minimum permissible value for the node.
 * @param {number|null} max - The maximum permissible value for the node.
 * @returns {boolean} - True if the subtree rooted at the current node is a BST, otherwise false.
 * @timeComplexity O(n) - The time complexity is O(n) because each node is visited exactly once.
 */
function isBSTHelper(node, min = null, max = null) {
  // An empty tree is a BST
  if (!node) {
    return true;
  }

  // Check if the current node's value is within the permissible range
  if ((min !== null && node.value <= min) || (max !== null && node.value >= max)) {
    return false;
  }

  // Recursively check the left and right subtrees with updated permissible ranges
  return (
    isBSTHelper(node.left, min, node.value) &&  // Time Complexity: O(n)
    isBSTHelper(node.right, node.value, max)    // Time Complexity: O(n)
  );
}

/**
 * Main function to check if a binary tree is a BST.
 * @param {TreeNode} root - The root node of the binary tree.
 * @returns {boolean} - True if the binary tree is a BST, otherwise false.
 * @timeComplexity O(n) - The time complexity is O(n) because the helper function isBSTHelper is called once with O(n) time complexity.
 */
function isBST(root) {
  return isBSTHelper(root);
}

// Exporting the TreeNode class and isBST function for use in other files
module.exports = { TreeNode, isBST };
