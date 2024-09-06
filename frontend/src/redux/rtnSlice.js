import { createSlice } from "@reduxjs/toolkit";

const rtnSlice = createSlice({
  name: 'realTimeNotification',
  initialState: {
    likeNotification: [],
  },
  reducers: {
    setLikeNotification: (state, action) => {
      const existingIndex = state.likeNotification.findIndex(
        (item) => item.userId === action.payload.userId
      );

      if (action.payload.type === 'like') {
        if (existingIndex === -1) {
          // Only add if the notification doesn't already exist
          state.likeNotification.push(action.payload);
        }
      } else if (action.payload.type === 'dislike') {
        if (existingIndex !== -1) {
          // Remove the notification for the userId
          state.likeNotification.splice(existingIndex, 1);
        }
      }
    },
  },
});

export const { setLikeNotification } = rtnSlice.actions;
export default rtnSlice.reducer;
