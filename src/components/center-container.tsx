export function CenterContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex justify-center items-center border-4 border-zinc-600 p-5 rounded-md w-full">
      {children}
    </div>
  );
}
