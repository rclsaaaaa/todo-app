import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma";
import EmailProvider from "next-auth/providers/email";
import type { NextAuthOptions } from "next-auth";
import type { Adapter, VerificationToken } from "next-auth/adapters";

console.log("[auth] route loaded");

const baseAdapter = PrismaAdapter(prisma);
const adapter: Adapter = {
    ...baseAdapter,
    async createVerificationToken(data: VerificationToken) {
        console.log("[auth] createVerificationToken input:", data);
        if (!baseAdapter.createVerificationToken) {
            console.warn("[auth] createVerificationToken not implemented by adapter");
            throw new Error("createVerificationToken not implemented");
        }
        const result = await baseAdapter.createVerificationToken(data as any);
        console.log("[auth] createVerificationToken result:", result);
        return result as VerificationToken;
    },
    async useVerificationToken(params) {
        console.log("[auth] useVerificationToken input:", params);
        if (!baseAdapter.useVerificationToken) {
            console.warn("[auth] useVerificationToken not implemented by adapter");
            throw new Error("useVerificationToken not implemented");
        }
        const result = await baseAdapter.useVerificationToken(params as any);
        console.log("[auth] useVerificationToken result:", result);
        return result as any;
    },
};

export const authOptions: NextAuthOptions = {
    adapter,
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            normalizeIdentifier(identifier) {
                const value = identifier.toLowerCase().trim();
                console.log("[auth] email identifier:", value);
                return value;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    debug: true,
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
    logger: {
        error(code, metadata) {
            console.error("[next-auth][error]", code, metadata);
        },
        warn(code) {
            console.warn("[next-auth][warn]", code);
        },
        debug(code, metadata) {
            console.debug("[next-auth][debug]", code, metadata);
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
