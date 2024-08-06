# Byte Wars: AI vs Humans Documentation

In _Byte Wars: AI vs Humans_ 🤖, players engage in a whimsical conflict between artificial intelligence and humanity. Whether you choose to command advanced technology or lead the quirky human resistance, this game offers a strategic showdown in a digital battleground. Will you outwit the algorithms or rely on classic human ingenuity to win? Dive into this pixelated adventure where the fate of the digital realm is at stake! 🎮💥

## Contents

- [Byte Wars: AI vs Humans Documentation](#byte-wars-ai-vs-humans-documentation)
  - [Contents](#contents)
  - [Description](#description)
  - [Technical Requirements](#technical-requirements)
    - [Technologies Used](#technologies-used)
    - [Development Tools](#development-tools)
  - [API Documentation](#api-documentation)
    - [Endpoints](#endpoints)
  - [Database Schema](#database-schema)
    - [Users Table](#users-table)
    - [Games Table](#games-table)
    - [Schema Notes](#schema-notes)
    - [Clone this repo with command](#clone-this-repo-with-command)
    - [Go to project folder](#go-to-project-folder)
  - [Install](#install)
    - [Install dependencies](#install-dependencies)
  - [Running the Application](#running-the-application)
    - [Run in Docker Container](#run-in-docker-container)

## Description

_Byte Wars: AI vs Humans_ is a strategic game where a human player battles against an AI opponent. Players can choose to be either human or robot, each with unique characters and abilities. The game involves drawing cards with varying attributes to perform attacks and utilize special abilities. The goal is to defeat the opponent by strategically managing health points and maximizing attack power.

## Technical Requirements

### Technologies Used

        - **Frontend:** React.js
        - **Backend:** Node.js
        - **Database:** PostgreSQL
        - **Containerization:** Docker

### Development Tools

      - **IDE:** Visual Studio Code
      - **Version Control:** Git

    ### Base URL

    The base URL for API endpoints is `http://localhost:3000/api/v1`.

## API Documentation

### Endpoints

1. **Register User**

   - **URL:** `/register`
   - **Method:** POST
   - **Headers:**
     - `Content-Type: application/json`
   - **Body:**
     {
     "username": "string",
     "password": "string"
     }
   - **Response:**
     {
     "message": "User registered successfully"
     }

2. **Login User**

   - **URL:** `/login`
   - **Method:** POST
   - **Headers:**
     - `Content-Type: application/json`
   - **Body:**
     {
     "username": "string",
     "password": "string"
     }
   - **Response:**
     {
     "token": "string"
     }

3. **Start Game**

   - **URL:** `/startGame`
   - **Method:** POST
   - **Headers:**
     - `Content-Type: application/json`
     - `Authorization: Bearer [token]`
   - **Body:**
     {
     "side": "human" or "robot"
     }
   - **Response:**
     {
     "gameId": "string",
     "status": "string"
     }

4. **Attack Move**

   - **URL:** `/attack`
   - **Method:** POST
   - **Headers:**
     - `Content-Type: application/json`
     - `Authorization: Bearer [token]`
   - **Body:**
     {
     "gameId": "string",
     "attackHP": "number"
     }
   - **Response:**
     {
     "attackHP": "number",
     "opponentAttackPower": "number",
     "userHealth": "number",
     "opponentHealth": "number",
     "gameStatus": "string"
     }

5. **Save Total Attack**

   - **URL:** `/saveAttack`
   - **Method:** POST
   - **Headers:**
     - `Content-Type: application/json`
     - `Authorization: Bearer [token]`
   - **Body:**
     {
     "gameId": "string",
     "totalAttack": "number",
     "gameStatus": "string"
     }
   - **Response:**
     {
     "message": "Total attack saved successfully"
     }

6. **Get Top Results**

   - **URL:** `/topResults`
   - **Method:** GET
   - **Response:**
     [
     {
     "totalAttack": "number",
     "side": "string"
     }
     ]

7. **Delete All Users**

   - **URL:** `/deleteUsers`
   - **Method:** DELETE
   - **Headers:**
     - `Authorization: Bearer [token]`
   - **Response:**
     {
     "message": "All users deleted successfully"
     }

8. **Delete All Games**
   - **URL:** `/deleteGames`
   - **Method:** DELETE
   - **Headers:**
     - `Authorization: Bearer [token]`
   - **Response:**
     {
     "message": "All games deleted successfully"
     }

## Database Schema

### Users Table

- **id:** INTEGER, PRIMARY KEY, AUTOINCREMENT
  - The unique identifier for each user. Auto-incremented.
- **username:** TEXT, NOT NULL, UNIQUE
  - The username of the user. Must be unique.
- **password:** TEXT, NOT NULL
  - The hashed password of the user.

### Games Table

- **gameId:** TEXT, PRIMARY KEY
  - The unique identifier for each game.
- **status:** TEXT
  - The status of the game (e.g., "ongoing", "won", "lost").
- **side:** TEXT
  - The side chosen by the user (e.g., "human", "robot").
- **turn:** INTEGER
  - The current turn number in the game.
- **userHealth:** INTEGER
  - The current health of the user.
- **opponentHealth:** INTEGER
  - The current health of the opponent.
- **attackHP:** INTEGER
  - The attack power used in the most recent move.
- **totalAttack:** INTEGER, DEFAULT 0
  - The total attack power accumulated over the course of the game. Defaults to 0.

### Schema Notes

- **Users Table:**

  - The `id` column is an auto-incrementing primary key that uniquely identifies each user.
  - The `username` column is unique and required.
  - The `password` column stores the user's hashed password.

- **Games Table:**
  - The `gameId` serves as a unique identifier for each game session.
  - The `status` column indicates the current state of the game.
  - The `side` column tracks whether the player is on the "human" or "robot" side.
  - The `turn` column keeps track of the current turn in the game.
  - The `userHealth` and `opponentHealth` columns track the health status of the user and the opponent, respectively.
  - The `attackHP` column records the attack power used in the last move.
  - The `totalAttack` column accumulates the total attack power across the game.

### Clone this repo with command

git clone <https://github.com/.......>

### Go to project folder

cd BytWars

## Install

### Install dependencies

npm install

## Running the Application

### Run in Docker Container

To run the application in a Docker container, ensure you have Docker installed on your system. Use the following commands:

**Start the application:**
docker compose up

**Stop the application:**
docker compose down
