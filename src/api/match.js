import axios from 'axios';
import { API_URL } from '../config';

export const save = (data) => {
  return axios.request({
    url: `${API_URL}/matches`,
    method: 'POST', 
    data
  });
}

export const getStatistics = () => {
  return axios.request({
    url: `${API_URL}/matches/statistics`,
    method: 'GET'
  });
}