import {Link, Navigate, Route, Routes, useLocation} from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger
} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  FolderPlus,
  Globe,
  LayoutDashboard,
  LogOut,
  Mail,
  Search,
  Settings,
  UserPlus,
  Users,
} from "lucide-react";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import CourseManagement from "@/components/dashboard/CourseManagement";
import UserManagement from "@/components/dashboard/UserManagement";
import DashboardCalendar from "@/components/dashboard/DashboardCalendar";
import DashboardAnalytics from "@/components/dashboard/DashboardAnalytics";
import DashboardSettings from "@/components/dashboard/DashboardSettings";
import SalesPageGenerator from "@/components/dashboard/SalesPageGenerator";
import LeadGeneration from "@/components/dashboard/LeadGeneration";
import EmailCampaigns from "@/components/dashboard/EmailCampaigns";
import CourseCreation from "@/components/dashboard/CourseCreation.tsx";
import TrainingPath from "@/components/dashboard/TrainingPath.tsx";

const Dashboard = () => {
  const location = useLocation();
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/10">
        {/* Sidebar */}
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
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/courses")}>
                      <Link to="/dashboard/courses">
                        <BookOpen />
                        <span>Formations</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/training-path")}>
                      <Link to="/dashboard/training-path">
                        <FolderPlus />
                        <span>Parcours de formations</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/users")}>
                      <Link to="/dashboard/users">
                        <Users />
                        <span>Apprenants</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/calendar")}>
                      <Link to="/dashboard/calendar">
                        <CalendarDays />
                        <span>Calendrier</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Marketing</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/sales-pages")}>
                      <Link to="/dashboard/sales-pages">
                        <Globe />
                        <span>Pages de vente</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/leads")}>
                      <Link to="/dashboard/leads">
                        <UserPlus />
                        <span>Collecte de leads</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/email-campaigns")}>
                      <Link to="/dashboard/email-campaigns">
                        <Mail />
                        <span>Campagnes email</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/analytics")}>
                      <Link to="/dashboard/analytics">
                        <BarChart3 />
                        <span>Statistiques</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup className="mb-0">
              <SidebarGroupLabel>Paramètres</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/settings")}>
                      <Link to="/dashboard/settings">
                        <Settings />
                        <span>Paramètres</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/">
                        <LogOut />
                        <span>Déconnexion</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-border/40 p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Admin</span>
                <span className="text-xs text-muted-foreground">admin@esayteach.com</span>
              </div>
            </div>
          </SidebarFooter>
          
          <SidebarRail />
        </Sidebar>
        
        {/* Main content */}
        <SidebarInset>
          <div className="flex h-14 items-center justify-between border-b border-border/40 px-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Search className="h-5 w-5" />
              </Button>
              <div className="relative">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Bell className="h-5 w-5" />
                </Button>
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
              </div>
            </div>
            <Button size="sm" asChild>
              <Link to="/">Retour au site</Link>
            </Button>
          </div>
          
          <div className="container mx-auto p-4 lg:p-6">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/courses" element={<CourseManagement />} />
              <Route path="/training-path" element={<TrainingPath />} />
              <Route path="/course-creation" element={<CourseCreation />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/calendar" element={<DashboardCalendar />} />
              <Route path="/analytics" element={<DashboardAnalytics />} />
              <Route path="/settings" element={<DashboardSettings />} />
              <Route path="/sales-pages" element={<SalesPageGenerator />} />
              <Route path="/leads" element={<LeadGeneration />} />
              <Route path="/email-campaigns" element={<EmailCampaigns />} />
              
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
