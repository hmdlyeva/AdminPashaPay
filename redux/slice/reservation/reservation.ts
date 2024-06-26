import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://45.95.214.69:8080/api/v1/reservation";

export const getReservData = createAsyncThunk(
  "reservations/getReservData",
  async () => {
    const response = await axios.get(baseURL);
    return response.data;
  }
);

export interface Reservation {
  reservationId: number;
  description: string;
  target: string;
  market: string;
}

export interface ReservationState {
  reservation: Reservation;
  reservations: Reservation[];
  loading: boolean;
}

const initialState: ReservationState = {
  reservation: {
    reservationId: 0,
    description: "",
    target: "",
    market: "",
  },
  reservations: [],
  loading: false,
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReservData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getReservData.fulfilled,
        (state, action: PayloadAction<Reservation[]>) => {
          state.reservations = action.payload;
          state.loading = false;
        }
      )
      .addCase(getReservData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = reservationSlice.actions;

export default reservationSlice.reducer;
