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

| Field                | Type   | Required | Validation                         |
| -------------------- | ------ | -------- | ---------------------------------- |
| `fullname.firstname` | String | Yes      | Minimum 3 characters               |
| `fullname.lastname`  | String | No       | Minimum 3 characters (if provided) |
| `email`              | String | Yes      | Must be a valid email format       |
| `password`           | String | Yes      | Minimum 6 characters               |

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

| Field      | Type   | Required | Validation                   |
| ---------- | ------ | -------- | ---------------------------- |
| `email`    | String | Yes      | Must be a valid email format |
| `password` | String | Yes      | Minimum 6 characters         |

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

---

## Endpoint: `/users/profile`

### Description

The `/users/profile` endpoint is used to retrieve the profile of the currently authenticated user. The user must provide a valid JWT token to access this endpoint.

---

### HTTP Method

`GET`

---

### Request Headers

- `Authorization: Bearer <JWT_TOKEN>` (Required)

---

### Response

#### Success Response (200 OK)

If the user is authenticated, the server will respond with the user's profile:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "socketId": null
}
```

---

### How It Works

1. **Authentication Middleware**:  
   The `authUser` middleware in `auth.middleware.js` verifies the JWT token:

   - Checks if the token is blacklisted.
   - Decodes the token and retrieves the user from the database.
   - Attaches the user object to the `req` object.

2. **Controller**:  
   The `getUserProfile` function in `user.controller.js` handles the request:
   - Sends the authenticated user's profile as the response.

---

## Endpoint: `/users/logout`

### Description

The `/users/logout` endpoint is used to log out the currently authenticated user. It invalidates the user's JWT token by adding it to a blacklist.

---

### HTTP Method

`GET`

---

### Request Headers

- `Authorization: Bearer <JWT_TOKEN>` (Required)

---

### Response

#### Success Response (200 OK)

If the user is successfully logged out, the server will respond with:

```json
{
  "message": "Logged out"
}
```

---

#### Error Responses

1. **Unauthorized (401 Unauthorized)**  
   If the user is not authenticated or the token is invalid, the server will respond with:

   ```json
   {
     "message": "Unauthorized"
   }
   ```

---

### How It Works

1. **Authentication Middleware**:  
   The `authUser` middleware in `auth.middleware.js` verifies the JWT token:

   - Checks if the token is blacklisted.
   - Decodes the token and retrieves the user from the database.

2. **Controller**:  
   The `logoutUser` function in `user.controller.js` handles the request:
   - Adds the token to the blacklist by saving it in the `blackListToken` collection.
   - Clears the `token` cookie (if present).
   - Sends a success response.

---

### Notes

- Ensure the `JWT_SECRET_KEY` is set in the `.env` file for token verification.
- Blacklisted tokens are stored in the `blackListToken` collection to prevent reuse.
- The `Authorization` header must contain a valid JWT token for both `/users/profile` and `/users/logout` endpoints.

---

## Endpoint: `/captains/register`

### Description

The `/captains/register` endpoint is used to register a new captain in the system. It validates the input data, hashes the captain's password, stores the captain in the database, and generates a JWT token for authentication.

---

### HTTP Method

`POST`

---

### Request Headers

- `Content-Type: application/json`

---

### Request Body

The request body should be in JSON format and include the following fields:

| Field                 | Type   | Required | Validation                                 |
| --------------------- | ------ | -------- | ------------------------------------------ |
| `fullname.firstname`  | String | Yes      | Minimum 3 characters                       |
| `fullname.lastname`   | String | No       | Minimum 3 characters (if provided)         |
| `email`               | String | Yes      | Must be a valid email format               |
| `password`            | String | Yes      | Minimum 6 characters                       |
| `vehicle.color`       | String | Yes      | Minimum 3 characters                       |
| `vehicle.capacity`    | Number | Yes      | Must be at least 1                         |
| `vehicle.vehicleType` | String | Yes      | Must be one of `car`, `motorcycle`, `auto` |
| `vehicle.plate`       | String | Yes      | Minimum 3 characters                       |

#### Example Request Body

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane@example.com",
  "password": "securepassword123",
  "vehicle": {
    "color": "Red",
    "capacity": 4,
    "vehicleType": "car",
    "plate": "ABC123"
  }
}
```

---

### Response

#### Success Response (201 Created)

