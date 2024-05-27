"use client";
import Dashboard from "./dashboard/page";
import SignIn from "./login/page";
import { useState } from "react";

export default function Home() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const handleSignIn = (token: any) => {
    localStorage.setItem("token", token);
    setToken(token);
  };
  return (
    <div className="flex justify-center items-center">
      {!token ? <SignIn onSignIn={handleSignIn} /> : <Dashboard/>}
    </div>
  );
}
