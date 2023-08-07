const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', function(req, res){
    res.json({
        message: 'Welcome'
    })
});

app.post('/api/posts',verifyToken, function(req, res){

    jwt.verify(req.token, "secretkey", (err, authData) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Posts created successfully',
                authData: authData
            });
        }
    });
});

app.post('/api/login', function(req, res){
    const user = {
        id : 1,
        username: 'John',
        emial: 'john@gmail.com',
    };

    console.log('login', user);

    jwt.sign({user: user}, 'secretkey', function(err, token){
        res.json({
            token,
        });
    });
});

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken
        next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(3000, function(req, res){
    console.log('listening on port 3000');
});