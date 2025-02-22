import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { fetchPutDataWithAuth } from 'client/client';
import { useNavigate, useLocation } from 'react-router-dom';
const PhotoEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const album_id = queryParams.get('album_id');
  const photo_id = queryParams.get('photo_id');
  const photoName = queryParams.get('photo_name');
  let photoDescription = queryParams.get('photo_dec');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn) {
      navigate('/login');
      window.location.reload();
    }
    if (photoDescription === 'undefined' || photoDescription === 'null') {
      photoDescription = '';
    }
    setFormData((preFormData) => ({
      ...preFormData,
      name: photoName,
      description: photoDescription
    }));
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((preData) => ({
      ...preData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //This is to prevent the default values to be submitted.

    //validation
    let isValid = true;
    const newErrors = { name: '', description: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.name = 'Description is required';
      isValid = false;
    }

    setErrors(newErrors);

    //If form is valid, you can proceed with further actions
    if (isValid) {
      const payload = {
        name: formData.name,
        description: formData.description
      };

      fetchPutDataWithAuth('/albums/' + album_id + '/photos/' + photo_id + '/update', payload)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error('Login error:', error);
        });
      console.log('Form submitted');
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        error={!!errors.name}
        helperText={errors.name}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        error={!!errors.name}
        helperText={errors.name}
        multiline
        rows={4}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Update photo details
      </Button>
    </form>
  );
};

export default PhotoEdit;
