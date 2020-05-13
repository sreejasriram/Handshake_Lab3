import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { withApollo } from 'react-apollo';
import { updateStudentBasic } from '../../mutation/mutations';


class Basic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dob: "",
            city: "",
            state: "",
            country: "",
            redirect: true,
            rerender: false
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
            if (this.props.dob!==nextProps.dob)
            this.setState({ dob:nextProps.dob});
            if (this.props.city!==nextProps.city)
            this.setState({ city:nextProps.city});
            if (this.props.state!==nextProps.state)
            this.setState({ state:nextProps.state});
            if (this.props.country!==nextProps.country)
            this.setState({ country:nextProps.country});

            

            if (nextProps.dob || nextProps.city || nextProps.state || nextProps.country) {
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
            mutation: updateStudentBasic,
            variables: {
                id: stud_id,
                dob: this.state.dob,
                city: this.state.city,
                state: this.state.state,
                country: this.state.country
            }
        })
        let response = res.data.updateStudentBasic;
        console.log(response)
        if (response) {
            this.setState({
                
                rerender: false,
                dob: response.dob,
                city: response.city,
                state: response.state,
                country: response.country

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
                        <Typography color="black" gutterBottom><b><p style={{ fontSize: '24px' }}>Personal Details</p></b></Typography>
                            <div style={{ width: '70%' }} class="form-group">
                                <input type="date" class="form-control" name="dob" value={this.state.dob} onChange={this.inputChangeHandler} placeholder="Date of Birth" />
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="city" value={this.state.city} placeholder="City" />
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="state" value={this.state.state} placeholder="State" />
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="country" value={this.state.country} placeholder="Country" />
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
                                        <div class="row">
                                            <div class="col-md-10">
                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Personal Details</p></b>

                                            </Typography>
                                            </div>
                                            <div class="col-md-2">
                                            <CreateOutlinedIcon onClick={this.editProfile} style={{ alignContent: 'right',height:"15px",width:"15px" }}></CreateOutlinedIcon>
                                            </div>
                                            </div>
                                            {this.state.dob?(<div><CakeOutlinedIcon></CakeOutlinedIcon> {this.state.dob}</div>):<div></div>}
                                            {this.state.country || this.state.city ||  this.state.state?(<div><LocationOnOutlinedIcon></LocationOnOutlinedIcon> {this.state.city}, {this.state.state}, {this.state.country} </div>):<div></div>}

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

export default withApollo(Basic)