# Bookstore Server

This project is a Node.js application that uses Knex.js for query building and PostgreSQL as the database. It includes user authentication and book management functionality.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

### API Doc

[Link](https://documenter.getpostman.com/view/21641752/2sA3kd9cNk)

## Getting Started

### Clone the Repository

To clone the repository from GitHub, run the following command:

```
git clone git@github.com:knrbokhari/bookstore-server.git
cd bookstore-server
npm i
```

### Setup Environment Variables

Create a .env file in the root of the project and add the following environment variables:

```
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=name
DB_PORT=5432
SECRET_KEY=secretKey
```

### Migrate Database

Run the Knex migrations to set up the database schema:

```
npm run migrate
```

### Seed Database

```
npm run seed
```

### Project Structure

```
.
├── src
│ ├── controllers
│ │ └── userController.ts
│ ├── migrations
│ ├── middleware
│ │ ├── authenticateToken.ts
│ │ └── errorHandler.ts
│ ├── routes
│ │ ├── authorRoutes.ts
│ │ ├── bookRoutes.ts
│ │ ├── index.ts
│ │ └── userRoutes.ts
│ ├── services
│ │ ├── authorService.ts
│ │ ├── bookService.ts
│ │ └── userService.ts
│ ├── types
│ │ └── index.ts
│ ├── utils
│ │ ├── asyncHandler.ts
│ │ └── error.ts
│ └── validators
│ ├── index.ts
│ └── app.ts
├── .env.local
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── knexfile.ts
├── package.json
├── tsconfig.json
└── README.md
```
