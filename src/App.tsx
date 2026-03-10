import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Leads from "./pages/Leads";
import Imoveis from "./pages/Imoveis";
import Corretores from "./pages/Corretores";
import Visitas from "./pages/Visitas";
import Funil from "./pages/Funil";
import IA from "./pages/IA";
import Configuracoes from "./pages/Configuracoes";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
            <Route path="/imoveis" element={<ProtectedRoute><Imoveis /></ProtectedRoute>} />
            <Route path="/corretores" element={<ProtectedRoute><Corretores /></ProtectedRoute>} />
            <Route path="/visitas" element={<ProtectedRoute><Visitas /></ProtectedRoute>} />
            <Route path="/funil" element={<ProtectedRoute><Funil /></ProtectedRoute>} />
            <Route path="/ia" element={<ProtectedRoute><IA /></ProtectedRoute>} />
            <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
