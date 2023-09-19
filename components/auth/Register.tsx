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
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";
import Divider from "../shared/Divider";
import createUser from "@/actions/createUser";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { signIn } from "next-auth/react";

const Register = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast();

  // form handler function
  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await createUser(formData);
      if (response) {
        if (response.isCreated) {
          toast({
            title: "Congratulations!",
            description: "Account created successfully.",
            action: <ToastAction altText="hide">Hide</ToastAction>,
          });
          signIn("credentials", {
            email: response.user?.email,
            password: response.user?.password,
          });
        } else {
          toast({
            variant: "destructive",
            title: response.title,
            description: response.description,
            action: <ToastAction altText="hide">Hide</ToastAction>,
          });
        }
      }
    } catch (error: any) {
      setDisabled(false);
      console.log(error);
      const { message } = error;
      toast({
        variant: "destructive",
        title: "Netowrk error!",
        description: message,
        action: (
          <ToastAction
            onClick={() => formRef.current?.requestSubmit()}
            altText="try again"
          >
            Try again
          </ToastAction>
        ),
      });
    }
  };

  return (
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

        {/* Input fields */}
        <form
          action={(data) => {
            handleSubmit(data);
          }}
          method="POST"
          encType="application/x-www-form-urlencoded"
          ref={formRef}
        >
          <div className="mb-3 flex gap-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                name="firstName"
                required={true}
                type="text"
                placeholder="Ex. Md Shahidul"
                id="firstName"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                name="lastName"
                type="text"
                placeholder="Ex. Islam"
                id="lastName"
              />
            </div>
          </div>

          <div className="mb-3 space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              name="email"
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
              name="password"
              required={true}
              type="password"
              placeholder="Enter your password"
              id="password"
            />
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          disabled={disabled}
          type="submit"
          className="w-full"
          onClick={() => {
            formRef.current?.requestSubmit();
          }}
        >
          {disabled ? "Submitting ..." : "Register"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Register;
