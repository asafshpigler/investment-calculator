
import { createSlice } from '@reduxjs/toolkit'

export const LOAN_TYPES = {
  NORMAL: 'NORMAL',
  SPITZER: 'SPITZER',
}

const DEFAULT_CHARTS = {
  charts: [],
  currentChart: {
    userInputMortgage: {
      type: LOAN_TYPES.SPITZER,
      startDate: null,
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
      state.value.currentChart = action.payload
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
    }
  },
})

export const selectCharts = state => state.charts.value.charts;
export const selectCurrentChart = state => state.charts.value.currentChart;
export const selectPropertyIds = state => state.charts.value.propertyIds;

export const selectMortgageType = state => state.charts.value.currentChart.userInputMortgage.type;
export const selectMortgageStartDate = state => state.charts.value.currentChart.userInputMortgage.startDate;
export const selectMortgageAmount = state => state.charts.value.currentChart.userInputMortgage.loanAmount;
export const selectMortgageDuration = state => state.charts.value.currentChart.userInputMortgage.duration;
export const selectMortgageLoanRate = state => state.charts.value.currentChart.userInputMortgage.loanRate;
export const selectMortgagePaymentPeriods = state => state.charts.value.currentChart.userInputMortgage.paymentPeriods;

export const {
  setCharts,
  setCurrentChart,
  setPropertyIds,
  setMortgageType,
  setMortgageStartDate,
  setMortgageAmount,
  setMortgageDuration,
  setMortgageLoanRate,
  setMortgagePaymentPeriods,
  addPaymentPeriod,
} = chartsSlice.actions

export default chartsSlice.reducer