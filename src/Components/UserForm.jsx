import React, { useState } from 'react';
import '../styles/UserForm.css'
import { generatePrompt } from '../Helper/generatePrompt';

const UserForm = ({theme, fetchStory}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    occupation: '',
    funFact: '',
    storyGenre: '',
    famousAuthor: ''
  });

  const [errors, setErrors] = useState({});

  const [prompt, setPrompt] = useState('')


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const formErrors = {};
    if (!formData.firstName) formErrors.firstName = 'First name is required';
    if (!formData.occupation) formErrors.occupation = 'Occupation is required';
    if (!formData.funFact) formErrors.funFact = 'Fun fact is required';
    if (!formData.storyGenre) formErrors.storyGenre = 'Story genre is required';

    // Set errors and prevent form submission if there are any errors
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      await fetchStory(generatePrompt(formData))
    }
  };

  return (
    <form className={`user-form ${theme}`} onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      {errors.firstName && <div className="error">{errors.firstName}</div>}

      <label htmlFor="occupation">Occupation:</label>
      <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />
      {errors.occupation && <div className="error">{errors.occupation}</div>}

      <label htmlFor="funFact">Fun Fact:</label>
      <input type="text" name="funFact" value={formData.funFact} onChange={handleChange} />
      {errors.funFact && <div className="error">{errors.funFact}</div>}

      <label htmlFor="storyGenre">Story Genre:</label>
      <select name="storyGenre" value={formData.storyGenre} onChange={handleChange}>
        <option value="">Select a genre</option>
        <option value="sci-fi">Science Fiction</option>
        <option value="fantasy">Fantasy</option>
        <option value="mystery">Mystery</option>
        <option value="romance">Romance</option>
        <option value="horror">Horror</option>
      </select>
      {errors.storyGenre && <div className="error">{errors.storyGenre}</div>}

      <label htmlFor="famousAuthor">Famous Author (optional):</label>
      <input type="text" name="famousAuthor" value={formData.famousAuthor} onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
