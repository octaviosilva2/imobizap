import { AppLayout } from "@/components/AppLayout";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 rounded-lg bg-card border border-border"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-64 rounded-lg bg-card border border-border" />
          <div className="h-64 rounded-lg bg-card border border-border" />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
