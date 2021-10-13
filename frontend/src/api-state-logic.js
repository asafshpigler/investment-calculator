import store from './store';
import { setCharts, setCurrentChart, setPropertyIds } from 'store/charts';
import * as api from 'api';
import { setUserLoggedIn } from 'store/session';

// login used by the application, to resume an existing session, if exists
export async function appLogin() {
  const user = await api.login();

  if (user) {
    store.dispatch(setUserLoggedIn(true));
    await getUserData();
  }
}

// login used by the user, through UI
export async function userLogin(userName) {
  await api.login(userName);

  store.dispatch(setUserLoggedIn(true));

  await getUserData();
}

export async function signup(userName) {
  await api.signup(userName);

  store.dispatch(setUserLoggedIn(true));

  await getUserData();
}

export async function logout() {
  await api.logout();

  store.dispatch(setUserLoggedIn(false));
}

async function getUserData() {
  const charts = await api.getCharts();
  
  store.dispatch(setCharts(charts));
  store.dispatch(setCurrentChart(charts[0]));
  store.dispatch(setPropertyIds(charts.map(p => p.propertyId)));
}


export function setChartByPropertyId(propertyId) {
  const charts = store.getState().charts.value.charts;
  const currentChart = charts.find(c => c.propertyId === propertyId);

  store.dispatch(setCurrentChart(currentChart));
}