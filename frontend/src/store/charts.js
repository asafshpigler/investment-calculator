
import { createSlice } from '@reduxjs/toolkit'
import { LOAN_TYPES } from 'const';
import { clone } from 'helpers';
import moment from 'moment';

const TODAY_DATE_STRING = moment().format('YYYY-MM-DD');

const DEFAULT_CHARTS = {
  charts: [],
  currentChart: {
    userInputOneTime: [],
    userInputMonthly: [],
    userInputMortgage: {
      type: LOAN_TYPES.SPITZER,
      startDate: TODAY_DATE_STRING,
      loanAmount: 0,
      duration: 0,
      loanRate: 1.5,
      paymentPeriods: undefined,
    },
  },
  propertyIds: []
}

export const chartsSlice = createSlice({
  name: 'charts',
  initialState: {value: DEFAULT_CHARTS },
  reducers: {
    setCharts: (state, action) => {
      state.value.charts = action.payload
    },
    setCurrentChart: (state, action) => {
      state.value.currentChart = action.payload;
    },
    replaceChartInCharts: (state, action) => {
      const nextCharts = clone(state.value.charts);
      const nextChart = action.payload;

      const chartIndex = nextCharts.findIndex(c => c.propertyId === nextChart.propertyId);
      nextCharts[chartIndex] = nextChart;

      state.value.charts = nextCharts;
    },
    setPropertyIds: (state, action) => {
      state.value.propertyIds = action.payload
    },

    setMortgageType: (state, action) => {
      const type = action.payload;
      state.value.currentChart.userInputMortgage.type = type;

      // custom inputs: initialize & remove by current type
      if (type === LOAN_TYPES.SPITZER) {
        state.value.currentChart.userInputMortgage.paymentPeriods = undefined;

        state.value.currentChart.userInputMortgage.duration = 0;
        state.value.currentChart.userInputMortgage.loanRate = 0;

      } else if (type === LOAN_TYPES.NORMAL) {
        state.value.currentChart.userInputMortgage.duration = undefined;
        state.value.currentChart.userInputMortgage.loanRate = undefined;

        state.value.currentChart.userInputMortgage.paymentPeriods = [{duration: 0, amount: 0}];
      }
    },
    setMortgageStartDate: (state, action) => {
      state.value.currentChart.userInputMortgage.startDate = action.payload;
    },
    setMortgageAmount: (state, action) => {
      state.value.currentChart.userInputMortgage.loanAmount = action.payload;
    },
    setMortgageDuration: (state, action) => {
      state.value.currentChart.userInputMortgage.duration = action.payload;
    },
    setMortgageLoanRate: (state, action) => {
      state.value.currentChart.userInputMortgage.loanRate = action.payload;
    },
    setMortgagePaymentPeriods: (state, action) => {
      state.value.currentChart.userInputMortgage.paymentPeriods = action.payload;
    },
    addPaymentPeriod: (state) => {
      state.value.currentChart.userInputMortgage.paymentPeriods = [
        ...state.value.currentChart.userInputMortgage.paymentPeriods,
        {duration: 0, amount: 0}
      ];
    },

    setOneTimeExpenses: (state, action) => {
      state.value.currentChart.userInputOneTime = action.payload;
    },
    addOneTimeExpense: (state) => {
      state.value.currentChart.userInputOneTime = [
        ...state.value.currentChart.userInputOneTime,
        {paymentDate: TODAY_DATE_STRING, amount: 0}
      ];
    },

    setMonthlyExpenses: (state, action) => {
      state.value.currentChart.userInputMonthly = action.payload;
    },
    addMonthlyExpense: (state) => {
      state.value.currentChart.userInputMonthly = [
        ...state.value.currentChart.userInputMonthly,
        {startDate: TODAY_DATE_STRING, duration: 0, amount: 0}
      ];
    },
  },
})

export const selectCharts = state => state.charts.value.charts;
export const selectCurrentChart = state => state.charts.value.currentChart;
export const selectPropertyIds = state => state.charts.value.propertyIds;
export const selectPropertyAnnualFigures = state => {
  const { avgAnnualIncome, avgAnnualExpense, avgAnnualProfit } = state.charts.value.currentChart;
  return ({ avgAnnualIncome, avgAnnualExpense, avgAnnualProfit });
}

export const selectMortgageType = state => state.charts.value.currentChart.userInputMortgage.type;
export const selectMortgageStartDate = state => state.charts.value.currentChart.userInputMortgage.startDate;
export const selectMortgageAmount = state => state.charts.value.currentChart.userInputMortgage.loanAmount;
export const selectMortgageDuration = state => state.charts.value.currentChart.userInputMortgage.duration;
export const selectMortgageLoanRate = state => state.charts.value.currentChart.userInputMortgage.loanRate;
export const selectMortgagePaymentPeriods = state => state.charts.value.currentChart.userInputMortgage.paymentPeriods;

export const selectOneTimeExpenses = state => state.charts.value.currentChart.userInputOneTime;

export const selectMonthlyExpenses = state => state.charts.value.currentChart.userInputMonthly;

export const {
  setCharts,
  setCurrentChart,
  replaceChartInCharts,
  setPropertyIds,
  setMortgageType,
  setMortgageStartDate,
  setMortgageAmount,
  setMortgageDuration,
  setMortgageLoanRate,
  setMortgagePaymentPeriods,
  addPaymentPeriod,
  setOneTimeExpenses,
  addOneTimeExpense,
  setMonthlyExpenses,
  addMonthlyExpense,
} = chartsSlice.actions

export default chartsSlice.reducer