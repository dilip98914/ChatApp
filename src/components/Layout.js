import React,{Component} from 'react';
import io from 'socket.io-client';
import {Card,CardBody,CardText,ListGroup,Form,FormGroup,Label,Button,Input,ListGroupItem} from 'reactstrap';

const socketURL='http://localhost:3231/';

export default class Layout extends Component{

	constructor(props){
		super(props);
		this.state={
			socket:null,
			username:'',
			message:'',
			users:[],
			socketSet:false,
		};
	}

	
	componentWillMount() {
		this.initSocket();
	
	}
	
	initSocket=()=>{
		const socket=io(socketURL);
		socket.on('connect',()=>{
			console.log('connected');
		});
		this.setState({
			socket,
			socketSet:true
		});
	}

	sendObject=(socket,username,message)=>{
		socket.emit('send object',{
			username,
			message
		});
	}

	handleChange=(e)=>{
		this.setState({
			[e.target.name]:e.target.value
		});
	}


	getUsers=()=>{
		const {socket}=this.state;
		socket.on('get-users',(users)=>{
			this.setState({
				users:users.users
			});
		});
	}

	

	handleSubmit=(e)=>{
		const {message,socket,username}=this.state;
		e.preventDefault();
		console.log("form submitted");
		this.sendObject(socket,username,message);
		this.setState({
			message:'',
			username:'',
		},()=>{
			this.getUsers();
		});
		
	}

	render(){
		const {title}=this.props;
		return(
			<div className='row'>
				<div id='left' className='col-md-4'>
					<Card>
						<CardBody>
						<strong>Online Users</strong>
						<ListGroup>

							{
								this.state.users.map(user=>(
									<ListGroupItem>{user.username}</ListGroupItem>
								))

							}
						</ListGroup>
						</CardBody>
					</Card>
				</div>

				<div className='col-md-8'>
					<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<label>Enter username</label>
						<Input 
						type="text"
						 name="username"
						 value={this.state.username} 
						 onChange={this.handleChange}/>	

						<Label >Enter a Message</Label>
						<Input 
						type="textarea"
						 name="message"
						 value={this.state.message} 
						 onChange={this.handleChange}/>
					</FormGroup>
					<Button>Submit</Button>
					</Form>
				
				</div>

			</div>
			
			




			)
	}
}