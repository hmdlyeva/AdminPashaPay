import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE3MTY2NjA0OTAsImV4cCI6MTcxNjcyMDQ5MH0.m1uPUDxw9mSzfJGS8ooZ0--w4gdsc_eVzKDRQ-EwcbvePCylW7ZZ2SlhctGHrfH8nd8hcUgkxH5MyPIcsr0dMg";
const baseURL =
  "https://pashapay-423917.de.r.appspot.com/api/v1/admin/volunteer";

export const getData = createAsyncThunk("volunteers/getData", async () => {
  const response = await axios.get(baseURL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const getDataById = createAsyncThunk(
  "volunteers/getDataById",
  async (id: number) => {
    const response = await axios.get(`${baseURL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const delData = createAsyncThunk(
  "volunteers/delData",
  async (id: number) => {
    const response = await axios.delete(`${baseURL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const putData = createAsyncThunk(
  "volunteers/putData",
  async ({ id, newp }: { id: number; newp: Partial<Volunteer> }) => {
    const response = await axios.put(`${baseURL}/${id}`, newp, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const postData = createAsyncThunk(
  "volunteers/postData",
  async (newp: Partial<Volunteer>) => {
    const response = await axios.post(baseURL, newp, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export interface Volunteer {
  id: number;
  name: string;
  surname: string;
  password: string;

  createdAt: string;
  finCode: string;
  phoneNumber: string;
  dateOfBirth: string;
  dateOfEmployment: string;
  dateOfResignation: string;
  university: string;
  address: string;
  formStatus: boolean;
  userId: number;
}

export interface VolunteerState {
  volunteer: Volunteer;
  volunteers: Volunteer[];
  loading: boolean;
}

const initialState: VolunteerState = {
  volunteer: {
    id: 0,
    name: "",
    surname: "",
    password: "",
    createdAt: "2024-05-25",
    finCode: "",
    phoneNumber: "",
    dateOfBirth: "2024-05-25",
    dateOfEmployment: "2024-05-25",
    dateOfResignation: "2024-05-25",
    university: "",
    address: "",
    formStatus: true,
    userId: 0,
  },
  volunteers: [],
  loading: false,
};

export const volunteerSlice = createSlice({
  name: "volunteer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getData.fulfilled,
        (state, action: PayloadAction<Volunteer[]>) => {
          state.volunteers = action.payload;
          state.loading = false;
        }
      )
      .addCase(getData.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(postData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        postData.fulfilled,
        (state, action: PayloadAction<Volunteer>) => {
          state.volunteers.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(postData.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(delData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        delData.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.volunteers = state.volunteers.filter(
            (v) => v.id !== action.payload.id
          );
          state.loading = false;
        }
      )
      .addCase(delData.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(getDataById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDataById.fulfilled,
        (state, action: PayloadAction<Volunteer>) => {
          state.volunteer = action.payload;
          state.loading = false;
        }
      )
      .addCase(getDataById.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(putData.pending, (state) => {
        state.loading = true;
      })
      .addCase(putData.fulfilled, (state, action: PayloadAction<Volunteer>) => {
        state.volunteer = action.payload;
        state.loading = false;
      })
      .addCase(putData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = volunteerSlice.actions;

export default volunteerSlice.reducer;
