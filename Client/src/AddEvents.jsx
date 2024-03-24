import React, { useState } from 'react';
import Events from './Events';
import Form from './Form';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

function AddEvents() {
  const [eventCount, setEventCount] = useState(0);
  const [activityList, setActivityList] = useState([]);

  const handleAddEventsClick = () => {
    setEventCount(eventCount + 1);
  };

  const handleAddAssessment = () => {
    const emptyAssessment = {
      id: uuidv4(), // Generate a new UUID for the event
      assessmentEngine: '',
      assessmentName: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      noofattempts: ''
    };
    setActivityList([...activityList, emptyAssessment]);
  };

  const handleFormSubmit = (formData) => {
    // Find the index of the form data in the activity list
    const index = activityList.findIndex(item => item.id === formData.id);
    // Update the activityList with the form data
    if (index !== -1) {
      const updatedActivityList = [...activityList];
      updatedActivityList[index] = formData;
      setActivityList(updatedActivityList);
    }
  };

  const handleCancel = (eventId) => {
    // Remove the event with the given ID from the activityList
    setActivityList(activityList.filter(event => event.id !== eventId));
  };

  return (
    <div className="events-page">
      {activityList.map(event => (
        <Form
          key={event.id}
          formData={event}
          onSubmit={handleFormSubmit}
          onCancel={() => handleCancel(event.id)}
        />
      ))}
      {Array.from({ length: eventCount - activityList.length }).map((_, index) => (
        <Events
          key={index}
          onAddAssessment={handleAddAssessment}
        />
      ))}
      <button className="add-events-button" onClick={handleAddEventsClick}>
        Add Event
      </button>
    </div>
  );
}

export default AddEvents;












































































































































































// import React, { useState } from 'react';
// import Events from './Events'; // Import the Events component

// function AddEvents() {
  
//   const [eventCount, setEventCount] = useState(0); // Track the number of events added
//   const [activityList, setActivityList] = useState([]); // Initialize activityList

//   const handleAddEventsClick = () => {
//     setEventCount(eventCount + 1); // Increment the event count
//   };

//   const handleAddAssessment = (emptyAssessment) => {
//     // Push the emptyAssessment object to the activityList
//     setActivityList([...activityList, emptyAssessment]);
//   };

//   return (
//     <div className="events-page">
//       {/* Render Events component multiple times based on eventCount */}
//       {Array.from({ length: eventCount }).map((_, index) => (
//         <Events key={index} onAddAssessment={handleAddAssessment} />
//       ))}
//       <button className="add-events-button" onClick={handleAddEventsClick}>
//         Add Event
//       </button>
//     </div>
//   );
// }

// export default AddEvents;
