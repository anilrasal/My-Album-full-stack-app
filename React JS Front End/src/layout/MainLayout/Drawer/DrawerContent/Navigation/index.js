// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useEffect, useState } from 'react';
import { fetchGetDataWithAuth } from 'client/client';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    if (isLoggedIn)
      fetchGetDataWithAuth('/auth/profile')
        .then((res) => {
          if (res.data.authorities.indexOf('ADMIN') !== -1) {
            setIsAdmin(true);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            navigate('/logout', { state: { message: 'Login timeout' } });
          }
        });
  });

  const navGroups = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        if (item.id === 'users' && isLoggedIn) {
          return isAdmin && <NavGroup key={item.id} item={item} />;
        } else if (item.id === 'pages' || item.id === 'authentication') {
          return <NavGroup key={item.id} item={item} />;
        } else {
          return isLoggedIn && <NavGroup key={item.id} item={item} />;
        }
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
