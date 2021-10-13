import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';
import sessionSlice from './session';
import chartsSlice from './charts';
import expensesSlice from './expenses';


export default configureStore({
  reducer: {
    session: sessionSlice,
    charts: chartsSlice,
    expenses: expensesSlice
  },
  devTools: true
})