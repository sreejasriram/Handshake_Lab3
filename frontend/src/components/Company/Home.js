import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import { withApollo } from 'react-apollo';
import { jobs } from '../../queries/queries';



class Home extends Component {
    constructor(props) {
        super(props);
        let cmpny_id = sessionStorage.getItem('companyId');
        this.state = {
            title: "",
            posting_date: "",
            deadline: "",
            location: "",
            salary: "",
            description: "",
            category: "",
            dataRetrieved: false,
            redirect: false,
            jobData: [],
            editJob:"",
            view_applicants:false,
            companyId:cmpny_id,
            page: 0,
            rowsPerPage: 5



        }

        this.postJobs = this.postJobs.bind(this);
        this.viewApplicants = this.viewApplicants.bind(this);
    }

    postJobs = (e) => {
        var headers = new Headers();
        e.preventDefault();
        this.setState({
            redirect: true
        })
    }


    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
        console.log(this.state.page)
    };




    viewApplicants = (e) => {
        console.log(e.target.value)
        this.setState({
            view_applicants: true,
            editJob:e.target.value
        })
    }

    componentDidMount() {   
        // const data = {
        //     companyId: this.state.companyId
        // }
        // console.log(data)
      this.fetchJobs()
        // this.props.fetchCompanyJobs(data);

        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        // axios.get(environment.baseUrl+'/company/getjobs/'+data.companyId)
        //     .then(response => {
        //         console.log("in frontend after response");
        //         console.log(response.data.rows)
        //         if (response.data.rows) {
        //             this.setState({
        //                 dataRetrieved: true,
        //                 jobData: response.data.rows
        //             });
                  


        //         } else if (response.data.error) {
        //             console.log("response" + response.data.error)

        //         }


        //     })
    }

    fetchJobs=async()=>{

        const { data } = await this.props.client.query({
            query: jobs,
            variables: { companyId: sessionStorage.getItem("companyId") },
            fetchPolicy: 'no-cache'
        })
        console.log(data)
        if (data) {
            this.setState({
                dataRetrieved: true,
                jobData: data.jobs
            });
            


        } else {
            console.log("error")

        }

    }


    render() {
        let renderRedirect = null;
        if (this.state.redirect === true) {
            renderRedirect = <Redirect to='/jobs' />
        }
        if (this.state.view_applicants === true) {
            renderRedirect = <Redirect to={`/ViewApplicants/${this.state.editJob}`}/>
        }
        let jobData = this.state.jobData;
        console.log(jobData)
        return (
            <div>
                <div class="container">
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Job Postings </h2>
                            </div>
                            <button onClick={this.postJobs} class="btn btn-primary">Add New Job</button>
                            <div>
                                {renderRedirect}
                            </div>
                           
                                <div>

                                {jobData?jobData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((data, index) => {

                                    // {jobData.map((data, index) => {
                                        
                                        return (
                                            <div key={data._id}>
                                                <br/><br/>
                                                 <Card>
                                        <CardContent>
                                        <Typography color="black" gutterBottom>
                                                <b><h5>{data.title}                                                                                
                                                </h5></b> </Typography>

                                                <p><b>Role:</b> {data.description}</p> 
                                                <p><b>Location:</b> {data.location}</p>
                                                <p><b>Category:</b> {data.category}</p>
                                                <button onClick={this.viewApplicants} class="btn btn-primary" value={data._id}  style={{backgroundColor:'#1569E0', marginLeft:'800px', borderRadius:'15px'}} >View Applicants</button>
                                                </CardContent></Card>
                                                {/* <button onClick={this.editJobs} class="btn btn-primary"  value={data.job_id}>Edit Job</button> */}
                                            </div>

                                        )
                                    }):""
                                    
                                    }
                     <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <TablePagination
                            rowsPerPageOptions={[5]}
                            count={this.state.jobData.length}
                            page={this.state.page}
                            rowsPerPage={this.state.rowsPerPage}
                            onChangePage={this.handleChangePage}
                        />
                    </div>  <div class="col-md-4"></div>
                </div>

                        </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// export default Home;
export default withApollo(Home)

// const mapStateToProps = state => {
//     console.log(state.allCompanyJobs)
    
//     return {

//         jobData:state.allCompanyJobs

//     };
//   };
  
//   function mapDispatchToProps(dispatch) {
//     return {
//       fetchCompanyJobs: payload => dispatch(fetchCompanyJobs(payload))
//     };
//   }
  
//   export default connect(mapStateToProps, mapDispatchToProps)(Home);