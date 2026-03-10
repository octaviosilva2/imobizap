import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const etapaConfig: Record<string, { label: string; className: string }> = {
  novo: { label: "Novo Lead", className: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" },
  qualificado: { label: "Qualificado", className: "bg-green-500/20 text-green-400 hover:bg-green-500/30" },
  visita_agendada: { label: "Visita Agendada", className: "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30" },
  proposta: { label: "Proposta", className: "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30" },
  fechado: { label: "Fechado", className: "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30" },
};

const Funil = () => {
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["funil-leads"],
    queryFn: async () => {
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Funil de Vendas</h2>

        {isLoading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : leads.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">Nenhum lead no funil ainda.</p>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Lead</TableHead>
                  <TableHead className="text-muted-foreground">Bairro de Interesse</TableHead>
                  <TableHead className="text-muted-foreground">Orçamento</TableHead>
                  <TableHead className="text-muted-foreground">Etapa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="border-border">
                    <TableCell className="font-medium text-foreground">{lead.nome}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.bairro}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.orcamento}</TableCell>
                    <TableCell>
                      <Badge className={etapaConfig[lead.status]?.className || "bg-muted text-muted-foreground"}>
                        {etapaConfig[lead.status]?.label || lead.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Funil;
