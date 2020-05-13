import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withApollo } from 'react-apollo';
import TablePagination from '@material-ui/core/TablePagination';
import emptyPic from '../../images/empty-profile-picture.png';
import { Avatar } from '@material-ui/core';
import { allStudents } from '../../queries/queries';



class Students extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRetrieved: false,
            stuData: [],
            status: "",
            namesearch: "",
            clgsearch: "",
            view_profile: false,
            studId: "",
            page: 0,
            rowsPerPage: 2,
            emptyprofilepic: emptyPic


        }
        this.statusFilter = this.statusFilter.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.viewProfile = this.viewProfile.bind(this);

    }

    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
        console.log(this.state.namesearch)
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
        console.log(this.state.page)
    };


    statusFilter(e) {
        console.log(e)
        this.setState({
            status: e.target.value
        })
    }
    viewProfile = (e) => {
        var headers = new Headers();
        console.log(e.target.value);
        this.setState({
            view_profile: true,
            studId: e.target.value
        })
    }
    componentDidMount() {
      this.fetchAllStudents()

        
    }

    fetchAllStudents=async()=>{
    const { data } = await this.props.client.query({
        query: allStudents,
        fetchPolicy: 'no-cache'
    })
    console.log(data)
    if(data){
    if (data.allStudents) {
            this.setState({
                dataRetrieved: true,
                stuData: data.allStudents
            });
        } else {
            console.log("error"+data)
        }

    }
    }

    render() {

        let stuData = this.state.stuData;
        console.log(stuData)
        let namesearch = this.state.namesearch;
        let clgsearch = this.state.clgsearch;
        let renderRedirect = null
        if (this.state.view_profile === true) {
            renderRedirect = <Redirect to={`/ViewProfile/${this.state.studId}`} />
        }
        if (stuData) {

            if (namesearch.length > 0) {
                stuData = stuData.filter((job) => {
                    return (job.name.indexOf(namesearch) > -1)

                })
            }
            if (clgsearch.length > 0) {
                stuData = stuData.filter((job) => {
                    console.log(job)
                    if (job.college != null)
                        return job.college.indexOf(clgsearch) > -1
                })
            }
          
            console.log(stuData)

        }



        return (
            <div>
                {renderRedirect}
                <div class="row">
                <div class="col-md-3">
                <Card>
                    <CardContent>
                        <div>
                        < Typography color="black" gutterBottom>
                   <b><p style={{ fontSize: '24px' }}>Filter</p></b></ Typography>
                            <div><input type="text" name="namesearch" id="namesearch"  placeholder="student name" onChange={this.inputChangeHandler} /></div><br/>
                            <div><input type="text" name="clgsearch" id="clgsearch"  placeholder="student college" onChange={this.inputChangeHandler} /></div><br/>
                        </div>
                    </CardContent>
                </Card>
                </div>
                <div class="col-md-7">
                {stuData?stuData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((data, index) => {

                    return (
                        <div key={data._id}>
                            <Card>
                                <CardContent>
                                <div class="row">
                                    <div class="col-md-1" style={{ paddingRight: '0px' }}>
                                        <Avatar src={data.image ? data.image : this.state.emptyprofilepic} style={{ width: '36px', height: '36px', borderRadius: '50%', textAlign: 'center' }}></Avatar>
                                    </div>
                                    <div class="col-md-5" style={{ padding: '0px' }}>
                                    < Typography color="black" gutterBottom>

                                        <b><p style={{ fontSize: '24px' }}>{data.name?data.name:""}</p></b>
                                    </ Typography>                                               
                                        </div>
                                </div>

                                    <p> {data.college?data.college:""}</p>
                                    <p> {data.email?data.email:""}</p>
                                    <p> {data.mobile?data.mobile:""}</p>
                                    <button onClick={this.viewProfile} class="btn btn-primary" value={data._id}>View Profile</button>
                                </CardContent>
                            </Card>
                            <br /><br />
                        </div>
                    )
                }):""}
                
                <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <TablePagination
                            rowsPerPageOptions={[2]}
                            count={this.state.stuData.length}
                            page={this.state.page}
                            rowsPerPage={this.state.rowsPerPage}
                            onChangePage={this.handleChangePage}
                        />
                    </div>  <div class="col-md-4"></div>
                </div>
                </div>
                <div class="col-md-2"></div>
                </div>
            </div>

        )
    }
}

export default withApollo(Students)