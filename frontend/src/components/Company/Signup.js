import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
// import {environment} from '../../Utils/constants';
import { graphql, compose, withApollo } from 'react-apollo';
// import { addCompany } from '../../queries/queries';
import { addCompany } from '../../mutation/mutations';


class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            email:"",
            password : "",
            location:"",
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
        e.preventDefault();
        // const data = {
        //     name : this.state.name,
        //     email: this.state.email,
        //     password : this.state.password,
        //     location: this.state.location 
        // }
        let response = await this.props.client.mutate({
            mutation: addCompany,
            variables: {
            name : this.state.name,
            email: this.state.email,
            password : this.state.password,
            location: this.state.location 
            }
        })
        response = response.data.addCompany;

        // axios.defaults.withCredentials = true;
        // console.log("in frontend before axios");
        // axios.post('/company/company_signup',data)
            // .then(response => {
              //  console.log("Status Code : ",response.status);

              console.log("in frontend after response");

              console.log(response)
              if (response._id) {
                  this.setState({
                    signed: true
                  })


              } else {
                  this.setState({
                    signed: false
                  })
              }

                
            // })
            // .catch(
            //     this.setState({
            //         signed: false
                
            // }));
          
            

            
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
                            <h2>Company Signup</h2>
                            <p>Please enter your details</p>
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
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="location" placeholder="Location"/>
                            </div>
                            <button onClick = {this.submitSignup} class="btn btn-primary">Signup</button>                 
                    </div>{signvalue}
                </div>

               
                    
            </div> 
            </div>
        )
    }
}
//export Login Component
// export default Signup;
export default withApollo(Signup)