import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, MapPin, Home, Ruler } from "lucide-react";
import { useState } from "react";

type ImovelTipo = "apartamento" | "casa" | "terreno";
type ImovelStatus = "disponivel" | "reservado" | "vendido";

interface Imovel {
  id: number;
  titulo: string;
  bairro: string;
  tipo: ImovelTipo;
  valor: string;
  area: string;
  status: ImovelStatus;
}

const imoveisData: Imovel[] = [
  {
    id: 1,
    titulo: "Apartamento Vista Mar",
    bairro: "Jardins",
    tipo: "apartamento",
    valor: "R$ 850.000",
    area: "120m²",
    status: "disponivel",
  },
  {
    id: 2,
    titulo: "Casa com Piscina",
    bairro: "Moema",
    tipo: "casa",
    valor: "R$ 1.500.000",
    area: "280m²",
    status: "reservado",
  },
  {
    id: 3,
    titulo: "Cobertura Duplex",
    bairro: "Pinheiros",
    tipo: "apartamento",
    valor: "R$ 2.200.000",
    area: "200m²",
    status: "disponivel",
  },
  {
    id: 4,
    titulo: "Terreno Comercial",
    bairro: "Vila Mariana",
    tipo: "terreno",
    valor: "R$ 600.000",
    area: "500m²",
    status: "vendido",
  },
  {
    id: 5,
    titulo: "Casa de Condomínio",
    bairro: "Itaim Bibi",
    tipo: "casa",
    valor: "R$ 3.200.000",
    area: "350m²",
    status: "disponivel",
  },
  {
    id: 6,
    titulo: "Studio Moderno",
    bairro: "Perdizes",
    tipo: "apartamento",
    valor: "R$ 450.000",
    area: "45m²",
    status: "reservado",
  },
];

const statusConfig: Record<ImovelStatus, { label: string; className: string }> = {
  disponivel: {
    label: "Disponível",
    className: "bg-green-500/20 text-green-400 hover:bg-green-500/30",
  },
  reservado: {
    label: "Reservado",
    className: "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30",
  },
  vendido: {
    label: "Vendido",
    className: "bg-red-500/20 text-red-400 hover:bg-red-500/30",
  },
};

const tipoLabels: Record<ImovelTipo, string> = {
  apartamento: "Apartamento",
  casa: "Casa",
  terreno: "Terreno",
};

const bairros = ["Jardins", "Moema", "Pinheiros", "Vila Mariana", "Itaim Bibi", "Perdizes"];

const Imoveis = () => {
  const [tipoFilter, setTipoFilter] = useState<string>("todos");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [bairroFilter, setBairroFilter] = useState<string>("todos");

  const filteredImoveis = imoveisData.filter((imovel) => {
    if (tipoFilter !== "todos" && imovel.tipo !== tipoFilter) return false;
    if (statusFilter !== "todos" && imovel.status !== statusFilter) return false;
    if (bairroFilter !== "todos" && imovel.bairro !== bairroFilter) return false;
    return true;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Imóveis</h2>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Novo Imóvel
          </Button>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Select value={tipoFilter} onValueChange={setTipoFilter}>
            <SelectTrigger className="w-[180px] bg-card border-border">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="todos">Todos os tipos</SelectItem>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="terreno">Terreno</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-card border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="disponivel">Disponível</SelectItem>
              <SelectItem value="reservado">Reservado</SelectItem>
              <SelectItem value="vendido">Vendido</SelectItem>
            </SelectContent>
          </Select>

          <Select value={bairroFilter} onValueChange={setBairroFilter}>
            <SelectTrigger className="w-[180px] bg-card border-border">
              <SelectValue placeholder="Bairro" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="todos">Todos os bairros</SelectItem>
              {bairros.map((bairro) => (
                <SelectItem key={bairro} value={bairro}>
                  {bairro}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImoveis.map((imovel) => (
            <Card key={imovel.id} className="bg-card border-border overflow-hidden">
              <div className="h-48 bg-muted flex items-center justify-center">
                <Home className="h-12 w-12 text-muted-foreground" />
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-foreground">{imovel.titulo}</h3>
                  <Badge className={statusConfig[imovel.status].className}>
                    {statusConfig[imovel.status].label}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4" />
                  {imovel.bairro}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{tipoLabels[imovel.tipo]}</span>
                  <span className="flex items-center gap-1">
                    <Ruler className="h-4 w-4" />
                    {imovel.area}
                  </span>
                </div>
                <p className="text-lg font-bold text-primary">{imovel.valor}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Imoveis;
