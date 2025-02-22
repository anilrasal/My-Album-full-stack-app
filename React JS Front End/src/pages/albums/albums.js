// material-ui
// import { Typography } from '@mui/material';
// import fetchGetData from 'client/client';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchGetDataWithAuth } from 'client/client';

// project import
//import MainCard from 'components/MainCard';
import { makeStyles } from '@mui/styles';
import { Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //

const brightPopColors = [
  '#FF3E4D',
  '#FF5635',
  '#FFAB00',
  '#36B37E',
  '#00B8D9',
  '#0052CC',
  '#253858',
  '#0067B1',
  '#004B8D',
  '#9C27B0',
  '#E91E63',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
  '#607D8B',
  '#F44336',
  '#E57373',
  '#FFCDD2',
  '#64B5F6',
  '#4FC3F7',
  '#BBDEFB',
  '#81C784',
  '#C8E6C9',
  '#DCE775',
  '#FFF176',
  '#FFD54F',
  '#FFB74D',
  '#FF8A65',
  '#A1887F',
  '#E0E0E0',
  '#90A4AE',
  '#FF4081',
  '#FF80AB',
  '#F50057',
  '#651FFF',
  '#3D5AFE',
  '#2979FF',
  '#00B0FF',
  '#00E5FF'
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * brightPopColors.length);
  return brightPopColors[randomIndex];
};

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: getRandomColor(),
    testAlign: 'center',
    padding: theme.spacing(3),
    bourderRadius: theme.spacing(2),
    height: '250px', //increase the height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

const AlbumDynamicGridPage = () => {
  const [dataArray, setDataArray] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      window.location.reload();
    }
    fetchGetDataWithAuth('/albums')
      .then((res) => {
        setDataArray(res.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            navigate('/logout', { state: { message: 'Login timeout' } });
          }
        }
      });
  }, [isLoggedIn]); //The empty dependancy array ensures that the effects runs only once, on mount

  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {dataArray.map((data, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Link style={{ textDecoration: 'none' }} to={`/album/show?id=${data.id}`}>
            <Card className={classes.card} style={{ backgroundColor: getRandomColor() }}>
              <CardContent>
                <h1 style={{ fontSize: '2rem', margin: 0, color: 'white' }}>{data.name}</h1>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

// const apiUrl = "";
// fetchGetData(apiUrl)
//   .then(res=>{
//     //Do Something with the data.
//     console.log("Data:", res.data);
//   }).catch(error => {
//     //Handle error from the fetchGetData function.
//     console.log('Error in .then', error.message);
//   });

// const SamplePage = () => {
//   const navigate = useNavigate();

//   useEffect(()=>{
//     const isLoggedIn = localStorage.getItem('token');
//     if(!isLoggedIn){
//       navigate("/login");
//       window.location.reload();
//     }
//   },[]);//The empty dependancy array ensures that the effects runs only once, on mount

//   return(
//   <MainCard title="Albums">
//     <Typography variant="body2">
//       Albums
//     </Typography>
//   </MainCard>
// )};

export default AlbumDynamicGridPage;
