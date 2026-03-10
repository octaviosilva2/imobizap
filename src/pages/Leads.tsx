import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type LeadStatus = "novo" | "qualificado" | "frio";

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  novo: { label: "Novo", className: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" },
  qualificado: { label: "Qualificado", className: "bg-green-500/20 text-green-400 hover:bg-green-500/30" },
  frio: { label: "Frio", className: "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30" },
};

const emptyLead = { nome: "", telefone: "", origem: "WhatsApp", bairro: "", orcamento: "", status: "novo" };

const Leads = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<any>(null);
  const [viewLead, setViewLead] = useState<any>(null);
  const [form, setForm] = useState(emptyLead);

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (leadData: typeof form) => {
      if (editingLead) {
        const { error } = await supabase.from("leads").update(leadData).eq("id", editingLead.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("leads").insert({ ...leadData, user_id: user!.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      setModalOpen(false);
      setEditingLead(null);
      setForm(emptyLead);
      toast.success(editingLead ? "Lead atualizado!" : "Lead criado!");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead excluído!");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const filtered = leads.filter(
    (l) =>
      l.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.telefone.includes(searchTerm) ||
      l.bairro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEdit = (lead: any) => {
    setEditingLead(lead);
    setForm({ nome: lead.nome, telefone: lead.telefone, origem: lead.origem, bairro: lead.bairro, orcamento: lead.orcamento, status: lead.status });
    setModalOpen(true);
  };

  const openNew = () => {
    setEditingLead(null);
    setForm(emptyLead);
    setModalOpen(true);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Leads</h2>
          <Button onClick={openNew} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" /> Novo Lead
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nome, telefone ou bairro..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-card border-border" />
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : filtered.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">Nenhum lead cadastrado ainda.</p>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Nome</TableHead>
                  <TableHead className="text-muted-foreground">Telefone</TableHead>
                  <TableHead className="text-muted-foreground">Origem</TableHead>
                  <TableHead className="text-muted-foreground">Bairro</TableHead>
                  <TableHead className="text-muted-foreground">Orçamento</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((lead) => (
                  <TableRow key={lead.id} className="border-border">
                    <TableCell className="font-medium text-foreground">{lead.nome}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.telefone}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.origem}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.bairro}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.orcamento}</TableCell>
                    <TableCell>
                      <Badge className={statusConfig[lead.status as LeadStatus]?.className || ""}>
                        {statusConfig[lead.status as LeadStatus]?.label || lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          <DropdownMenuItem onClick={() => { setViewLead(lead); setViewOpen(true); }} className="cursor-pointer">
                            <Eye className="h-4 w-4 mr-2" /> Ver
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEdit(lead)} className="cursor-pointer">
                            <Pencil className="h-4 w-4 mr-2" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteMutation.mutate(lead.id)} className="cursor-pointer text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Modal Criar/Editar */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>{editingLead ? "Editar Lead" : "Novo Lead"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(form); }} className="space-y-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} required className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Origem</Label>
                <Select value={form.origem} onValueChange={(v) => setForm({ ...form, origem: v })}>
                  <SelectTrigger className="bg-muted border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Formulário">Formulário</SelectItem>
                    <SelectItem value="Portal">Portal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Bairro</Label>
                <Input value={form.bairro} onChange={(e) => setForm({ ...form, bairro: e.target.value })} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Orçamento</Label>
                <Input value={form.orcamento} onChange={(e) => setForm({ ...form, orcamento: e.target.value })} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger className="bg-muted border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="novo">Novo</SelectItem>
                    <SelectItem value="qualificado">Qualificado</SelectItem>
                    <SelectItem value="frio">Frio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={saveMutation.isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {saveMutation.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Modal Ver */}
        <Dialog open={viewOpen} onOpenChange={setViewOpen}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>Detalhes do Lead</DialogTitle>
            </DialogHeader>
            {viewLead && (
              <div className="space-y-3">
                <div><Label className="text-muted-foreground">Nome</Label><p className="text-foreground">{viewLead.nome}</p></div>
                <div><Label className="text-muted-foreground">Telefone</Label><p className="text-foreground">{viewLead.telefone}</p></div>
                <div><Label className="text-muted-foreground">Origem</Label><p className="text-foreground">{viewLead.origem}</p></div>
                <div><Label className="text-muted-foreground">Bairro</Label><p className="text-foreground">{viewLead.bairro}</p></div>
                <div><Label className="text-muted-foreground">Orçamento</Label><p className="text-foreground">{viewLead.orcamento}</p></div>
                <div><Label className="text-muted-foreground">Status</Label>
                  <Badge className={statusConfig[viewLead.status as LeadStatus]?.className || ""}>
                    {statusConfig[viewLead.status as LeadStatus]?.label || viewLead.status}
                  </Badge>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Leads;
