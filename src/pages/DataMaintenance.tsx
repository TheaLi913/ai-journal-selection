import Header from "@/components/Header";
import { Database } from "lucide-react";

const DataMaintenance = () => {
  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Database className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Data Maintenance</h1>
          <p className="text-muted-foreground">
            Manage journal database and system settings here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DataMaintenance;
