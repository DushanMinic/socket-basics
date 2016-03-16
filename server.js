var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('Korisnik konektovan kroz socket.io!');

	socket.on('message', function (message) {
		console.log('Primljena poruka: ' + message.text);

		message.timestamp = moment().valueOf();
		io.emit('message', message);
	});

	//timestamp property - JavaScript timestamp(miliseconds), valueOf

	socket.emit('message', {
		name: 'System',
		text: 'Dobrodosli na chat!',
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function() {
	console.log("Server pokrenut!");
});