import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const Configuracoes = () => {
  const [nome, setNome] = useState("Minha Imobiliária");
  const [email, setEmail] = useState("contato@imobiliaria.com");
  const [telefone, setTelefone] = useState("(11) 99999-9999");

  const handleSave = () => {
    toast.success("Alterações salvas com sucesso!");
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-2xl">
        <h2 className="text-2xl font-bold text-foreground">Configurações</h2>

        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Dados da Imobiliária</CardTitle>
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                Corretor Solo
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Imobiliária</Label>
              <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="bg-muted border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-muted border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="bg-muted border-border" />
            </div>
            <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Salvar alterações
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Configuracoes;
