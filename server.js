var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('Korisnik konektovan kroz socket.io!');

	socket.on('message', function (message) {
		console.log('Primljena poruka: ' + message.text);

		io.emit('message', message);
	});

	socket.emit('message', {
		text: 'Dobrodosli na chat!'
	});
});

http.listen(PORT, function() {
	console.log("Server pokrenut!");
});