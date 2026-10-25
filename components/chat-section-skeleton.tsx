
export function ChatSkeleton() {
    return (
        <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-1 animate-pulse">
            <div className="h-10 bg-slate-100 rounded"></div>
            <div className="bg-slate-100 rounded"></div>
            <div className="h-10 bg-slate-100 rounded"></div>
        </div>
    )
}
