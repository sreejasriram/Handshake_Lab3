const graphql = require('graphql');
// const User = require("../dbSchema/users");

const { addJob, applyJob, changeJobStatus } = require('../mutations/job');
const { ViewJobs, ViewAllJobs, ViewJobDetails , listAppliedJobs, listApplicants} = require('../queries/job');
const { ViewCompany } = require('../queries/company');
const { ViewStudent, ViewAllStudents } = require('../queries/student');

const { addStudent, updateStudent } = require('../mutations/student');

const { addCompany, updateCompany } = require('../mutations/company');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;





const JobType = new GraphQLObjectType({
    name: 'job',
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        posting_date: { type: GraphQLString },
        deadline: { type: GraphQLString },
        location: { type: GraphQLString },
        salary: { type: GraphQLString },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        companyId: { type: GraphQLID },
        companydetails: { type: new GraphQLList(CompanyType) },
        applications:{type:new GraphQLList(ApplicationType)},
        listApplicants:{type:new GraphQLList(StudentType)}

    })
});


const CompanyType = new GraphQLObjectType({
    name: 'company',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString }

    })
});
const ApplicationType = new GraphQLObjectType({
    name: 'jobApplication',
    fields: () => ({
        _id: { type: GraphQLID },
        studentId: { type: GraphQLString },
        status: { type: GraphQLString },
        appliedDate: { type: GraphQLString }

    })
});




const StudentType = new GraphQLObjectType({
    name: 'student',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        college: { type: GraphQLString },
        dob: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        career_objective: { type: GraphQLString },
        education: { type: EducationType },
        experience: { type: ExperienceType },
        applications: { type: new GraphQLList(StudentApplicationType) }

    })
});


const StudentApplicationType = new GraphQLObjectType({
    name: 'studentApplications',
    fields: () => ({
        _id: { type: GraphQLID },
        jobId: { type: GraphQLID }

    })
});


const EducationType = new GraphQLObjectType({
    name: 'education',
    fields: () => ({
        _id: { type: GraphQLID },
        college_name: { type: GraphQLString },
        location: { type: GraphQLString },
        degree: { type: GraphQLString },
        major: { type: GraphQLString },
        cgpa: { type: GraphQLString },
        year_of_starting: { type: GraphQLInt },
        month_of_starting: { type: GraphQLInt },
        year_of_passing: { type: GraphQLInt },
        month_of_passing: { type: GraphQLInt }
    })
});
const ExperienceType = new GraphQLObjectType({
    name: 'experience',
    fields: () => ({
        _id: { type: GraphQLID },
        company: { type: GraphQLString },
        title: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
        year_of_starting: { type: GraphQLInt },
        month_of_starting: { type: GraphQLInt },
        year_of_ending: { type: GraphQLInt },
        month_of_ending: { type: GraphQLInt }

    })
});


