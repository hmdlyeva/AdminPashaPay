"use client";
import { useSelector, useDispatch } from "react-redux";
import SignIn from "./login/page";
import Dashboard from "./dashboard/page";
import { RootState } from "../redux/store/store";

export default function Home() {
  const accessToken = useSelector(
    (state: RootState) => state.volunteers.accessToken
  );

  const storedAccessToken = localStorage.getItem("accessToken");
  if (accessToken || storedAccessToken) {
    return <Dashboard />;
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      {/* <SignIn /> */}
    </div>
  );
}
