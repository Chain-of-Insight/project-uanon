import {useAuthTokenInterceptor} from 'axios-jwt';
import axios from 'axios';

const apiClient = axios.create();

const API_URL = process.env.VUE_APP_API_URL;

const refreshEndpoint = API_URL + '/auth/refresh_token';

// define token refresh function
const requestRefresh = async (refreshToken) => {
  // perform refresh
  return (await axios.post(refreshEndpoint, { token: refreshToken })).data.access_token;
};

useAuthTokenInterceptor(apiClient, { requestRefresh });

/**
 * HTTP Get
 * @param {String} endpoint : The endpoint URI to be called; e.g. '/test'
 * @param {Object} params: Optional get params (query string)
 */
async function get(endpoint, params = {}) {
  let apiEndpoint = API_URL + endpoint, res;
  if (params !== {}) {
    res = await apiClient.get(apiEndpoint, {params: params});
  } else {
    res = await apiClient.get(apiEndpoint);
  }
  return res;
}

/**
 * HTTP Get {File}
 * Downloads a file from storage
 * @param {String} fileUrl : A fully formed file URL to be downloaded
 * @param {String} mimeType : Mime type of file, defaults to zip
 */
async function download(fileUrl, mimeType = 'application/zip') {
  const S3Client = axios.create();
  const res = await S3Client.get(fileUrl, {
    responseType: 'blob'
  });
  const url = window.URL.createObjectURL(new Blob([res.data],{type: mimeType}));
  const link = document.createElement('a');
  let ext;
  switch (mimeType) {
    case 'application/zip': {
      ext = '.zip';
      break;
    }
    // XXX TODO: other Mime Types
    default: {
      ext = '.zip';
      break;
    }
  }
  link.href = url;
  link.setAttribute('download', 'puzzle' + ext);
  document.body.appendChild(link);
  link.click();
  return res;
}

/**
 * HTTP Post
 * @param {String} endpoint : The endpoint URI to be called; e.g. '/test'
 * @param {Object} data : The post payload to be sent; e.g. {arg1: value, arg2: value}
 */
async function post(endpoint, data) {
  if (typeof data !== 'object') {
    throw new Error('Payload rejected. Object required, got ' + typeof data);
  }
  let apiEndpoint = API_URL + endpoint;
  let res = await apiClient.post(apiEndpoint, data);
  return res;
}

const request = {
  get: get,
  post: post,
  download: download
};

export { request };
