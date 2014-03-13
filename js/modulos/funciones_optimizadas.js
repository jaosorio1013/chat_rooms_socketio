require(
	[
		'jquery'
	], //estamos cargando los modulos necesarios para esta seccion
	function($)
	{
		var socket = io.connect()
		var message = document.getElementById('message')
		var chat = document.getElementById('chat')
		var chatPanel = document.getElementById('chatPanel')


		// Agregar usuario
		/*socket.on('connect', function(){
			var usuario = prompt("Tu usuario")
			if(usuario == '') usuario = 'Anonimo'
			//alert(client.id)
			socket.emit('addUser', usuario, this.socket.sessionid)
			$(chatPanel).show()

			alerta()
		})*/


		// Envio de mensaje
		/*function sendMessage(){
			socket.emit('sendChat', message.value)
			message.value = ''
		}*/


		socket.on('updateChat', function(userid, username, data){
			if(username == 'SERVER')
			{
				chat.innerHTML = chat.innerHTML + '<p><small>(' + hora() + ')</small> ' + data + '</p>'
			}
			else
			{
				//alert(userid + ' = ' + this.socket.sessionid + ' - ' + username + ' - ' + data)
				if(userid == this.socket.sessionid)
				{
					chat.innerHTML = chat.innerHTML + '<p class="usuario">' + '<small>(' + hora() + ')</small> ' + data + '</p>'
					// chat.innerHTML = chat.innerHTML + '<p class="usuario">' + '<b><small>(' + hora() + ')</small> ' + username + ':</b> ' + data + '</p>'
				}
				else
				{
					chat.innerHTML = chat.innerHTML + '<p class="invitado">' + '<small>(' + hora() + ')</small> ' + data + '</p>'
					// chat.innerHTML = chat.innerHTML + '<p class="invitado">' + '<b><small>(' + hora() + ')</small> ' + username + ':</b> ' + data + '</p>'
				}
			}
		})



		function hora(){
			var fecha = new Date()
			var hora = fecha.getHours()
			var minuto = fecha.getMinutes()
			var segundo = fecha.getSeconds()
			if (hora < 10) {hora = "0" + hora}
			if (minuto < 10) {minuto = "0" + minuto}
			if (segundo < 10) {segundo = "0" + segundo}
			var horita = hora + ":" + minuto// + ":" + segundo
			//var horita = hora + ":" + minuto + ":" + segundo
			return horita
		}
	}
);