import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Etapa = "novo_lead" | "qualificado" | "visita_agendada" | "proposta" | "fechado";

interface FunilItem {
  id: number;
  lead: string;
  imovel: string;
  valor: string;
  etapa: Etapa;
}

const etapaConfig: Record<Etapa, { label: string; className: string }> = {
  novo_lead: { label: "Novo Lead", className: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" },
  qualificado: { label: "Qualificado", className: "bg-green-500/20 text-green-400 hover:bg-green-500/30" },
  visita_agendada: { label: "Visita Agendada", className: "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30" },
  proposta: { label: "Proposta", className: "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30" },
  fechado: { label: "Fechado", className: "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30" },
};

const funilData: FunilItem[] = [
  { id: 1, lead: "Maria Santos", imovel: "Apt 3 quartos - Jardins", valor: "R$ 750.000", etapa: "novo_lead" },
  { id: 2, lead: "Carlos Oliveira", imovel: "Cobertura - Moema", valor: "R$ 1.400.000", etapa: "qualificado" },
  { id: 3, lead: "Ana Paula Costa", imovel: "Casa - Pinheiros", valor: "R$ 890.000", etapa: "visita_agendada" },
  { id: 4, lead: "Roberto Almeida", imovel: "Apt 2 quartos - Vila Mariana", valor: "R$ 520.000", etapa: "proposta" },
  { id: 5, lead: "Fernanda Lima", imovel: "Penthouse - Itaim Bibi", valor: "R$ 2.800.000", etapa: "fechado" },
  { id: 6, lead: "Pedro Henrique", imovel: "Apt 1 quarto - Perdizes", valor: "R$ 380.000", etapa: "novo_lead" },
  { id: 7, lead: "Juliana Martins", imovel: "Casa - Brooklin", valor: "R$ 1.100.000", etapa: "qualificado" },
  { id: 8, lead: "Lucas Ferreira", imovel: "Terreno - Alphaville", valor: "R$ 650.000", etapa: "visita_agendada" },
];

const Funil = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Funil de Vendas</h2>

        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Lead</TableHead>
                <TableHead className="text-muted-foreground">Imóvel de Interesse</TableHead>
                <TableHead className="text-muted-foreground">Valor</TableHead>
                <TableHead className="text-muted-foreground">Etapa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {funilData.map((item) => (
                <TableRow key={item.id} className="border-border">
                  <TableCell className="font-medium text-foreground">{item.lead}</TableCell>
                  <TableCell className="text-muted-foreground">{item.imovel}</TableCell>
                  <TableCell className="text-muted-foreground">{item.valor}</TableCell>
                  <TableCell>
                    <Badge className={etapaConfig[item.etapa].className}>
                      {etapaConfig[item.etapa].label}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Funil;
