
# SimpleBookShelf

It is a simple project which adds books to table and removes it to view the hole database using mysql.
Moreover, it's practice for ddos attack by using express-rate-limit library
which limits the user by only 100 request ony.
## Deployment

The libraries used are express, socketio, body-parser, express-rate-limit & mysql2.

Installing libraries project run

```bash
  npm install express
  npm install body-parser
  npm install express-rate-limit
  npm install mysql2
  npm install socketio
```
Run in terminal
```
nodemon server.js
```

### Notes
Before running the code create database & table, as in the code the database "library" and the table "shelf".

```bash
CREATE DATABASE library;
```
```bash
CREATE TABLE library.shelf (
    BookID INT NOT NULL AUTO_INCREMENT,
    BookName varchar(255) NOT NULL,
    Author varchar(255),
    PRIMARY KEY (Bookid)
);
ALTER TABLE library.shelf AUTO_INCREMENT=1200;
```
