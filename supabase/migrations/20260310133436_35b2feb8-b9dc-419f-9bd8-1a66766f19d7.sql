-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  origem TEXT NOT NULL DEFAULT 'WhatsApp',
  bairro TEXT NOT NULL DEFAULT '',
  orcamento TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'novo',
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own leads" ON public.leads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own leads" ON public.leads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own leads" ON public.leads FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own leads" ON public.leads FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Imoveis table
CREATE TABLE public.imoveis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  bairro TEXT NOT NULL DEFAULT '',
  tipo TEXT NOT NULL DEFAULT 'apartamento',
  valor TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'disponível',
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.imoveis ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own imoveis" ON public.imoveis FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own imoveis" ON public.imoveis FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own imoveis" ON public.imoveis FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own imoveis" ON public.imoveis FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_imoveis_updated_at BEFORE UPDATE ON public.imoveis FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Corretores table
CREATE TABLE public.corretores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL DEFAULT '',
  especialidade TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'ativo',
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.corretores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own corretores" ON public.corretores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own corretores" ON public.corretores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own corretores" ON public.corretores FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own corretores" ON public.corretores FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_corretores_updated_at BEFORE UPDATE ON public.corretores FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Visitas table
CREATE TABLE public.visitas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  imovel_id UUID NOT NULL REFERENCES public.imoveis(id) ON DELETE CASCADE,
  corretor_id UUID NOT NULL REFERENCES public.corretores(id) ON DELETE CASCADE,
  data DATE NOT NULL,
  hora TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente',
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.visitas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own visitas" ON public.visitas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own visitas" ON public.visitas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own visitas" ON public.visitas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own visitas" ON public.visitas FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_visitas_updated_at BEFORE UPDATE ON public.visitas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();