// Create web server
// Set up the express server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set up the port
var port = process.env.PORT || 3000;

// Set up the server
var server = app.listen(port, function(){
    console.log('Server is running on port ' + port);
});

// Set up the route
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/comments', function(req, res){
    res.sendFile(__dirname + '/comments.json');
});

app.post('/comments', function(req, res){
    var comment = req.body;
    var comments = JSON.parse(fs.readFileSync(__dirname + '/comments.json'));
    comments.push(comment);
    fs.writeFileSync(__dirname + '/comments.json', JSON.stringify(comments));
    res.sendFile(__dirname + '/comments.json');
});
