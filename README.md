<h1 align="center">Cinema backend</h1>

## Overview

This is an Express / MongoDB backend for a cinema app.

## Features

- Login using JWT
- Protected routes
- Multiple models including user, movie, projection, cart, and review
- Error handling and much more

## Getting Started

### Prerequisites

- Node.js LTS version (v20 or above)
- A non-relational database MongoDB (locally installed MongoDB Compass or MongoDB Atlas in Cloud)

### Installation

1. Clone the repository:
    ```sh
    git clone git@github.com:as-dev1/cinema-backend.git
    ```
2. Install node modules:
   ```sh
     npm install
   ```  
3. Create `.env` file in the root of the project, here is .env file example:
   ```
     PORT = 5000
     MONGO_URI = mongodb://localhost:27017/your_db
     JWT_SECRET = your_secret     
    ```
    
## Running the Application

Open project in preferred IDE and run project: <br/>
  ```sh
    npm run dev
  ```
