
# Node.JS Book Store REST API 
A simple Book Store api with Node.JS, Express JS and MongoDB.


## Build With
* Node.js
* Express
* MongoDB
* Mongoose (ODM)
* joi (input validation)
* jsonwebtoken
* bcryptjs

## Documantation
[Postman doc](https://web.postman.co/workspace/Abdelaziz-Ashraf~23eae229-5d76-48fd-898d-cb65407c37cb/request/24964434-d0e9dd3e-db7a-424e-bad9-748230542758)

## Models

**User**
```
email: {String, required, unique, trim, minlength:5, maxlength:100}
username: {String, required ,trim ,minlength: 2 ,maxlength: 200}
password: {String, required, trim, minlength: 6}
isAdmin: {Boolean, default: false}
```

**Author**
```
firstName: {String, required, trim, minlength: 3, maxlength: 200}
lastName: {String, required, trim, minlength: 3, maxlength: 200}
nationality: {String, required, trim, minlength: 2 maxlength: 100 }
image: {String, default: "default-avatar.png"}
```

**Book**
```
title: {String, required, trim, minlength: 3, maxlength: 250}
author: {mongoose.Schema.Types.ObjectId, required,ref: "author"}
description: {String, required, trim, minlength: 5}
price: {Number, required, min: 0}
cover: {String, required, ["soft cover", "hard cover"]}
```

## Routes 
**[ Auth => /api/auth ]**
```
POST: '/register' = Register    (with JSON)

POST: '/login' = Login          (with JSON)
```

**[ User => /api/users ]**
```
GET: '/' = Get All Users

GET: '/:id' = Get User By id

PUT: '/:id' = Update User       (with JSON)

DEL: '/:id' = Delete User
```

**[ Author => /api/authors ]**
```
GET: '/' = Get All Authors

GET: '/:id' = Get Author by id

POST: '/' = Create new author       (with JSON)

PUT: '/:id' = Update author         (with JSON)

DEL: '/:id' = Delete Author
```

**[ Book => /api/books ]**
``` 
GET: '/' = Get All Books

GET: '/:id' = Get Book By Id

POST: '/' = Create New Book       (with JSON)

Put: '/:id' = Update a Book       (with JSON)

DEL: '/:id' = Delete a Book
```
