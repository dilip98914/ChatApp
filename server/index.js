var app=require('http').createServer();
var io=module.exports.io=require('socket.io')(app);

const PORT=process.env.PORT || 3231;
users=[]
connections=[]
userMessages=[]


io.on('connection',function(socket){
	//handle connection

	//handle disconnect
	socket.on('disconnect',(data)=>{
		console.log('Disconnected: %s sockets connected',connections.length);
	});

	//set username
	socket.on('send-username',(object)=>{
		connections.push(socket);
		users.push({
			username:object.username,
			socketId:object.id
		});

		socket.on('send-message',(messageObj)=>{
			userMessages.push({
				id:socket.id,
				username:object.username,
				message:messageObj.message
			});
			console.log(userMessages);
			socket.emit('get-chat',{userMessages});
		});
		// socket.emit('get-users',{
		// 	users:users
		// });

	});
	

});


app.listen(PORT,()=>{
	console.log('connected to port:'+PORT);
});