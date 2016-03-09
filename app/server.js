var express = require('express'),
    app = express(),
    http = require("http"),
    fs = require("fs"),
    port = 3000,
    entrypoint = __dirname + "/public/charts/dashboard.html";

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(entrypoint);
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!\nLaunch http://localhost:' + port);
});