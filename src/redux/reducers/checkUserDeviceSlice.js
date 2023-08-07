import { createSlice } from "@reduxjs/toolkit";


const checkUserDeviceSlice = createSlice({
  name: 'checkUserDevice',
  initialState: {
    userDevice: null,
  },
  reducers: {
    setUserDevice: (state, action) => { state.userDevice = action.payload },
  }
})

export const { setUserDevice } = checkUserDeviceSlice.actions

export default checkUserDeviceSlice.reducer