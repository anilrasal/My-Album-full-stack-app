// assets
import { ChromeOutlined, PictureOutlined, FileOutlined, UsergroupAddOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  PictureOutlined,
  FileOutlined,
  UsergroupAddOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //
const isLoggedIn = localStorage.getItem('token');

const users = [
  {
    id: 'Users',
    title: 'Users',
    type: 'item',
    url: '/list-users',
    icon: icons.UsergroupAddOutlined
  }
];

const usersC = {
  id: 'users',
  title: 'Users',
  type: 'group',
  children: [isLoggedIn && users[0]].filter(Boolean)
};

export default usersC;
