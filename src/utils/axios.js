import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: 'https://api.sillypixel.fr/',
    timeout: 2000,
    headers: {'Authorization': `Bearer ${global.localStorage.getItem('token')}`}
  });
};
