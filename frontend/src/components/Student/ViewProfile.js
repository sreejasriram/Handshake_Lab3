
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Card, Avatar } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import emptyPic from '../../images/empty-profile-picture.png';
import { withApollo } from 'react-apollo';
import { student } from '../../queries/queries';




class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stud_id: this.props.match.params.stud_id,
            name: "",
            image: "",
            dob: "",
            city: "",
            state: "",
            country: "",
            career_objective: "",
            skills: "",
            mobile: "",
            email: "",
            college: "",
            education: [],
            experience: [],
            college_name: "",
            edulocation: "",
            degree: "",
            major: "",
            year_of_starting: "",
            year_of_passing: "",
            month_of_starting: "",
            month_of_passing: "",
            cgpa: "",
            company: "",
            title: "",
            location: "",
            year_of_starting: "",
            year_of_ending: "",
            month_of_starting: "",
            month_of_ending: "",
            description: "",
            dataRetrieved: false,
            profileData: [],
            currentstudentId: "",
            messagestudent: false,
            mess: "",
            redirectToMessages: false,
            emptyprofilepic:emptyPic,

        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);

    }


    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }



    
    componentDidMount() {
      
        this.fetchStudentProfile(this.state.stud_id)
       
    }
    fetchStudentProfile=async(id)=>{
        const { data } = await this.props.client.query({
            query: student,
            variables: { studentId: id},
            fetchPolicy: 'no-cache'
        })
        console.log(data)
        if(data){
        if (data.student) {
                this.setState({
                    dataRetrieved: true,
                    profileData: data.student 
                });
            } else {
                console.log("error"+data)
            }
    

    }}


    render() {
        let profileData = this.state.profileData;
        console.log(profileData)
        let renderRedirect = null;
      
        if (profileData) {
            renderRedirect =
                <div>
                    <div class="row">
                        <div class="col-md-1"> </div>
                        <div class="col-md-3">
                            <Card>
                                <CardContent>
                                <center>
                                    <div class="row">
                                          <Avatar src={this.state.emptyprofilepic} style={{ width: '104px', height: '104px', borderRadius: '50%', textAlign: 'center' }}></Avatar>
                                            <Typography color="black" gutterBottom>
                                                <h4><b>{profileData.name?profileData.name:""}</b></h4>
                                            </Typography>

                                    </div>

                                    <p>{profileData.education?profileData.education.degree:""} {profileData.education?profileData.education.major:""} </p>
                                     {profileData.education?(<div>CGPA:{profileData.education.cgpa}</div>):<div></div>} 

                                    </center>

                                   
                                </CardContent>
                            </Card>

<br/>
                            <Card>
                                <CardContent>
                                    <div class="row">
                                        <div class="col-md-10">
                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Personal Info</p></b>
                                            </Typography>
                                            
                                        </div>
                                    </div>
                                   
                                    {profileData.dob?(<div><CakeOutlinedIcon></CakeOutlinedIcon> {profileData.dob}</div>):<div></div>} 
                                    {profileData.city?(<div><LocationOnOutlinedIcon></LocationOnOutlinedIcon> {profileData.city} {profileData.state} {profileData.country}</div>):<div></div>} 

                                   



                                </CardContent>
                            </Card>
                            <br />
                            {/* <Skill /> */}

                            <Card>
                                <CardContent>
                                    <div class="row">
                                        <div class="col-md-10">

                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Skills</p></b>
                                            </Typography>
                                        </div>

                                    </div>
                                    {/* <p>{this.state.skills?this.state.skills:""}</p> */}
                                    <p> C,Java,Angular Js</p>

                                </CardContent>
                            </Card>
                            <br />
                        </div>
                        <div class="col-md-7">
                            {/* career objective */}
                            <Card>
                                <CardContent>
                                    <div class="row">
                                        <div class="col-md-10">
                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>My Journey</p></b>

                                            </Typography>
                                            {/* <p>{this.state.career_objective?this.state.career_objective:""}</p> */}
                                            <p>{profileData.career_objective?profileData.career_objective:""}</p>

                                        </div>
                                    </div>

                                </CardContent>
                            </Card>

                            <br />
                            {/* Education */}
                            <Card>
                                <CardContent>
                                    <div class="row">
                                        <div class="col-md-10">

                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Education</p></b>
                                            </Typography>
                                        </div>

                                    </div>
                                   

                                        {/* return ( */}
                                            <div>
                                        {profileData.college_name?(<div><b><SchoolRoundedIcon></SchoolRoundedIcon> {profileData.college_name}</b></div>):<div></div>} 
                                        {profileData.degree?(<div><GradeOutlinedIcon></GradeOutlinedIcon> {profileData.degree}</div>):<div></div>} 
                                        <div> {profileData.year_of_starting?profileData.year_of_starting:""}/{profileData.month_of_starting?profileData.month_of_starting:""}-{profileData.year_of_passing?profileData.year_of_passing:""}/{profileData.month_of_passing?profileData.month_of_passing:""}</div>
                                        {profileData.major?(<div><b>Major in</b> {profileData.major}</div>):<div></div>} 
                                        {profileData.cgpa?(<div><b>Cummulative GPA</b> {profileData.cgpa}</div>):<div></div>} 

                                        
                                            <hr/>
                                            </div>
                                           
                                </CardContent>
                            </Card>
                            <br />

                            {/*Experience */}
                            <Card>
                                <CardContent>
                                    <div class="row">
                                        <div class="col-md-10">

                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Experience</p></b>
                                            </Typography>
                                        </div>

                                    </div>
                                  
                                            <div>
                                        {profileData.company?(<div> <h4><b><WorkOutlineOutlinedIcon></WorkOutlineOutlinedIcon> {profileData.company}</b></h4></div>):<div></div>} 
                                        {profileData.title?(<div><PersonOutlinedIcon></PersonOutlinedIcon> {profileData.title}</div>):<div></div>} 
                                        {profileData.location?(<div><LocationOnOutlinedIcon></LocationOnOutlinedIcon> {profileData.location}</div>):<div></div>} 
                                        {profileData.year_of_starting?(<div><DateRangeOutlinedIcon></DateRangeOutlinedIcon> {profileData.year_of_starting?profileData.year_of_starting:""}/{profileData.month_of_starting?profileData.month_of_starting:""} - {profileData.year_of_ending?profileData.year_of_ending:""}/{profileData.month_of_ending?profileData.month_of_ending:""}</div>):<div></div>} 

                                        
                                            <hr/>
                                            </div>
                                           
                                </CardContent>
                            </Card>
                            {/* Contact  */}
                            <br />
                            <Card>
                                <CardContent>
                                    <div class="row">
                                        <div class="col-md-10">

                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Contact Information</p></b>
                                            </Typography>
                                        </div>

                                    </div>
                                    <div><PhoneOutlinedIcon></PhoneOutlinedIcon> 6692209383</div>
                                    {profileData.email?(<div><EmailOutlinedIcon></EmailOutlinedIcon> {profileData.email}</div>):<div></div>} 
                                   
                                  
                                </CardContent>
                            </Card>

                        </div>
                        <div class="col-md-1"> </div>
                    </div>

                    <br /><br />
                </div>
        }


        return (
            <div>
                {/* {k} */}
                {renderRedirect}
            </div>
        )

    }
}

export default withApollo(ViewProfile)