

import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import { withApollo } from 'react-apollo';
import { updateStudentEducation } from '../../mutation/mutations';



class Education extends Component {
    constructor(props) {
        super(props);
        this.state = {
            b_id: "",
            college_name: "",
            location: "",
            degree: "",
            major: "",
            cgpa: "",
            year_of_starting: 0,
            month_of_starting: 0,
            year_of_passing: 0,
            month_of_passing: 0,
            
            education:[],
            redirect: true,
            rerender: false,
           
        }
        this.editProfile = this.editProfile.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.cancel = this.cancel.bind(this);
        
    }
    
   
    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }
    editProfile = (e) => {
        e.preventDefault();
        const value = e.target.value
        this.setState({
            redirect: true
        })

    }
    cancel = (e) => {
        e.preventDefault();
        this.setState({
            redirect: false

        })
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.education)
        if (this.props.education!==nextProps.education)
        this.setState({ education:nextProps.education});    
            if (nextProps.education) {
                    console.log("aaa")
                this.setState({redirect:false,
                
                    college_name: nextProps.education.college_name,
                    location: nextProps.education.location,
                    degree: nextProps.education.degree,
                    major: nextProps.education.major,
                    cgpa: nextProps.education.cgpa,
                    year_of_starting: nextProps.education.year_of_starting,
                    month_of_starting: nextProps.education.month_of_starting,
                    year_of_passing: nextProps.education.year_of_passing,
                    month_of_passing: nextProps.education.month_of_passing
                
                })}
        }


    saveProfile = async(e) => {
        e.preventDefault();
        let stud_id = sessionStorage.getItem('studentId');
        this.setState({
             redirect: false,
            rerender: false
        })

        
        let res = await this.props.client.mutate({
            mutation: updateStudentEducation,
            variables: {
                id: stud_id,
            college_name: this.state.college_name,
            location: this.state.location,
            degree: this.state.degree,
            major: this.state.major,
            cgpa: this.state.cgpa,
            year_of_starting: parseInt(this.state.year_of_starting),
            month_of_starting: parseInt(this.state.month_of_starting),
            year_of_passing: parseInt(this.state.year_of_passing),
            month_of_passing: parseInt(this.state.month_of_passing)
            }
        })
        let response = res.data.updateStudentEducation;
        console.log(response)
        if (response) {
            this.setState({
                
                rerender: false,
                education:response.education,
                college_name: response.education.college_name,
                location:response.education.location,
                degree: response.education.degree,
                major: response.education.major,
                cgpa: response.education.cgpa,
                year_of_starting: response.education.year_of_starting,
                month_of_starting: response.education.month_of_starting,
                year_of_passing: response.education.year_of_passing,
                month_of_passing: response.education.month_of_passing

            });
        } else {
            console.log(res.data)
        }

       
    }


   


    render() {
        let renderRedirect = null;
        let addEduData=null;
        console.log(this.state.education)
                console.log(this.state.college_name)

        let eduData=this.state.education
        if (this.state.redirect === true){
            renderRedirect = (
                <div>
                    <Card>
                        <CardContent>
                        <Typography color="black" gutterBottom><b><p style={{ fontSize: '24px' }}>Education Details</p></b></Typography>
                            <div style={{ width: '70%' }} class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="college_name" value={this.state.college_name} placeholder="School/College Name" /><br/>
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="location" value={this.state.location} placeholder="Location" /><br/>
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="degree" value={this.state.degree} placeholder="Degree" /><br/>
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="major" value={this.state.major} placeholder="Major" /><br/>
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="cgpa" value={this.state.cgpa} placeholder="CGPA" /><br/>
                                <div class="row">    
                        <div class="col-md-3">  
                                <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_starting" value={this.state.year_of_starting} placeholder="Start Year" /><br/>
                                </div>  <div class="col-md-3">
                                <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_starting" value={this.state.month_of_starting} placeholder="Start Month" min="1" max="12" /><br/>
                                </div>  <div class="col-md-3">
                                <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_passing" value={this.state.year_of_passing} placeholder="End Year" /><br/>
                                </div>  <div class="col-md-3">
                                <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_passing" value={this.state.month_of_passing} placeholder="End Month" min="1" max="12" /><br/>
                            </div></div>
                            </div>
                            <button onClick={this.saveProfile} class="btn btn-primary">save</button>&nbsp;
                            <button onClick={this.cancel} class="btn btn-primary" style={{backgroundColor:"#F7F7F7",color:"black"}}>Cancel</button>
                        </CardContent></Card><br /><br />
                </div>
            );


        }
        else if (this.state.redirect === false || this.state.rerender === true ) {
   
            renderRedirect = 
                            <div> 
                                    <Card>
                                        <CardContent>
                                       
                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Education Details</p></b>
                                            </Typography>
                                    

                                                
                                    <div class="row">
                                    <div class="col-md-10">
                                    <div key={eduData._id}>
                                    {eduData.college_name?(<div><b><SchoolRoundedIcon></SchoolRoundedIcon> {eduData.college_name}</b></div>):<div></div>} 
                                    {eduData.degree?(<div><GradeOutlinedIcon></GradeOutlinedIcon> {eduData.degree}</div>):<div></div>} 
                                    <div> {eduData.year_of_starting?eduData.year_of_starting:""}/{eduData.month_of_starting?eduData.month_of_starting:""}-{eduData.year_of_passing?eduData.year_of_passing:""}/{eduData.month_of_passing?eduData.month_of_passing:""}</div>
                                    {eduData.major?(<div><b>Major in</b> {eduData.major}</div>):<div></div>} 
                                    {eduData.cgpa?(<div><b>Cummulative GPA</b> {eduData.cgpa}</div>):<div></div>}
                                            <hr/>
                                                 </div></div>
                                        <div class="col-md-2">
                                        <button onClick={this.editProfile} class="btn btn-primary" value={eduData._id} style={{backgroundColor:"#F7F7F7",color:"black"}}>edit</button>                                 
                                        </div>
                                        
                                            </div>
                                          
                                        </CardContent>
                                    </Card>
                                    <br /><br />                          
                        </div>          
        }
        return (
            <div>
                {renderRedirect}
            </div>
        )
    }
}

export default withApollo(Education)

























