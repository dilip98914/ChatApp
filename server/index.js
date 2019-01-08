var app=require('http').createServer();
var io=module.exports.io=require('socket.io')(app);

const PORT=process.env.PORT || 3231;
users=[]
connections=[]


io.on('connection',function(socket){
	//handle connection
	connections.push(socket);
	console.log('connected: %s sockets connected',connections.length);

	//handle disconnect
	socket.on('disconnect',(data)=>{
		connections.splice(connections.indexOf(socket),1);
		console.log('Disconnected: %s sockets connected',connections.length);
	});

	//handle send object
	socket.on('send object',(data)=>{
		console.log(data);
		const sample={
			username:data.username,
			message:data.message
		};
		users.push(sample);
		socket.emit('get-users',{
			users:users
		});
	});

	//handle get users
	

});


app.listen(PORT,()=>{
	console.log('connected to port:'+PORT);
});