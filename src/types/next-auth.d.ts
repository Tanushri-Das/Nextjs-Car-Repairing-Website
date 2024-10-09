// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Ensure this is defined
  }

  interface Session {
    user: {
      id: string; // Ensure this is defined
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
