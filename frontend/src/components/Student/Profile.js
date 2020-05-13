
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
import { withApollo } from 'react-apollo';
import { student } from '../../queries/queries';




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

    fetchProfile=async()=>
    {
        const { data } = await this.props.client.query({
            query: student,
            variables: { studentId: sessionStorage.getItem("studentId") },
            fetchPolicy: 'no-cache'
        })
        console.log(data)
        this.setState({
            profileData: data.student,
            name: data.student.name,
            email: data.student.email,
            college: data.student.college,
            dob: data.student.dob,
            city: data.student.city,
            state: data.student.state,
            country: data.student.country,
            career_objective: data.student.career_objective,
            
            
            education: data.student.education,
            experience: data.student.experience

        })
    }

    

   componentDidMount() {

    this.fetchProfile()
        let stud_id = sessionStorage.getItem('id');
        console.log("inside did mount")
        console.log(stud_id)
        
    }

    render() {
       

        let basic_props = {
            dob: this.state.dob,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            }
        let skill_props = {
                skills: "C,JAVA, ANGULAR JS"
                }
        let journey_props = {
                career_objective: this.state.career_objective
                    }
        let contact_props = {
                email: this.state.email,
                mobile: "99999999999"
                        }
        let profilepic_props={
                name: this.state.name,
                college: this.state.college,
                degree: this.state.degree,
                major:this.state.major,
        }

        let education_props={
            education: this.state.education
    }
    let experience_props={
        experience: this.state.experience
}

      
        return (
            <div style={{ backgroundColor: "#F7F7F7" }}>
                <div class="row">
                    <div class="col-md-1"> </div>
                    <div class="col-md-3"> 
                        <Profilepic {...profilepic_props}/>
                        <Basic {...basic_props}/>   
                        <Skill {...skill_props}/>
                         <Contact {...contact_props}/>

                       
                    </div>
                    <div class="col-md-7">
                        <Journey {...journey_props}/>
                        <Education {...education_props}/>
                        <Experience {...experience_props}/> 

                        
                    </div>
                    <div class="col-md-1"> </div>
                </div>
            </div>
        )
    }
}

  
export default withApollo(Profile)