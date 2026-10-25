import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-5xl w-full mx-auto flex justify-center flex-col gap-10 p-5">
        <h1 className="text-2xl md:text-5xl font-semibold text-center">
          Welcome to the WebChat, where{" "}
          <span className="text-slate-300">privacy</span> matters.
        </h1>
        <p className="text-sm md:text-xl text-black/70 text-center">
          All your{" "}
          <Link href="/private" className="text-blue-500 hover:underline">
            PRIVATE
          </Link>{" "}
          chats are end-to-end encrypted and are not saved anywhere. If you have a question or you want to discuss something with people.
          You should get start with{" "}
          <Link href="/public" className="text-blue-500 hover:underline">
            PUBLIC
          </Link>{" "}
          chat.
        </p>
    </main>
  );
}
