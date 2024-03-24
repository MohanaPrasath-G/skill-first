import React, { useState } from 'react';
import Modal from './Modal';
import axios from 'axios';

function Options() {
    const assignment_engine = [
        { value: "value_1", label: "engine_1" },
        { value: "value_2", label: "engine_2" },
        { value: "value_3", label: "engine_3" },
        { value: "value_4", label: "engine_4" },
    ];
    const assignment_name = [
        { value: "value_1", label: "name_1" },
        { value: "value_2", label: "name_2" },
        { value: "value_3", label: "name_3" },
        { value: "value_4", label: "name_4" },
    ];

    const [formData, setFormData] = useState({
        assessmentEngine: '',
        assessmentName: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        noofattempts: ''
    });
    const [tests, setTests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [testCount, setTestCount] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentDate = new Date().toISOString().slice(0, 10);
        const currentTime = new Date().toLocaleTimeString('en-GB');
        const { startDate, startTime, endDate, endTime, noofattempts } = formData;

        let errorMessage = ''; // Initialize empty string for error message

    // Validation checks
    if (startDate < currentDate) {
        errorMessage += 'Start date should be greater than or equal to today\'s date.\n';
    }
    if (startDate === currentDate && startTime <= currentTime) {
        errorMessage += 'Start time should be greater than current time.\n';
    }
    if (startDate > endDate) {
        errorMessage += 'End date should be greater than start date.\n';
    }
    if (startDate === endDate && startTime >= endTime) {
        errorMessage += 'Start time should be less than end time when start date and end date are the same.\n';
    }
    if (noofattempts <= 0) {
        errorMessage += 'Number of attempt should be greater than zero.\n';
    }

    // If there are any error messages, display alert
    if (errorMessage) {
        alert(errorMessage);
        return;
    }

        const newTest = { ...formData }; 
        setTests([...tests, newTest]); 
        console.log(tests);
        resetForm();
        setShowModal(false);
    };


    const resetForm = () => {
        setFormData({
            assessmentEngine: '',
            assessmentName: '',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            noofattempts: ''
        });
    };

    const handleAddEvent = () => {
        setTestCount(testCount + 1);
    };

    const handleTestButtonClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    // const handleFormSubmit = async () => {
    //     console.log(tests);
    //     try {
    //         const response = await axios.post('http://localhost:4000/saveAssessment', tests);
    //         console.log('Response:', response.data);
    //     } catch (error) {
    //         console.error('Error submitting tests:', error);
    //     }
    // };
    const handleFormSubmit = async () => {
        console.log(tests);
        try {
            const response = await axios.post('http://localhost:4000/saveAssessment', tests);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error submitting tests:', error);
        }
    };

    return (
        <div className='container'>
            <h2>Assignment Form</h2>
            <button onClick={handleAddEvent}>Add Event</button>
            {Array.from({ length: testCount }, (_, index) => (
                <button key={index} onClick={handleTestButtonClick}>Test Button {index + 1}</button>
            ))}
            {showModal && (
                <Modal onClose={handleModalClose}>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <label>Assessment Engine:</label>
                            <select name="assessmentEngine" value={formData.assessmentEngine} onChange={handleInputChange}>
                                <option value="">--Assignment Engine--</option>
                                {assignment_engine.map(engine => (
                                    <option key={engine.value} value={engine.value}>{engine.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="row">
                            <label>Assessment Name:</label>
                            <select name="assessmentName" value={formData.assessmentName} onChange={handleInputChange}>
                                <option value="">--Assignment Name--</option>
                                {assignment_name.map(name => (
                                    <option key={name.value} value={name.value}>{name.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className='row'>
                        <div className="col">
                            <label>Start Date:</label>
                            <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
                        </div>
                        <div className="col">
                            <label>Start Time:</label>
                            <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} />
                        </div>
                        <div className="col">
                            <label>End Date:</label>
                            <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
                        </div>
                        <div className="col">
                            <label>End Time:</label>
                            <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} />
                        </div>
                        <div className="col">
                            <label>No of Attempts:</label>
                            <input type="number" name="noofattempts" value={formData.noofattempts} onChange={handleInputChange} />
                        </div>
                        </div>
                        <button type="submit">Save</button>
                    </form>
                </Modal>
            )}
            <button onClick={handleFormSubmit}>Submit</button>
        </div>
    );
}

export default Options;
