import React, { Component } from 'react';

import {Form,FormGroup,Input,Button,Card} from 'reactstrap';

class Signup extends Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            socket:this.props.socket,
            signedUp:false,
        }
    }

    

    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        });

    }

    onSubmit=(e)=>{
        e.preventDefault();
        const {socket,username}=this.state;
        this.props.setUsername(username);
        socket.emit('send-username',{
            username:username,
            id:socket.id
        });
        this.setState({
            signedUp:true,
            username:'',
        },()=>{
            this.props.method(this.state.signedUp);
            // socket.on('get-users',(object)=>{
            //     console.log(object);
            // });
        });
    }

    render() {
        return (
            <div>
                <Card id="card">
                 <Form id="form" onSubmit={this.onSubmit}>
                    <FormGroup>
                        <h2>Enter your name</h2>
                        <Input type="text"
                        name='username'
                        onChange={this.onChange}
                        value={this.state.username}
                        placeholder="username"                        
                        ></Input>    
                    </FormGroup>
                    <Button className='btn btn-success'>Signup</Button>     
                </Form> 
              </Card>        
            </div>
        );
    }
}

export default Signup;