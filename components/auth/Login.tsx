"use client";
import React from "react";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
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

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

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
          <Button variant="outline" className="flex items-center gap-1">
            <AiOutlineGoogle className={"text-xl"} />
            Google
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <AiOutlineGithub className={"text-xl"} />
            Github
          </Button>
        </div>

        <Divider text={"OR CONTINUE WITH"} />

        {/* Input fields */}
        <form onSubmit={handleSubmit((data: FieldValues) => onSubmit(data))}>
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
              {...register("passowrd")}
              required={true}
              type="password"
              placeholder="Enter your password"
              id="password"
            />
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
