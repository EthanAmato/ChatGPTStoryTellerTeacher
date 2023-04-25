import React, { useState } from 'react';
import '../styles/UserForm.css'
import { generatePrompt } from '../Helper/generatePrompt';

const UserForm = ({theme, fetchStory}) => {

  //Just going to use a single object to store all of our form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    occupation: '',
    funFact: '',
    storyGenre: '',
    famousAuthor: ''
  });

  //Start with 0 errors in errors state, so we have a blank object
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    //name will store the name of the input we're typing in
    //value will store the actual text that the user types in the input field
    const { name, value } = e.target;

    //constantly update our formData state object with this information
    setFormData({ ...formData, [name]: value });

    //keep track of whether there are any errors for all input fields simultaneously
    //if someone types in a field, immediately rescind error
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const formErrors = {};

    //If there is a blank field, set a key at that field with value 'Field is required'
    if (!formData.firstName) formErrors.firstName = 'First name is required';
    if (!formData.occupation) formErrors.occupation = 'Occupation is required';
    if (!formData.funFact) formErrors.funFact = 'Fun fact is required';
    if (!formData.storyGenre) formErrors.storyGenre = 'Story genre is required';

    // Set errors and prevent form submission if there are any errors
    // Goes through the keys of the formErrors object made above - if there are any errors, set errors to our formErrors obj
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
