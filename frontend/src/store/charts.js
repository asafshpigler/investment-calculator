
import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_CHARTS = {
  charts: [],
  currentChart: {},
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
  },
})

export const selectCharts = state => state.charts.value.charts;
export const selectCurrentChart = state => state.charts.value.currentChart;
export const selectPropertyIds = state => state.charts.value.propertyIds;

export const { setCharts, setCurrentChart, setPropertyIds } = chartsSlice.actions

export default chartsSlice.reducer