import React, {Component} from 'react';
import '../../App.css';
import {Redirect} from 'react-router';
import {  withApollo } from 'react-apollo';
import { companyLogin } from '../../mutation/mutations';
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
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
  
    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitLogin = async(e) => {
        e.preventDefault();
        console.log("in frontend before axios");
       
        let response = await this.props.client.mutate({
            mutation: companyLogin,
            variables: {
                email:this.state.email,
                password:this.state.password
            }
        })
        response = response.data.companyLogin;
      
              console.log("in frontend after response");  
              if (response._id) {
                sessionStorage.setItem("companyId",response._id)
               
                  this.setState({
                  
                    authFlag : true,
                    cred : false
                  })
              } else{
                  this.setState({
                    authFlag : false,
                    cred:true
                  })
              }                
            
    }

    render(){
        let redirectVar=null;
        console.log("outside company")
        

        if(sessionStorage.getItem('companyId')){
            console.log("inside company")
            redirectVar = <Redirect to="/home"/>

        }
        console.log(this.state.cred)
        let credvalue = null;

       if (this.state.cred===true){
        credvalue = <p>Invalid Credentials</p>
       }
 

           


        return(
            <div>
            <div class="container">
            {redirectVar}
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Company Login</h2>
                            <p>Please enter your username and password</p>
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>                 
                    </div>{credvalue}
                </div>                 
            </div> 
            </div>
        )
    }
}

export default withApollo(Login)