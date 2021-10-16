import axios from 'axios';

export function getCharts() {
  return axios.get('/charts').then(res => res.data);
}

export function signup(userName) {
  return axios.post('/signup', {userName}).then(res => res.data);
}

export function login(userName) {
  return axios.post('/login', {userName}).then(res => res.data);
}

export function logout() {
  return axios.post('/logout');
}

export function updateExpenses(expenses) {
  return axios.post('/property-expenses', expenses).then(res => res.data);
}