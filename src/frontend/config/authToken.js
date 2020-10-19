import clientAxios from './axios';

const authToken = (token) => {
  if (token) {
    clientAxios.defaults.headers.common.Authorization = token;
  } else {
    delete clientAxios.defaults.headers.common.Authorization;
  }
};

export default authToken;
