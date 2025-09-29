"use client";
import { useEffect, useState } from "react";
import { getCsrfToken, signIn } from "next-auth/react";

export default function SignInPage() {
    const [csrfToken, setCsrfToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        getCsrfToken().then((token) => setCsrfToken(token ?? undefined));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">サインイン</h1>
            <div className="mb-4 text-sm text-gray-600">
                新規登録の方は <a href="/auth/signup" className="text-blue-600 underline">こちら</a>
            </div>
            <form
                className="flex flex-col gap-4 w-full max-w-xs"
                onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget as HTMLFormElement;
                    const formData = new FormData(form);
                    const email = String(formData.get("email") || "");
                    const password = String(formData.get("password") || "");
                    await signIn("credentials", { email, password, callbackUrl: "/" });
                }}
            >
                <input name="csrfToken" type="hidden" defaultValue={csrfToken ?? undefined} />
                <label className="flex flex-col gap-1">
                    メールアドレス
                    <input name="email" type="email" required className="border rounded px-2 py-1" />
                </label>
                <label className="flex flex-col gap-1">
                    パスワード
                    <input name="password" type="password" required className="border rounded px-2 py-1" />
                </label>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">ログイン</button>
            </form>
        </div>
    );
}
