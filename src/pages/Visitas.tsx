import { AppLayout } from "@/components/AppLayout";

const Visitas = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Visitas</h2>
        <div className="rounded-lg bg-card border border-border p-6 min-h-[400px]">
          <p className="text-muted-foreground">Área de conteúdo das visitas</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Visitas;
