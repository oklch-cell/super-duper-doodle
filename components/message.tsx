export function Message({
  type,
  text,
  sender,
}: {
  type: "send" | "receive";
  text: string;
  sender?: string;
}) {
  return (
    <div
      className={`rounded border shrink-0 ${type === "send" && "bg-slate-300 ml-auto"} ${type === "receive" && "bg-slate-200 mr-auto"} flex flex-col overflow-hidden ${sender ? "max-w-70 w-full" : "max-w-70 w-max"}`}
    >
      {sender && (
        <span className="w-full border-b text-[10px] bg-white">{sender}</span>
      )}
      <p className="p-1">{text}</p>
    </div>
  );
}
