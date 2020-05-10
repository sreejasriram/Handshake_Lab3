const query =require('../Database/queries');
// const Jobs = require('../Models/JobModel');
// const Company = require('../Models/CompanyModel');
var ObjectId = require('mongodb').ObjectID;
const Students = require('../Models/StudentModel');

const ViewStudent =async (details)=>{
    console.log(details)
    try{
       return await query.getProfile(Students.createModel(),{_id:ObjectId(details.studentId)}
        );
    }
    catch(error){
        return error
    }
    }

    const ViewAllStudents =async()=>{
      
        try{
            return await query.getStudents(Students.createModel(),{});
        }
        catch(e)
        {
            return error
        }
        }
   
      
exports.ViewStudent = ViewStudent;
exports.ViewAllStudents = ViewAllStudents;

