"use server";
import clientPromise from "@/lib/mongoClient";
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
    const mongo = await clientPromise;
    const db = mongo.db("TodoWin");
    const usersCursor = db.collection("users");

    // Checking if there's a user with the same email
    const existingUser = await usersCursor.findOne({ email: userInfo.email });

    if (existingUser) {
      return {
        isCreated: false,
        title: "Email is already registered!",
        description: "Try logging in instead.",
      };
    } else {
      await usersCursor.insertOne({
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
