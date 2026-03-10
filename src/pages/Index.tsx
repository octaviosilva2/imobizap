import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Building2, TrendingUp, Clock, Home, User } from "lucide-react";

const today = new Date();
const formattedDate = today.toLocaleDateString("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const kpis = [
  { title: "Leads Hoje", value: "8", icon: Users, color: "text-blue-400" },
  { title: "Visitas Esta Semana", value: "5", icon: Calendar, color: "text-green-400" },
  { title: "Imóveis Disponíveis", value: "12", icon: Building2, color: "text-yellow-400" },
  { title: "Conversões do Mês", value: "3", icon: TrendingUp, color: "text-purple-400" },
];

const leadsQuentes = [
  { nome: "Maria Santos", imovel: "Apt 3 quartos - Jardins", tempo: "2 horas esperando" },
  { nome: "Carlos Oliveira", imovel: "Cobertura - Moema", tempo: "4 horas esperando" },
  { nome: "Ana Paula Costa", imovel: "Casa - Pinheiros", tempo: "30 min esperando" },
];

const proximasVisitas = [
  { horario: "10:00", lead: "Roberto Almeida", imovel: "Apt 2 quartos - Vila Mariana" },
  { horario: "14:30", lead: "Fernanda Lima", imovel: "Penthouse - Itaim Bibi" },
  { horario: "16:00", lead: "Pedro Henrique", imovel: "Apt 1 quarto - Perdizes" },
];

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Olá, Corretor 👋</h2>
          <p className="text-muted-foreground capitalize">{formattedDate}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <Card key={kpi.title} className="border-border bg-card">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-muted ${kpi.color}`}>
                  <kpi.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Leads Quentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {leadsQuentes.map((lead, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{lead.nome}</p>
                      <p className="text-xs text-muted-foreground">{lead.imovel}</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {lead.tempo}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Próximas Visitas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {proximasVisitas.map((visita, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="text-center min-w-[50px]">
                    <p className="text-lg font-bold text-primary">{visita.horario}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{visita.lead}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Home className="h-3 w-3" />
                      {visita.imovel}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
