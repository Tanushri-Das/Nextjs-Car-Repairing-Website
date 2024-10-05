import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/MongodbClient";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await db.collection("users").findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const passwordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordCorrect) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const client = await clientPromise;
      const db = client.db();

      // Check if account exists before accessing its properties
      if (
        account &&
        (account.provider === "google" || account.provider === "github")
      ) {
        // Check if the user already exists in the database
        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email });

        // If the user doesn't exist, create a new user in the database
        if (!existingUser) {
          await db.collection("users").insertOne({
            name: user.name || (profile?.name ?? "Unknown"), // Get user's name from profile or fallback
            email: user.email || (profile?.email ?? "Unknown"), // Get user's email from profile or fallback
            role: "user", // Set default role for new users
          });
        }
      }

      return true; // Continue sign-in
    },

    async session({ session, token }) {
      // Ensure session.user is not undefined and assign the token's id
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    async jwt({ token, user }) {
      // Assign user id to the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
