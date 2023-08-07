var express = require('express');
var app = express();

// app.get('/', function(req, res){
//     res.send('Welcome');
// });

app.use(express.json());
app.use(express.urlencoded({ extended   : false }));

app.use('/api/users', require('./routes/api/user'));



var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('server listening to ',host, port);
});