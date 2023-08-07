const express = require('express');
const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

//connect to mysql database
db.connect(err => {
    if(err) {
        throw err;
    }
    console.log('connect to mysql database successfully');
})

const app = express();

//create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send("Database created successfully");
    });
});

//create table
app.get('/createemployee', (req, res) => {
    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send("Table created successfully");
    })
})

//Insert employee
app.get('/insertemployee', (req, res) => {
    let post = {
        name: 'Employee 1',
        designation : 'CFO'
    }
    let sql = 'INSERT INTO employee SET ?'
    db.query(sql, post, err =>{
        if(err) {
            throw err;
        }
        res.send("employee added successfully");
    })
})

//select employee
app.get('/getemployee', (req,res) => {
    let sql = 'SELECT * from employee'
    db.query(sql, (err, results) =>{
        if(err) {
            throw err;
        }
        console.log(results);
        res.send("employee details fetched successfully");
    })
});

app.get('/updateemployee/:id', (req,res)=>{
    let newName = 'Updated Name'
    let sql = `Update employee SET name = '${newName}' where id = ${req.params.id}`
    let query = db.query(sql, (err) =>{
        if(err) {
            throw err;
        }
        res.send('Employee Updated successfully'); 
    })
})

app.get('/deleteemployee/:id', (req,res)=>{
    let sql = `DELETE FROM employee where id = ${req.params.id}`
    let query = db.query(sql, (err) =>{
        if(err) {
            throw err;
        }
        res.send('Employee DELETED successfully'); 
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000');
});