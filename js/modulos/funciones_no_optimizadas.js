var socket = io.connect()
var message = document.getElementById('message')
var chat = document.getElementById('chat')
var chatPanel = document.getElementById('chatPanel')
var usuario = 'Anonimo'
//var permiso = false

// Agregar usuario
socket.on('connect', function(){
	if(usuario == '') usuario = 'Anonimo'
	document.getElementById('aviso').remove()
	socket.emit('addUser', usuario, this.socket.sessionid)
	$(chatPanel).show()
})


function keyPress(e){
	if(e.which == 13 || e.keyCode == 13)
	{
		socket.emit('sendChat', message.value)
		message.value = ''
	}
}


/*function nombre_usuario(usuario)
{
	if(permiso)
	{
		usuario = usuario
		socket.emit('addUser', usuario, this.socket.sessionid)
		$(chatPanel).show()
	}
	//else setTimeout(function llamar_nombre_usuario(){ nombre_usuario(usuario) }, 1000)
}*/