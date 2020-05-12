import React, { Component } from 'react';
import '../../App.css';
// import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import JobApply from './JobApply';
import cookie from 'react-cookies';
// import { environment } from '../../Utils/constants';
import emptyPic from '../../images/empty-profile-picture.png';
import {Avatar} from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
// import { connect } from "react-redux";
// import { fetchJobDetails,jobAlreadyApplied } from "../../redux/actions/index";
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
        // this.displayJobDetails = this.displayJobDetails.bind(this);

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

        // const { data1 } = await this.props.client.query({
        //     query: jobdetails,
        //     variables: { jobId: id ,studentId: sessionStorage.getItem('studentId')},
        //     fetchPolicy: 'no-cache'
        // })
        // console.log(data1)
        // if (data) {
        //     this.setState({
        //         already_applied: true
        //     });
        // } else {
        //     console.log("error")

        // }

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
        // this.props.fetchJobDetails(data.jobId)
        // console.log("i m here")
        //     var bdata = {
        //         jobId: nextProps.jobId,
        //         studentId: sessionStorage.getItem('id')
        //     }
        //     console.log(bdata)
        //     this.props.jobAlreadyApplied(bdata)
    
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


    componentDidMount() {

        // console.log("did mount")
        /////////////////////////////////
        // const data = {
        //     jobId: this.props.jobId
        // }
        // this.displayJobDetails(data.jobId)
        //////////////////////////////////////////////
        // // console.log(data.id)
        // this.props.fetchJobDetails(data)

        // // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        // // axios.get(environment.baseUrl + '/student/jobs_details/' + data.jobId)
        // //     .then(response => {
        // //         console.log("in frontend after response");
        // //         console.log(response.data.rows)
        // //         if (response.data.rows.length) {
        // //             this.setState({
        // //                 dataRetrieved: true,
        // //                 jobData: response.data.rows,
        // //                 cmpy_id: response.data.rows.cmpy_id
        // //             });
        // //         } else if (response.data.error) {
        // //             console.log("response" + response.data.error)

        // //         }
        // //     })
        //     // .then(response => {
        //         console.log("i m here")
        //         // if (this.state.jobData.length) {
        //             var bdata = {
        //                 // cmpy_id:this.state.jobData[0].cmpy_id,
        //                 jobId: this.state.jobId,
        //                 studentId: sessionStorage.getItem('id')
        //             }
        //             console.log(bdata)
        //             this.props.jobAlreadyApplied(bdata)

        //             // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        //             // axios.get(environment.baseUrl + '/company/job_already_applied/' + data.jobId + "/" + data.studentId)
        //             //     .then(response => {
        //             //         console.log("in frontend after response");
        //             //         console.log(response.data.result)
        //             //         if (response.data.result) {
        //             //             this.setState({
        //             //                 already_applied: true
        //             //             });
        //             //         } else if (response.data.error) {
        //             //             console.log("response" + response.data.error)

        //             //         }
        //             //     })

        //         // }
        //     // })

    }


    render() {
        console.log(this.props);
        let renderRedirect = null;
        let applied = null
        let apply
        // let logincookie = null
        // if (!cookie.load('student')) {
        //     logincookie = <Redirect to="/" />
        // }
        let jobData = this.state.jobData;
        console.log(jobData)
        if (this.state.applied == true) {
            // console.log(jobData[0].cmpy_id)
            console.log(this.state.jobId)
            renderRedirect = <JobApply cmpy_id={jobData.companydetails[0]._id} job_id={this.state.jobId} open="true" />
        }
        if (!jobData) {

            renderRedirect = <p>click on the jobs to view job details..</p>
        }
        console.log("outside")
        // console.log(this.state.already_applied)
        if (jobData[0]) {
            console.log("inside")
            // applied = <button onClick={this.ApplyJob} class="btn btn-primary">Apply</button>
            apply = <JobApply cmpy_id={jobData[0].companydetails[0]._id} job_id={this.state.jobId} />
        }
        return (
            <div>
                {/* <button onClick={this.postJobs} class="btn btn-primary">Add New Job</button> */}
                {/* {logincookie} */}

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

                                {data.deadline?( <div style={{ fontSize: "13px", height: "40px", width: "70%" }}><span class="glyphicon glyphicon-calendar" style={{ color: "#1569E0" }}></span> Applications close on {data.deadline.substring(0, 10)}</div>):<div></div>} 

                            {/* <div style={{ fontSize: "13px", height: "40px", width: "70%" }}><span class="glyphicon glyphicon-calendar" style={{ color: "#1569E0" }}></span> Applications close on {data.deadline.substring(0, 10)}</div> */}


                            {data.description}
                            {/* {data.applications.map((app)=>app.studentId)} */}
                            <br /><br />
                            {/* {    applied = data.applications.map((application) => {
                    console.log(application)
                    return (application.studentId === sessionStorage.getItem("studentId")?"":apply)
                }
                )} */}
                {/* {data.applications?data.applications.map((application,index1) => {
                    console.log(application)
                    if (application.studentId.toString() === sessionStorage.getItem("studentId"))
                    applied=""
                    else
                    applied=apply
                   
                }
                ):""} */}
                {/* {console.log(applied)} */}
                            {apply}
                        </div>
                    )
                }):""}<br />

                {renderRedirect}
            </div>

        )
    }
}
// export default JobDetails;
// const mapStateToProps = state => {
//     console.log(state.jobDetails)
    
//     return {
//         jobData:state.jobDetails,
//         already_applied:state.job_already_applied
//     };
//   };
  
//   function mapDispatchToProps(dispatch) {
//     return {
//         // applyEvent: payload => dispatch(applyEvent(payload)),
//         jobAlreadyApplied: payload => dispatch(jobAlreadyApplied(payload)),
//         fetchJobDetails: payload => dispatch(fetchJobDetails(payload))
      
        
//     };
//   }
  
//   export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
export default withApollo(JobDetails)