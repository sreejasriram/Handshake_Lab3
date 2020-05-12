import { gql } from 'apollo-boost';

const jobs = gql`
query jobs($companyId:String){
    jobs(companyId: $companyId){
      title, posting_date,description,location,deadline,salary,category
    }
  }
`;

const alljobs = gql`
query alljobs{
    alljobs{
      title, posting_date,description,companydetails{name}
    }
  }
`;
const jobdetails = gql`
query jobdetails($jobId:String){
    jobdetails(jobId:$jobId){
      title, posting_date,description,companydetails{name,email}
    }
  }
`;

const company = gql`
query company($companyId:String){
    company(companyId:$companyId){
      name,email,location,description
    }
  }
  
`;

const student = gql`
query student($studentId:String){
    student(studentId:$studentId){
      name,email,college,dob,city,state,country,career_objective,education{ college_name,
        location,
        degree,
        major,
        cgpa,
        year_of_starting,
        month_of_starting,
        year_of_passing,
        month_of_passing},
        experience{    company,
          title,
          location,
          description,
          year_of_starting,
          month_of_starting,
          year_of_ending,
          month_of_ending}

    }
  }
  
`;



const allStudents = gql`
query allStudents{
    allStudents
    {
      name,email,college,_id
    }
  }
  
`;

const listAppliedJobs = gql`
query listAppliedJobs($studentId:String){
    listAppliedJobs(studentId:$studentId){
      _id,title,companydetails{name,email}
    }
  }
  
`;

const listApplicants = gql`
query listApplicants($jobId:String){
    listApplicants(jobId:$jobId){
      _id,title,location,salary,applications{studentId,status},
      listApplicants{_id,name,email}
    }
  }
  
`;

export { jobs, alljobs, jobdetails, company, student, allStudents , listApplicants,  listAppliedJobs};
