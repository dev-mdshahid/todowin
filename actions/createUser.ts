"use server";

import { usersCollection } from "@/lib/mongoClient";
import bcrypt from "bcrypt";
const createUser = async (formData: FormData) => {
  const userInfo = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Encryption
  if (typeof userInfo.password === "string") {
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);

    // Mongodb

    // Checking if there's a user with the same email
    const existingUser = await usersCollection.findOne({
      email: userInfo.email,
    });

    if (existingUser) {
      return {
        isCreated: false,
        title: "Email is already registered!",
        description: "Try logging in instead.",
      };
    } else {
      await usersCollection.insertOne({
        ...userInfo,
        password: hashedPassword,
      });

      return {
        isCreated: true,
        title: "User created successfully",
        user: userInfo,
      };
    }
  }
};
export default createUser;
