import axios from 'axios';

export default() => axios.create({
  baseURL: 'https://bookmarkify.herokuapp.com/api',
});
