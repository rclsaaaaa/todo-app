import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ error: "email and password are required" }, { status: 400 });
        }
        const existing = await prisma.users.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "user already exists" }, { status: 409 });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        await prisma.users.create({ data: { email, passwordHash } });
        return NextResponse.json({ ok: true });
    } catch (e) {
        return NextResponse.json({ error: "internal error" }, { status: 500 });
    }
}
