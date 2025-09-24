import { signOut } from "next-auth/react";

export default function SignOutPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">サインアウト</h1>
            <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            >
                サインアウト
            </button>
        </div>
    );
}
