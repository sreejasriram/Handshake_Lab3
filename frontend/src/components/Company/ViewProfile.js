
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Card, Avatar } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import { environment } from '../../Utils/constants';
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

// import { connect } from "react-redux";
// import { viewStudentProfile,sendmessage } from "../../redux/actions/index";


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
        // this.messageStudent = this.messageStudent.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        // this.sendMessage = this.sendMessage.bind(this);

    }





    // messageStudent = (studentId) => {
    //     console.log(studentId)
    //     this.setState(currentState => ({
    //         messagestudent: !currentState.messagestudent,
    //         currentstudentId: studentId
    //     }))
    // }

    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }



    // sendMessage = () => {
    //     // e.preventDefault();
    //     let currentdate = new Date()

    //     const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    //     const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(currentdate)

    //     let datestr = mo + " " + da + " " + ye + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds()

    //     let data = null
    //     data = {
    //         id1: sessionStorage.getItem('id'),
    //         id2: this.state.stud_id,
    //         update: {
    //             id1: {
    //                 sender: sessionStorage.getItem('id'),
    //                 persona: "companies"
    //             },
    //             id2: {
    //                 receiver: this.state.stud_id,
    //                 persona: "students"
    //             },
    //             $push: {
    //                 messages: [{
    //                     fromId: sessionStorage.getItem('id'),
    //                     message: this.state.mess,
    //                     dateTime: datestr
    //                     // dateTime: currentdate.getDay() + " " + currentdate.getMonth() + " " + currentdate.getDate() + " " + currentdate.getFullYear() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds()
    //                 }]
    //             }
    //         }
    //     }

    //     console.log(data)
    //     this.props.sendmessage(data);

    //     // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

    //     // axios.post(environment.baseUrl + '/company/send_message', data)
    //     //     .then(response => {
    //     //         console.log("in frontend after response");
    //     //         console.log(response.data)
    //     //         if (response.data) {
    //     //             // <Redirect to={`/companyMessages/${this.state.studId}`} />
    //     //             this.setState({ redirectToMessages: true })


    //     //         } else if (response.data.error) {
    //     //             console.log("response" + response.data.error)
    //     //         }
    //     //     }
    //     //     )
    // }



    componentDidMount() {
        // const data = {
        //     id: this.state.stud_id
        // }
        // console.log(data)
        this.fetchStudentProfile(this.state.stud_id)
        // this.props.viewStudentProfile(data);

        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        // axios.get(environment.baseUrl + '/company/get_student_profile/' + data.id)
        //     .then(response => {
        //         console.log("in frontend after response");
        //         console.log(response.data.rows)
        //         if (response.data.rows) {
        //             this.setState({
        //                 dataRetrieved: true,
        //                 profileData: response.data.rows,
        //                 name: response.data.rows[0].name,
        //                 dob: response.data.rows[0].dob,
        //                 city: response.data.rows[0].city,
        //                 state: response.data.rows[0].state,
        //                 country: response.data.rows[0].country,
        //                 career_objective: response.data.rows[0].career_objective,
        //                 skills: response.data.rows[0].skills,
        //                 mobile: response.data.rows[0].mobile,
        //                 email: response.data.rows[0].email,
        //                 college: response.data.rows[0].college,
        //                 education: response.data.rows[0].education,
        //                 experience: response.data.rows[0].experience,
        //                 image: response.data.rows[0].image,
                       
        //             });
        //         } else if (response.data.error) {
        //             console.log("response" + response.data.error)
        //         }
        //     })
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
        // let k = null
        // if (this.props.redirectToMessages)
        //     k = <Redirect to={`/companyMessages/`} />

        if (profileData) {
            // profileData = profileData[0]
            renderRedirect =
                <div>
                    <div class="row">
                        <div class="col-md-1"> </div>
                        <div class="col-md-3">
                            {/* profilepic */}
                            <Card>
                                <CardContent>
                                <center>
                                    <div class="row">
                                        {/* <div class="col-md-10"> */}
                                          <Avatar src={this.state.emptyprofilepic} style={{ width: '104px', height: '104px', borderRadius: '50%', textAlign: 'center' }}></Avatar>
                                            <Typography color="black" gutterBottom>
                                                <h4><b>{profileData.name?profileData.name:""}</b></h4>
                                            </Typography>
                                        {/* </div> */}

                                    </div>

                                    {/* <p>{this.state.college.length?this.state.college:""}</p>
                                    
                                    <p>{this.state.education.length?this.state.education[0].degree:""} {this.state.education.length?this.state.education[0].major:""} </p>
                                     {this.state.education.length?(<div>CGPA:{this.state.education[0].cgpa}</div>):<div></div>}  */}
                                    <p>{profileData.college?profileData.college:""}</p>
                                    <p>{profileData.education?profileData.education.degree:""} {profileData.education?profileData.education.major:""} </p>
                                     {profileData.education?(<div>CGPA:{profileData.education.cgpa}</div>):<div></div>} 

                                     {/* <button class="btn btn-primary" style={{ backgroundColor: '#1569E0', border: '0px',width:'100%'}} onClick={() => this.messageStudent()}>Message</button> */}
                                    </center>

                                   
                                </CardContent>
                            </Card>

<br/>
                            {/* <Basic /> */}
                            <Card>
                                <CardContent>
                                    <div class="row">
                                        <div class="col-md-10">
                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Personal Info</p></b>
                                            </Typography>
                                            
                                        </div>
                                    </div>
                                    {/* {this.state.dob?(<div><CakeOutlinedIcon></CakeOutlinedIcon> {this.state.dob}</div>):<div></div>} 
                                    {this.state.city?(<div><LocationOnOutlinedIcon></LocationOnOutlinedIcon> {this.state.city} {this.state.state} {this.state.country}</div>):<div></div>}  */}
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
                                    {/* {this.state.education.map((data, index) => { */}
                                    {/* {profileData.education.map((data, index) => { */}

                                        {/* return ( */}
                                            <div>
                                        {profileData.college_name?(<div><b><SchoolRoundedIcon></SchoolRoundedIcon> {profileData.college_name}</b></div>):<div></div>} 
                                        {profileData.degree?(<div><GradeOutlinedIcon></GradeOutlinedIcon> {profileData.degree}</div>):<div></div>} 
                                        <div> {profileData.year_of_starting?profileData.year_of_starting:""}/{profileData.month_of_starting?profileData.month_of_starting:""}-{profileData.year_of_passing?profileData.year_of_passing:""}/{profileData.month_of_passing?profileData.month_of_passing:""}</div>
                                        {profileData.major?(<div><b>Major in</b> {profileData.major}</div>):<div></div>} 
                                        {profileData.cgpa?(<div><b>Cummulative GPA</b> {profileData.cgpa}</div>):<div></div>} 

                                        
                                            <hr/>
                                            </div>
                                            {/* ) */}
                                    {/* })} */}

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
                                    {/* {this.state.experience.map((data, index) => { */}
                                    {/* {profileData.experience.map((data, index) => { */}

                                        {/* return ( */}
                                            <div>
                                        {profileData.company?(<div> <h4><b><WorkOutlineOutlinedIcon></WorkOutlineOutlinedIcon> {profileData.company}</b></h4></div>):<div></div>} 
                                        {profileData.title?(<div><PersonOutlinedIcon></PersonOutlinedIcon> {profileData.title}</div>):<div></div>} 
                                        {profileData.location?(<div><LocationOnOutlinedIcon></LocationOnOutlinedIcon> {profileData.location}</div>):<div></div>} 
                                        {profileData.year_of_starting?(<div><DateRangeOutlinedIcon></DateRangeOutlinedIcon> {profileData.year_of_starting?profileData.year_of_starting:""}/{profileData.month_of_starting?profileData.month_of_starting:""} - {profileData.year_of_ending?profileData.year_of_ending:""}/{profileData.month_of_ending?profileData.month_of_ending:""}</div>):<div></div>} 

                                        
                                            <hr/>
                                            </div>
                                            {/* ) */}
                                    {/* })} */}

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
                                   
                                    {/* {this.state.mobile?(<div><PhoneOutlinedIcon></PhoneOutlinedIcon> {this.state.mobile}</div>):<div></div>} 
                                    {this.state.email?(<div><EmailOutlinedIcon></EmailOutlinedIcon> {this.state.email}</div>):<div></div>}  */}
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
// export default ViewProfile;
// const mapStateToProps = state => {
//     console.log(state.studData)
//     console.log(state.redirectToMessages)
    
//     return {

//         profileData:state.studData,
//         redirectToMessages:state.redirectToMessages

//     };
//   };
  
//   function mapDispatchToProps(dispatch) {
//     return {
//       viewStudentProfile: payload => dispatch(viewStudentProfile(payload)),
//       sendmessage: payload => dispatch(sendmessage(payload))
//     };
//   }
  
//   export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
export default withApollo(ViewProfile)