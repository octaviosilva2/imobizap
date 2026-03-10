import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function AppHeader() {
  const { user, signOut } = useAuth();
  const email = user?.email || "";
  const initials = email.substring(0, 2).toUpperCase();

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <h1 className="text-lg font-semibold text-foreground">ImobiZap</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{email}</span>
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <Button variant="ghost" size="icon" onClick={signOut} title="Sair">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
