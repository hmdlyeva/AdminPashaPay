import { RootState } from "@/redux/store/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://45.95.214.69:8080/api/v1/reservation/admin/all";
const accessTokenim = localStorage.getItem("accessToken");
export const getReservData = createAsyncThunk(
  "reservations/getReservData",
  async (_, { getState }) => {
    const accessToken = (getState() as RootState).reservations.accessToken;
    const refreshToken = (getState() as RootState).reservations.refreshToken;
    const response = await axios.get(baseURL, {
      headers: { Authorization: `Bearer ${accessToken || refreshToken || accessTokenim}` },
    });
    return response.data;
  }
);

export interface Reservation {
  reservationId: number;
  locationId: number;
  startTime: string;
  endTime: string;
  volunteerId: number;
  status:string
}

export interface ReservationState {
  reservation: Reservation;
  reservations: Reservation[];
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: ReservationState = {
  reservation: {
    reservationId: 0,
    locationId: 0,
    startTime: "",
    endTime: "",
    volunteerId: 0,
    status:""
  },
  reservations: [],
  loading: false,
  accessToken: null,
  refreshToken: null,
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setAccTokenRezv(state, action) {
      state.accessToken = action.payload;
    },
    setRefTokenRezv(state, action) {
      state.refreshToken = action.payload;
    },
    clearToken(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
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

export const { setAccTokenRezv, setRefTokenRezv, clearToken } =
  reservationSlice.actions;

export default reservationSlice.reducer;
