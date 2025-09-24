"use client";
import { useEffect, useState } from "react";

export default function TodoList() {
    const [todos, setTodos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: string) => {
        await fetch(`/api/todos/${id}`, { method: "PATCH" });
        setTodos(todos => todos.filter(todo => todo.id !== id));
    };

    if (loading) return <div>読み込み中...</div>;

    return (
        <ul className="space-y-2">
            {todos.length === 0 && <li>TODOはありません</li>}
            {todos.map(todo => (
                <li key={todo.id} className="flex items-center gap-2">
                    <span className={todo.completed ? "line-through" : ""}>{todo.title}</span>
                    <button
                        onClick={() => handleDelete(todo.id)}
                        className="text-xs text-red-500 border border-red-500 rounded px-2 py-0.5 ml-2"
                    >
                        削除
                    </button>
                </li>
            ))}
        </ul>
    );
}
