import NextAuth from "next-auth";
import clientPromise from "@/lib/mongoClient";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {},
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = credentials;

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          try {
            const mongo = await clientPromise;
            const db = mongo.db("TodoWin");
            const usersCursor = db.collection("users");
            const found = await usersCursor.findOne({ email: user?.email });
            if (found) {
              const { password } = user;
              const matched = await bcrypt.compare(password, found.password);
              return matched
                ? {
                    ...user,
                    name: found.firstName + " " + found.lastName,
                  }
                : null;
            }
          } catch (error) {
            throw new Error("Failed to connect the database!");
          }
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
