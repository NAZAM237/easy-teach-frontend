import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from "../components/ui/sidebar.tsx";
import {BookOpen, LayoutDashboard} from "lucide-react";
import {Link} from "react-router-dom";
import './sidebar.css'

const Dashboard = () => {
  
  return (
    /*<SidebarProvider>
        <div className="sidebar-layout">
            <Sidebar collapsible="icon" side="left">
                <SidebarHeader className="sidebar-header">
                    <div className="header-logo-container">
                        <div className="logo-icon">
                            <BookOpen />
                        </div>
                        <span className="logo-text">EasyTeach</span>
                    </div>
                    <SidebarTrigger />
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        data-active={location.pathname === "/dashboard" || location.pathname === "/dashboard/"}
                                    >
                                        <Link to="/dashboard">
                                            <LayoutDashboard />
                                            <span>Tableau de bord</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
    </SidebarProvider>*/
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
                  <SidebarTrigger />
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild isActive={location.pathname === "/dashboard" || location.pathname === "/dashboard/"}>
                                        <Link to="/dashboard">
                                            <LayoutDashboard />
                                            <span>Tableau de bord</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
              </Sidebar>
          </div>
      </SidebarProvider>
  );
};

export default Dashboard;
