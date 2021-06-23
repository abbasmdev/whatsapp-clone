import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChatId: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    setSelectedChatId: (state, action) => {
      state.selectedChatId = action.payload;
    },
  },
});

export const { setSelectedChatId } = chatSlice.actions;

export const selectSelectedChatId = (state) => state.counter.selectedChatId;

export default chatSlice.reducer;
