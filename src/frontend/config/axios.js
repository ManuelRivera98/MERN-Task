import axios from 'axios';

// Config
import config from './index';

const axiosClient = axios.create({
  baseURL: config.backendUrl,
});

export default axiosClient;
