import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema";
import { nextCookies } from "better-auth/next-js";
import { admin, username } from "better-auth/plugins";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { ...schema },
  }),

  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.BETTER_AUTH_URL
      : "http://localhost:3000/api/auth",

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [nextCookies(), admin(), username()],
});
