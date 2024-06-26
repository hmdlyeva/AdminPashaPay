import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://45.95.214.69:8080/api/v1/location";

export const getLocData = createAsyncThunk("locations/getLocData", async () => {
  const response = await axios.get(baseURL);
  return response.data;
});

export const getLocDataById = createAsyncThunk(
  "locations/getLocDataById",
  async (id: number) => {
    const response = await axios.get(`${baseURL}/${id}`);
    return response.data;
  }
);

export const delLocData = createAsyncThunk(
  "locations/delLocData",
  async (id: number) => {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
  }
);

export const putLocData = createAsyncThunk(
  "locations/putLocData",
  async ({ id, newp }: { id: number; newp: Partial<Location> }) => {
    const response = await axios.put(`${baseURL}/${id}`, newp);
    return response.data;
  }
);

export const postLocData = createAsyncThunk(
  "locations/postLocData",
  async (newp: Partial<Location>) => {
    const response = await axios.post(baseURL, newp);
    return response.data;
  }
);

export interface Location {
  id: number;
  desc: string;
  target: string;
  district: string;
  market: string;
  subway: string;
  capacity: number;
}

export interface LocationState {
  location: Location;
  locations: Location[];
  loading: boolean;
}

const initialState: LocationState = {
  location: {
    id: 0,
    desc: "",
    target: "",
    district: "",
    market: "",
    subway: "",
    capacity: 0,
  },
  locations: [],
  loading: false,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getLocData.fulfilled,
        (state, action: PayloadAction<Location[]>) => {
          state.locations = action.payload;
          state.loading = false;
        }
      )
      .addCase(getLocData.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(postLocData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        postLocData.fulfilled,
        (state, action: PayloadAction<Location>) => {
          state.locations.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(postLocData.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(delLocData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        delLocData.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.locations = state.locations.filter(
            (v) => v.id !== action.payload.id
          );
          state.loading = false;
        }
      )
      .addCase(delLocData.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(getLocDataById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getLocDataById.fulfilled,
        (state, action: PayloadAction<Location>) => {
          state.location = action.payload;
          state.loading = false;
        }
      )
      .addCase(getLocDataById.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(putLocData.pending, (state) => {
        state.loading = true;
      })
      .addCase(putLocData.fulfilled, (state, action: PayloadAction<Location>) => {
        state.location = action.payload;
        state.loading = false;
      })
      .addCase(putLocData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = locationSlice.actions;

export default locationSlice.reducer;
