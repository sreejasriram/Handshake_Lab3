import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { graphql, compose, withApollo } from 'react-apollo';

import { addStudent } from '../../mutation/mutations';

 
class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            email:"",
            password : "",
            college:"",
            signed: false     
        }
       
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
    }
 
    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitSignup = async(e) => {
        var headers = new Headers();
        e.preventDefault();
       
        let response = await this.props.client.mutate({
            mutation: addStudent,
            variables: {
                name : this.state.name,
                email: this.state.email,
                password : this.state.password,
                college: this.state.college
            }
        })
        response = response.data.addStudent;
        
              console.log("response" + response._id)
              if (response._id) {
                  this.setState({
                    signed: true
                  })
              } else{
                  this.setState({
                    signed: false
                  })
              }       
               
    }

    render(){
        let signvalue = null;   
       if (this.state.signed==true){
        signvalue = <p> Sign-up successful</p>
       }
        return(
            <div>
            <div class="container">
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                        <h2>Student Signup</h2>
                        <p><Link to="/cmpysignup">click here for Company Signup</Link></p>
                        </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="name" placeholder="Name"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="email" class="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="college" placeholder="College"/>
                            </div>
                            <button onClick = {this.submitSignup} class="btn btn-primary">Signup</button>                 
                    </div>{signvalue}
                </div>       
            </div> 
            </div>
        )
    }
}
export default withApollo(Signup)
