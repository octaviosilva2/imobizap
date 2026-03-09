import { AppLayout } from "@/components/AppLayout";

const Imoveis = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Imóveis</h2>
        <div className="rounded-lg bg-card border border-border p-6 min-h-[400px]">
          <p className="text-muted-foreground">Área de conteúdo dos imóveis</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Imoveis;
