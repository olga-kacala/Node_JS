const FictionBook = require('./classes/FictionBook');
const NonFictionBook = require('./classes/NonFictionBook');
const User = require('./classes/User');
const Cart = require('./classes/Cart');
const Order = require('./classes/Order');

// Create FictionBook and NonFictionBook objects
const fictionBook1 = new FictionBook('The Great Gatsby', 'F. Scott Fitzgerald', '1234567890', 10.99, true, 'Classic');
const fictionBook2 = new FictionBook('To Kill a Mockingbird', 'Harper Lee', '0987654321', 8.99, true, 'Historical');
const nonFictionBook1 = new NonFictionBook('Sapiens', 'Yuval Noah Harari', '1122334455', 15.99, true, 'History');
const nonFictionBook2 = new NonFictionBook('Educated', 'Tara Westover', '2233445566', 12.99, true, 'Memoir');

// Create User objects
const user1 = new User('Alice', 'alice@example.com', 1);
const user2 = new User('Bob', 'bob@example.com', 2);

// Simulate users adding books to their cart
const cart1 = new Cart(user1);
cart1.addBook(fictionBook1); // The Great Gatsby has been added to the cart.
cart1.addBook(nonFictionBook1); // Sapiens has been added to the cart.

console.log(`Total price for ${user1.getName()}'s cart: $${cart1.calculateTotal()}`); // Total price for Alice's cart: $26.98

// Place an order
const order1 = new Order(user1, cart1.getBooks());
console.log(`Order placed by ${order1.getUser().getName()} for a total of $${order1.getTotalPrice()}`); // Order placed by Alice for a total of $26.98

// Simulate another user interaction
const cart2 = new Cart(user2);
cart2.addBook(fictionBook2); // To Kill a Mockingbird has been added to the cart.
cart2.addBook(nonFictionBook2); // Educated has been added to the cart.

console.log(`Total price for ${user2.getName()}'s cart: $${cart2.calculateTotal()}`); // Total price for Bob's cart: $21.98

const order2 = new Order(user2, cart2.getBooks());
console.log(`Order placed by ${order2.getUser().getName()} for a total of $${order2.getTotalPrice()}`); // Order placed by Bob for a total of $21.98
