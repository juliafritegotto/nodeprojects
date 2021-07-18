const express = require('express');
const mysql = require('mysql');


//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodemysql'
});


//Connect 
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Mysql connected');

});

const app = express();

//Create table 
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE post (id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created');
    });
});

//Insert post
app.get('/addpost1', (req, res) => {
    let post = { title: 'Post one', body: 'This is post number one' };
    let sql = 'INSERT INTO post SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post one add');
    });
});

//Insert post
app.get('/addpost2', (req, res) => {
    let post = { title: 'Post two', body: 'This is post number two' };
    let sql = 'INSERT INTO post SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post two add');
    });
});

//Select 
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM post';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('Post fetched');
    });
});


//Select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM post WHERE id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post fetched');
    });
});

//Update post
app.get('/getupdate/:id', (req, res) => {
    let newTitle = 'Update Title'
    let sql = `UPDATE post SET title = '${newTitle}' WHERE id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post updated');
    });
});

//Delete post

app.get('/deletepost/:id', (req, res) => {

    let sql = `DELETE FROM post WHERE id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post deleted');
    });
});

//Create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});