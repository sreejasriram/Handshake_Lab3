
import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import emptyPic from '../../images/empty-profile-picture.png';
import { Avatar } from '@material-ui/core';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { withApollo } from 'react-apollo';
import { listApplicants } from '../../queries/queries';
import { changeJobStatus } from '../../mutation/mutations';


class ViewApplicants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            job_id:this.props.match.params.jobId,
            dataRetrieved: false,
            redirect: false,
            stuData: [],
            applications:[],
            view_profile:false,
            studId:"",
            showStatus : "",
            statusUpdated:"",
            previewresume:false,
            emptyprofilepic: emptyPic
        }
        this.viewProfile = this.viewProfile.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.fetchApplicants = this.fetchApplicants.bind(this);
       
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

   

    updateStatus = async(studentId) => {
       
        
        let res = await this.props.client.mutate({
            mutation: changeJobStatus,
            variables: {
                jobId:this.state.job_id,
                studentId:studentId,
                status:this.state.showStatus
            }
        })
        let response = res.data.changeJobStatus;
       
                console.log(response)
                if (response){
                    this.setState({
                        statusUpdated:true
                    })
                     this.fetchApplicants()
                }
                else  {
                    
                    this.setState({
                        statusUpdated:false
                    })
            }
    }
  
    async fetchApplicants()
    {
       
        const { data } = await this.props.client.query({
            query: listApplicants,
            variables: {  jobId:this.state.job_id },
            fetchPolicy: 'no-cache'
        })
        console.log(data)
        if(data.listApplicants[0]){
        this.setState({
            stuData: data.listApplicants[0],
            applications:data.listApplicants[0]

        })
    }
    else{
        console.log(data)
    }
          
      


    }
    viewProfile = (e) => {
        var headers = new Headers();
        console.log(e.target.value);
        this.setState({
            view_profile: true,
            studId:e.target.value

        })
    }


    componentDidMount() {
      
        this.fetchApplicants()
    }


    render() {
        let renderRedirect = null;
     let res=""
        if (this.state.view_profile === true) {
            renderRedirect = <Redirect to={`/ViewProfile/${this.state.studId}`}/>
        }
        let stuData
        let applications
        console.log(this.state.stuData)
        console.log(this.state.applications)

        if (this.state.stuData){
        stuData = this.state.stuData.listApplicants;
        applications = this.state.stuData.applications;
        console.log(stuData)
        }
        return (
            <div>
                <div class="container">
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                            </div>
                            <div>
                                {renderRedirect}
                            </div>
                           
                                <div>
                                    {stuData?stuData.map((data, index) => {
                                        return (
                                            <div key={data._id}>
                                    <div class="row">
                                                     <div class="col-md-2"></div>
                                                     <div class="col-md-8">
                                                <Card>
                                                    <CardContent>
                                                    <div class="row">
                                                        <div class="col-md-1" style={{ paddingRight: '0px' }}>
                                                            <center>
                                                                <Avatar src={data.image ? data.image : this.state.emptyprofilepic} style={{ width: '36px', height: '36px', borderRadius: '50%', textAlign: 'center' }}></Avatar>
                                                            </center>
                                                        </div>
                                                        <div class="col-md-5" style={{ padding: '0px' }}>
                                                        < Typography color="black" gutterBottom>

                                                            <b><div style={{ fontSize: '24px' }}>{data.name?data.name:""}</div></b>
                                                        </ Typography>                                               
                                                            </div>
                                                    </div><br/>
                                              
                                                    {data.email?(<div><MailOutlineOutlinedIcon style={{ color: "#1569E0" }}></MailOutlineOutlinedIcon> {data.email}</div>):<div></div>}
                                                  
                                                {applications.map((app, index) => {
                                                   console.log(app)
                                                       if (app.studentId===data._id){
                                                        res=app.resume
                                                    return(
                                                    <div>
                                                {app.status?(<div><EqualizerIcon  style={{ color: "#1569E0" }}></EqualizerIcon> {app.status}</div>):<div></div>}
                                               
                                               
                                                </div>)
                                              
                                            }
                                                })}
                                                <div class="row">
                                                     <div class="col-md-2">
                                                     <button onClick={this.viewProfile} class="btn btn-primary"  value={data._id}>View Profile</button> 

                                             
                                                     </div> <div class="col-md-6">
                                                    </div> <div class="col-md-2">
                                                    <select name="showStatus" onChange={this.inputChangeHandler} >
                                                        <option value="Change Status" disabled selected>Change Status</option>
                                                        <option value="Pending" >Pending</option>
                                                        <option value="Reviewed" >Reviewed</option>
                                                        <option value="Declined" >Declined</option>

                                                    </select></div> </div>
                                                    <div class="row">
                                                    <div class="col-md-8"></div>
                                                    <div class="col-md-2">
                                                    <button class="btn btn-primary"  onClick={()=>(this.updateStatus(data._id))}>Update Status</button>
                                                    </div></div>
                                                </CardContent>
                                                
                                                </Card></div>
                                                     <div class="col-md-2">
                                                         </div></div>
                                                
                                                <br/>
                                                    <Dialog
                                                        aria-labelledby="simple-modal-title"
                                                        aria-describedby="simple-modal-description" 
                                                        open={this.state.previewresume}
                                                        style = {{height:"800", width:"500"}}>
                                                        <div>
                                                        <h2 id="simple-modal-title">Resume</h2>
                                                        <DialogContent>
                                                            <div>
                                                            <object type="application/pdf"
                                                                data={res}
                                                                width="500"
                                                                height="800">
                                                            </object>
                                                            </div>
                                                            <div className='col-md-9'>
                                                            </div>
                                                            <div className='col-md-3'>
                                                                <button onClick={()=>{this.previewResume()}} class="btn btn-primary" style={{backgroundColor:'#1569E0',borderRadius:'5px'}}>Close</button>
                                                            </div>
                                                        </DialogContent>                  
                                                        </div>
                                                    </Dialog> 
                                            </div>
                                        )
                                    }):""}
                                </div>                          
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

  
export default withApollo(ViewApplicants)