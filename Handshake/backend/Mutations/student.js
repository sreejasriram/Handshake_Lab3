const query = require('../Database/queries');
var ObjectId = require('mongodb').ObjectID;
const Students = require('../Models/StudentModel');
const passwordHash = require('password-hash');

const addStudent = async (student_details) => {
    console.log(student_details)
    let hashedPassword;
    if (student_details.password)
        hashedPassword = passwordHash.generate(student_details.password);

    student_details.password = hashedPassword
    try {
        return await query.saveDocuments(Students.createModel(), student_details, { runValidators: false })
    }
    catch (error) {
        return error
    }
}


const updateStudent = async (profile) => {
    var update_data = null
    if (profile.type === "career") {
        update_data = {
            career_objective: profile.career_objective

        }
        console.log(update_data)
        console.log(profile.id)
        try {
            return await query.updateField(Students.createModel(), { _id: ObjectId(profile.id) }, update_data)
        }
        catch (error) {
            return error
        }
    }

    else if (profile.type === "basic") {
        update_data = {
            dob: profile.dob,
            city: profile.city,
            state: profile.state,
            country: profile.country
        }
        console.log(update_data)
        console.log(profile.id)
        try {
            return await query.updateField(Students.createModel(), { _id: ObjectId(profile.id) }, update_data)
        }
        catch (error) {
            return error
        }
    }
    else if (profile.type === "profilePic") {
        update_data = {
            name: profile.name
        }
        console.log(update_data)
        console.log(profile.id)
        try {
            return await query.updateField(Students.createModel(), { _id: ObjectId(profile.id) }, update_data)
        }
        catch (error) {
            return error
        }
    }
    else if (profile.type === "education") {
        let update_data = {
            college_name: profile.college_name,
            location: profile.location,
            degree: profile.degree,
            major: profile.major,
            cgpa: profile.cgpa,
            year_of_starting: profile.year_of_starting,
            month_of_starting: profile.month_of_starting,
            year_of_passing: profile.year_of_passing,
            month_of_passing: profile.month_of_passing
        }
        console.log(update_data)
        console.log(profile.id)
        try {
            return await query.updateField(Students.createModel(), { _id: ObjectId(profile.id) }, { $set: { education : update_data} })
        }
        catch (error) {
            return error
        }
        
    }

    else if (profile.type === "experience") {
        let update_data = {
            company: profile.company,
            title: profile.title,
            location: profile.location,
            description: profile.description,
            year_of_starting: profile.year_of_starting,
            month_of_starting: profile.month_of_starting,
            year_of_ending: profile.year_of_ending,
            month_of_ending: profile.month_of_ending
        }
        console.log(update_data)
        console.log(profile.id)
        try {
            return await query.updateField(Students.createModel(), { _id: ObjectId(profile.id) }, { $set: { experience : update_data} })
        }
        catch (error) {
            return error
        }
        
    }
 
}



exports.addStudent = addStudent;
exports.updateStudent = updateStudent;












