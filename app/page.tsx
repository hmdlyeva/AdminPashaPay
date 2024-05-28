"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import SignIn from "./login/page";
import Dashboard from "./dashboard/page";
import { RootState } from "../redux/store/store";
import { setToken } from "../redux/slice/volunteers/volunteers";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.volunteers.token);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(setToken(storedToken));
      router.push("/dashboard");
    }
  }, [dispatch, router]);

  const handleSignIn = (token: string) => {
    dispatch(setToken(token));
    router.push("/dashboard");
  };

  if (token) {
    return <Dashboard />;
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <SignIn onSignIn={handleSignIn} />
    </div>
  );
}
