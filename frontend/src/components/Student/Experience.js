
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { withApollo } from 'react-apollo';
import { updateStudentExperience } from '../../mutation/mutations';



class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            b_id: "",
            company: "",
            title: "",
            location: "",
            description: "",
            year_of_starting: 0,
            month_of_starting: 0,
            year_of_ending: 0,
            month_of_ending: 0,
            experience:[],
            
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
        console.log(nextProps.experience)
        if (this.props.education!==nextProps.experience)
        this.setState({ education:nextProps.experience});    
            if (nextProps.experience) {
                    console.log("aaa")
                this.setState({redirect:false,
                
                    company: nextProps.experience.company,
                    title: nextProps.experience.title,
                    location: nextProps.experience.location,
                    description: nextProps.experience.description,
                    year_of_starting: nextProps.experience.year_of_starting,
                    month_of_starting: nextProps.experience.month_of_starting,
                    year_of_ending: nextProps.experience.year_of_ending,
                    month_of_ending: nextProps.experience.month_of_ending
                
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
            mutation: updateStudentExperience,
            variables: {
                id: stud_id,
            // edu_id:this.state.b_id,
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            description: this.state.description,
            year_of_starting: parseInt(this.state.year_of_starting),
            month_of_starting: parseInt(this.state.month_of_starting),
            year_of_ending: parseInt(this.state.year_of_ending),
            month_of_ending: parseInt(this.state.month_of_ending)
            }
        })
        let response = res.data.updateStudentExperience;
        console.log(response)
        if (response) {
            this.setState({
                
                rerender: false,
                experience:response.experience,
                company: response.experience.company,
                title: response.experience.title,
                location: response.experience.location,
                description: response.experience.description,
                year_of_starting: response.experience.year_of_starting,
                month_of_starting: response.experience.month_of_starting,
                year_of_ending: response.experience.year_of_ending,
                month_of_ending: response.experience.month_of_ending

            });
        } else {
            console.log(res.data)
        }

       
    }


   


    render() {
        let renderRedirect = null;
        let addEduData=null;
        console.log(this.state.experience)

        let expData=this.state.experience
        if (this.state.redirect === true){
            renderRedirect = (
                <div>
                    <Card>
                 <CardContent>
                 <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Experience Details</p></b>
                                            </Typography>
                     <div style={{ width: '70%' }} class="form-group">
                         <input onChange={this.inputChangeHandler} type="text" class="form-control" name="company" value={this.state.company} placeholder="Company" /><br/>
                         <input onChange={this.inputChangeHandler} type="text" class="form-control" name="title" value={this.state.title} placeholder="Title" /><br/>
                         <input onChange={this.inputChangeHandler} type="text" class="form-control" name="location" value={this.state.location} placeholder="Location" /><br/>
                         <textarea onChange={this.inputChangeHandler} class="form-control" name="description" value={this.state.description} placeholder="Description" rows="3" cols="8" /><br/>
                         <div class="row">    
                         <div class="col-md-3">           
                         <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_starting" value={this.state.year_of_starting} placeholder="Start Year"  />                       
                         </div> <div class="col-md-3">
                         <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_starting" value={this.state.month_of_starting} placeholder="Start Month" min="1" max="12" />                       
                         </div> <div class="col-md-3">

                         <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_ending" value={this.state.year_of_ending} placeholder="End Year" />
                         </div> <div class="col-md-3">

                         <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_ending" value={this.state.month_of_ending} placeholder="End Month" min="1" max="12" />
                        </div> </div>    
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
                                                <b><p style={{ fontSize: '24px' }}>Experience Details</p></b>
                                            </Typography>
                                    

                                                
                                    <div class="row">
                                    <div class="col-md-10">
                                    <div key={expData._id}>
                            {expData.company?(<div> <h4><b><WorkOutlineOutlinedIcon></WorkOutlineOutlinedIcon> {expData.company}</b></h4></div>):<div></div>} 
                        {expData.title?(<div><PersonOutlinedIcon></PersonOutlinedIcon> {expData.title}</div>):<div></div>} 
                        {expData.location?(<div><LocationOnOutlinedIcon></LocationOnOutlinedIcon> {expData.location}</div>):<div></div>} 
                        {expData.year_of_starting?(<div><DateRangeOutlinedIcon></DateRangeOutlinedIcon> {expData.year_of_starting?expData.year_of_starting:""}/{expData.month_of_starting?expData.month_of_starting:""} - {expData.year_of_ending?expData.year_of_ending:""}/{expData.month_of_ending?expData.month_of_ending:""}</div>):<div></div>} 

                                           <hr/>
                                        </div></div>
                                        <div class="col-md-2">
                                        <button onClick={this.editProfile} class="btn btn-primary" value={expData._id} style={{backgroundColor:"#F7F7F7",color:"black"}}>edit</button>                                 
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

export default withApollo(Experience)



























