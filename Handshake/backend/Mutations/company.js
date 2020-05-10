const query =require('../Database/queries');
const Company = require('../Models/CompanyModel');
var ObjectId = require('mongodb').ObjectID;

const addCompany = async(company_details)=>{
        console.log(company_details)
        try{
            return await query.saveDocuments(Company.createModel(),company_details,{runValidators:false})
        }
        catch(error){
            return error
        }
    }

const updateCompany = async(profile)=>{
    console.log(profile)
    const update_data = {
        name: profile.name,
        location: profile.location,
        email: profile.email,
        description: profile.description,
    }
    console.log(update_data)
    console.log(profile.company_id)
    try{
        return await query.updateField(Company.createModel(),{_id:ObjectId(profile.company_id)},update_data)
    }
    catch(error){
        return error
    }
}
exports.addCompany = addCompany;
exports.updateCompany = updateCompany;







 

    

