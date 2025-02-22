// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //
const SamplePage = () => {
  return(
  <MainCard title="About">
    <Typography variant="body2">
      It&apos;s about Anil and development of the react!
    </Typography>
  </MainCard>
)};

export default SamplePage;
