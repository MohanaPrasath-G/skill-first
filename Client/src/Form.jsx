import React, { useState, useEffect } from 'react';

function Form({ formData, onSubmit, onCancel }) {
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

  const [formState, setFormState] = useState(formData);

  useEffect(() => {
    setFormState(formData);
  }, [formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formState);
  };

  const handleCancelClick = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <label>Assessment Engine:</label>
        <select name="assessmentEngine" value={formState.assessmentEngine} onChange={handleInputChange}>
          <option value="">--Assignment Engine--</option>
          {assignment_engine.map(engine => (
            <option key={engine.value} value={engine.value}>{engine.label}</option>
          ))}
        </select>
      </div>
      <div className="row">
        <label>Assessment Name:</label>
        <select name="assessmentName" value={formState.assessmentName} onChange={handleInputChange}>
          <option value="">--Assignment Name--</option>
          {assignment_name.map(name => (
            <option key={name.value} value={name.value}>{name.label}</option>
          ))}
        </select>
      </div>
      <div className='row'>
        <div className="col">
          <label>Start Date:</label>
          <input type="date" name="startDate" value={formState.startDate} onChange={handleInputChange} />
        </div>
        <div className="col">
          <label>Start Time:</label>
          <input type="time" name="startTime" value={formState.startTime} onChange={handleInputChange} />
        </div>
        <div className="col">
          <label>End Date:</label>
          <input type="date" name="endDate" value={formState.endDate} onChange={handleInputChange} />
        </div>
        <div className="col">
          <label>End Time:</label>
          <input type="time" name="endTime" value={formState.endTime} onChange={handleInputChange} />
        </div>
        <div className="col">
          <label>No of Attempts:</label>
          <input type="number" name="noofattempts" value={formState.noofattempts} onChange={handleInputChange} />
        </div>
      </div>
      <button type="button" onClick={handleCancelClick}>Cancel</button>
      <button type="submit">Save</button>
    </form>
  );
}

export default Form;



















// import React, { useState } from 'react';

// function Form({ onSubmit }) {


//     const assignment_engine = [
//         { value: "value_1", label: "engine_1" },
//         { value: "value_2", label: "engine_2" },
//         { value: "value_3", label: "engine_3" },
//         { value: "value_4", label: "engine_4" },
//     ];
//     const assignment_name = [
//         { value: "value_1", label: "name_1" },
//         { value: "value_2", label: "name_2" },
//         { value: "value_3", label: "name_3" },
//         { value: "value_4", label: "name_4" },
//     ];


//   const [formData, setFormData] = useState({
//     assessmentEngine: '',
//     assessmentName: '',
//     startDate: '',
//     startTime: '',
//     endDate: '',
//     endTime: '',
//     noofattempts: ''
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="row">
//         <label>Assessment Engine:</label>
//         <select name="assessmentEngine" value={formData.assessmentEngine} onChange={handleInputChange}>
//           <option value="">--Assignment Engine--</option>
//           {/* Replace assignment_engine with your actual array */}
//           {assignment_engine.map(engine => (
//             <option key={engine.value} value={engine.value}>{engine.label}</option>
//           ))}
//         </select>
//       </div>
//       <div className="row">
//         <label>Assessment Name:</label>
//         <select name="assessmentName" value={formData.assessmentName} onChange={handleInputChange}>
//           <option value="">--Assignment Name--</option>
//           {/* Replace assignment_name with your actual array */}
//           {assignment_name.map(name => (
//             <option key={name.value} value={name.value}>{name.label}</option>
//           ))}
//         </select>
//       </div>
//       <div className='row'>
//         <div className="col">
//           <label>Start Date:</label>
//           <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
//         </div>
//         <div className="col">
//           <label>Start Time:</label>
//           <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} />
//         </div>
//         <div className="col">
//           <label>End Date:</label>
//           <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
//         </div>
//         <div className="col">
//           <label>End Time:</label>
//           <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} />
//         </div>
//         <div className="col">
//           <label>No of Attempts:</label>
//           <input type="number" name="noofattempts" value={formData.noofattempts} onChange={handleInputChange} />
//         </div>
//       </div>
//       <button type="button">Cancel</button>
//       <button type="submit">Save</button>
//     </form>
//   );
// }

// export default Form;
