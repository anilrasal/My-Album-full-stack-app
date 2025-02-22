import React, { useState } from 'react';
import { Button, TextField, Container } from '@mui/material';
import { fetchPostData } from 'client/client';
import { useNavigate } from 'react-router-dom'; // used for navigation from one path to another path
import { useEffect } from 'react'; // This will check and decide whent to mount this page.
//We are using useEffect to check if the token is already generated to avoid login again.

const AuthLogin = () => {
  const [email, setEmail] = useState(''); // using useState to set the data to the veriable on the go
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token'); // To check if the token is available in the storage space.
    if (isLoggedIn) {
      navigate('/');
      window.location.reload();
    }
  }, [navigate]); //The empty dependancy array ensures that the effects runs only once, on mount

  const validateEmail = () => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    // Basic password length validation
    return password.length >= 6 && password.length <= 15;
  };

  const handleLogin = async () => {
    // Reset previous errors
    setErrors({ email: '', password: '' });

    // Validation
    if (!validateEmail()) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
      return;
    }

    if (!validatePassword()) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 6 characters' }));
      return;
    }
    // Add your login logic here
    fetchPostData('/auth/token', { email, password })
      .then((response) => {
        const { token } = response.data;
        setLoginError('');
        localStorage.setItem('token', token);
        navigate('/'); // using the useNavigate here as already assigned navigate = useNavigate();
        window.location.reload();
      })
      .catch((error) => {
        //console.error('Login error:', error);
        // Handle other login errors
        setLoginError('An error occurred during login');
        if (error.response.status === 400) {
          alert('Username or Password is incorrect');
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
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </Container>
  );
};

export default AuthLogin;
