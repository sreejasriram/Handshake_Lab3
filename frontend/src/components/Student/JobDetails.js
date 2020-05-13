import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import JobApply from './JobApply';
import emptyPic from '../../images/empty-profile-picture.png';
import {Avatar} from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import { jobdetails, student } from '../../queries/queries';
import { withApollo } from 'react-apollo';



class JobDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cmpy_id: "",
            dataRetrieved: false,
            jobData: [],
            jobId: this.props.jobId,
            applied: false,
            already_applied: false,
            emptyprofilepic:emptyPic
        }
        this.ApplyJob = this.ApplyJob.bind(this);

        console.log(this.state.jobId)
    }
    ApplyJob = (e) => {
        var headers = new Headers();
        e.preventDefault();
        this.setState({
            applied: true
        });

    }
    displayJobDetails=async(id)=>{
        const { data } = await this.props.client.query({
            query: jobdetails,
            variables: { jobId: id },
            fetchPolicy: 'no-cache'
        })
        console.log(data)
        if (data) {
            this.setState({
                dataRetrieved: true,
                jobData: data.jobdetails
            });
        } else {
            console.log("error")
        } 

}


    componentWillReceiveProps(nextProps) {
        if (this.props.jobId !== nextProps.jobId){

           this.setState({ jobId: nextProps.jobId });

        const data = {
            jobId: nextProps.jobId
        }
        console.log(this.props.jobId)
        console.log(data.jobId)
        this.displayJobDetails(data.jobId)
    
    }

    }


    componentDidMount() {

    }


    render() {
        console.log(this.props);
        let renderRedirect = null;
        let applied = null
        let apply
        
        let jobData = this.state.jobData;
        console.log(jobData)
        if (this.state.applied == true) {
            console.log(this.state.jobId)
            renderRedirect = <JobApply cmpy_id={jobData.companydetails[0]._id} job_id={this.state.jobId} open="true" />
        }
        if (!jobData) {

            renderRedirect = <p>click on the jobs to view job details..</p>
        }
        console.log("outside")
        if (jobData[0]) {
            console.log("inside")
            apply = <JobApply cmpy_id={jobData[0].companydetails[0]._id} job_id={this.state.jobId} />
        }
        return (
            <div>
             

                {jobData?jobData.map((data, index) => {
                    return (
                        <div key={data._id}>
                            <div class="row">
                                <div class="col-md-1">
                                <Avatar src={this.state.emptyprofilepic} style={{ width: '36px', height: '36px', borderRadius: '50%', textAlign: 'center',marginTop:'20px',marginBottom:'10px' }}></Avatar>
                                </div>
                                <div class="col-md-2">
                                    <Link to={`/companydetails/${data.companydetails[0]._id}`} activeClassName="active">
                                        <h2>{data.companydetails[0].name?data.companydetails[0].name:""}</h2>

                                    </Link>
                                </div>
                            </div>


                            <h3>{data.title}</h3>
                            <div class="row">
                                <div class="col-md-3">
                                {data.location?( <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-map-marker" style={{ color: "#1569E0" }}></span> {data.location}</div>):<div></div>} 

                                </div> 
                                <div class="col-md-3">
                                {data.category?( <div style={{ fontSize: "13px" }}><span style={{ color: "#1569E0" }}></span><CategoryIcon style={{ color: "#1569E0" }}></CategoryIcon> {data.category}</div>):<div></div>} 


                                </div> 
                                <div class="col-md-3">
                                {data.salary?( <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-usd" style={{ color: "#1569E0" }}></span> {data.salary} per hour</div>):<div></div>} 

                                </div>
                                </div><br />

                                {data.deadline?( <div style={{ fontSize: "13px", height: "40px", width: "70%" }}><span class="glyphicon glyphicon-calendar" style={{ color: "#1569E0" }}></span> Applications close on {data.deadline.substring(0, 10)}</div>):<div></div>} 



                            {data.description}
                         
                            <br /><br />
                            
                            {apply}
                        </div>
                    )
                }):""}<br />

                {renderRedirect}
            </div>

        )
    }
}

export default withApollo(JobDetails)