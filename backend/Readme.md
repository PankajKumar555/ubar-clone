# Backend API Documentation

## Endpoints

### POST /users/register

#### Description

This endpoint is used to register a new user.

#### Request Body

The request body should be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters (required)
  - `lastname`: A string with a minimum length of 3 characters (optional)
- `email`: A valid email address (required)
- `password`: A string with a minimum length of 6 characters (required)

Example:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- `201 Created`: The user was successfully registered.
  - Body: A JSON object containing the authentication token and user details.
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```
- `400 Bad Request`: The request body is invalid or missing required fields.
  - Body: A JSON object containing the validation errors.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Example Request

```sh
curl -X POST http://localhost:4000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

#### Example Response

```json
{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### POST /users/login

#### Description

This endpoint is used to log in an existing user.

#### Request Body

The request body should be a JSON object containing the following fields:

- `email`: A valid email address (required)
- `password`: A string with a minimum length of 6 characters (required)

Example:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- `200 OK`: The user was successfully logged in.
  - Body: A JSON object containing the authentication token and user details.
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```
- `400 Bad Request`: The request body is invalid or missing required fields.
  - Body: A JSON object containing the validation errors.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```
- `401 Unauthorized`: The email or password is incorrect.
  - Body: A JSON object containing an error message.
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

#### Example Request

```sh
curl -X POST http://localhost:4000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

#### Example Response

```json
{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### GET /users/profile

#### Description

This endpoint is used to get the profile of the currently authenticated user.

#### Headers

- `Authorization`: A valid JWT token in the format `Bearer <token>` (required)

#### Responses

- `200 OK`: The user's profile was successfully retrieved.
  - Body: A JSON object containing the user details.
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```
- `401 Unauthorized`: The user is not authenticated.
  - Body: A JSON object containing an error message.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### Example Request

```sh
curl -X GET http://localhost:4000/users/profile \
-H "Authorization: Bearer jwt_token"
```

#### Example Response

```json
{
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### GET /users/logout

#### Description

This endpoint is used to log out the currently authenticated user.

#### Headers

- `Authorization`: A valid JWT token in the format `Bearer <token>` (required)

#### Responses

- `200 OK`: The user was successfully logged out.
  - Body: A JSON object containing a success message.
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
- `400 Bad Request`: The request is missing the token or the token format is invalid.
  - Body: A JSON object containing an error message.
  ```json
  {
    "message": "No token provided"
  }
  ```
- `401 Unauthorized`: The user is not authenticated or the token is blacklisted.
  - Body: A JSON object containing an error message.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### Example Request

```sh
curl -X GET http://localhost:4000/users/logout \
-H "Authorization: Bearer jwt_token"
```

#### Example Response

```json
{
  "message": "Logged out successfully"
}
```
