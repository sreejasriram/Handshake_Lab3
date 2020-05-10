
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Basic from './Basic';
import Education from './Education';
import Skill from './Skill';
import Experience from './Experience';
import Contact from './Contact';
import Journey from './Journey';
import Profilepic from './Profilepic';
import cookie from 'react-cookies';
import {environment} from '../../Utils/constants';

import { connect } from "react-redux";
import { fetchProfile } from "../../redux/actions/index";



class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

            profileData:"",
            id: "",
            name: "",
            email: "",
            password: "",
            college: "",
            dob: "",
            city: "",
            state: "",
            country: "",
            career_objective: "",
            mobile: "",
            skills: "",
            education: [
                {
                    college_name: "",
                    location:"",
                    degree: "",
                    major: "",
                    cgpa: "",
                    year_of_starting: "",
                    month_of_starting: "",
                    year_of_passing: "",
                    month_of_passing: "",
                }
            ],
            experience: [
                {
                    company: "",
                    title: "",
                    location: "",
                    description: "",
                    year_of_starting: "",
                    month_of_starting: "",
                    year_of_ending: "",
                    month_of_ending: "",
                }
            ]
        
        }
        
    }

   componentDidMount() {

    this.props.fetchProfile();
        let stud_id = sessionStorage.getItem('id');
        console.log("inside did mount")
        console.log(stud_id)
        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        // axios.get(environment.baseUrl+'/student/student_profile_info/'+stud_id)
        //     .then(response => {
        //         console.log("in frontend after response");
        //         console.log(response.data.rows)
        //         response.data.rows = response.data.rows[0]
        //         console.log(response.data.rows)
        //             if (response.data.rows) {
        //                 console.log("aaa")
        //                 this.setState({
        //                     dataRetrieved: true,
        //                     profileData: response.data.rows,
        //                     name: response.data.rows.name,
        //                     email: response.data.rows.email,
        //                     college: response.data.rows.college,
        //                     dob: response.data.rows.dob,
        //                     city: response.data.rows.city,
        //                     state: response.data.rows.state,
        //                     country: response.data.rows.country,
        //                     career_objective: response.data.rows.career_objective,
        //                     mobile: response.data.rows.mobile,
        //                     skills: response.data.rows.skills,
        //                     image: response.data.rows.image,
                            
        //                     education: response.data.rows.education,
        //                     experience: response.data.rows.experience
        //                 });
        //                 if (response.data.rows.dob){
        //                     this.setState({
        //                     dob: response.data.rows.dob.substring(0,10)})
        //                 }
             

        //             } 
                
        //         else if (response.data.error) {
        //             console.log("response" + response.data.error)
        //         }
        //     })
    }

    render() {
        let logincookie = null
       
        if (!cookie.load('student')) {
            logincookie = <Redirect to="/" />
        }

        let basic_props = {
            dob: this.state.dob,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            }
        let skill_props = {
                skills: this.state.skills
                }
        let journey_props = {
                career_objective: this.state.career_objective
                    }
        let contact_props = {
                email: this.state.email,
                mobile: this.state.mobile
                        }
        let profilepic_props={
                name: this.state.name,
                college: this.state.college,
                degree: this.state.degree,
                major:this.state.major,
                image:this.state.image
        }

        let education_props={
            education: this.state.education
    }
    let experience_props={
        experience: this.state.experience
}

      
        return (
            <div style={{ backgroundColor: "#F7F7F7" }}>
                {logincookie}
                <div class="row">
                    <div class="col-md-1"> </div>
                    <div class="col-md-3"> 
                        {/* <Profilepic {...profilepic_props}/> */}
                        {/* <Basic {...basic_props}/>    */}
                        {/* <Skill {...skill_props}/> */}
                         {/* <Contact {...contact_props}/> */}
                        <Profilepic  profile= {this.props.profileData}/>
                        <Basic profile= {this.props.profileData}/>   
                        {/* <Skill profile= {this.props.profileData}/> */}
                        <Contact profile= {this.props.profileData}/>
                    </div>
                    <div class="col-md-7">
                        {/* <Journey {...journey_props}/> */}
                        {/* <Education {...education_props}/> */}
                        {/* <Experience {...experience_props}/>  */}

                        <Journey profile= {this.props.profileData}/> 
                        <Education profile= {this.props.profileData}/>
                        <Experience profile= {this.props.profileData}/> 
                      
                    </div>
                    <div class="col-md-1"> </div>
                </div>
            </div>
        )
    }
}
// export default Profile;
const mapStateToProps = state => {
    console.log(state.profileData)
    
    return {

    profileData:state.profileData

    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchProfile: payload => dispatch(fetchProfile(payload))
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile);