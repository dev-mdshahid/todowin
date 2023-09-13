"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";
import Divider from "../shared/Divider";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Create an account!</CardTitle>
          <CardDescription>
            Enter your basic info to create an account!
          </CardDescription>
        </CardHeader>

        {/* Google and github options */}
        <CardContent className="grid gap-3">
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
          <div className="flex gap-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                {...register("firstName")}
                required={true}
                type="text"
                placeholder="Ex. Md Shahidul"
                id="firstName"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                {...register("lastName")}
                type="text"
                placeholder="Ex. Islam"
                id="lastName"
              />
            </div>
          </div>

          <div className="space-y-2">
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
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Register;
