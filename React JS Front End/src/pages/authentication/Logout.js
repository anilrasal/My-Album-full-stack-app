import { useLocation } from 'react-router-dom';

const Logout = () => {
  const location = useLocation();
  const msg = location.state?.message;
  if (msg) {
    alert(msg);
  }
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export default Logout;
