"use client";
import { useEffect, useState } from "react";
import { getCsrfToken } from "next-auth/react";

export default function SignInPage() {
    const [csrfToken, setCsrfToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        getCsrfToken().then((token) => setCsrfToken(token ?? undefined));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">サインイン</h1>
            <form method="post" action="/api/auth/signin/email" className="flex flex-col gap-4 w-full max-w-xs">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken ?? undefined} />
                <label className="flex flex-col gap-1">
                    メールアドレス
                    <input name="email" type="email" required className="border rounded px-2 py-1" />
                </label>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">メールでログイン</button>
            </form>
        </div>
    );
}
