import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Calendar, Clock, User, Home } from "lucide-react";

const visitas = [
  {
    id: 1,
    lead: "João Pereira",
    imovel: "Apartamento Vila Nova",
    data: "15/03/2024",
    hora: "10:00",
    corretor: "Carlos Silva",
    status: "confirmada",
  },
  {
    id: 2,
    lead: "Maria Santos",
    imovel: "Casa Jardim Europa",
    data: "15/03/2024",
    hora: "14:30",
    corretor: "Ana Oliveira",
    status: "pendente",
  },
  {
    id: 3,
    lead: "Pedro Almeida",
    imovel: "Terreno Alphaville",
    data: "16/03/2024",
    hora: "09:00",
    corretor: "Roberto Santos",
    status: "cancelada",
  },
  {
    id: 4,
    lead: "Carla Rodrigues",
    imovel: "Cobertura Centro",
    data: "16/03/2024",
    hora: "16:00",
    corretor: "Maria Costa",
    status: "confirmada",
  },
  {
    id: 5,
    lead: "Lucas Ferreira",
    imovel: "Apartamento Moema",
    data: "17/03/2024",
    hora: "11:00",
    corretor: "Carlos Silva",
    status: "pendente",
  },
];

const statusConfig = {
  confirmada: {
    label: "Confirmada",
    className: "bg-green-500/20 text-green-700 border-green-500/30 hover:bg-green-500/30",
  },
  pendente: {
    label: "Pendente",
    className: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30 hover:bg-yellow-500/30",
  },
  cancelada: {
    label: "Cancelada",
    className: "bg-red-500/20 text-red-700 border-red-500/30 hover:bg-red-500/30",
  },
};

const Visitas = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Visitas Agendadas</h2>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Agendar Visita
          </Button>
        </div>

        <div className="space-y-4">
          {visitas.map((visita) => {
            const status = statusConfig[visita.status as keyof typeof statusConfig];
            return (
              <Card key={visita.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Lead</p>
                          <p className="font-medium text-foreground">{visita.lead}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Imóvel</p>
                          <p className="font-medium text-foreground">{visita.imovel}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Data</p>
                            <p className="font-medium text-foreground">{visita.data}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Hora</p>
                            <p className="font-medium text-foreground">{visita.hora}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">
                            {visita.corretor.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Corretor</p>
                          <p className="font-medium text-foreground">{visita.corretor}</p>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      <Badge className={status.className}>
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Visitas;
