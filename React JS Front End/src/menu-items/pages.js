// assets
import { QuestionOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  QuestionOutlined,
  UserOutlined
};

const isLoggedIn = localStorage.getItem('token');

const caseLoggedIn = [
  {
    id: 'Profile',
    title: 'Profile',
    type: 'item',
    url: '/profile',
    icon: icons.UserOutlined
  },
  {
    id: 'About',
    title: 'About',
    type: 'item',
    url: '/about',
    icon: icons.QuestionOutlined
  }
];

const about = {
  id: 'pages',
  title: 'pages',
  type: 'group',
  children: [isLoggedIn && caseLoggedIn[0], caseLoggedIn[1]].filter(Boolean)
};

export default about;
