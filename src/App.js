import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import Signup from './components/Signup';
import Layout from './components/MessagePanel';
const socketURL='http://localhost:3231/';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      socket:null,
      socketSet:false,
      signedUp:false,      
    }
  }


  
  setSignedUp=(val)=>{
    this.setState({
      signedUp:val
    });
  }

  setUsername=(val)=>{
    this.setState({
      username:val
    });
  }

  componentWillMount() {
    this.initSocket();
    
  }
  
  getUsers=()=>{
    const {socket}=this.state;
    socket.on('get-users',(object)=>{
      console.log(object);
    });
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

  render() {
    return (
      <div className="container">
        {
          this.state.signedUp?<Layout
          socket={this.state.socket}
          username={this.state.username}
          
          />:<Signup 
          socket={this.state.socket}
          method={this.setSignedUp}
          setUsername={this.setUsername}
          />
        }
      
      </div>
    );
  }
}

export default App;
