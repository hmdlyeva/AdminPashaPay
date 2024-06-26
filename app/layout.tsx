"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SideNavbar from "@/components/SideNavbar";
import { store } from "../redux/store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store/store";
import SignIn from "./login/page";
import axios from "axios";
import { setAccToken, setRefToken } from "@/redux/slice/volunteers/volunteers";
import {
  setAccTokenForTeam,
  setRefTokenForTeam,
} from "@/redux/slice/teamleader/teamleaders";

const inter = Inter({ subsets: ["latin"] });

function AppLayout({ children }: { children: React.ReactNode }) {
  const accessToken = useSelector(
    (state: RootState) => state.volunteers.accessToken
  );
  const refreshToken = useSelector(
    (state: RootState) => state.volunteers.refreshToken
  );
  const dispatch = useDispatch();

  const storedAccessToken = localStorage.getItem("accessToken");
  const storedRefreshToken = localStorage.getItem("refreshToken");

  const [AccessTkn, setAccessTkn] = useState<string | null>(null);

  const [RefTkn, setRefTkn] = useState<string | null>(null);

  useEffect(() => {
    setAccessTkn(accessToken);
    setRefTkn(refreshToken);
  }, [accessToken, refreshToken, dispatch]);


  useEffect(() => {
    if (storedRefreshToken) {
      const intervalId = setInterval(async () => {
        try {
          const response = await axios.post(
            "https://45.95.214.69:8080/api/v1/auth/refresh-token",
            { refreshToken: storedRefreshToken }
          );
          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;
          dispatch(setAccToken(newAccessToken));
          dispatch(setRefToken(newRefreshToken));

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          dispatch(setAccTokenForTeam(newAccessToken));
          dispatch(setRefTokenForTeam(newRefreshToken));
        } catch (error) {
          console.error("Failed to refresh token", error);
        }
      }, 180000);

      return () => clearInterval(intervalId);
    }
  }, [storedRefreshToken, dispatch]);

  return (
    <div
      className={cn(
        "min-h-screen w-full bg-white text-black flex",
        inter.className
      )}
    >
      {storedAccessToken || storedRefreshToken ? <SideNavbar /> : null}
      <div className="p-8 w-full">
        {storedAccessToken || storedRefreshToken ? (
          children
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <SignIn />
          </div>
        )}
      </div>

      <Toaster />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/m10.jpg" />
        <title>Admin Panel</title>
      </head>
      <body>
        <Provider store={store}>
          <AppLayout>{children}</AppLayout>
        </Provider>
      </body>
    </html>
  );
}
