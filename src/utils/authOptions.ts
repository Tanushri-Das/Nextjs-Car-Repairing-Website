import NextAuth from "next-auth";
import type { NextAuthOptions, User } from "next-auth"; 
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/MongodbClient"; 
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";

// Define a custom type for the JWT token
interface CustomToken extends JWT {
  // Extend JWT interface
  id?: string;
}

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

        const user = await db
          .collection("users")
          .findOne({ email: credentials?.email });

        if (!user || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) {
          throw new Error("Invalid email or password");
        }

        return { id: user._id.toString(), name: user.name, email: user.email }; // Adjust as necessary
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      const client = await clientPromise;
      const db = client.db();

      if (account?.provider === "google" || account?.provider === "github") {
        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email });
        if (!existingUser) {
          await db.collection("users").insertOne({
            name: user.name ?? "Unknown",
            email: user.email ?? "Unknown",
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    // Update the jwt callback to use CustomToken
    async jwt({ token, user }: { token: CustomToken; user?: User }) {
      if (user) {
        token.id = user.id; // Ensure user has id
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
