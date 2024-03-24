const express = require('express');
const router = express.Router();
const Activity = require('../model/userSchema');

// // Function to generate unique activity_id
// async function generateActivityId() {
//     try {
//         const activity = await Activity.findOne({}, {}, { sort: { 'activity_id': -1 } });
//         let maxId = 0;
//         if (activity && activity.activity_id) {
//             const numericPart = parseInt(activity.activity_id.split('_')[1]);
//             if (!isNaN(numericPart)) {
//                 maxId = numericPart;
//             }
//         }
//         const newId = `test_${maxId + 1}`;
//         return newId;
//     } catch (error) {
//         console.error('Error generating activity ID:', error);
//         throw error;
//     }
// }

// router.post('/saveAssessment', async (req, res) => {
//     try {
//         const { assessment_url, assessment_partner, activity_start_date, activity_end_date, status, no_of_attempts, activity_end_time, activity_start_time } = req.body;

//         // Generate unique activity_id
//         const activity_id = await generateActivityId(); // Await the result

//         if (!assessment_partner) {
//             return res.status(400).json({ message: 'Assessment Partner is required' });
//         }

//         const newActivity = new Activity({
//             type: 'Assessment',
//             activity_id,
//             activity_start_date,
//             activity_end_date,
//             activity_start_time,
//             activity_end_time,
//             status: '1',
//             data: [{
//                 assessment_url,
//                 assessment_partner
//             }],
//             no_of_attempts
//         });

//         const savedActivity = await newActivity.save();
//         res.status(201).json({ message: 'Assessment saved successfully', data: savedActivity });
//     } catch (error) {
//         console.error('Error saving assessment:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// // Function to generate unique activity_id
// async function generateActivityId() {
//     try {
//         // Find the highest activity_id in the database and extract the numeric part
//         const activity = await Activity.findOne({}, {}, { sort: { 'tests.activity_id': -1 } });
//         let maxId = 0;
//         if (activity && activity.tests && activity.tests.length > 0) {
//             // Extract numeric part and find maximum
//             activity.tests.forEach(test => {
//                 const numericPart = parseInt(test.activity_id.split('_')[1]);
//                 if (!isNaN(numericPart) && numericPart > maxId) {
//                     maxId = numericPart;
//                 }
//             });
//         }

//         // Generate the new activity_id
//         const newId = maxId + 1;
//         return newId;
//     } catch (error) {
//         console.error('Error generating activity ID:', error);
//         throw error;
//     }
// }

// Function to generate unique activity_id
async function generateActivityId() {
    try {
        const activity = await Activity.findOne({}, {}, { sort: { 'activity_id': -1 } });
        let maxId = 0;
        if (activity && activity.activity_id) {
            const numericPart = parseInt(activity.activity_id.split('_')[1]);
            if (!isNaN(numericPart)) {
                maxId = numericPart;
            }
        }
        const newId = maxId + 1;
        return newId;
    } catch (error) {
        console.error('Error generating activity ID:', error);
        throw error;
    }
}



// Route to save assessment data
router.post('/saveAssessment', async (req, res) => {
    try {
        const  tests  = req.body;
        console.log(tests);

        let activity_id = await generateActivityId();

        for (const test of tests) {
            

            // Create new activity object for the test
            const newActivity = new Activity({
                type: 'Assessment',
                activity_id:`test_${activity_id}`,
                activity_start_date: test.startDate,
                activity_end_date: test.endDate,
                activity_start_time: test.startTime,
                activity_end_time: test.endTime,
                status: '1',
                data: [{
                    assessment_url: test.assessmentEngine,
                    assessment_partner: test.assessmentName
                }],
                no_of_attempts: test.noofattempts
            });

            activity_id = activity_id + 1;

            // Save the activity to the database
            const savedActivity = await newActivity.save();
        }

        console.log("Tests added successfully");

        res.status(201).json({ message: 'Assessment saved successfully' });
    } catch (error) {
        console.error('Error saving assessment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
