import { configureStore } from "@reduxjs/toolkit";
import volunteerReducer from '../slice/volunteers/volunteers'
import locationReducer from '../slice/locations/locations'

export const store = configureStore({
  reducer: {
    volunteers: volunteerReducer,
    locations: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
