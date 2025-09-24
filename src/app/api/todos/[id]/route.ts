import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// PATCH: todoの削除フラグを立てる（ソフトデリート）
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any)?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = (session.user as any).id;
    const todoId = params.id;
    const todo = await prisma.todos.findUnique({ where: { id: todoId } });
    if (!todo || todo.userId !== userId) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    await prisma.todos.update({ where: { id: todoId }, data: { deleted: true } });
    return NextResponse.json({ success: true });
}