If the captain is successfully registered, the server will respond with the following:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Red",
      "capacity": 4,
      "vehicleType": "car",
      "plate": "ABC123"
    },
    "socketId": null,
    "status": "inactive"
  }
}
```

---

### How It Works

1. **Validation**:  
   The input data is validated using `express-validator` middleware in the `captain.routes.js` file.

   - Email must be valid.
   - First name must be at least 3 characters long.
   - Password must be at least 6 characters long.
   - Vehicle details must meet the specified validation rules.

2. **Controller**:  
   The `registerCaptain` function in `captain.controller.js` handles the request:

   - Checks for validation errors.
   - Hashes the password using bcrypt.
   - Calls the `captainService` to save the captain in the database.
   - Generates a JWT token for the captain.

3. **Service**:  
   The `captainService` function in `captain.service.js` handles the business logic:

   - Validates required fields.
   - Creates a new captain in the MongoDB database.

4. **Model**:  
   The `captain.model.js` file defines the MongoDB schema and includes methods for:
   - Hashing passwords.
   - Generating JWT tokens.

---

## Endpoint: `/captains/login`

### Description

The `/captains/login` endpoint is used to authenticate an existing captain. It validates the input data, checks the captain's credentials, and generates a JWT token upon successful authentication.

---

### HTTP Method

`POST`

---

### Request Headers

- `Content-Type: application/json`

---

### Request Body

The request body should be in JSON format and include the following fields:

| Field      | Type   | Required | Validation                   |
| ---------- | ------ | -------- | ---------------------------- |
| `email`    | String | Yes      | Must be a valid email format |
| `password` | String | Yes      | Minimum 6 characters         |

#### Example Request Body

```json
{
  "email": "jane@example.com",
  "password": "securepassword123"
}
```

---

### Response

#### Success Response (200 OK)

If the captain is successfully authenticated, the server will respond with the following:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Red",
      "capacity": 4,
      "vehicleType": "car",
      "plate": "ABC123"
    },
    "socketId": null,
    "status": "inactive"
  }
}
```

---

## Endpoint: `/captains/profile`

### Description

The `/captains/profile` endpoint is used to retrieve the profile of the currently authenticated captain. The captain must provide a valid JWT token to access this endpoint.

---

### HTTP Method

`GET`

---

### Request Headers

- `Authorization: Bearer <JWT_TOKEN>` (Required)

---

### Response

#### Success Response (200 OK)

If the captain is authenticated, the server will respond with the captain's profile:

```json
{
  "captain": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Red",
      "capacity": 4,
      "vehicleType": "car",
      "plate": "ABC123"
    },
    "socketId": null,
    "status": "inactive"
  }
}
```

---

## Endpoint: `/captains/logout`

### Description

The `/captains/logout` endpoint is used to log out the currently authenticated captain. It invalidates the captain's JWT token by adding it to a blacklist.

---

### HTTP Method

`GET`

---

### Request Headers

- `Authorization: Bearer <JWT_TOKEN>` (Required)

---

### Response

#### Success Response (200 OK)

If the captain is successfully logged out, the server will respond with:

```json
{
  "message": "Captain Logged out"
}
```

---

### Notes

- Ensure the `JWT_SECRET_KEY` is set in the `.env` file for token verification.
- Blacklisted tokens are stored in the `blackListToken` collection to prevent reuse.
- The `Authorization` header must contain a valid JWT token for all `/captains` endpoints.

---

## Endpoint: `maps/get-coordinates`

### Description

The `/get-coordinates` endpoint retrieves the latitude and longitude coordinates for a given address.

---

### HTTP Method

`GET`

---

### Request Headers

- `Authorization: Bearer <token>`

---

### Query Parameters

| Parameter | Type   | Required | Validation           |
| --------- | ------ | -------- | -------------------- |
| `address` | String | Yes      | Minimum 3 characters |

#### Example Request

```
GET /get-coordinates?address=New+York
Authorization: Bearer <token>
```

---

### Response

#### Success Response (200 OK)

```json
{
  "lat": 40.7128,
  "lng": -74.006
}
```

#### Error Response (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "address",
      "location": "query"
    }
  ]
}
```

---

## Endpoint: `maps/get-distance-time`

### Description

The `maps/get-distance-time` endpoint calculates the distance and estimated travel time between two addresses.

---

### HTTP Method

`GET`

---

### Request Headers

- `Authorization: Bearer <token>`

---

### Query Parameters

| Parameter     | Type   | Required | Validation           |
| ------------- | ------ | -------- | -------------------- |
| `source`      | String | Yes      | Minimum 3 characters |
| `destination` | String | Yes      | Minimum 3 characters |

#### Example Request

```
GET /get-distance-time?source=New+York&destination=Los+Angeles
Authorization: Bearer <token>
```

---

### Response

#### Success Response (200 OK)

```json
{
  "distanceInKm": "3940.07",
  "durationInMin": "2400.5"
}
```

#### Error Response (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "source",
      "location": "query"
    },
    {
      "msg": "Invalid value",
      "param": "destination",
      "location": "query"
    }
  ]
}
```

---

