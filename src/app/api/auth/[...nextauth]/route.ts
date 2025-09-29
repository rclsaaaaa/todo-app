import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

console.log("[auth] route loaded");

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "メールアドレス", type: "email" },
                password: { label: "パスワード", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const user = await prisma.users.findUnique({ where: { email: credentials.email } });
                if (!user || !user.passwordHash) return null;
                const ok = await bcrypt.compare(credentials.password, user.passwordHash);
                if (!ok) return null;
                return { id: user.id, email: user.email } as any;
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.sub;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
