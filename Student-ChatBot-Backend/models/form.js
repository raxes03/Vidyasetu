const mongoose = require('mongoose');

const CollegeFormSchema = new mongoose.Schema({
    collegeName: String,
    collegeCode: String,
    collegeLocation: String,
    numberOfDepartments: String,
    collegeEmail: String,
    collegePhone: String,
    collegeWebsite: String,
    city: String,
    collegePerson: String,
    collegeFacilities: String,
    courseName: String,
    courseDuration: String,
    branchName: String,
    fee: String,
    placements: String,
    img: String,
    facilities: String,
    eligibility: String,
    scholarship: String,
})

module.exports = mongoose.model('CollegeInfo', CollegeFormSchema);