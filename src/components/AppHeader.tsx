import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppHeader() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <h1 className="text-lg font-semibold text-foreground">ImobiZap</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">João Silva</span>
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=joao" />
          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
            JS
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
