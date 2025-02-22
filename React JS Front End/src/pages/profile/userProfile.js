import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack, Avatar, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import avatar1 from 'assets/images/users/avatar-1.png';
import { useEffect, useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { fetchGetDataWithAuth, fetchDeleteDataWithAuth } from 'client/client';

const UserProfile = () => {
  const isLoggedIn = localStorage.getItem('token');
  const location = useLocation();
  const msg = location.state?.message;
  const [data, setData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    authorities: ''
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
    fetchGetDataWithAuth('/auth/profile')
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/logout', { state: { message: 'Session expired' } });
        }
      });
  }, []);

  const handleDelete = () => {
    if (confirm("Once the account is deleted, it can't be recovered. Are you sure you want to delete account?")) {
      fetchDeleteDataWithAuth('/auth/profile/delete').then(() =>
        navigate('/logout', { state: { message: 'Account successfully deleted' } })
      );
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Basic info
      </Typography>
      <Typography color="green" gutterBottom>
        {msg}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ marginBottom: 3 }}>
        <Avatar alt="profile user" src={avatar1} sx={{ width: 100, height: 100 }} />
        <Stack direction="column" alignItems="left">
          <Stack direction="row" spacing={1}>
            <Typography variant="h6" gutterBottom>
              {data.firstName}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {data.lastName}
            </Typography>
          </Stack>
          <Typography gutterBottom>id: {data.id}</Typography>
          <Button variant="contained" startIcon={<LockIcon />} onClick={() => navigate('/profile/change-password')}>
            Change Password
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        <Grid item xs={6}>
          <Typography>First Name: {data.firstName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Last Name: {data.lastName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Email: {data.email}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Authories: {data.authorities}</Typography>
        </Grid>
      </Grid>
      <Stack spacing={2} direction="row">
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Account
        </Button>
      </Stack>
    </Box>
  );
};

export default UserProfile;
