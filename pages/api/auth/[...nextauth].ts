import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";



export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
  }),
  ],
  callbacks: {
    async session({ session, token, user }) {
        if(user){
            session.user.role = user.role
            session.user.id = user.id
        }
        return session;
    },
    // async signIn({ account }){
    //     delete account?.user_id
    //     return true
    // }
  },
}
export default NextAuth(authOptions)