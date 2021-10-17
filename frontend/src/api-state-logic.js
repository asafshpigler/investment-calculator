import * as api from 'api';
import store from './store';
import { setCharts, setCurrentChart, setPropertyIds, LOAN_TYPES, replaceChartInCharts } from 'store/charts';
import { setUserLoggedIn } from 'store/session';

export async function appLogin() {
  console.log('appLogin');

  const user = await api.login();

  if (user) {
    store.dispatch(setUserLoggedIn(true));
    await getUserData();
  }
}

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
  console.log('getUserData');
  
  const charts = await api.getCharts();
  
  store.dispatch(setCharts(charts));
  store.dispatch(setCurrentChart(charts[0]));
  store.dispatch(setPropertyIds(charts.map(p => p.propertyId)));
}

export function setChartByPropertyId(propertyId) {
  console.log('setChartByPropertyId', propertyId);

  const charts = store.getState().charts.value.charts;
  const currentChart = charts.find(c => c.propertyId === propertyId);

  store.dispatch(setCurrentChart(currentChart));
}

export async function updateExpenses() {
  const {userInputMortgage, userInputOneTime, userInputMonthly, propertyId, charts} = store.getState().charts.value.currentChart;
  const {type, startDate, loanAmount, duration, loanRate, paymentPeriods} = userInputMortgage;

  let mortgageExpenses = null;
  if (type === LOAN_TYPES.SPITZER) {
    mortgageExpenses = {
      type,
      startDate,
      loanAmount,

      duration,
      loanRate: +(loanRate / 100).toFixed(4)
    }
  } else if (type === LOAN_TYPES.NORMAL) {
    mortgageExpenses = {
      type,
      startDate,
      loanAmount,

      paymentPeriods,
    }
  }

  const propertyExpenses = {
    propertyId,
    oneTimeExpenses: userInputOneTime,
    monthlyExpenses: userInputMonthly,
    mortgageExpenses,
  }

  const chart = await api.updateExpenses(propertyExpenses);

  store.dispatch(setCurrentChart(chart));
  store.dispatch(replaceChartInCharts(chart));
}