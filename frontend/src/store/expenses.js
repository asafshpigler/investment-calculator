
import { createSlice } from '@reduxjs/toolkit'

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    value: [],
  },
  reducers: {
    setExpenses: (state, action) => {
      state.value = action.payload
    },
  },
})

export const selectCharts = state => state.expenses.value;
export const { setExpenses } = expensesSlice.actions

export default expensesSlice.reducer