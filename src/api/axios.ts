import axios from 'axios';
// import { redirect } from 'next/navigation';
import { apiBaseUrl } from 'utils';

// TODO: uncomment this when we get baseURL from the backend

const api = axios.create({
  baseURL: `${apiBaseUrl}/api/`,
  headers: {
    'Content-type': 'application/json',
  },
  maxBodyLength: Infinity,
  withCredentials: true,
});

// TODO: uncomment this when access token is implemented

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// TODO: uncomment this when we get baseURL from the backend

export default api;

// TODO: uncomment this when refresh token is implemented

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       (error.response.status === 401 || error.response.status === 403) &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem('refresh_token');
//         const response = await axios.post(
//           `${apiBaseUrl}/api/auth/refresh_token/`,
//           {
//             refresh: refreshToken,
//           }
//         );
//         const token = response.data.access;
//         localStorage.setItem('access_token', token);
//         originalRequest.headers.Authorization = `Bearer ${token}`;
//         return axios(originalRequest);
//       } catch (error) {
//         localStorage.removeItem('refresh_token');
//         localStorage.removeItem('access_token');
//         redirect('/login');
//       }
//     }

//     return Promise.reject(error);
//   }
// );
