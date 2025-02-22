// assets
import { ChromeOutlined, PictureOutlined, FileOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  PictureOutlined,
  FileOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //
const isLoginEnabled = localStorage.getItem('token');

const caseLoggedIn = [
  {
    id: 'Album',
    title: 'Albums',
    type: 'item',
    url: '/',
    icon: icons.PictureOutlined
  },
  {
    id: 'Add Album',
    title: 'Add Album',
    type: 'item',
    url: '/add-album',
    icon: icons.FileOutlined
  }
];

const albums = {
  id: 'albums',
  title: 'Albums',
  type: 'group',
  children: [isLoginEnabled && caseLoggedIn[0], isLoginEnabled && caseLoggedIn[1]].filter(Boolean)
};

export default albums;
