var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

io.on('connection', function(socket) {
    console.log('Log View Connected!');
    io.emit('message', {msg: 'Welcome!'});
    app.post('/logServer', function(req, res) {
        var data = req.body;
        io.emit('message', data);
        res.send('Complete');
    });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/html/index.html');
});

app.get('/bower_components/*', function(req, res) {
    res.sendFile(__dirname + req.originalUrl);
});

http.listen(9999, function() {
    console.log('Server running on 9999');
});
