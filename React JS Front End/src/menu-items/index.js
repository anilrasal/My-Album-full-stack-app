// project import
import auth from './auth';
import albums from './albums';
import pages from './pages';
import users from './users';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [albums, users, auth, pages]
};

export default menuItems;
