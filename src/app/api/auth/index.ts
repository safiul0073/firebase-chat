import { compare } from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/configs/prisma";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        console.log("test",credentials);
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },

          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            password: true,
          }
        });

        if (!user) {
          throw new Error("No user found");
        }

        const passwordCorrect = await compare(
          credentials.password,
          user.password
        );

        if (passwordCorrect) {
          return user;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    session({ session, token }) {
      
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
};
