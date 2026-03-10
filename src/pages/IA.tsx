import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, UserCheck, GitCompare, BarChart3, MessageSquare } from "lucide-react";

const features = [
  {
    title: "Qualificação Automática",
    description: "IA analisa conversas e classifica leads automaticamente por nível de interesse.",
    icon: UserCheck,
  },
  {
    title: "Match Lead x Imóvel",
    description: "Sugestão automática dos melhores imóveis para cada lead com base no perfil.",
    icon: GitCompare,
  },
  {
    title: "Score de Lead",
    description: "Pontuação inteligente de leads com base em comportamento e engajamento.",
    icon: BarChart3,
  },
  {
    title: "Follow-up Automático",
    description: "Mensagens automáticas de acompanhamento enviadas no momento ideal.",
    icon: MessageSquare,
  },
];

const IA = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Inteligência Artificial
          </h2>
          <p className="text-muted-foreground mt-1">Recursos de IA para turbinar suas vendas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-card relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">
                    Em breve
                  </Badge>
                </div>
                <CardTitle className="text-lg mt-3">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default IA;
