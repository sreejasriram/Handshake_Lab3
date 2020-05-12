import { gql } from 'apollo-boost';

const addJob = gql`
mutation addJob(
    $title:String,
    $posting_date:String,
    $deadline:String,
    $location:String,
    $salary:String,
    $description:String,
    $category:String,
    $companyId:String){
        addJob(
        title: $title,
        posting_date: $posting_date,
        deadline: $deadline,
        location: $location,
        salary: $salary,
        description: $description,
        category: $category,
        companyId:$companyId){
            title,posting_date,deadline,location,salary,description,category
   }
   
}
`;

const addCompany = gql`
mutation addCompany(
    $name:String,
    $email:String,
    $password:String,
    $location:String
){
    addCompany(
    name: $name
     email: $email,
     password: $password,
     location: $location){
     _id,email,location,name
   
 }}
 
`;

const updateCompany = gql`
mutation updateCompany(
    $name:String,
    $location:String,
    $description:String,
    $company_id:String){
    updateCompany(
        name: $name,
        company_id: $company_id,
        location: $location,
        description: $description){
            email,location,description,name}
   
 }
 
`;

const addStudent = gql`
mutation addStudent(
    $name:String,
    $email:String,
    $password:String,
    $college:String
)
{
        addStudent(
        name: $name,
        email: $email,
        password: $password,
        college: $college)
        {
            _id,name,email,college
        }  
        
}
 `;

// const updateStudent = gql`
// mutation{
//     updateStudent(  name: "sreeja",
//          email: "sreeja@gmail.com",
//          college: "sreeja",
//          dob: "sreeja",
//          city: "sreeja",
//          state: "sreeja",
//          country: "sreeja",
//          career_objective:"abc",
//          id:"5eb2ab62127c303c8c64a21c",
//    type:"career"){
//      name,email,college,dob,career_objective}
   
//  }
 
// `;

const updateStudentCareer = gql`
mutation updateStudent( 
    $career_objective:String,
    $id:String
){
        updateStudent( 
            career_objective:$career_objective,
            id:$id,
            type:"career"){
                name,email,college,dob,career_objective}
   
 }
 
`;

const updateStudentBasic = gql`
mutation updateStudent( 
    $name:String,
    $email:String,
    $college:String,
    $dob:String,
    $state:String,
    $city:String,
    $country:String,
    $id:String){

    updateStudent( 
        name:$name,
        email:$email,
        college:$college,
        dob:$dob
        state:$state,
        city:$city,
        country:$country,
        id:$id,
        type:"basic"){
        name,email,college,dob,state,city,country,career_objective}
    }
`;

const companyLogin = gql`
mutation companyLogin($email:String,$password:String){
    companyLogin(email:$email,password:$password){
      _id
    }
  }
  
`;

const studentLogin = gql`
mutation studentLogin($email:String,$password:String){
    studentLogin(email:$email,password:$password){
      _id
    }
  }
  
`;

const updateStudentEducation = gql`
mutation 
    updateStudentEducation( 
        $degree:String,
        $id:String
){
    updateStudentEducation( 
        degree:$degree,
        id:$id,
        type:"education"){
     name,email,college,dob,state,city,country,career_objective,
     education{degree}}
   
 }
 
`;
const updateStudentExperience = gql`
mutation updateStudentExperience(
    $company:String,
    $title:String,
    $id:String
){
    updateStudentExperience( 
    company:$company,
    title:$title,
    id:$id,
    type:"experience"){
     name,email,college,dob,state,city,country,career_objective,
     education{degree},experience{company,title}}
   
 }
 
`;

const applyJob = gql`
mutation applyJob( 
    $job_id:String,
    $stud_id:String,
    $app_date:String){
    applyJob( 
        job_id:$job_id,
        stud_id:$stud_id,
        app_date:$app_date){
        title,posting_date,deadline,location,salary,category,
        applications{studentId,status,appliedDate}}
 }
 
`;
const changeJobStatus = gql`
mutation changeJobStatus( 
    $jobId:String,
    $studentId:String,
    $status:String){
    changeJobStatus( 
        jobId:$jobId,
        studentId:$studentId,
        status:$status
   ){
     title,posting_date,deadline,location,salary,category,
     applications{studentId,status,appliedDate}} 
 }
 
`;

export {changeJobStatus,applyJob,addJob,addCompany,updateCompany,addStudent,updateStudentCareer,updateStudentBasic,updateStudentEducation,updateStudentExperience,companyLogin,studentLogin};
