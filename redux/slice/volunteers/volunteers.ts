import { toast } from "@/components/ui/use-toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://45.95.214.69/api/v1/admin/volunteer";

export const getData = createAsyncThunk("volunteers/getData", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(baseURL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const getDataById = createAsyncThunk(
  "volunteers/getDataById",
  async (id: number) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseURL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const delData = createAsyncThunk(
  "volunteers/delData",
  async (id: number) => {
    console.log("deleted id:" + id);
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${baseURL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const putData = createAsyncThunk(
  "volunteers/putData",
  async ({ id, newp }: { id: number; newp: Partial<Volunteer> }) => {
    console.log(newp);
    const token = localStorage.getItem("token");
    console.log("tokenim" + token);
    const response = await axios.put(`${baseURL}/${id}`, newp, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("responseee dataaa" + response.data);
    return response.data;
  }
);

export const postData = createAsyncThunk(
  "volunteers/postData",
  async (newp: Partial<Volunteer>, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(baseURL, newp, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("my response post data", response.data);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        console.log("Username already in use!");
        toast({
          variant: "destructive",
          title: "This username already in use!",
          description: "Please choose another one.",
        });
        return rejectWithValue(error.response?.data);
      } else {
        console.error("Error posting volunteer data");
      }
    }
  }
);

export interface User {
  accountNonLocked: boolean;
  enabled:boolean
}

export interface Volunteer {
  id: number;
  name: string;
  surname: string;
  password: string;
  createdAt: string;
  finCode: string;
  phoneNumber: string;
  dateOfBirth: string;
  dateOfEmployment?: string;
  dateOfResignation?: string;
  university: string;
  address: string;
  formStatus: boolean;
  userId: number;
  user?: User;
}

export interface VolunteerState {
  volunteer: Volunteer;
  volunteers: Volunteer[];
  loading: boolean;
  token: string | null;
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
    user: {
      accountNonLocked: true,
      enabled:true
    },
  },
  volunteers: [],
  loading: false,
  token: localStorage.getItem("token") || "",
};

export const volunteerSlice = createSlice({
  name: "volunteer",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token",action.payload)
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem("token")
    },
  },
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

export const { setToken, clearToken } = volunteerSlice.actions;

export default volunteerSlice.reducer;
