// UserForm.js
import React, { useState } from 'react';
import '../styles/UserForm.css'
const UserForm = ({theme}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    occupation: '',
    funFact: '',
    storyGenre: '',
    famousAuthor: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form data submission here
  };

  return (
    <form className={`user-form ${theme}`} onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />

      <label htmlFor="occupation">Occupation:</label>
      <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />

      <label htmlFor="funFact">Fun Fact:</label>
      <input type="text" name="funFact" value={formData.funFact} onChange={handleChange} />

      <label htmlFor="storyGenre">Story Genre:</label>
      <select name="storyGenre" value={formData.storyGenre} onChange={handleChange}>
        <option value="">Select a genre</option>
        <option value="sci-fi">Science Fiction</option>
        <option value="fantasy">Fantasy</option>
        <option value="mystery">Mystery</option>
        <option value="romance">Romance</option>
        <option value="horror">Horror</option>
      </select>

      <label htmlFor="famousAuthor">Famous Author (optional):</label>
      <input type="text" name="famousAuthor" value={formData.famousAuthor} onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
