import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Award, BookOpen, CalendarDays, Users} from "lucide-react";
import {Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts";
import AnimatedSection from "@/components/AnimatedSection";

// Sample data for charts
const monthlyData = [
  { name: 'Jan', value: 15 },
  { name: 'Fév', value: 20 },
  { name: 'Mar', value: 18 },
  { name: 'Avr', value: 25 },
  { name: 'Mai', value: 30 },
  { name: 'Jun', value: 28 },
];

const recentCourses = [
  { id: 1, title: 'Introduction au management', participants: 24, status: 'En cours' },
  { id: 2, title: 'Excel avancé', participants: 18, status: 'Planifié' },
  { id: 3, title: 'Communication professionnelle', participants: 22, status: 'Terminé' },
  { id: 4, title: 'Gestion de projet', participants: 15, status: 'En cours' },
];

const chartConfig = {
  activity: {
    label: "Activité",
    theme: {
      light: "#8B5CF6",
      dark: "#8B5CF6",
    },
  },
};

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <AnimatedSection>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">Bienvenue dans votre espace de gestion de formation</p>
      </AnimatedSection>
      
      <AnimatedSection delay={100} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Formations</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 ce mois-ci</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">412</div>
            <p className="text-xs text-muted-foreground">+18 cette semaine</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sessions à venir</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Dans les 14 prochains jours</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taux de completion</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+2% par rapport au mois dernier</p>
          </CardContent>
        </Card>
      </AnimatedSection>
      
      <div className="grid gap-4 md:grid-cols-2">
        <AnimatedSection delay={200}>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Activité mensuelle</CardTitle>
              <CardDescription>Nombre de nouveaux participants par mois</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <ChartContainer config={chartConfig} className="aspect-[4/3]">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="value" 
                    fill="var(--color-activity)" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </AnimatedSection>
        
        <AnimatedSection delay={300}>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Formations récentes</CardTitle>
              <CardDescription>Aperçu des dernières formations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Formation</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{course.participants}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          course.status === 'En cours' 
                            ? 'bg-blue-100 text-blue-800' 
                            : course.status === 'Terminé' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {course.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default DashboardOverview;
