import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Building2, MapPin } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const statusConfig: Record<string, { label: string; className: string }> = {
  "disponível": { label: "Disponível", className: "bg-green-500/20 text-green-400 hover:bg-green-500/30" },
  reservado: { label: "Reservado", className: "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30" },
  vendido: { label: "Vendido", className: "bg-red-500/20 text-red-400 hover:bg-red-500/30" },
};

const emptyImovel = { titulo: "", bairro: "", tipo: "apartamento", valor: "", status: "disponível" };

const Imoveis = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingImovel, setEditingImovel] = useState<any>(null);
  const [form, setForm] = useState(emptyImovel);

  const { data: imoveis = [], isLoading } = useQuery({
    queryKey: ["imoveis"],
    queryFn: async () => {
      const { data, error } = await supabase.from("imoveis").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (d: typeof form) => {
      if (editingImovel) {
        const { error } = await supabase.from("imoveis").update(d).eq("id", editingImovel.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("imoveis").insert({ ...d, user_id: user!.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imoveis"] });
      setModalOpen(false);
      setEditingImovel(null);
      setForm(emptyImovel);
      toast.success(editingImovel ? "Imóvel atualizado!" : "Imóvel criado!");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const openNew = () => { setEditingImovel(null); setForm(emptyImovel); setModalOpen(true); };
  const openEdit = (im: any) => {
    setEditingImovel(im);
    setForm({ titulo: im.titulo, bairro: im.bairro, tipo: im.tipo, valor: im.valor, status: im.status });
    setModalOpen(true);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Imóveis</h2>
          <Button onClick={openNew} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" /> Novo Imóvel
          </Button>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : imoveis.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">Nenhum imóvel cadastrado ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {imoveis.map((im) => (
              <Card key={im.id} className="border-border bg-card cursor-pointer hover:border-primary/50 transition-colors" onClick={() => openEdit(im)}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-foreground">{im.titulo}</h3>
                    <Badge className={statusConfig[im.status]?.className || ""}>
                      {statusConfig[im.status]?.label || im.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {im.bairro}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1"><Building2 className="h-4 w-4" /> {im.tipo}</span>
                    <span className="font-semibold text-foreground">{im.valor}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>{editingImovel ? "Editar Imóvel" : "Novo Imóvel"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(form); }} className="space-y-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Bairro</Label>
                <Input value={form.bairro} onChange={(e) => setForm({ ...form, bairro: e.target.value })} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select value={form.tipo} onValueChange={(v) => setForm({ ...form, tipo: v })}>
                  <SelectTrigger className="bg-muted border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Valor</Label>
                <Input value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger className="bg-muted border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disponível">Disponível</SelectItem>
                    <SelectItem value="reservado">Reservado</SelectItem>
                    <SelectItem value="vendido">Vendido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={saveMutation.isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {saveMutation.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Imoveis;
