
import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
  name: 'isLoggedIn',
  initialState: {
    value: false,
  },
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.value = action.payload
    },
  },
})

export const selectSession = state => state.session.value;
export const { setUserLoggedIn } = sessionSlice.actions;

export default sessionSlice.reducer;