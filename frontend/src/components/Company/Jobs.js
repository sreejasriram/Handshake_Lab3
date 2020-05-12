import React, {Component} from 'react';
import '../../App.css';
import {Redirect} from 'react-router';
import { withApollo } from 'react-apollo';

import { addJob } from '../../mutation/mutations'

class Jobs extends Component{
    constructor(props){
        super(props);
        this.state = {
            title : "",
            posting_date: "",
            deadline : "",
            location: "",
            salary: "",
            description : "",
            category: "",
            added: false,
            canceled:false
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.postJobs = this.postJobs.bind(this);
        this.cancel = this.cancel.bind(this);

    }
    
    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(e.target.name)
        console.log(e.target.value)
    }
  
    cancel = (e) => {
        var headers = new Headers();
        e.preventDefault();
     this.setState({
        canceled: true
      })
    }


    postJobs = async(e) => {
        var headers = new Headers();
        e.preventDefault();
        // let cmpny_id = sessionStorage.getItem('companyId');
        // console.log(cmpny_id)
        // const data = {
        //     title : this.state.title,
        //     posting_date: this.state.posting_date,
        //     deadline : this.state.deadline,
        //     location: this.state.location,
        //     salary: this.state.salary,
        //     description : this.state.description,
        //     category: this.state.category,
        //     companyId: cmpny_id

        // }

        let res = await this.props.client.mutate({
            mutation: addJob,
            variables: {
                title : this.state.title,
                posting_date: this.state.posting_date,
                deadline : this.state.deadline,
                location: this.state.location,
                salary: this.state.salary,
                description : this.state.description,
                category: this.state.category,
                companyId: sessionStorage.getItem("companyId")
            }
        })
        let response = res.data.addJob;

        console.log(response)  
            if (response) {
                this.setState({
                added: true
                })
                
            } else {
                this.setState({
                added: false
                })
        }

        // axios.defaults.withCredentials = true;       
        console.log("in frontend before axios");
        // this.props.postCompanyJobs(data);
        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        // axios.post(environment.baseUrl+'/company/post_job',data)
        //     .then(response => {
        //       console.log("in frontend after response");
        //       console.log("response" + response.data.result)
        //       if (response.data.result) {
        //           this.setState({
        //             added: true
        //           })
                 
        //       } else if (response.data.error) {
        //           this.setState({
        //             added: false
        //           })
        //       }
                
        //     })
           
    }

    render(){
        let redirectVar = null;
        
       if (this.state.added==true || this.state.canceled==true){
        redirectVar = <Redirect to= "/home"/>
       }
        return(
            <div>
            <div class="container">
            {redirectVar}
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Job Posting </h2>
                            <p>Please enter Job details</p>
                        </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="title" placeholder="Title"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="date" class="form-control" name="posting_date"  placeholder="Posting Date"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="date" class="form-control" name="deadline" placeholder="Deadline"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="location" placeholder="Location"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="number" class="form-control" name="salary" placeholder="Salary"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="description" placeholder="Description"/>
                            </div>
                            <div class="form-group">
                            Category: <select onChange = {this.inputChangeHandler} name="category">
                            <option value="" selected disabled hidden>Choose here</option>
                                    <option value = "Internship">Internship</option>
                                    <option value = "Part-Time">Part time</option>
                                    <option value = "Full-Time">Full time</option>
                                    <option value = "On-Campus">On Campus</option>
                                </select>
                            </div>
                            <button onClick = {this.postJobs} class="btn btn-primary">Post Job</button> &nbsp;&nbsp; 
                            <button onClick={this.cancel} class="btn btn-primary">Cancel</button>                            
                    </div>

                </div>

               
                    
            </div> 
            </div>
        )
    }
}
export default withApollo(Jobs)
// export default Jobs;
// const mapStateToProps = state => {    
//     return {
//         added:state.jobposted

//     };
//   };
  
//   function mapDispatchToProps(dispatch) {
//     return {
//         postCompanyJobs: payload => dispatch(postCompanyJobs(payload))
//     };
//   }
  
//   export default connect(mapStateToProps, mapDispatchToProps)(Jobs);