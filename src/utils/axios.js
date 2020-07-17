import axios from 'axios';
import {SERVER_URL} from '../../config';

/**
 * Tworzy i zwraca instancję axios do zapytań http.
 * @return {AxiosInstance} axiosInstance
 */
export default () =>
  axios.create({
    baseURL: SERVER_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const axiosPK = () =>
  axios.create({
    baseURL: 'https://spispracownikow.pk.edu.pl',
    timeout: 10000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
