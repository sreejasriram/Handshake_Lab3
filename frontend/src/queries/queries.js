import { gql } from 'apollo-boost';

const jobs = gql`

query {
    jobs(companyId:"5e9eb47b24394e5e4883644c"){
      title, posting_date,description
    }
  

`;

const alljobs = gql`
query {
    alljobs{
      title, posting_date,description,companydetails{name}
    }
  
`;
const jobdetails = gql`
query {
    jobdetails(jobId:"5e9e6e234a66cf4eec41448a"){
      title, posting_date,description,companydetails{name,email}
    }
  
`;

const company = gql`
query {
    company(companyId:"5e9eb47b24394e5e4883644c"){
      name,email,location,description
    }
  }
  
`;

const student = gql`
query {
    student(studentId:"5eb2ab62127c303c8c64a21c"){
      name,email,college
    }
  }
  
`;

const allStudents = gql`
{
    allStudents
    {
      name,email,college,_id
    }
  }
  
`;

const listAppliedJobs = gql`
query {
    listAppliedJobs(studentId:"5eb2ab62127c303c8c64a21c"){
      _id,title,companydetails{name,email}
    }
  }
  
`;

const listApplicants = gql`
query {
    listApplicants(jobId:"5e9e6e234a66cf4eec41448a"){
      _id,title,location,salary,applications{studentId,status},
      listApplicants{_id,name,email}
    }
  }
  
`;

export { jobs, alljobs, jobdetails, company, student, allStudents , listApplicants,  listAppliedJobs};
