import React, {Component} from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { withApollo } from 'react-apollo';
import { studentLogin } from '../../mutation/mutations';
const jwt_decode = require("jsonwebtoken");


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            authFlag : false,
            cred:false,
            token:""

            
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
  
      submitLogin = async(e) => {
        var headers = new Headers();
        e.preventDefault();
       
            let response = await this.props.client.mutate({
                mutation: studentLogin,
                variables: {
                    email:this.state.email,
                    password:this.state.password
                }
            })
            response = response.data.studentLogin;
              console.log("in frontend after response");
              console.log(response)
              if (response._id) {
                  console.log("aaaaa")
                sessionStorage.setItem("studentId",response._id)

                
                  this.setState({
                    authFlag : true,
                    cred : false
                  })
              } else if (response) {
                  this.setState({
                    authFlag : false,
                    cred : true

                  })
              }      
            // })  
    }

    render(){
        let credvalue = null;
        let redirectVar = null

       

console.log(this.state.cred)
        if( sessionStorage.getItem('studentId')){
            redirectVar = <Redirect to= "/StudProfile"/>
        }
       if (this.state.cred==true){
        credvalue = <p>Invalid Credentials</p>
       }
        return(
            <div>
            <div class="container">
                {redirectVar}
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Student Login</h2>
                            <p><Link to="/cmpylogin">click here for Company Login</Link></p>
                        </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>                 
                    </div>
                    {credvalue}
                </div>                  
            </div> 
            </div>
        )
    }
}
export default withApollo(Login)