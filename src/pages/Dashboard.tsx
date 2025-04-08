import {Sidebar, SidebarHeader, SidebarProvider} from "../components/ui/sidebar.tsx";
import {BookOpen} from "lucide-react";

const Dashboard = () => {
  
  return (
      <SidebarProvider>
          <div className="flex min-h-screen w-full bg-muted/10">
              <Sidebar collapsible="icon" side="left">
                <SidebarHeader className="flex items-center justify-between border-b border-border/40 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                      <BookOpen className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-semibold">EasyTeach</span>
                  </div>
                </SidebarHeader>
              </Sidebar>
          </div>
      </SidebarProvider>
  );
};

export default Dashboard;
