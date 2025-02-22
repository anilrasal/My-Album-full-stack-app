import { Box, Typography, Stack, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPutDataWithAuth } from 'client/client';
import SaveIcon from '@mui/icons-material/Save';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ChangePassword = () => {
  const isLoggedIn = localStorage.getItem('token');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  });
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, []);

  const validatePassword = () => {
    return data.password.length >= 6 && data.password.length <= 15;
  };

  const validateConfirmPassword = () => {
    return data.password === confirmPassword;
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleLogin = (e) => {
    let valid = true;
    e.preventDefault();
    setErrors({
      password: '',
      confirmPassword: ''
    });

    if (!validatePassword()) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 6 characters' }));
      valid = false;
    }
    if (!validateConfirmPassword()) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "Password doesn't match" }));
      valid = false;
    }

    if (valid) {
      console.log(data.password);
      fetchPutDataWithAuth('/auth/profile/update-password', data.password)
        .then((res) => {
          console.log(res.data);
          navigate('/profile', { state: { message: 'Pasword changed successfully' } });
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.status);
            console.log(err.response.data);
          }
        });
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Change Password
      </Typography>
      <form action="" onSubmit={(e) => handleLogin(e)}>
        <Stack spacing={2}>
          <TextField
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setData({ password: e.target.value })}
            value={data.password}
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={(e) => handleMouseDownPassword(e)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            required
            error={!!errors.password}
            helperText={errors.password}
          ></TextField>
          <TextField
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            label="Confirm Password"
            required
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          ></TextField>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="error" onClick={() => navigate('/profile')}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" startIcon={<SaveIcon />}>
              Save
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default ChangePassword;
