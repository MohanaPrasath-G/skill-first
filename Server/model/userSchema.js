const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
        type: { type: String, required: true },
        activity_id: { type: String, required: true },
        activity_start_date: { type: Date, required: true },
        activity_start_time: { type: String, required: true }, 
        activity_end_date: { type: Date, required: true },
        activity_end_time: { type: String, required: true }, 
        status: { type: String, required: true },
        data: [{
            assessment_url: { type: String, required: true },
            assessment_partner: { type: String, required: true }
        }], 
        no_of_attempts: { type: Number, required: true }
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;