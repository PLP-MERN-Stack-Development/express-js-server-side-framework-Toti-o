

# Product API

A simple RESTful API built with **Express.js** for managing products.
It lets you view, add, update, and delete items while applying key middleware like authentication, validation, and request logging.

---

## Overview

This project demonstrates basic **CRUD operations** in Node.js using Express.
It also includes examples of **custom middleware** for authentication, logging, validation, and error handling — all running in-memory without a database.



## Getting Started

**1. Install dependencies**

```bash
npm install express body-parser uuid
```

**2. Run the server**

```bash
node server.js
```

**3. Access the API**

```
http://localhost:3000
```

---

## Authentication

All routes under `/api/products` require an API key in the request header:

```
x-api-key: 12345
```

If missing or invalid, you’ll receive:

```json
{ "message": "Unauthorized. Invalid or missing API key." }
```

---

## Endpoints

| Method | Endpoint          | Description                |
| ------ | ----------------- | -------------------------- |
| GET    | /api/products     | Get all products           |
| GET    | /api/products/:id | Get one product by ID      |
| POST   | /api/products     | Add a new product          |
| PUT    | /api/products/:id | Update an existing product |
| DELETE | /api/products/:id | Delete a product           |



## Reflection

This project helped me understand how **middleware** works in Express and how to handle routes, validation, and authentication.
It was a good hands-on introduction to building and structuring APIs in Node.js.


