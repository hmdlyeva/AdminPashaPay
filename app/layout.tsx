"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SideNavbar from "@/components/SideNavbar";
import { store } from "../redux/store/store";
import { Provider, useSelector } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { RootState } from "../redux/store/store";

const inter = Inter({ subsets: ["latin"] });

function AppLayout({ children }: { children: React.ReactNode }) {
  const token = useSelector((state: RootState) => state.volunteers.token);

  return (
    <div className={cn("min-h-screen w-full bg-white text-black flex", inter.className)}>
      {token ? <SideNavbar /> : null}
      <div className="p-8 w-full">
        {children}
      </div>
      <Toaster />
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
