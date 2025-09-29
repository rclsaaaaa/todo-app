import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET: ユーザーのtodo一覧取得
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const todos = await prisma.todos.findMany({
        where: { userId, deleted: false },
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(todos);
}

// POST: todo新規作成
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { title } = await req.json();
    if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const todo = await prisma.todos.create({
        data: { title, userId },
    });
    return NextResponse.json(todo, { status: 201 });
}
