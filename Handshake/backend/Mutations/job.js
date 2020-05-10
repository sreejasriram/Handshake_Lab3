const query =require('../Database/queries');
const Jobs = require('../Models/JobModel');
const Students = require('../Models/StudentModel');

// const Company = require('../Models/CompanyModel');
var ObjectId = require('mongodb').ObjectID;
// const Students = require('../Models/StudentModel');

const addJob = (job_details)=>{
        console.log(job_details)
        try{
            return  query.saveDocuments(Jobs.createModel(),job_details,{runValidators:false,});
        }
        catch(error){
            return error
        }
    }



const applyJob = async(cmpny_details)=>{
console.log(cmpny_details)
console.log(typeof(cmpny_details.job_id))
const update_data= { $push:{applications:[{
    studentId: ObjectId(cmpny_details.stud_id),
    status: 'Pending',
    appliedDate: cmpny_details.app_date
}]
}}
const update_stud_data= { $push:{applications:[{
 'jobId':ObjectId(cmpny_details.job_id)}]

}}
console.log(update_data)
try{
        let res = await query.updateField(Jobs.createModel(),{_id:ObjectId(cmpny_details.job_id)},update_data );
        await query.updateField(Students.createModel(),{_id:ObjectId(cmpny_details.stud_id)},update_stud_data)
        return res   
}
catch(error){
    return error
}
}


const changeJobStatus = async(job_details)=>{
    console.log(job_details.studentId)
    console.log(job_details.status)
    console.log(job_details.jobId)
    try{
        return await query.editObj(Jobs.createModel(),{_id:ObjectId(job_details.jobId),'applications.studentId':ObjectId(job_details.studentId)},{'applications.$.status':job_details.status});
    }
    catch(error){
        return error
    }
}
exports.addJob = addJob;
exports.applyJob = applyJob;
exports.changeJobStatus = changeJobStatus;



