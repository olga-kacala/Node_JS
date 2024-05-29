// 1. **Custom Hash Function**: Implement a custom hash function in JavaScript. Your hash function should take a string as input and produce a hash code (an integer) as output. Be creative, but ensure that your function distributes values uniformly.

// 2. **Collision Handling**: Implement a collision resolution strategy. You can choose from methods like separate chaining (using linked lists), open addressing (linear probing, quadratic probing), or any other technique you prefer.

// 1. **Hash Table Class**: Create a JavaScript class for a hash table that uses your custom hash function. Include methods for inserting key-value pairs, retrieving values by key, and deleting key-value pairs.
// 2. **Testing**: Create test cases to ensure that your hash table and custom hash function work correctly. Test scenarios should include inserting, retrieving, and deleting values, as well as handling collisions gracefully.


/**
 * Node class represents a node in a linked list.
 * @class
 */
class Node {
    /**
     * Create a Node.
     * @constructor
     * @param {string} key - The key of the node.
     * @param {any} value - The value of the node.
     * @param {Node} next - Reference to the next node in the linked list.
     */
    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

/**
 * CustomHashTable class represents a hash table with custom hash function and collision handling using separate chaining.
 * @class
 */
class CustomHashTable {
    /**
     * Create a CustomHashTable.
     * @constructor
     * @param {number} size - The size of the hash table.
     */
    constructor(size = 111) {
        // starting size of array as a large prime number for better distribution
        this.size = size;
        this.buckets = Array.from({ length: size }, () => null);
    }

    /**
     * customHashFunction generates a hash code for a given key.
     * @param {string} key - The key to hash.
     * @returns {number} - The hash code.
     */
    customHashFunction(key) {
        let hash = 0;
        const primeMultiplier = 11; // My lucky number
        const modValue = 1000000011; // A large prime number for better distribution

        for (let i = 0; i < key.length; i++) {
            let char = key.charCodeAt(i);
            hash = (hash * primeMultiplier + char) % modValue;
        }

        return hash % this.size; // Ensure the hash fits within the table size
    }

    //Creating a simplified hash function for collision test purpose
    simpleHashFunction(key) {
        return key.length % this.size;
    }

    // To implement a collision resolution strategy I choose linked list since I have learned about it in last session and I like this approach.

    /**
     * insert inserts a key-value pair into the hash table.
     * @param {string} key - The key.
     * @param {any} value - The value.
     */
    insert(key, value) {
        const index = this.customHashFunction(key);
        let currentNode = this.buckets[index];

        // If the bucket is empty, insert the new node
        if (!currentNode) {
            this.buckets[index] = new Node(key, value);
            return;
        }

        // Traverse the linked list to find the appropriate spot or update an existing key
        while (currentNode) {
            if (currentNode.key === key) {
                currentNode.value = value; // Update the value for an existing key
                return;
            }
            if (!currentNode.next) {
                currentNode.next = new Node(key, value); // Append the new node at the end of the list
                return;
            }
            currentNode = currentNode.next;
        }
    }

    //Creating a simplified insert function for collision test purpose
    insertCollisionTest(key, value) {
        const index = this.simpleHashFunction(key);
        let currentNode = this.buckets[index];

        // If the bucket is empty, insert the new node
        if (!currentNode) {
            this.buckets[index] = new Node(key, value);
            return;
        }

        // Traverse the linked list to find the appropriate spot or update an existing key
        while (currentNode) {
            if (currentNode.key === key) {
                currentNode.value = value; // Update the value for an existing key
                return;
            }
            if (!currentNode.next) {
                currentNode.next = new Node(key, value); // Append the new node at the end of the list
                return;
            }
            currentNode = currentNode.next;
        }
    }

    /**
    * get retrieves the value associated with the given key from the hash table.
    * @param {string} key - The key to retrieve.
    * @returns {any} - The value associated with the key, or undefined if the key is not found.
    */
    get(key) {
        const index = this.customHashFunction(key);
        let currentNode = this.buckets[index];

        while (currentNode) {
            if (currentNode.key === key) {
                return currentNode.value;
            }
            currentNode = currentNode.next;
        }

        return undefined; // Key not found
    }

    /**
     * delete removes the key-value pair associated with the given key from the hash table.
     * @param {string} key - The key to delete.
     * @returns {boolean} - True if the key was found and deleted, false otherwise.
     */
    delete(key) {
        const index = this.customHashFunction(key);
        let currentNode = this.buckets[index];
        let previousNode = null;

        while (currentNode) {
            if (currentNode.key === key) {
                if (previousNode) {
                    previousNode.next = currentNode.next;
                } else {
                    this.buckets[index] = currentNode.next;
                }
                return true; // Key removed
            }
            previousNode = currentNode;
            currentNode = currentNode.next;
        }

        return false; // Key not found
    }
}

// Test of hash table
const hashTable = new CustomHashTable();

console.log(
    `Hash codes created with customHashFucntion in array with ${hashTable.size} buckets`
);
console.log(hashTable.customHashFunction("Ola"));
console.log(hashTable.customHashFunction("Ala"));
console.log(hashTable.customHashFunction("Pola"));
console.log(
    hashTable.customHashFunction("LongerStringToTestUniformDistribution")
);

hashTable.insert("Ola", "Value for Ola");
//Update of vale in existing key
hashTable.insert("Ola", "NEW value for Ola");
hashTable.insert("Ala", "Value for Ala");
hashTable.insert("Pola", "Value for Pola");
hashTable.insert("LongerStringToTestUniformDistribution", "A long value");

console.log("Fetching for values via key:");
console.log(hashTable.get("Ola")); // Output: NEW value for Ola
console.log(hashTable.get("Ala")); // Output: Value for Ala
console.log(hashTable.get("Pola")); // Output: Value for Pola
console.log(hashTable.get("LongerStringToTestUniformDistribution")); // Output: A long value

console.log("Removing a value via key:");
hashTable.delete("Ala");
console.log(hashTable.get("Ala")); // Output: undefined

//Collision test by forcing it in simplified hash function
const collisionHashTable = new CustomHashTable();

console.log(`Hash codes created with simple hash function to force collision`);
console.log(collisionHashTable.simpleHashFunction("crash1", "1"));
console.log(collisionHashTable.simpleHashFunction("crash2", "2"));
console.log(collisionHashTable.simpleHashFunction("crash3", "3"));

collisionHashTable.insertCollisionTest("crash1", "1");
collisionHashTable.insertCollisionTest("crash2", "2");
collisionHashTable.insertCollisionTest("crash3", "3");

//All nodes should be stored in index 6 of linked list since hash code for all is 6
console.log(collisionHashTable.buckets[6]);
