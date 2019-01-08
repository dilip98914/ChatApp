import React,{Component} from 'react';
import {Card,CardBody,CardText,ListGroup,Form,FormGroup,Label,Button,Input,ListGroupItem} from 'reactstrap';


export default class MessagePanel extends Component{

	constructor(props){
		super(props);
		this.state={
			socket:this.props.socket,
			username:this.props.username,
			message:'',
			users:[],
			chats:[],
		};
	}
	componentDidMount(){
		this.handleChat();
	}

	


	sendMessage=()=>{
		const {socket,message}=this.state;
		socket.emit('send-message',{
			message:message
		},()=>{
			this.handleChat();
		});
	}

	handleChange=(e)=>{
		this.setState({
			[e.target.name]:e.target.value
		});
	}
	
	handleChat=()=>{
		const {socket}=this.state;
		socket.on('get-chat',(chatArray)=>{
			console.log(chatArray);
			this.setState({
				chats:chatArray.userMessages
			});
		});
	}

	handleSubmit=(e)=>{
		e.preventDefault();
		console.log("form submitted");
		this.sendMessage();
		this.setState({
			message:'',
			username:'',
		},()=>{
			this.handleChat();
		});
		
	}

	render(){
		const {title}=this.props;
		return(
			<div className='row'>
				<div className='col-md-3'></div>
				<div  className='col-md-6'>
					<Card>
						<CardBody>
						<strong id='heading'>Chat Area</strong>

							{
								this.state.chats.map(chat=>(
									<ListGroup>
									<ListGroupItem><strong>{chat.username}</strong>: {chat.message}</ListGroupItem>
									</ListGroup>

									))

							}
						</CardBody>
					</Card>
				</div>
				<div className='col-md-3'></div>

				<div className='col-md-4'></div>
			

				<div className='col-md-3'>
					<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label >Enter a Message</Label>
						<Input 
						className='text-area'
						type="textarea"
						 name="message"
						 value={this.state.message} 
						 onChange={this.handleChange}/>
					</FormGroup>
					<Button className='btn btn-success'>Submit</Button>
					</Form>
				
				</div>
				
				<div className='col-md-5'></div>




			</div>

			
			
			




			)
	}
}