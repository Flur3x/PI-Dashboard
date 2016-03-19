var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server, null);

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public' + '/charts/dashboard.html');
});

io.on('connection', function(client) {
    function readSensor() {
        var temperature = (Math.random() * 15) + 9;
        console.log('Sensor data: ' + temperature);
        client.emit('data', temperature);
    }

    var interval = setInterval(readSensor, 1000);

    client.on('join', function(data) {
        console.log('Client connected: ' + data);
    });

    client.on('disconnect', function() {
        console.log('Client has disconnected.');
        clearInterval(interval);
    });
});

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port') + '\nLaunch http://localhost:' + app.get('port'));
});