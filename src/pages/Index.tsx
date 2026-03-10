import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Building2, TrendingUp, Clock, Home, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const today = new Date();
const formattedDate = today.toLocaleDateString("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();

const startOfWeek = (() => {
  const d = new Date(today);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
})();
const endOfWeek = (() => {
  const d = new Date(today);
  d.setDate(d.getDate() + (6 - d.getDay()));
  d.setHours(23, 59, 59, 999);
  return d.toISOString();
})();

const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999).toISOString();

const Index = () => {
  const { data: leadsHoje = 0 } = useQuery({
    queryKey: ["kpi-leads-hoje"],
    queryFn: async () => {
      const { count } = await supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", startOfDay).lt("created_at", endOfDay);
      return count || 0;
    },
  });

  const { data: visitasSemana = 0 } = useQuery({
    queryKey: ["kpi-visitas-semana"],
    queryFn: async () => {
      const { count } = await supabase.from("visitas").select("*", { count: "exact", head: true }).gte("data", startOfWeek.split("T")[0]).lte("data", endOfWeek.split("T")[0]);
      return count || 0;
    },
  });

  const { data: imoveisDisp = 0 } = useQuery({
    queryKey: ["kpi-imoveis-disp"],
    queryFn: async () => {
      const { count } = await supabase.from("imoveis").select("*", { count: "exact", head: true }).eq("status", "disponível");
      return count || 0;
    },
  });

  const { data: conversoes = 0 } = useQuery({
    queryKey: ["kpi-conversoes"],
    queryFn: async () => {
      const { count } = await supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "qualificado").gte("created_at", startOfMonth).lt("created_at", endOfMonth);
      return count || 0;
    },
  });

  const { data: leadsQuentes = [] } = useQuery({
    queryKey: ["leads-quentes"],
    queryFn: async () => {
      const { data } = await supabase.from("leads").select("*").eq("status", "qualificado").order("created_at", { ascending: false }).limit(3);
      return data || [];
    },
  });

  const { data: proximasVisitas = [] } = useQuery({
    queryKey: ["proximas-visitas"],
    queryFn: async () => {
      const todayStr = today.toISOString().split("T")[0];
      const { data } = await supabase.from("visitas").select("*, leads(nome), imoveis(titulo)").eq("data", todayStr).order("hora", { ascending: true }).limit(3);
      return data || [];
    },
  });

  const kpis = [
    { title: "Leads Hoje", value: String(leadsHoje), icon: Users, color: "text-blue-400" },
    { title: "Visitas Esta Semana", value: String(visitasSemana), icon: Calendar, color: "text-green-400" },
    { title: "Imóveis Disponíveis", value: String(imoveisDisp), icon: Building2, color: "text-yellow-400" },
    { title: "Conversões do Mês", value: String(conversoes), icon: TrendingUp, color: "text-purple-400" },
  ];

  const timeSince = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} min esperando`;
    const hours = Math.floor(mins / 60);
    return `${hours}h esperando`;
  };

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
                <Users className="h-5 w-5 text-primary" /> Leads Quentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {leadsQuentes.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum lead qualificado.</p>
              ) : (
                leadsQuentes.map((lead: any) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{lead.nome}</p>
                        <p className="text-xs text-muted-foreground">{lead.bairro}</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {timeSince(lead.created_at)}
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> Próximas Visitas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {proximasVisitas.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhuma visita para hoje.</p>
              ) : (
                proximasVisitas.map((v: any) => (
                  <div key={v.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="text-center min-w-[50px]">
                      <p className="text-lg font-bold text-primary">{v.hora}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{v.leads?.nome || "—"}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Home className="h-3 w-3" /> {v.imoveis?.titulo || "—"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
