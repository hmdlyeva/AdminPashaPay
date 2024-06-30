import Teamleader from "@/app/teamleader/page";
import { toast } from "@/components/ui/use-toast";
import { RootState } from "@/redux/store/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";
import { Volunteer } from "../volunteers/volunteers";

const baseURL = "https://45.95.214.69:8080/api/v1/admin/team-leader";

// const accessTokenim = localStorage.getItem("accessToken");
  const refreshTokenim = localStorage.getItem("refreshToken");

export const getTeamLeader = createAsyncThunk(
  "teamleaders/getTeamLeader",
  async (_, { getState }) => {
    const accessToken = (getState() as RootState).teamleaders.accessToken;
    const refreshToken = (getState() as RootState).teamleaders.refreshToken;
    const response = await axios.get(baseURL, {
      headers: { Authorization: `Bearer ${accessToken || refreshToken}` },
    });
    return response.data;
  }
);

export const getTeamLeaderVolunteers = createAsyncThunk(
    "teamleaders/getTeamLeaderVolunteers",
    async (id: number, { getState }) => {
      const accessToken = (getState() as RootState).teamleaders.accessToken;
      const refreshToken = (getState() as RootState).teamleaders.refreshToken;
      const response = await axios.get(`${baseURL}/volunteers/${id}`, {
        headers: { Authorization: `Bearer ${accessToken || refreshToken}` },
      });
      return response.data;
    }
  );

export const getTeamLeaderById = createAsyncThunk(
  "teamleaders/getTeamLeaderById",
  async (id: number, { getState }) => {
    const accessToken = (getState() as RootState).teamleaders.accessToken;
    const refreshToken = (getState() as RootState).teamleaders.refreshToken;
    const response = await axios.get(`${baseURL}/${id}`, {
      headers: { Authorization: `Bearer ${accessToken || refreshToken}` },
    });
    return response.data;
  }
);

export const delTeamLeader = createAsyncThunk(
  "teamleaders/delTeamLeader",
  async (id: number, { getState }) => {
    const refreshToken = (getState() as RootState).teamleaders.refreshToken;
    const accessToken = (getState() as RootState).teamleaders.accessToken;
    const response = await axios.delete(`${baseURL}/${id}`, {
      headers: { Authorization: `Bearer ${accessToken || refreshToken}` },
    });
    return response.data;
  }
);

export const putTeamleader = createAsyncThunk(
  "teamleaders/putTeamleader",
  async (
    { id, newp }: { id: number; newp: Partial<Teamleader> },
    { getState }
  ) => {
    const refreshToken = (getState() as RootState).teamleaders.refreshToken;
    const accessToken = (getState() as RootState).teamleaders.accessToken;
    const response = await axios.put(`${baseURL}/${id}`, newp, {
      headers: {
        Authorization: `Bearer ${accessToken || refreshToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

export const postTeamleader = createAsyncThunk(
  "teamleaders/postTeamleader",
  async (newp: Partial<Teamleader>, { rejectWithValue, getState }) => {
    try {
    const refreshToken = (getState() as RootState).teamleaders.refreshToken;
    const accessToken = (getState() as RootState).teamleaders.accessToken;
      const response = await axios.post(baseURL, newp, {
        headers: { Authorization: `Bearer ${accessToken || refreshToken}` },
      });


      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        // toast({
        //   variant: "destructive",
        //   title: "This username already in use!",
        //   description: "Please choose another one.",
        // });
        return rejectWithValue(error.response?.data);
      } else {
        console.error("Error posting volunteer data");
      }
    }
  }
);

export interface Teamleader {
  id: number;
  name: string;
  surname: string;
  password: string;
  phoneNumber: string;
  username: string;
}

export interface TeamleaderState {
  teamleadervolunter: Volunteer;
  teamleader: Teamleader;
  teamleaders: Teamleader[];
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: TeamleaderState = {
  teamleader: {
    id: 0,
    name: "",
    surname: "",
    password: "",
    phoneNumber: "",
    username: "",

    // createdAt: "2024-05-25",

    // user: {
    //   accountNonLocked: true,
    //   enabled:true
    // },
  },
  teamleadervolunter:{
    id: 0,
    name: "",
    surname: "",
    username:"",
    password: "",
    createdAt: "",
    finCode: "",
    phoneNumber: "",
    dateOfBirth: "",
    dateOfEmployment: "",
    dateOfResignation: "",
    university: "",
    address: "",
    formStatus: true,
    teamLeaderId:0,
    // userId: 0,
    // user: {
    //   accountNonLocked: true,
    //   enabled:true
    // },
  },
  teamleaders: [],
  loading: false,
  accessToken: null,
  refreshToken: null,
};

export const teamleaderSlice = createSlice({
  name: "teamleader",
  initialState,
  reducers: {
    setAccTokenForTeam(state, action) {
      state.accessToken = action.payload;
    },setRefTokenForTeam(state, action) {
      state.refreshToken = action.payload;
    },
    clearTokenFromTeam(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamLeader.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getTeamLeader.fulfilled,
        (state, action: PayloadAction<Teamleader[]>) => {
          state.teamleaders = action.payload;
          state.loading = false;
        }
      )
      .addCase(getTeamLeader.rejected, (state) => {
        state.loading = false;
      });


      builder
      .addCase(getTeamLeaderVolunteers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getTeamLeaderVolunteers.fulfilled,
        (state, action: PayloadAction<Volunteer>) => {
          state.teamleadervolunter = action.payload;
          state.loading = false;
        }
      )
      .addCase(getTeamLeaderVolunteers.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(postTeamleader.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        postTeamleader.fulfilled,
        (state, action: PayloadAction<Teamleader>) => {
          state.teamleaders.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(postTeamleader.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(delTeamLeader.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        delTeamLeader.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.teamleaders = state.teamleaders.filter(
            (v) => v.id !== action.payload.id
          );
          state.loading = false;
        }
      )
      .addCase(delTeamLeader.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(getTeamLeaderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getTeamLeaderById.fulfilled,
        (state, action: PayloadAction<Teamleader>) => {
          state.teamleader = action.payload;
          state.loading = false;
        }
      )
      .addCase(getTeamLeaderById.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(putTeamleader.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        putTeamleader.fulfilled,
        (state, action: PayloadAction<Teamleader>) => {
          state.teamleader = action.payload;
          state.loading = false;
        }
      )
      .addCase(putTeamleader.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setAccTokenForTeam,setRefTokenForTeam, clearTokenFromTeam } = teamleaderSlice.actions;

export default teamleaderSlice.reducer;