const prepare = (o) => {
    console.log("aaa")
    o._id = o._id.toString()
    return o
}

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        jobs: {
            type: new GraphQLList(JobType),
            args: { companyId: { type: GraphQLString } },
            async resolve(parent, args) {
                let data = await ViewJobs(args)
                console.log(data)
                return (data)
            }
        },

        alljobs: {
            type: new GraphQLList(JobType),
            args: {},
            async resolve(parent, args) {
                let data = await ViewAllJobs(args)
                console.log(data)
                return (data)
            }
        },

        jobdetails: {
            type: new GraphQLList(JobType),
            args: { jobId: { type: GraphQLString } },
            async resolve(parent, args) {
                let data = await ViewJobDetails(args)
                console.log(data)
                return (data)
            }
        },
        
        listAppliedJobs: {
            type: new GraphQLList(JobType),
            args: { studentId: { type: GraphQLString } },
            async resolve(parent, args) {
                let data = await listAppliedJobs(args)
                console.log(data)
                return (data)
            }
        },
        
        listApplicants: {
            type: new GraphQLList(JobType),
            args: { jobId: { type: GraphQLString } },
            async resolve(parent, args) {
                let data = await listApplicants(args)
                console.log(data)
                return (data)
            }
        },
        
        company: {
            // type: new GraphQLList(CompanyType),
            type: CompanyType,

            args: { companyId: { type: GraphQLString } },
            async resolve(parent, args) {
                let data = await ViewCompany(args)
                console.log(data)
                return (data)
            }
        },

        student: {
            // type: new GraphQLList(CompanyType),
            type: StudentType,

            args: { studentId: { type: GraphQLString } },
            async resolve(parent, args) {
                let data = await ViewStudent(args)
                console.log(data)
                return (data)
            }
        },
        allStudents: {
            // type: new GraphQLList(CompanyType),
            type: new GraphQLList(StudentType),

            async resolve(parent) {
                let data = await ViewAllStudents()
                console.log(data)
                return (data)
            }
        },

    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addJob: {
            type: JobType,
            args: {
                title: { type: GraphQLString },
                posting_date: { type: GraphQLString },
                deadline: { type: GraphQLString },
                location: { type: GraphQLString },
                salary: { type: GraphQLString },
                description: { type: GraphQLString },
                category: { type: GraphQLString },
                companyId: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let data = await addJob(args)
                {
                    return prepare(data)
                }
            }
        },
        applyJob: {
            type: JobType,
            args: {
                job_id: { type: GraphQLString },
                stud_id: { type: GraphQLString },
                app_date: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let data = await applyJob(args)
                {
                    return data
                }
            }
        },
        changeJobStatus: {
            type: JobType,
            args: {
                studentId: { type: GraphQLString },
                status: { type: GraphQLString },
                jobId: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let data = await changeJobStatus(args)
                {
                    return prepare(data)
                }
            }
        },

        
        addCompany: {
            type: CompanyType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                location: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log(args)
                let data = await addCompany(args)
                {
                    return data
                }
            }
        },

        updateCompany: {
            type: CompanyType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                location: { type: GraphQLString },
                description: { type: GraphQLString },
                company_id: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log(args)
                let data = await updateCompany(args)
                {
                    return data
                }
            }
        },

        updateStudent: {
            type: StudentType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                college: { type: GraphQLString },
                dob: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                country: { type: GraphQLString },
                career_objective: { type: GraphQLString },
                id: { type: GraphQLString },
                type: { type: GraphQLString }

            },
            async resolve(parent, args) {
                console.log(args)
                let data = await updateStudent(args)
                {
                    return data
                }
            }
        },
        updateStudentEducation: {
            type: StudentType,
            args: {
                college_name: { type: GraphQLString },
                location: { type: GraphQLString },
                degree: { type: GraphQLString },
                major: { type: GraphQLString },
                cgpa: { type: GraphQLString },
                year_of_starting: { type: GraphQLInt },
                month_of_starting: { type: GraphQLInt },
                year_of_passing: { type: GraphQLInt },
                month_of_passing: { type: GraphQLInt },
                id: { type: GraphQLString },
                type: { type: GraphQLString }

            },
            async resolve(parent, args) {
                console.log(args)
                let data = await updateStudent(args)
                {
                    return data
                }
            }
        },

        updateStudentExperience: {
            type: StudentType,
            args: {
                company: { type: GraphQLString },
                title: { type: GraphQLString },
                location: { type: GraphQLString },
                description: { type: GraphQLString },
                year_of_starting: { type: GraphQLInt },
                month_of_starting: { type: GraphQLInt },
                year_of_ending: { type: GraphQLInt },
                month_of_ending: { type: GraphQLInt },
                id: { type: GraphQLString },
                type: { type: GraphQLString }

            },
            async resolve(parent, args) {
                console.log(args)
                let data = await updateStudent(args)
                {
                    return data
                }
            }
        },

        addStudent: {
            type: StudentType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                college: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log(args)
                let data = await addStudent(args)
                {
                    return data
                }
            }
        }

    }
});







/////////////////////////////////////////////////////////////////////////////////
// const UserType = new GraphQLObjectType({
//     name: 'User',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         email_id: { type: GraphQLString },
//         password: { type: GraphQLString },
//         address: { type: GraphQLString },
//         phone_number: { type: GraphQLString },
//         restaurant: { type: RestaurantType }
//     })
// });

// const RestaurantType = new GraphQLObjectType({
//     name: 'Restaurant',
//     fields: () => ({
//         id: { type: GraphQLID },
//         res_name: { type: GraphQLString },
//         res_cuisine: { type: GraphQLString },
//         res_zip_code: { type: GraphQLString },
//         res_address: { type: GraphQLString },
//         res_phone_number: { type: GraphQLString },
//         owner_user_id: { type: GraphQLID },
//         menu_sections: {
//             type: new GraphQLList(MenuSectionType),
//             resolve(parent, args) {
//                 return parent.menu_sections;
//             }
//         }
//     })
// });

// const MenuSectionType = new GraphQLObjectType({
//     name: 'Menu_Section',
//     fields: () => ({
//         _id: { type: GraphQLID },
//         menu_section_name: { type: GraphQLString },
//         menu_items: {
//             type: new GraphQLList(MenuItemType),
//             resolve(parent, args) {
//                 return parent.menu_items;
//             }
//         }
//     })
// });

