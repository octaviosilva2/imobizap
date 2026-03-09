import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

const corretores = [
  {
    id: 1,
    nome: "Carlos Silva",
    telefone: "(11) 99999-1111",
    especialidade: "Apartamentos",
    leadsAtivos: 12,
    conversoes: 8,
    status: "ativo",
  },
  {
    id: 2,
    nome: "Ana Oliveira",
    telefone: "(11) 99999-2222",
    especialidade: "Casas",
    leadsAtivos: 8,
    conversoes: 15,
    status: "ativo",
  },
  {
    id: 3,
    nome: "Roberto Santos",
    telefone: "(11) 99999-3333",
    especialidade: "Terrenos",
    leadsAtivos: 5,
    conversoes: 3,
    status: "inativo",
  },
  {
    id: 4,
    nome: "Maria Costa",
    telefone: "(11) 99999-4444",
    especialidade: "Comercial",
    leadsAtivos: 10,
    conversoes: 12,
    status: "ativo",
  },
];

const getInitials = (nome: string) => {
  return nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const Corretores = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Corretores</h2>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Corretor
          </Button>
        </div>

        <div className="rounded-lg bg-card border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Avatar</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Especialidade</TableHead>
                <TableHead className="text-center">Leads Ativos</TableHead>
                <TableHead className="text-center">Conversões</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {corretores.map((corretor) => (
                <TableRow key={corretor.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {getInitials(corretor.nome)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{corretor.nome}</TableCell>
                  <TableCell>{corretor.telefone}</TableCell>
                  <TableCell>{corretor.especialidade}</TableCell>
                  <TableCell className="text-center">{corretor.leadsAtivos}</TableCell>
                  <TableCell className="text-center">{corretor.conversoes}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        corretor.status === "ativo"
                          ? "bg-green-500/20 text-green-700 border-green-500/30 hover:bg-green-500/30"
                          : "bg-muted text-muted-foreground border-border hover:bg-muted"
                      }
                    >
                      {corretor.status === "ativo" ? "Ativo" : "Inativo"}
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

export default Corretores;
