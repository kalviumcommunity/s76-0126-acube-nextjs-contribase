export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-950 text-white">
      {children}
    </main>
  );
}
