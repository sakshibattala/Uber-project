# Backend API Documentation

## Endpoint: `/users/register`

### Description
The `/users/register` endpoint is used to register a new user in the system. It validates the input data, hashes the user's password, stores the user in the database, and generates a JWT token for authentication.

---

### HTTP Method
`POST`

---

### Request Headers
- `Content-Type: application/json`

---

### Request Body
The request body should be in JSON format and include the following fields:

| Field               | Type   | Required | Validation                                   |
|---------------------|--------|----------|---------------------------------------------|
| `fullname.firstname`| String | Yes      | Minimum 3 characters                        |
| `fullname.lastname` | String | No       | Minimum 3 characters (if provided)          |
| `email`             | String | Yes      | Must be a valid email format                |
| `password`          | String | Yes      | Minimum 6 characters                        |

#### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "securepassword123"
}
```

---

### Response

#### Success Response (201 Created)
If the user is successfully registered, the server will respond with the following:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  }
}
```
---

### How It Works

1. **Validation**:  
   The input data is validated using `express-validator` middleware in the `user.routes.js` file.  
   - Email must be valid.
   - First name must be at least 3 characters long.
   - Password must be at least 6 characters long.

2. **Controller**:  
   The `registerUser` function in `user.controller.js` handles the request:
   - Checks for validation errors.
   - Hashes the password using bcrypt.
   - Calls the `createUser` service to save the user in the database.
   - Generates a JWT token for the user.

3. **Service**:  
   The `createUser` function in `user.service.js` handles the business logic:
   - Validates required fields.
   - Creates a new user in the MongoDB database.

4. **Model**:  
   The `user.model.js` file defines the MongoDB schema and includes methods for:
   - Hashing passwords.
   - Generating JWT tokens.

--- 

### Notes
- Ensure the `JWT_SECRET_KEY` is set in the `.env` file for token generation.
- The `email` field must be unique in the database.
- Passwords are hashed before being stored in the database for security.

---

## Endpoint: `/users/login`

### Description
The `/users/login` endpoint is used to authenticate an existing user. It validates the input data, checks the user's credentials, and generates a JWT token upon successful authentication.

---

### HTTP Method
`POST`

---

### Request Headers
- `Content-Type: application/json`

---

### Request Body
The request body should be in JSON format and include the following fields:

| Field      | Type   | Required | Validation                                   |
|------------|--------|----------|---------------------------------------------|
| `email`    | String | Yes      | Must be a valid email format                |
| `password` | String | Yes      | Minimum 6 characters                        |

#### Example Request Body
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

---

### Response

#### Success Response (200 OK)
If the user is successfully authenticated, the server will respond with the following:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  }
}
```
---

### How It Works

1. **Validation**:  
   The input data is validated using `express-validator` middleware in the `user.routes.js` file.  
   - Email must be valid.
   - Password must be at least 6 characters long.

2. **Controller**:  
   The `loginUser` function in `user.controller.js` handles the request:
   - Checks for validation errors.
   - Finds the user in the database by email.
   - Compares the provided password with the hashed password in the database using bcrypt.
   - Generates a JWT token for the user upon successful authentication.

3. **Model**:  
   The `user.model.js` file defines the MongoDB schema and includes methods for:
   - Comparing passwords (`comparePassword`).
   - Generating JWT tokens (`generateToken`).

---

### Notes
- Ensure the `JWT_SECRET_KEY` is set in the `.env` file for token generation.
- Passwords are hashed and stored securely in the database.
- The `email` field must exist in the database for successful authentication.
