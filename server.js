const mysql = require('mysql2');
const express = require('express');
const path=require('path');
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");

const port = 3000;

const app = express();


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later"
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(limiter);


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '****',
    database: 'library'
});

connection.connect();

connection.query('SELECT * FROM shelf',
    function(err, rows, fields) {
        if (!err)
            console.log('The solution is: ', rows);
            else
            console.log('Error while performing Query.', err);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.post('/add', (req, res)=>{
    connection.query('INSERT INTO shelf (BookName, Author) VALUES (?, ?)' , [req.body.book_name, req.body.author],
        (err)=>{
            if (err) {
                return console.log(err.message);
            }
        });
    res.sendFile("add.html",{root: __dirname });

});

app.post('/delete',(req,res)=>{
    connection.query('DELETE FROM shelf WHERE BookName=?', req.body.delete_book_name,
        (err)=>{
        if (err) {
            return console.log(err.message);
            res.send("The entered book name is not available!")
        }else{
        res.sendFile("delete.html",{root: __dirname });}
    });

});

app.post('/view', (req, res)=>{
    connection.query('SELECT * FROM shelf', (err,row)=>{
        if(err){
            return console.log(err.message);
        }
        res.send(row);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
