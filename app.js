var express = require('express')
var app = express()
var port = process.env.PORT || 5000
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
var usernames = {}
var userids = {}
var room_name = ''


// Ejecusion del servidro
server.listen(port, function(){
	console.log('Ejecutandose en el puerto: ' + port)
})


// Emision de la vista
app.get('/css/:css', function(req, res){
	res.sendfile(__dirname + '/css/' + req.params.css)
})

app.get('/js/:js', function(req, res){
	res.sendfile(__dirname + '/js/' + req.params.js)
})

app.get('/img/:img', function(req, res){
	res.sendfile(__dirname + '/img/' + req.params.img)
})

app.get('/', function(req, res){
	room_name = 'Lovy'
	res.sendfile(__dirname + '/index.html')
})

app.get('/room/:room_name', function(req, res){
	room_name = req.params.room_name
	res.sendfile(__dirname + '/index.html')
})

// Conexion de los sockets
io.sockets.on('connection', function(socket){
	// Agregar al una Room Aleatoria
	socket.room = room_name
	/*socket.join('Lovy')
	socket.leave('Lovy')*/
	socket.join(socket.room)
	console.log('room_name ' + socket.room)

	// Cuando el cliente emite sendChat
	socket.on('sendChat', function(data){
		// Le decimos al cliente que ejecute updateChat con 2 parametros
		io.sockets['in'](socket.room).emit('updateChat', socket.userid, socket.username, data)
	})


	// Cuando el cliente emite addUser
	socket.on('addUser', function(username, userid){
		// Guardamos el username en la sesion para este cliente
		//socket.username = username
		socket.userid = userid
		// Agregamos el username del cliente a la lista global
		//usernames[username] = username
		usernames[userid] = userid
		// Le decimos al cliente que esta conectado
		socket.emit('updateChat', socket.userid, 'SERVER', 'Estas conectado')
		// Le decimos a todos los clientes que un nuevo miembro esta conectado
			// socket.broadcast.to(socket.room).emit('updateChat', socket.userid, 'SERVER', username + ' se ha conectado')
		// Actualizamos la lista de usuarios en el chat, por el lado del cliente
		io.sockets.emit('updateUsers', socket.userid, usernames)
	})


	// Cuando el cliente se desconecta
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		//delete usernames[socket.username]
		delete userids[socket.userid]
		// update list of users in chat, client-side
		io.sockets.emit('updateUsers', socket.userid, usernames)
		// echo globally that this client has left
		// socket.broadcast.emit('updateChat', socket.userid, 'SERVER', socket.username + ' se ha desconectado')
		// Retirarse de la sala
		socket.leave(socket.room)
	})
})




function randomstring(L){
	var s = '';
	var randomchar = function(){
		var n= Math.floor(Math.random()*62);
		if(n<10) return n; //1-10
		if(n<36) return String.fromCharCode(n+55); //A-Z
		return String.fromCharCode(n+61); //a-z
	}

	while(s.length< L) s += randomchar();
	return s;
}










/*var usernames = {};

var rooms = ['Lobby'];

io.sockets.on('connection', function(socket) {
	socket.on('adduser', function(username) {
		socket.username = username;
		socket.room = 'Lobby';
		usernames[username] = username;
		socket.join('Lobby');
		socket.emit('updatechat', 'SERVER', 'you have connected to Lobby');
		socket.broadcast.to('Lobby').emit('updatechat', 'SERVER', username + ' has connected to this room');
		socket.emit('updaterooms', rooms, 'Lobby');
	});

	socket.on('create', function(room) {
		rooms.push(room);
		socket.emit('updaterooms', rooms, socket.room);
	});

	socket.on('sendchat', function(data) {
		io.sockets["in"](socket.room).emit('updatechat', socket.username, data);
	});

	socket.on('switchRoom', function(newroom) {
		var oldroom;
		oldroom = socket.room;
		socket.leave(socket.room);
		socket.join(newroom);
		socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
		socket.broadcast.to(oldroom).emit('updatechat', 'SERVER', socket.username + ' has left this room');
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
		socket.emit('updaterooms', rooms, newroom);
	});

	socket.on('disconnect', function() {
		delete usernames[socket.username];
		io.sockets.emit('updateusers', usernames);
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
 });*/