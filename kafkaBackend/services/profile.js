const query =require('../Database/queries');
const Students = require('../Models/StudentModel');
const Company = require('../Models/CompanyModel');
var ObjectId = require('mongodb').ObjectID;

handle_request=(profile, callback)=>{
    if (profile.type === "retrieve_student_profile") {

        console.log(profile.studentId)
        try{
            query.getProfile(Students.createModel(),{_id:ObjectId(profile.studentId)},(err,result)=>{
                callback(err,result)
            });
        }
        catch(error){
            return callback(error,null)
        }
    }
else   if (profile.type === "retrieve_company_profile") {

    console.log(profile.companyId)
    try{
        query.getProfile(Company.createModel(),{_id:ObjectId(profile.companyId)},(err,result)=>{
            callback(err,result)
        });
    }
    catch(error){
        return callback(error,null)
    }
}
    


else  if (profile.type === "profile_company_update") {
    console.log(profile)
    const update_data = {
        name: profile.name,
        location: profile.location,
        email: profile.email,
        contact: profile.phone,
        description: profile.company_description,
    }
    console.log(update_data)
    console.log(profile.company_id)

    try{
        query.updateField(Company.createModel(),{_id:ObjectId(profile.company_id)},update_data, (err,rows) => {
                    callback(err,rows)
                });
    }
    catch(e)
    {
       callback(e,null)
    }
}



    else  if (profile.type === "add_basic") {
        console.log(profile)
        const update_data = {
            dob: profile.dob,
            city: profile.city,
            state: profile.state,
            country: profile.country
        }
        console.log(update_data)
        console.log(profile.id)
    
        try{
            query.updateField(Students.createModel(),{_id:ObjectId(profile.id)},update_data, (err,rows) => {
                        callback(err,rows)
                    });
        }
        catch(e)
        {
           callback(e,null)
        }
    }

    else  if (profile.type === "add_skill") {
        console.log(profile)
        const update_data = {
            skills: profile.skills
        }
        console.log(update_data)
        console.log(profile.id)
    
        try{
            query.updateField(Students.createModel(),{_id:ObjectId(profile.id)},update_data, (err,rows) => {
                        callback(err,rows)
                    });
        }
        catch(e)
        {
           callback(e,null)
        }
    }

    else  if (profile.type === "add_contact") {
        console.log(profile)
        const update_data = {
            email: profile.email,
            mobile: profile.mobile
        }
        console.log(update_data)
        console.log(profile.id)
    
        try{
            query.updateField(Students.createModel(),{_id:ObjectId(profile.id)},update_data, (err,rows) => {
                        callback(err,rows)
                    });
        }
        catch(e)
        {
           callback(e,null)
        }
    }

    else  if (profile.type === "add_journey") {
        console.log(profile)
        const update_data = {
            career_objective: profile.career_objective

        }
        console.log(update_data)
        console.log(profile.id)
    
        try{
            query.updateField(Students.createModel(),{_id:ObjectId(profile.id)},update_data, (err,rows) => {
                        callback(err,rows)
                    });
        }
        catch(e)
        {
           callback(e,null)
        }
    }

    else  if (profile.type === "add_profilepic") {
        console.log(profile)
        const update_data = {
            name: profile.name
        }
        console.log(update_data)
        console.log(profile.id)
    
        try{
            query.updateField(Students.createModel(),{_id:ObjectId(profile.id)},update_data, (err,rows) => {
                        callback(err,rows)
                    });
        }
        catch(e)
        {
           callback(e,null)
        }
    }
///////////////////////////////////////////////////////////////////////
    else  if (profile.type === "add_education") {
        console.log(profile)
        const update_data = { 
            
            $push:{education:[
                
            {
            college_name: profile.college_name,
            location: profile.location,
            degree: profile.degree,
            major: profile.major,
            cgpa: profile.cgpa,
            year_of_starting: profile.year_of_starting,
            month_of_starting: profile.month_of_starting,
            year_of_passing: profile.year_of_passing,
            month_of_passing: profile.month_of_passing
        }]
    }}
   
        console.log(profile.id)
        console.log(profile.edu_id)

        try{
            if (!profile.edu_id){
                console.log("to add new educational data")
                console.log(update_data)
            query.updateField(Students.createModel(),{_id:ObjectId(profile.id)},update_data, (err,rows) => {
                        callback(err,rows)
                    });
                }else
                {
                    console.log("edit educational data")
                    console.log(profile.edu_id)
                    query.editObj(Students.createModel(),{_id:ObjectId(profile.id),'education._id':ObjectId(profile.edu_id)},
                    {'education.$.college_name': profile.college_name,
                    'education.$.location': profile.location,
                    'education.$.degree': profile.degree,
                    'education.$.major': profile.major,
                    'education.$.cgpa': profile.cgpa,
                    'education.$.year_of_starting': profile.year_of_starting,
                    'education.$.month_of_starting': profile.month_of_starting,
                    'education.$.year_of_passing': profile.year_of_passing,
                    'education.$.month_of_passing': profile.month_of_passing
                
                }, (err,rows) => {
                        callback(err,rows)
                    });
                }
        }
        catch(e)
        {
           callback(e,null)
        }
    }

//////////////////////////////////////////////////////////////

else  if (profile.type === "add_experience") {
    console.log(profile)
    const update_data = { 
        
        $push:{experience:[
            
        {
        company: profile.company,
        title: profile.title,
        location: profile.location,
        description: profile.description,
        year_of_starting: profile.year_of_starting,
        month_of_starting: profile.month_of_starting,
        year_of_ending: profile.year_of_ending,
        month_of_ending: profile.month_of_ending

    }]
}}

    console.log(profile.id)
    console.log(profile.exp_id)

    try{
        if (!profile.exp_id){
            console.log("to add new experience data")
            console.log(update_data)
        query.updateField(Students.createModel(),{_id:ObjectId(profile.id)},update_data, (err,rows) => {
                    callback(err,rows)
                });
            }else
            {
                console.log("edit experience data")
                console.log(profile.exp_id)
                query.editObj(Students.createModel(),{_id:ObjectId(profile.id),'experience._id':ObjectId(profile.exp_id)},
                {'experience.$.company': profile.company,
                'experience.$.title': profile.title,
                'experience.$.location': profile.location,
                'experience.$.description': profile.description,
                'experience.$.year_of_starting': profile.year_of_starting,
                'experience.$.month_of_starting': profile.month_of_starting,
                'experience.$.year_of_ending': profile.year_of_ending,
                'experience.$.month_of_ending': profile.month_of_ending
            
            }, (err,rows) => {
                    callback(err,rows)
                });
            }
    }
    catch(e)
    {
       callback(e,null)
    }
}












/////////////////////////////////////////////////////////////////

    
    else  if (profile.type === "list_all_students_company") {
        console.log(profile)
      
        try{
            query.getProfile(Students.createModel(),{},(err,rows)=>{
                callback(err,rows)
                    });
        }
        catch(e)
        {
           callback(e,null)
        }
    }


    else  if (profile.type === "studentprofilepic") {
       
        updateStudent = {
            image:profile.image
        }
        try{
            query.updateField(Students.createModel(),{_id:ObjectId(profile.studentId)},updateStudent,(err,result)=>{
                console.log("post insert")
                console.log(result)
                callback(err,result)
            });
        }
        catch(err)
        {
            callback(err,null)
        }



    }
    


    else  if (profile.type === "companyprofilepic") {
       
        updateStudent = {
            image:profile.image
        }
        try{
            query.updateField(Company.createModel(),{_id:ObjectId(profile.companyId)},updateStudent,(err,result)=>{
                console.log("post insert")
                console.log(result)
                callback(err,result)
            });
        }
        catch(err)
        {
            callback(err,null)
        }



    }
    
    
}

exports.handle_request = handle_request;