// const MenuItemType = new GraphQLObjectType({
//     name: 'Menu_Item',
//     fields: () => ({
//         id: { type: GraphQLID },
//         item_name: { type: GraphQLString },
//         item_description: { type: GraphQLString },
//         item_price: { type: GraphQLInt }
//     })
// });

// const StatusType = new GraphQLObjectType({
//     name: 'Status',
//     fields: () => ({
//         status: { type: GraphQLString },
//         message: { type: GraphQLString }
//     })
// });

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         customer: {
//             type: UserType,
//             args: { user_id: { type: GraphQLString } },
//             async resolve(parent, args) {
//                 let user = await User.findById(args.user_id);
//                 if (user) {
//                     return user;
//                 }
//             }
//         },
//         owner: {
//             type: UserType,
//             args: { user_id: { type: GraphQLString } },
//             async resolve(parent, args) {
//                 let user = await User.findById(args.user_id);
//                 if (user) {
//                     return user;
//                 }
//             }
//         },
//         menu: {
//             type: new GraphQLList(MenuSectionType),
//             args: { user_id: { type: GraphQLString } },
//             async resolve(parent, args) {
//                 let user = await User.findById(args.user_id);
//                 if (user) {
//                     let sections = user.restaurant.menu_sections;
//                     return sections;
//                 }
//             }
//         },
//         restaurants: {
//             type: new GraphQLList(RestaurantType),
//             args: { input: { type: GraphQLString } },
//             async resolve(parent, args) {
//                 let owners = await User.find({ is_owner: true });
//                 let restaurants = owners.map(owner => owner.restaurant);
//                 return restaurants;
//             }
//         },
//         menu_sections: {
//             type: new GraphQLList(MenuSectionType),
//             args: { user_id: { type: GraphQLString } },
//             async resolve(parent, args) {
//                 let user = await User.findById(args.user_id);
//                 return user.restaurant.menu_sections;
//             }
//         }
//     }
// });

// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addCustomer: {
//             type: StatusType,
//             args: {
//                 name: { type: GraphQLString },
//                 email_id: { type: GraphQLString },
//                 password: { type: GraphQLString },
//                 address: { type: GraphQLString },
//                 phone_number: { type: GraphQLString }
//             },
//             async resolve(parent, args) {
//                 return customerSignup(args);
//             }
//         },
//         addOwner: {
//             type: StatusType,
//             args: {
//                 name: { type: GraphQLString },
//                 email_id: { type: GraphQLString },
//                 password: { type: GraphQLString },
//                 address: { type: GraphQLString },
//                 phone_number: { type: GraphQLString },
//                 res_name: { type: GraphQLString },
//                 res_cuisine: { type: GraphQLString },
//                 res_zip_code: { type: GraphQLString }
//             },
//             async resolve(parent, args) {
//                 return ownerSignup(args);
//             }
//         },
//         updateCustomer: {
//             type: StatusType,
//             args: {
//                 name: { type: GraphQLString },
//                 email_id: { type: GraphQLString },
//                 password: { type: GraphQLString },
//                 address: { type: GraphQLString },
//                 phone_number: { type: GraphQLString }
//             },
//             resolve(parent, args) {
//                 return updateCustomer(args);
//             }
//         },
//         updateOwner: {
//             type: StatusType,
//             args: {
//                 name: { type: GraphQLString },
//                 email_id: { type: GraphQLString },
//                 password: { type: GraphQLString },
//                 address: { type: GraphQLString },
//                 phone_number: { type: GraphQLString },
//                 res_name: { type: GraphQLString },
//                 res_cuisine: { type: GraphQLString },
//                 res_zip_code: { type: GraphQLString }
//             },
//             resolve(parent, args) {
//                 return updateOwner(args);
//             }
//         },
//         addMenuSection: {
//             type: StatusType,
//             args: {
//                 menu_section_name: { type: GraphQLString },
//                 user_id: { type: GraphQLString }
//             },
//             resolve(parent, args) {
//                 return addMenuSection(args);
//             }
//         },
//         addMenuItem: {
//             type: StatusType,
//             args: {
//                 menu_section_name: { type: GraphQLString },
//                 user_id: { type: GraphQLString },
//                 item_name: { type: GraphQLString },
//                 item_description: { type: GraphQLString },
//                 item_price: { type: GraphQLString }
//             },
//             resolve(parent, args) {
//                 return addMenuItem(args);
//             }
//         },
//         login: {
//             type: StatusType,
//             args: {
//                 email_id: { type: GraphQLString },
//                 password: { type: GraphQLString },
//             },
//             resolve(parent, args) {
//                 return login(args);
//             }
//         },
//     }
// });

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});