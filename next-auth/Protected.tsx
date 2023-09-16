"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession();
  if (!data) {
    redirect("/auth");
  }
  return <>{children}</>;
};

export default Protected;
