# ImobiZap

> Plataforma imobiliária com automação de atendimento via WhatsApp — React, Supabase e IA.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ecf8e?style=flat-square&logo=supabase)](https://supabase.com/)

## Sobre o Projeto

O ImobiZap foi construído para imobiliárias que perdem leads por demora no atendimento inicial. A plataforma integra um CRM de imóveis com automação de respostas via WhatsApp, qualificando leads automaticamente antes de chegar ao corretor.

**Problema resolvido:** Leads de imóveis têm janela de atenção curta — o primeiro a responder fecha o negócio. O ImobiZap garante resposta imediata 24/7.

## Funcionalidades

- Catálogo de imóveis com filtros avançados (tipo, bairro, faixa de preço)
- CRM de leads com funil de vendas visual
- Automação de primeiro contato via WhatsApp
- Painel de corretores com agenda de visitas
- Upload e gestão de fotos de imóveis
- Dashboard com métricas de conversão

## Stack Técnica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| UI | shadcn/ui + Tailwind CSS |
| Backend/BaaS | Supabase (PostgreSQL + Storage + Auth) |
| Automação | n8n + WhatsApp Business API |
| Estado | TanStack Query |
| Deploy | Vercel |

## Arquitetura

```
src/
├── components/
│   ├── imoveis/     # Listagem, cards e filtros de imóveis
│   ├── leads/       # CRM e funil de vendas
│   └── dashboard/   # Métricas e relatórios
├── pages/
├── hooks/
│   ├── useImoveis.ts
│   └── useLeads.ts
├── lib/
│   └── supabase.ts
└── types/
```

## Fluxo de Automação

```
Lead clica em imóvel
       ↓
Webhook dispara no n8n
       ↓
IA qualifica interesse (localização, orçamento, urgência)
       ↓
WhatsApp envia mensagem personalizada em < 30 segundos
       ↓
Lead qualificado vai para fila do corretor no CRM
```

## Como Rodar Localmente

```bash
git clone https://github.com/octaviosilva2/imobizap.git
cd imobizap
npm install
cp .env.example .env.local
npm run dev
```

### Variáveis de Ambiente

```env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_publica
```

## Decisões Técnicas

- **Supabase Storage para imagens:** Evita complexidade de gerenciar bucket próprio (S3/R2) em um MVP, com CDN integrado e políticas de acesso por RLS.
- **n8n para automações:** Permite construir e ajustar fluxos de automação sem deploy — ideal para iterar rapidamente com o cliente final.
- **Separação CRM / Catálogo:** Dois domínios distintos no mesmo app — corretores e gestores têm visões completamente diferentes, separadas por roles no Supabase Auth.

## Autor

Desenvolvido por **Octavio Silva** — [github.com/octaviosilva2](https://github.com/octaviosilva2)
