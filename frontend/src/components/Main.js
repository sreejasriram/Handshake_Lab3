import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NavbarPage from './LandingPage/Navbar';
import CmpySignup from './Company/Signup';
import CmpyLogin from './Company/Login';
import CmpyJobs from './Company/Jobs';
import CmpyHome from './Company/Home';
import ViewProfile from './Company/ViewProfile'
import Students from './Company/Students'
import ViewApplicants from './Company/ViewApplicants'
import CmpyProfile from './Company/Profile';
import StudLogin from './Student/Login';
import StudSignup from './Student/Signup';
import StudProfile from './Student/Profile';
import StudJobs from './Student/Jobs';
import JobDetails from './Student/JobDetails';
import HandshakeStudents from './Student/Students'
import StudApplications from './Student/Applications';
import StudViewProfile from './Student/ViewProfile'







//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={NavbarPage}/>
               <Route path="/studlogin" component={StudLogin}/>
               <Route path="/studsignup" component={StudSignup}/>
               <Route path="/cmpylogin" component={CmpyLogin}/>
               <Route path="/cmpysignup" component={CmpySignup}/>
               <Route path="/profile" component={CmpyProfile}/>
               <Route path="/jobs" component={CmpyJobs}/>
               <Route path="/home" component={CmpyHome}/>
               <Route path="/students/" component={Students}/>
               <Route path="/ViewProfile/:stud_id" component={ViewProfile}/>
               <Route path="/HandshakeStudents/" component={HandshakeStudents}/>         
               <Route path="/StudViewProfile/:stud_id" component={StudViewProfile}/>
               <Route path="/studJobs" component={StudJobs}/>
               <Route path="/jobdetails" component={JobDetails}/>
               <Route path="/ViewApplicants/:jobId" component={ViewApplicants}/>
               <Route path="/applications" component={StudApplications}/>             
               <Route path="/studprofile" component={StudProfile}/> 

            </div>
        )
    }
}
//Export The Main Component
export default Main;