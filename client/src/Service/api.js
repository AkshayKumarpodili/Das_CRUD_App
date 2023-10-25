import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

API.interceptors.request.use((req)=> {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
      }
    
      return req;
})

export const getUsers = async (id) => {
    id = id || '';
    return await API.get(`/${id}`);
}

export const addUser = async (user) => {
    return await API.post(`/add`, user);
}

export const deleteUser = async (id) => {
    return await API.delete(`/${id}`);
}

export const editUser = async (id, user) => {
    return await API.put(`/${id}`, user)
}

export const signIn = async(formData) =>  API.post('/user/signin', formData);

export const signUp = async(formData) =>  API.post('/user/signup', formData);
