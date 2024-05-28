"use client"
import React, { useState } from "react";
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
type Props = {
  onSignIn: (token: string) => void;
};

export default function SignIn({ onSignIn }: Props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (username === "admin" && password === "admin") {
      try {
        const signInResponse = await axios.post(
          "https://45.95.214.69/api/v1/auth/sign-in",

          {
            username,
            password,
          }
        );
        const tokenn = signInResponse.data.accessToken;

        // const refreshTokenResponse = await axios.post(
        //   "  https://45.95.214.69/api/v1/auth/refresh-token",
        //   {
        //     tokenn,
        //   }
        // );
        // console.log(refreshTokenResponse);
        // const refreshToken = refreshTokenResponse.data.refreshToken;

        onSignIn(tokenn);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error response:", error.response);
          alert(
            `Failed to sign in: ${
              error.response?.data?.message || error.message
            }`
          );
        } else {
          alert("Failed to sign in");
        }
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
          <Card >
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
                  placeholder="password"
                />
              </div>
            </CardContent>
            <CardFooter>
             <Button className="bg-[#00C49F] hover:bg-[#FF8042]" type="submit">Sign In</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
