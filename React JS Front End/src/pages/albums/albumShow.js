import Header from './albums/header';
//import PhotoGrid from './albums/photoGrid';
import PhotoGrid1 from './albums/photoGrid1';

const Albums = () => {
  //   const photoUrls = [
  //     { id: 1, url: 'https://picsum.photos/id/237/300/201', title: 'Cute Cat 1' },
  //     { id: 2, url: 'https://picsum.photos/seed/picsum/300/202', title: 'Cute Cat 2' },
  //     { id: 3, url: 'https://picsum.photos/300/203?grayscale', title: 'Cute Cat 3' },
  //     { id: 4, url: 'https://picsum.photos/200/300', title: 'Cute Cat 4' },
  //     { id: 5, url: 'https://picsum.photos/200/301', title: 'Cute Cat 5' },
  //     { id: 6, url: 'https://picsum.photos/200/302', title: 'Cute Cat 6' },
  //     { id: 7, url: 'https://picsum.photos/200/303', title: 'Cute Cat 7' },
  //     { id: 8, url: 'https://picsum.photos/200/304', title: 'Cute Cat 8' },
  //     { id: 9, url: 'https://picsum.photos/200/305', title: 'Cute Cat 9' },
  //     { id: 10, url: 'https://picsum.photos/200/306', title: 'Cute Cat 10' }
  //   ];

  return (
    <div>
      <Header />
      <div style={{ marginTop: '20px', padding: '20px' }}>
        {/*<PhotoGrid photoUrls={photoUrls} />*/}
        <PhotoGrid1 />
      </div>
    </div>
  );
};

export default Albums;
