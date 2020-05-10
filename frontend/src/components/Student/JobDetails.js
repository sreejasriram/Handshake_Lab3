import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import JobApply from './JobApply';
import cookie from 'react-cookies';
import { environment } from '../../Utils/constants';
import emptyPic from '../../images/empty-profile-picture.png';
import {Avatar} from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import { connect } from "react-redux";
import { fetchJobDetails,jobAlreadyApplied } from "../../redux/actions/index";



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

    componentWillReceiveProps(nextProps) {
        if (this.props.jobId !== nextProps.jobId){

           this.setState({ jobId: nextProps.jobId });

        const data = {
            jobId: nextProps.jobId
        }
        console.log(this.props.jobId)
        console.log(data.jobId)

        this.props.fetchJobDetails(data)
        console.log("i m here")
            var bdata = {
                jobId: nextProps.jobId,
                studentId: sessionStorage.getItem('id')
            }
            console.log(bdata)
            this.props.jobAlreadyApplied(bdata)
    
    }

        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        // axios.get(environment.baseUrl + '/student/jobs_details/' + data.jobId)
        //     .then(response => {
        //         console.log("in frontend after response");
        //         console.log(response.data.rows)
        //         if (response.data.rows) {
        //             this.setState({
        //                 dataRetrieved: true,
        //                 jobData: response.data.rows,
        //                 cmpy_id: response.data.rows.cmpy_id
        //             });
        //         } else if (response.data.error) {
        //             console.log("response" + response.data.error)

        //         }
        //     })
            // .then(response => {
                
                // console.log("i m here")
                // // if (this.state.jobData.length) {
                //     var bdata = {
                //         jobId: nextProps.jobId,
                //         studentId: sessionStorage.getItem('id')
                //     }
                //     console.log(bdata)
                //     this.props.jobAlreadyApplied(bdata)

                    // console.log(this.props.already_applied)
                    // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

                    // axios.get(environment.baseUrl + '/company/job_already_applied/' + data.jobId + "/" + data.studentId)
                    //     .then(response => {
                    //         console.log("in frontend after response");
                    //         console.log(response.data)
                    //         if (response.data.result) {
                    //             this.setState({
                    //                 already_applied: true
                    //             });
                    //         } else if (response.data.error) {
                    //             console.log("response" + response.data.error)
                    //             console.log(this.state.already_applied)

                    //         }
                    //     })
                // }
            // })

    }


    // componentDidMount() {
    //     console.log("did mount")
    //     const data = {
    //         jobId: this.props.jobId
    //     }
    //     // console.log(data.id)
    //     this.props.fetchJobDetails(data)

    //     // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

    //     // axios.get(environment.baseUrl + '/student/jobs_details/' + data.jobId)
    //     //     .then(response => {
    //     //         console.log("in frontend after response");
    //     //         console.log(response.data.rows)
    //     //         if (response.data.rows.length) {
    //     //             this.setState({
    //     //                 dataRetrieved: true,
    //     //                 jobData: response.data.rows,
    //     //                 cmpy_id: response.data.rows.cmpy_id
    //     //             });
    //     //         } else if (response.data.error) {
    //     //             console.log("response" + response.data.error)

    //     //         }
    //     //     })
    //         // .then(response => {
    //             console.log("i m here")
    //             // if (this.state.jobData.length) {
    //                 var bdata = {
    //                     // cmpy_id:this.state.jobData[0].cmpy_id,
    //                     jobId: this.state.jobId,
    //                     studentId: sessionStorage.getItem('id')
    //                 }
    //                 console.log(bdata)
    //                 this.props.jobAlreadyApplied(bdata)

    //                 // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

    //                 // axios.get(environment.baseUrl + '/company/job_already_applied/' + data.jobId + "/" + data.studentId)
    //                 //     .then(response => {
    //                 //         console.log("in frontend after response");
    //                 //         console.log(response.data.result)
    //                 //         if (response.data.result) {
    //                 //             this.setState({
    //                 //                 already_applied: true
    //                 //             });
    //                 //         } else if (response.data.error) {
    //                 //             console.log("response" + response.data.error)

    //                 //         }
    //                 //     })

    //             // }
    //         // })

    // }


    render() {
        console.log(this.props);
        let renderRedirect = null;
        let applied = null
        let logincookie = null
        if (!cookie.load('student')) {
            logincookie = <Redirect to="/" />
        }
        let jobData = this.props.jobData;
        console.log(jobData)
        if (this.state.applied == true) {
            console.log(jobData[0].cmpy_id)
            console.log(this.props.jobId)
            renderRedirect = <JobApply cmpy_id={jobData[0].companydetails[0]._id} job_id={this.state.jobId} open="true" />
        }
        if (!jobData.length) {

            renderRedirect = <p>click on the jobs to view job details..</p>
        }
        console.log("outside")
        console.log(this.state.already_applied)
        if (this.props.already_applied == false && jobData[0]) {
            console.log("inside")
            // applied = <button onClick={this.ApplyJob} class="btn btn-primary">Apply</button>
            applied = <JobApply cmpy_id={jobData[0].companydetails[0]._id} job_id={this.props.jobId} />
        }
        return (
            <div>
                {/* <button onClick={this.postJobs} class="btn btn-primary">Add New Job</button> */}
                {logincookie}

                {jobData.length?jobData.map((data, index) => {
                    return (
                        <div key={data._id}>
                            <div class="row">
                                <div class="col-md-1">
                                <Avatar src={data.companydetails[0].image?data.companydetails[0].image:this.state.emptyprofilepic} style={{ width: '36px', height: '36px', borderRadius: '50%', textAlign: 'center',marginTop:'20px',marginBottom:'10px' }}></Avatar>
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

                                    {/* <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-map-marker" style={{ color: "#1569E0" }}></span> {data.location}</div> */}
                                </div> 
                                <div class="col-md-3">
                                {data.category?( <div style={{ fontSize: "13px" }}><span style={{ color: "#1569E0" }}></span><CategoryIcon style={{ color: "#1569E0" }}></CategoryIcon> {data.category}</div>):<div></div>} 

                                    {/* <div style={{ fontSize: "13px" }}><span style={{ color: "#1569E0" }}></span> {data.category}</div> */}

                                </div> 
                                <div class="col-md-3">
                                {data.salary?( <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-usd" style={{ color: "#1569E0" }}></span> {data.salary} per hour</div>):<div></div>} 

                                    {/* <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-usd" style={{ color: "#1569E0" }}></span> {data.salary + " per hour"}</div> */}
                                </div>
                                </div><br />

                                {data.deadline.substring(0, 10)?( <div style={{ fontSize: "13px", height: "40px", width: "70%" }}><span class="glyphicon glyphicon-calendar" style={{ color: "#1569E0" }}></span> Applications close on {data.deadline.substring(0, 10)}</div>):<div></div>} 

                            {/* <div style={{ fontSize: "13px", height: "40px", width: "70%" }}><span class="glyphicon glyphicon-calendar" style={{ color: "#1569E0" }}></span> Applications close on {data.deadline.substring(0, 10)}</div> */}


                            {data.description}
                            <br /><br />
                            {applied}
                        </div>
                    )
                }):""}<br />

                {renderRedirect}
            </div>

        )
    }
}
// export default JobDetails;
const mapStateToProps = state => {
    console.log(state.jobDetails)
    
    return {
        jobData:state.jobDetails,
        already_applied:state.job_already_applied
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
        // applyEvent: payload => dispatch(applyEvent(payload)),
        jobAlreadyApplied: payload => dispatch(jobAlreadyApplied(payload)),
        fetchJobDetails: payload => dispatch(fetchJobDetails(payload))
      
        
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);