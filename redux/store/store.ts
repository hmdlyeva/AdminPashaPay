import { configureStore } from "@reduxjs/toolkit";
import volunteerReducer from '../slice/volunteers/volunteers'
import locationReducer from '../slice/locations/locations'
import teamleaderReducer from '../slice/teamleader/teamleaders'


export const store = configureStore({
  reducer: {
    volunteers: volunteerReducer,
    locations: locationReducer,
    teamleaders: teamleaderReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
