import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import TodoForm from "@/app/components/TodoForm";
import TodoList from "@/app/components/TodoList";

export default async function Home() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/signin");
  }
  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">TODOアプリ</h1>
      <TodoForm />
      <TodoList />
    </main>
  );
}
