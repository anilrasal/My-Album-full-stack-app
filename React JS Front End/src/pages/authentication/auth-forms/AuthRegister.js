import React, { useState } from 'react';
import { Button, TextField, Container } from '@mui/material';
import { fetchPostData } from 'client/client';
import { useNavigate } from 'react-router-dom'; // used for navigation from one path to another path
import { useEffect } from 'react'; // This will check and decide whent to mount this page.
//We are using useEffect to check if the token is already generated to avoid login again.

const AuthRegister = () => {
  const [email, setEmail] = useState(''); // using useState to set the data to the veriable on the go
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token'); // To check if the token is available in the storage space.
    if (isLoggedIn) {
      navigate('/');
      window.location.reload();
    }
  }, []); //The empty dependancy array ensures that the effects runs only once, on mount

  const validateEmail = () => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Reset previous errors
    setErrors({ email: '', password: '', firstName: '', lastName: '' });

    let valid = true;

    // Validation
    if (!validateEmail()) {
      valid = false;
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
      return;
    }

    if (!lastName.trim()) {
      valid = false;
      setErrors((prevErrors) => ({ ...prevErrors, lastName: 'Enter Last name' }));
      return;
    }
    if (!lastName.trim()) {
      valid = false;
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 6 characters' }));
      return;
    }
    // Add your login logic here
    if (valid)
      fetchPostData('/auth/users/add', { email, firstName, lastName, password })
        .then(() => {
          setLoginError('');
          navigate('/'); // using the useNavigate here as already assigned navigate = useNavigate();
          window.location.reload();
        })
        .catch((error) => {
          console.error('Login error:', error);
          // Handle other login errors
          setLoginError('An error occurred during signup');
          if (error.response.status === 400) {
            alert('Account already exists with this email');
          }
        });
  };
  return (
    <Container component="main" maxWidth="xs">
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        required
        label="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Last Name"
        value={lastName}
        required
        onChange={(e) => setLastName(e.target.value)}
        error={!!errors.lastName}
        helperText={errors.lastName}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Register
      </Button>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </Container>
  );
};

export default AuthRegister;
