import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
// render - dashboard

// render - sample page
const AlbumsPage = Loadable(lazy(() => import('pages/albums/albums')));
const AboutPage = Loadable(lazy(() => import('pages/staticPages/about')));
const AddAlbumPage = Loadable(lazy(() => import('pages/albums/addAlbum')));
const AlbumShowPage = Loadable(lazy(() => import('pages/albums/albumShow')));
const AlbumEditPage = Loadable(lazy(() => import('pages/albums/albumEdit')));
const PhotoEditPage = Loadable(lazy(() => import('pages/albums/PhotoEdit')));
const AlbumUploadPage = Loadable(lazy(() => import('pages/albums/albumUpload')));
const ListUsersPage = Loadable(lazy(() => import('pages/profile/ListUsers')));
const UserProfile = Loadable(lazy(() => import('pages/profile/userProfile')));
const ChangePassowrd = Loadable(lazy(() => import('pages/profile/changePassword')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <AlbumsPage />
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/add-album',
      element: <AddAlbumPage />
    },
    {
      path: '/album/show',
      element: <AlbumShowPage />
    },
    {
      path: '/album/edit',
      element: <AlbumEditPage />
    },
    {
      path: '/photo/edit',
      element: <PhotoEditPage />
    },
    {
      path: '/album/upload',
      element: <AlbumUploadPage />
    },
    {
      path: '/list-users',
      element: <ListUsersPage />
    },
    {
      path: '/profile',
      element: <UserProfile />
    },
    {
      path: '/profile/change-password',
      element: <ChangePassowrd />
    }
  ]
};

export default MainRoutes;
