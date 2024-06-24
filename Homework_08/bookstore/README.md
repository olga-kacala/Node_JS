# Online Bookstore Simulation

## Overview

This project simulates the functioning of an online bookstore using object-oriented programming principles in JavaScript. The implementation includes classes for `Book`, `FictionBook`, `NonFictionBook`, `User`, `Cart`, and `Order`, demonstrating encapsulation, inheritance, and polymorphism.

## Project Structure

bookstore/
    classes/
        Book.js
        FictionBook.js
        NonFictionBook.js
        User.js
        Cart.js
        Order.js
    main.js
    README.md



## Classes

### Book Class

Represents individual books in the bookstore.

- Properties:
  - `title`: The title of the book.
  - `author`: The author of the book.
  - `isbn`: The ISBN number of the book.
  - `price`: The price of the book.
  - `availability`: Availability status of the book.

- Methods:
  - `getTitle()`: Returns the title of the book.
  - `setTitle(value)`: Sets the title of the book.
  - `getAuthor()`: Returns the author of the book.
  - `setAuthor(value)`: Sets the author of the book.
  - `getIsbn()`: Returns the ISBN of the book.
  - `setIsbn(value)`: Sets the ISBN of the book.
  - `getPrice()`: Returns the price of the book.
  - `setPrice(value)`: Sets the price of the book.
  - `getAvailability()`: Returns the availability status of the book.
  - `setAvailability(value)`: Sets the availability status of the book.
  - `isAvailable()`: Checks if the book is available.
  - `setAvailabilityStatus(status)`: Updates the availability status of the book.

### FictionBook Class

Represents a fiction book, which is a subtype of `Book`.

- Properties:
  - Inherits all properties from `Book`.
  - `genre`: The genre of the fiction book.

- Methods:
  - Inherits all methods from `Book`.

### NonFictionBook Class

Represents a non-fiction book, which is a subtype of `Book`.

- Properties:
  - Inherits all properties from `Book`.
  - `genre`: The genre of the non-fiction book.

- Methods:
  - Inherits all methods from `Book`.


### User Class

Represents users of the bookstore.

- Properties:
  - `name`: The name of the user.
  - `email`: The email address of the user.
  - `userId`: A unique user ID.

- Methods:
  - `getName()`: Returns the name of the user.
  - `setName(value)`: Sets the name of the user.
  - `getEmail()`: Returns the email of the user.
  - `setEmail(value)`: Sets the email of the user.
  - `getUserId()`: Returns the user ID.
  - `setUserId(value)`: Sets the user ID.


### Cart Class

Simulates a shopping cart for users.

- Properties:
  - `user`: The user who owns the cart.
  - `books`: Array to hold books added to the cart.

- Methods:
  - `addBook(book)`: Adds a book to the cart if it's available.
  - `removeBook(isbn)`: Removes a book from the cart based on its ISBN.
  - `calculateTotal()`: Calculates the total price of the books in the cart.

### Order Class

Represents a user's order.

- Properties:
  - `user`: The user who placed the order.
  - `books`: Books included in the order.
  - `totalPrice`: Total cost of the order.

- Methods:
  - `calculateTotal()`: Calculates the total price of the order.


## Demonstration

- Multiple `Book`, `FictionBook`, `NonFictionBook`, and `User` objects are created.
- Users add books to their carts.
- Users place orders.
- Interactions between users, carts, and orders are demonstrated, showing how encapsulation, inheritance, and polymorphism are utilized.
