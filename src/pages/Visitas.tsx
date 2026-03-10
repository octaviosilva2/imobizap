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
import { Plus, Calendar, Clock, User, Home } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const statusConfig: Record<string, { label: string; className: string }> = {
  confirmada: { label: "Confirmada", className: "bg-green-500/20 text-green-400 hover:bg-green-500/30" },
  pendente: { label: "Pendente", className: "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30" },
  cancelada: { label: "Cancelada", className: "bg-red-500/20 text-red-400 hover:bg-red-500/30" },
};

const Visitas = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ lead_id: "", imovel_id: "", corretor_id: "", data: "", hora: "" });

  const { data: visitas = [], isLoading } = useQuery({
    queryKey: ["visitas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("visitas")
        .select("*, leads(nome), imoveis(titulo), corretores(nome)")
        .order("data", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const { data: leads = [] } = useQuery({
    queryKey: ["leads-select"],
    queryFn: async () => {
      const { data } = await supabase.from("leads").select("id, nome");
      return data || [];
    },
  });

  const { data: imoveis = [] } = useQuery({
    queryKey: ["imoveis-select"],
    queryFn: async () => {
      const { data } = await supabase.from("imoveis").select("id, titulo");
      return data || [];
    },
  });

  const { data: corretores = [] } = useQuery({
    queryKey: ["corretores-select"],
    queryFn: async () => {
      const { data } = await supabase.from("corretores").select("id, nome");
      return data || [];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("visitas").insert({
        ...form,
        status: "pendente",
        user_id: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitas"] });
      setModalOpen(false);
      setForm({ lead_id: "", imovel_id: "", corretor_id: "", data: "", hora: "" });
      toast.success("Visita agendada!");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("visitas").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitas"] });
      toast.success("Status atualizado!");
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Visitas</h2>
          <Button onClick={() => setModalOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" /> Agendar Visita
          </Button>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : visitas.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">Nenhuma visita agendada ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visitas.map((v: any) => (
              <Card key={v.id} className="border-border bg-card">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      {v.leads?.nome || "—"}
                    </h3>
                    <Select value={v.status} onValueChange={(s) => updateStatus.mutate({ id: v.id, status: s })}>
                      <SelectTrigger className="w-auto h-7 border-0 p-0">
                        <Badge className={statusConfig[v.status]?.className || ""}>
                          {statusConfig[v.status]?.label || v.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="confirmada">Confirmada</SelectItem>
                        <SelectItem value="cancelada">Cancelada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Home className="h-4 w-4" /> {v.imoveis?.titulo || "—"}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {v.data}</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {v.hora}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Corretor: {v.corretores?.nome || "—"}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>Agendar Visita</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
              <div className="space-y-2">
                <Label>Lead</Label>
                <Select value={form.lead_id} onValueChange={(v) => setForm({ ...form, lead_id: v })}>
                  <SelectTrigger className="bg-muted border-border"><SelectValue placeholder="Selecione um lead" /></SelectTrigger>
                  <SelectContent>
                    {leads.map((l) => <SelectItem key={l.id} value={l.id}>{l.nome}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Imóvel</Label>
                <Select value={form.imovel_id} onValueChange={(v) => setForm({ ...form, imovel_id: v })}>
                  <SelectTrigger className="bg-muted border-border"><SelectValue placeholder="Selecione um imóvel" /></SelectTrigger>
                  <SelectContent>
                    {imoveis.map((i) => <SelectItem key={i.id} value={i.id}>{i.titulo}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Corretor</Label>
                <Select value={form.corretor_id} onValueChange={(v) => setForm({ ...form, corretor_id: v })}>
                  <SelectTrigger className="bg-muted border-border"><SelectValue placeholder="Selecione um corretor" /></SelectTrigger>
                  <SelectContent>
                    {corretores.map((c) => <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Data</Label>
                <Input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} required className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Hora</Label>
                <Input type="time" value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })} required className="bg-muted border-border" />
              </div>
              <Button type="submit" disabled={saveMutation.isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {saveMutation.isPending ? "Agendando..." : "Agendar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Visitas;
