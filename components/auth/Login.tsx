"use client";
import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";
import Divider from "../shared/Divider";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    setDisabled(true);

    // Calling nextauth signIn function
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    // Now showing toast based on response and redirecting
    if (res?.url || !res) {
      // success
      toast({
        title: "Logged In successfully!",
        action: <ToastAction altText="hide">Hide</ToastAction>,
      });
      router.push("/");
    } else {
      setDisabled(false);
      // error
      toast({
        variant: "destructive",
        title:
          res?.error && res?.error !== "CredentialsSignin"
            ? res?.error
            : "Wrong Credentials!",
        action: (
          <ToastAction
            onClick={() =>
              res?.error !== "CredentialsSignin" ? btnRef.current?.click() : ""
            }
            altText="try again"
          >
            Try Again!
          </ToastAction>
        ),
      });
    }
  });

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Login to your account!</CardTitle>
        <CardDescription>
          Enter your email and password to login!
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-3">
        {/* Google and github options */}
        <div className="flex gap-2 child:w-full">
          <Button
            onClick={() => signIn("google")}
            variant="outline"
            className="flex items-center gap-1"
          >
            <AiOutlineGoogle className={"text-xl"} />
            Google
          </Button>

          <Button
            onClick={() => signIn("github")}
            variant="outline"
            className="flex items-center gap-1"
          >
            <AiOutlineGithub className={"text-xl"} />
            Github
          </Button>
        </div>

        <Divider text={"OR CONTINUE WITH"} />

        {/* Login with credentials */}
        <form onSubmit={onSubmit}>
          <div className="mb-3 space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              {...register("email")}
              required={true}
              type="email"
              placeholder="Ex. mdshahidulridoy@gmail.com"
              id="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="mt-10">
              Password
            </Label>
            <Input
              {...register("password")}
              required={true}
              type="password"
              placeholder="Enter your password"
              id="password"
            />
          </div>
          <button ref={btnRef} type="submit" className="hidden">
            Submit
          </button>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          disabled={disabled}
          type="submit"
          className="w-full"
          onClick={() => {
            btnRef.current?.click();
          }}
        >
          {disabled ? "Logging in ..." : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
