const mongoose = require('mongoose');

const CollegeUserDetailsSchema = new mongoose.Schema(
    {
        name: String,
        phone: String,
        email: { type: String, unique: true },
        password: String,
        college: String,
        userName: String,
    },
    {
        collation: { locale: 'en', strength: 1 },
    }
);

module.exports = mongoose.model('CollegeUserInfo', CollegeUserDetailsSchema);