## Endpoint: `maps/get-suggestions`

### Description

The `maps/get-suggestions` endpoint provides address suggestions based on the input query.

---

### HTTP Method

`GET`

---

### Request Headers

- `Authorization: Bearer <token>`

---

### Query Parameters

| Parameter | Type   | Required | Validation           |
| --------- | ------ | -------- | -------------------- |
| `input`   | String | Yes      | Minimum 3 characters |

#### Example Request

```
GET /get-suggestions?input=New
Authorization: Bearer <token>
```

---

### Response

#### Success Response (200 OK)

```json
[
  {
    "id": "1",
    "name": "New York, NY, USA"
  },
  {
    "id": "2",
    "name": "Newark, NJ, USA"
  }
]
```

#### Error Response (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "input",
      "location": "query"
    }
  ]
}
```

---

## Endpoint: `/rides/create-ride`

### Description

The `/rides/create-ride` endpoint allows a user to create a new ride request by providing the pickup and destination locations, as well as the vehicle type.

---

### HTTP Method

`POST`

---

### Request Headers

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

---

### Request Body

The request body should be in JSON format and include the following fields:

| Field         | Type   | Required | Validation                                    |
| ------------- | ------ | -------- | --------------------------------------------- |
| `pickup`      | String | Yes      | Minimum 3 characters                          |
| `destination` | String | Yes      | Minimum 3 characters                          |
| `vehicleType` | String | Yes      | Must be one of `auto`, `car`, or `motorcycle` |

#### Example Request Body

```json
{
  "pickup": "New York",
  "destination": "Los Angeles",
  "vehicleType": "car"
}
```

---

### Response

#### Success Response (201 Created)

If the ride is successfully created, the server will respond with the following:

```json
{
  "ride": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "pickup": "New York",
    "destination": "Los Angeles",
    "vehicleType": "car",
    "fare": 500,
    "status": "pending",
    "otp": "123456"
  }
}
```

#### Error Response (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "pickup location must be 3 chars long",
      "param": "pickup",
      "location": "body"
    },
    {
      "msg": "destination location must be 3 chars long",
      "param": "destination",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicleType",
      "location": "body"
    }
  ]
}
```

---

### How It Works

1. **Validation**:  
   The input data is validated using `express-validator` middleware in the `ride.routes.js` file:

   - `pickup` and `destination` must be strings with a minimum length of 3 characters.
   - `vehicleType` must be one of `auto`, `car`, or `motorcycle`.

2. **Controller**:  
   The `createRide` function in `ride.controller.js` handles the request:

   - Checks for validation errors.
   - Calls the `createRide` service to create a new ride in the database.

3. **Service**:  
   The `createRide` function in `ride.service.js` handles the business logic:

   - Calculates the fare based on the distance and duration between the pickup and destination locations.
   - Generates a 6-digit OTP for the ride.
   - Saves the ride details in the database.

4. **Model**:  
   The `ride.model.js` file defines the MongoDB schema for the ride, including fields for:

   - `pickup`, `destination`, `vehicleType`, `fare`, `status`, and `otp`.

---

## Endpoint: `/rides/get-fare`

### Description

The `/rides/get-fare` endpoint calculates the estimated fare for a ride based on the pickup and destination locations.

---

### HTTP Method

`GET`

---

### Request Headers

- `Authorization: Bearer <token>`

---

### Query Parameters

| Parameter     | Type   | Required | Validation           |
| ------------- | ------ | -------- | -------------------- |
| `pickup`      | String | Yes      | Minimum 3 characters |
| `destination` | String | Yes      | Minimum 3 characters |

#### Example Request

```
GET /rides/get-fare?pickup=New+York&destination=Los+Angeles
Authorization: Bearer <token>
```

---

### Response

#### Success Response (200 OK)

If the fare is successfully calculated, the server will respond with the following:

```json
{
  "auto": 350,
  "car": 500,
  "motorcycle": 300
}
```

#### Error Response (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "Invalid pickup address",
      "param": "pickup",
      "location": "query"
    },
    {
      "msg": "Invalid destination address",
      "param": "destination",
      "location": "query"
    }
  ]
}
```

---

### How It Works

1. **Validation**:  
   The input data is validated using `express-validator` middleware in the `ride.routes.js` file:

   - `pickup` and `destination` must be strings with a minimum length of 3 characters.

2. **Controller**:  
   The `getFare` function in `ride.controller.js` handles the request:

   - Checks for validation errors.
   - Calls the `getFare` service to calculate the estimated fare.

3. **Service**:  
   The `getFare` function in `ride.service.js` handles the business logic:

   - Retrieves the distance and duration between the pickup and destination locations using the Mapbox API.
   - Calculates the fare based on the distance, duration, and vehicle type.

---
