"use client";
import { useState } from "react";

export default function SignUpPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">新規登録</h1>
            <p className="mb-4 text-sm text-gray-600">メールアドレスとパスワードを登録してください。</p>
            <form
                className="flex flex-col gap-4 w-full max-w-xs"
                onSubmit={async (e) => {
                    e.preventDefault();
                    setError(null);
                    setLoading(true);
                    const form = e.currentTarget as HTMLFormElement;
                    const formData = new FormData(form);
                    const email = String(formData.get("email") || "");
                    const password = String(formData.get("password") || "");
                    const res = await fetch("/api/auth/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    });
                    setLoading(false);
                    if (!res.ok) {
                        const data = await res.json().catch(() => ({}));
                        setError(data?.error || "登録に失敗しました");
                        return;
                    }
                    window.location.href = "/auth/signin";
                }}
            >
                <label className="flex flex-col gap-1">
                    メールアドレス
                    <input name="email" type="email" required className="border rounded px-2 py-1" />
                </label>
                <label className="flex flex-col gap-1">
                    パスワード
                    <input name="password" type="password" required className="border rounded px-2 py-1" />
                </label>
                <button disabled={loading} type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    {loading ? "登録中..." : "登録"}
                </button>
                {error && <p className="text-red-600 text-sm">{error}</p>}
            </form>
            <a href="/auth/signin" className="mt-4 text-blue-600 underline">ログインはこちら</a>
        </div>
    );
}
