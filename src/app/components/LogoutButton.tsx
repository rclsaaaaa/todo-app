"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            className="ml-auto bg-gray-500 text-white px-3 py-1 rounded"
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
        >
            ログアウト
        </button>
    );
}


