const mongoose = require('../database')
const bcrypt = require('bcryptjs')

const ActivitySchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    }
});

const Activity = mongoose.model('Activity', ActivitySchema)

module.exports = Activity;