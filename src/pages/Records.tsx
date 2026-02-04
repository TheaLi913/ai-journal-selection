import Header from "@/components/Header";
import { History } from "lucide-react";

const Records = () => {
  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <History className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Records</h1>
          <p className="text-muted-foreground">
            View your search history and past journal matching results here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Records;
