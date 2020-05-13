import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Card,Avatar} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import emptyPic from '../../images/empty-profile-picture.png';
import { withApollo } from 'react-apollo';
import { updateStudentProfilepic} from '../../mutation/mutations';



class Profilepic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            degree: "",
            college:"",
            major:"",
            image:"",
            redirect: true,
            rerender: false,
            emptyprofilepic:emptyPic,

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
            if (this.props.name!==nextProps.name)
            this.setState({ name:nextProps.name});
            if (this.props.degree!==nextProps.degree)
            this.setState({ degree:nextProps.degree});
            if (this.props.college!==nextProps.college)
            this.setState({ college:nextProps.college});
            if (this.props.major!==nextProps.major)
            this.setState({ major:nextProps.major});
            
            
            
            if (nextProps.name || nextProps.degree || nextProps.college || nextProps.major) {
                this.setState({redirect:false})}



        }
    saveProfile = async(e) => {
        e.preventDefault();
        let stud_id = sessionStorage.getItem('studentId');
        this.setState({
            redirect: false,
            rerender: false
        })
       
        let res = await this.props.client.mutate({
            mutation: updateStudentProfilepic,
            variables: {
                id: sessionStorage.getItem('studentId'),
                name: this.state.name
            }
        })
        let response = res.data.updateStudentProfilepic;
        console.log(response)
        if (response) {
            this.setState({
                
                rerender: false,
                name: response.name,
                degree: response.degree,
                major: response.major,
                college: response.college

            });
        } else {
            console.log(res.data)
        }
       
    }


    render() {
        let renderRedirect = null;
      
        if (this.state.redirect === true){
            renderRedirect = (
                <div>
                    <Card>
                        <CardContent>
                            
                        <Typography color="black" gutterBottom><b><p style={{ fontSize: '24px' }}>Profile</p></b></Typography>
                            <div class="upload-btn-img">
                            
                        </div>
                            <div style={{ width: '70%' }} class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="name" value={this.state.name} placeholder="Name" />
                            </div>
                            <button onClick={this.saveProfile} class="btn btn-primary">save</button>&nbsp;
                            <button onClick={this.cancel} class="btn btn-primary" style={{backgroundColor:"#F7F7F7",color:"black"}}>Cancel</button>
                            </CardContent></Card><br /><br />
                </div>
            );


        }
        else if (this.state.redirect === false || this.state.rerender === true) {
                renderRedirect = 
                            <div>
                                    <Card>
                                        <CardContent>
                                            <center>
                                        <div class="row">
                                            <div class="col-md-10">
                                            <Avatar src={this.state.emptyprofilepic} style={{ width: '104px', height: '104px', borderRadius: '50%', textAlign: 'center' }}></Avatar>
                                           
                                            </div>
                                            <div class="col-md-2">
                                            <CreateOutlinedIcon onClick={this.editProfile} style={{ alignContent: 'right',height:"15px",width:"15px" }}></CreateOutlinedIcon>
                                            </div>
                                            </div>
                                            <Typography color="black" gutterBottom>
                                            <h4><b>{this.state.name?this.state.name:""}</b></h4>
                                            </Typography>
                                            <p>{this.state.college?this.state.college:""}</p>
                                            <p>{this.state.degree?this.state.degree:""} {this.state.major?this.state.major:""} </p>
                                            <p>{this.state.cgpa?this.state.cgpa:""} </p>
                                            </center>
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


export default withApollo(Profilepic)



