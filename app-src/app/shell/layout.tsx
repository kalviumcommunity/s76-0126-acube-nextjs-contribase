export default function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950 text-white">
      {children}
    </div>
  );
}
