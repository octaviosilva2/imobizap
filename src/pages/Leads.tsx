import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { useState } from "react";

type LeadStatus = "novo" | "qualificado" | "frio";
type LeadOrigem = "WhatsApp" | "Formulário" | "Portal";

interface Lead {
  id: number;
  nome: string;
  telefone: string;
  origem: LeadOrigem;
  bairro: string;
  orcamento: string;
  status: LeadStatus;
}

const leadsData: Lead[] = [
  {
    id: 1,
    nome: "Maria Santos",
    telefone: "(11) 98765-4321",
    origem: "WhatsApp",
    bairro: "Jardins",
    orcamento: "R$ 500.000 - R$ 800.000",
    status: "novo",
  },
  {
    id: 2,
    nome: "Carlos Oliveira",
    telefone: "(11) 91234-5678",
    origem: "Portal",
    bairro: "Moema",
    orcamento: "R$ 1.200.000 - R$ 1.500.000",
    status: "qualificado",
  },
  {
    id: 3,
    nome: "Ana Paula Costa",
    telefone: "(11) 99876-5432",
    origem: "Formulário",
    bairro: "Pinheiros",
    orcamento: "R$ 600.000 - R$ 900.000",
    status: "novo",
  },
  {
    id: 4,
    nome: "Roberto Almeida",
    telefone: "(11) 94567-8901",
    origem: "WhatsApp",
    bairro: "Vila Mariana",
    orcamento: "R$ 400.000 - R$ 600.000",
    status: "frio",
  },
  {
    id: 5,
    nome: "Fernanda Lima",
    telefone: "(11) 97654-3210",
    origem: "Portal",
    bairro: "Itaim Bibi",
    orcamento: "R$ 2.000.000 - R$ 3.000.000",
    status: "qualificado",
  },
  {
    id: 6,
    nome: "Pedro Henrique",
    telefone: "(11) 93456-7890",
    origem: "Formulário",
    bairro: "Perdizes",
    orcamento: "R$ 700.000 - R$ 1.000.000",
    status: "frio",
  },
];

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  novo: {
    label: "Novo",
    className: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30",
  },
  qualificado: {
    label: "Qualificado",
    className: "bg-green-500/20 text-green-400 hover:bg-green-500/30",
  },
  frio: {
    label: "Frio",
    className: "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30",
  },
};

const Leads = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leadsData.filter(
    (lead) =>
      lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.telefone.includes(searchTerm) ||
      lead.bairro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Leads</h2>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, telefone ou bairro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Nome</TableHead>
                <TableHead className="text-muted-foreground">Telefone</TableHead>
                <TableHead className="text-muted-foreground">Origem</TableHead>
                <TableHead className="text-muted-foreground">Bairro de Interesse</TableHead>
                <TableHead className="text-muted-foreground">Orçamento</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="border-border">
                  <TableCell className="font-medium text-foreground">
                    {lead.nome}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {lead.telefone}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {lead.origem}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {lead.bairro}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {lead.orcamento}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusConfig[lead.status].className}>
                      {statusConfig[lead.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default Leads;
