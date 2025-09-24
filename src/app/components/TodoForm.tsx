"use client";
import { useState } from "react";

export default function TodoForm() {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "登録に失敗しました");
            } else {
                setTitle("");
                window.location.reload();
            }
        } catch (err) {
            setError("エラーが発生しました");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="新しいTODOを入力"
                className="border rounded px-2 py-1 flex-1"
                required
            />
            <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-1 rounded">
                追加
            </button>
            {error && <span className="text-red-500 ml-2">{error}</span>}
        </form>
    );
}
