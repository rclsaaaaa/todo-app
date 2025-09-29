import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import TodoForm from "@/app/components/TodoForm";
import TodoList from "@/app/components/TodoList";
import LogoutButton from "@/app/components/LogoutButton";

export default async function Home() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/signin");
  }
  return (
    <main className="p-8 max-w-xl mx-auto">
      <div className="flex items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">TODOアプリ</h1>
        <LogoutButton />
      </div>
      <TodoForm />
      <TodoList />
    </main>
  );
}
