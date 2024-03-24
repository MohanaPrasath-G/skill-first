import React from 'react';

function Events({ onAddAssessment }) {
  const handleAddAssessmentClick = () => {
    // Call the function passed as a prop to add the empty object to the activityList
    onAddAssessment();
  };

  return (
    <div className="events-container">
      <div className="event-card" onClick={handleAddAssessmentClick}>
        <h2>Add Assessment</h2>
        {/* Add any additional content for the card here */}
      </div>
    </div>
  );
}

export default Events;
