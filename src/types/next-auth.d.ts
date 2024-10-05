import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add id to the Session's user object
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string; // Add id to the User type as well
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}
