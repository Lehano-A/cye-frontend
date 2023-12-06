import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDevice: null,
}


const checkUserDeviceSlice = createSlice({
  name: 'checkUserDevice',
  initialState,
  reducers: {
    setUserDevice: (state, action) => { state.userDevice = action.payload },
  }
})


export const { setUserDevice } = checkUserDeviceSlice.actions

export default checkUserDeviceSlice.reducer