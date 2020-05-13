import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';

import { applyJob } from '../../mutation/mutations';
import { withApollo } from 'react-apollo';


class JobApply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cmpy_id: this.props.cmpy_id,
            resume: "",
            job_id: this.props.job_id,
            dataRetrieved: false,
            redirect: false,
            profileData: [],
            submitted: false,
            resume:"",
            open: false,
            setOpen: true
        }
        this.submitJob = this.submitJob.bind(this);
        
    }

    
    submitJob = async (e) => {
        var headers = new Headers();
        e.preventDefault();
        let res = await this.props.client.mutate({
            mutation: applyJob,
            variables: {
                job_id: this.state.job_id,
                stud_id: sessionStorage.getItem('studentId'),
                app_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }
        })
        let response = res.data.applyJob;
        if(response){
        this.setState({
            submitted: true
        })
    }
        
    }


   

    render() {
        let display = null
       
        if (this.state.submitted == true) {
            display = <Redirect to='/studJobs'/>

        }
        console.log(this.state.job_id)
        console.log(this.state.cmpy_id)
        return (
            <div>
                <div>
               
                    <button onClick={this.submitJob} class="btn btn-primary">Apply</button>
                 
                </div> 
                <div> {display}</div>
            </div>

        )
    }
}
export default withApollo(JobApply)