import { TokenDashboard } from "@/components/TokenDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-3 py-4 sm:px-6 sm:py-8 lg:px-8">
        <TokenDashboard />
      </div>
    </main>
  );
}
