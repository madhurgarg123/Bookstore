# Bookstore
# Book Management API

This is a simple book management API built with Node.js and Express.js, using MongoDB with Mongoose for data storage. It supports user authentication via JWT (JSON Web Tokens), and allows for CRUD operations on book entries with filtering capabilities by author and publication year.

 
Register a new user: POST /api/users/register
Login to get a JWT token: POST /api/users/login
Create a book (requires JWT token in headers): POST /api/books
Get books or filter by author/publication year: GET /api/books
Update a book: PUT /api/books/:id
Delete a book: DELETE /api/books/:id
