import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL; //This to use if you're making use of the enviroment variable

//Here is another option to use the proxy from packages.json file
const API_Version = '/api/v1';

const fetchGetData = (uri) => {
  const url = `${BASE_URL}${uri}`;
  //const url = `${API_Version}${uri}`;
  return axios.get(url).catch((error) => {
    //Handle exceptions/errors
    console.error('Error fetching data for URL: ', url, 'error', error.message);
    //You can throw the error again if you want to handle it elsewhere.
    throw error;
  });
};

const fetchPostData = (uri, payload) => {
  //const url = `${API_Version}${uri}`;
  const url = `${BASE_URL}${uri}`;
  return axios.post(url, payload).catch((error) => {
    // Handle exceptions/errors
    console.error('Error fetching data for URL:', url, 'Error', error.message);
    // You can throw the error again if you want to handle it elsewhere
    throw error;
  });
};

const fetchPostDataWithAuth = (uri, payload) => {
  const token = localStorage.getItem('token');

  const url = `${API_Version}${uri}`;
  //const url = `/api/v1${uri}`;
  return axios.post(url, payload, {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
};

const fetchGetDataWithAuth = async (uri) => {
  const token = localStorage.getItem('token');
  const url = `${BASE_URL}${uri}`;
  try {
    const response = await axios.get(url, { headers: { accept: '*/*', Authorization: `Bearer ${token}` } });
    return response;
  } catch (error) {
    //Handle errors if the request fails
    console.error('Error fetching data:', error);
    throw error;
  }
};

const fetchPostFileUploadWithAuth = async (uri, formData) => {
  const token = localStorage.getItem('token');
  const url = `${API_Version}${uri}`;
  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchGetDataWithAuthArrayBuffer = (uri) => {
  const token = localStorage.getItem('token');
  const url = `${API_Version}${uri}`;
  try {
    const response = axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'arraybuffer'
    });
    return response;
  } catch (error) {
    // Handle errors if the request fails
    console.log('error fetching data: ', error);
  }
};
const fetchPutDataWithAuth = (uri, payload) => {
  const token = localStorage.getItem('token');

  const url = `${API_Version}${uri}`;
  //const url = `/api/v1${uri}`;
  return axios.put(url, payload, {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
};

const fetchDeleteDataWithAuth = async (uri) => {
  const token = localStorage.getItem('token');
  const url = `${API_Version}${uri}`;
  console.log(url);
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    // Handle errors if the request fails
    console.log('Error fetching data:', error);
  }
};

const fetchGetBlobDataWithAuth = async (uri) => {
  const token = localStorage.getItem('token');
  const url = `${API_Version}${uri}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'blob' // Add the responseType option here
    });
    return response;
  } catch (error) {
    // Handle errors if the request fails
    console.error('Error fetching data:', error);
  }
};

export default fetchGetData;
export {
  fetchPostData,
  fetchPostDataWithAuth,
  fetchPutDataWithAuth,
  fetchGetDataWithAuth,
  fetchPostFileUploadWithAuth,
  fetchGetDataWithAuthArrayBuffer,
  fetchDeleteDataWithAuth,
  fetchGetBlobDataWithAuth
};
