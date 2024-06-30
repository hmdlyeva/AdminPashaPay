"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store/store";
import {
  setAccToken,
  setRefToken,
} from "../../redux/slice/volunteers/volunteers";
import {
  setAccTokenForTeam,
  setRefTokenForTeam,
} from "@/redux/slice/teamleader/teamleaders";

export default function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();

  const storedAccToken = useSelector(
    (state: RootState) => state.volunteers.accessToken
  );
  const storedRefToken = useSelector(
    (state: RootState) => state.volunteers.refreshToken
  );

  const storedAccTokenForTeam = useSelector(
    (state: RootState) => state.teamleaders.accessToken
  );
  const storedRefTokenForTeam = useSelector(
    (state: RootState) => state.teamleaders.refreshToken
  );

  useEffect(() => {
    if (
      storedAccToken &&
      storedAccTokenForTeam &&
      storedRefToken &&
      storedRefTokenForTeam
    ) {
      dispatch(setAccToken(storedAccToken));
      dispatch(setRefToken(storedRefToken));

      dispatch(setAccTokenForTeam(storedAccTokenForTeam));
      dispatch(setRefTokenForTeam(storedRefTokenForTeam));
      router.push("/dashboard");
    }
  }, [dispatch, router]);

  const handleSignIn = (accessToken: string, refreshToken: string) => {
    dispatch(setAccToken(accessToken));
    dispatch(setRefToken(refreshToken));
    
    dispatch(setAccTokenForTeam(accessToken));
    dispatch(setRefTokenForTeam(refreshToken));

    // localStorage.setItem('accessToken', accessToken);
    // localStorage.setItem('refreshToken', refreshToken);
    router.push("/dashboard");
  };
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === "admin" && password === "admin") {
      try {
        const signInResponse = await axios.post(
          "https://45.95.214.69:8080/api/v1/auth/sign-in",
          { username, password }
        );
        const accessToken = signInResponse.data.accessToken;
        const refreshToken = signInResponse.data.refreshToken;
        handleSignIn(accessToken, refreshToken);
      } catch (error) {
        console.error("Sign in error:", error);
        alert(`Failed to sign in`);
      }
    } else {
      alert("Incorrect username or password");
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Log in to the Admin Dashboard with here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  onChange={(e) => setUserName(e.target.value)}
                  id="username"
                  required
                  placeholder="Username"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  required
                  placeholder="Password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#00C49F] hover:bg-[#FF8042]" type="submit">
                Sign In
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
