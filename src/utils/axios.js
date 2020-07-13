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

export const axiosEmployees = () =>
  axios.create({
    baseURL: 'https://spispracownikow.pk.edu.pl/data.php',
    timeout: 10000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
