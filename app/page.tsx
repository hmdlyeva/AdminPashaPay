"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import SignIn from "./login/page";
import Dashboard from "./dashboard/page";
import { RootState } from "../redux/store/store";
import { setToken } from "../redux/slice/volunteers/volunteers";

export default function Home() {
 
  const token = useSelector((state: RootState) => state.volunteers.token);


  if (token) {
    return <Dashboard />;
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <SignIn />
    </div>
  );
}
