# Custom Hash Table Implementation

## Overview

This project implements a custom hash table in JavaScript. The hash table uses a custom hash function and handles collisions using separate chaining with linked lists. The project includes methods for inserting, retrieving, and deleting key-value pairs, and demonstrates these operations through examples.

## Project Structure

hashTable/
    HashFunction.js
    README.md

## Classes

### Node

Represents a node in a linked list used for separate chaining in the hash table.

### CustomHashTable

Represents a hash table with a custom hash function and collision handling using separate chaining.

### Methods

- **customHashFunction(key)**: Generates a hash code for a given key.
- **insert(key, value)**: Inserts a key-value pair into the hash table.
- **get(key)**: Retrieves the value associated with the given key.
- **delete(key)**: Removes the key-value pair associated with the given key from the hash table.
- **simpleHashFunction & insertCollisionTest**: Creating a simplified insert function for collision test purpose.

## Performance Analysis

The performance of the custom hash table can be analyzed in terms of time complexity for key operations:

- **Insertion (insert)**: O(1) on average, O(n) in the worst case (due to collisions).
- **Retrieval (get)**: O(1) on average, O(n) in the worst case (due to collisions).
- **Deletion (delete)**: O(1) on average, O(n) in the worst case (due to collisions).

## Trade-offs

- **Uniform Distribution**: The custom hash function aims to distribute keys uniformly across the buckets to minimize collisions.
- **Collision Handling**: Separate chaining using linked lists is chosen for its simplicity and effectiveness in handling collisions. However, it can lead to increased time complexity if many collisions occur.
- **Space Complexity**: The space complexity is O(n + m), where n is the number of key-value pairs and m is the size of the hash table.
