"use client";
import { Button } from "@/components/ui/button";
import Protected from "@/next-auth/Protected";
import { signIn, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <Protected>
      <section className="">
        <Button variant={"destructive"} onClick={() => signOut()}>
          SignOut
        </Button>
        <h1>Welcome to my todo app</h1>
        <Button onClick={() => signIn()}>Login</Button>
      </section>
    </Protected>
  );
}
