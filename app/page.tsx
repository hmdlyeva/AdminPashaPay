"use client";
import { useSelector, useDispatch } from "react-redux";
import SignIn from "./login/page";
import Dashboard from "./dashboard/page";
import {  RootState } from "../redux/store/store";


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
