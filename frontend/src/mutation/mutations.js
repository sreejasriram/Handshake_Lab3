import { gql } from 'apollo-boost';

const addJob = gql`
mutation{
    addJob(title: "test Job",
     posting_date: "2020-04-30",
     deadline: "2020-04-30",
     location: "SanJose",
     salary: "50",
     description: "test job desc",
     category: "Internship",
       companyId:"5e9944d38ceab440c076bf63"){
     
     title,posting_date,deadline,location,salary,description,category
   }
   
 } 
`;
const addCompany = gql`
mutation{
    addCompany(name: "Tesla",
     email: "tesla@gmail.com",
     password: "tesla",
     location: "SanJose",
     description: "tesla car making company"){
     email,location,description,name}
   
 }}
 
`;

const updateCompany = gql`
mutation{
    updateCompany(name: "Infor",
     email: "infor@gmail.com",
     company_id: "5e9eb47b24394e5e4883644c",
     location: "San Francisco",
     description: "customization"){
     email,location,description,name}
   
 }
 
`;

const addStudent = gql`
mutation{
    addStudent(name: "Sreeja",
     email: "sreeja@gmail.com",
     password: "sreeja",
     college: "SJSU")
     {
     name,email,college}  
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
mutation{
    updateStudent( 
         career_objective:"abec",
         id:"5eb2ab62127c303c8c64a21c",
   type:"career"){
     name,email,college,dob,career_objective}
   
 }
 
`;

const updateStudentBasic = gql`
mutation{
    updateStudent( 
         name:"abec",
     dob:"02022019",
     city:"sanjose",
     state:"ca",
     country:"aaa",
         id:"5eb2ab62127c303c8c64a21c",
   type:"basic"){
     name,email,college,dob,state,city,country,career_objective}
 
    }
`;


const updateStudentEducation = gql`
mutation{
    updateStudentEducation( 
         degree:"mtech",
         id:"5eb2ab62127c303c8c64a21c",
   type:"education"){
     name,email,college,dob,state,city,country,career_objective,
     education{degree}}
   
 }
 
`;
const updateStudentExperience = gql`
mutation{
    updateStudentExperience( 
         company:"infor",
     title:"developer",
         id:"5eb2ab62127c303c8c64a21c",
   type:"experience"){
     name,email,college,dob,state,city,country,career_objective,
     education{degree},experience{company,title}}
   
 }
 
`;

const applyJob = gql`
mutation{
    applyJob( 
         job_id:"5e9e6e234a66cf4eec41448a",
         stud_id:"5eb2ab62127c303c8c64a21c",
   app_date:"11/17/2017"){
     title,posting_date,deadline,location,salary,category,
     applications{studentId,status,appliedDate}}
 }
 
`;
const changeJobStatus = gql`
mutation{
    changeJobStatus( 
         jobId:"5e9e6e234a66cf4eec41448a",
         studentId:"5eb2ab62127c303c8c64a21c",
     status:"Approved"
   ){
     title,posting_date,deadline,location,salary,category,
     applications{studentId,status,appliedDate}} 
 }
 
`;

export {changeJobStatus,applyJob,addJob,addCompany,updateCompany,addStudent,updateStudentCareer,updateStudentBasic,updateStudentEducation,updateStudentExperience};
