import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {Award, BookOpen, TrendingUp, Users} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

// Sample data for analytics
const monthlyData = [
  { name: 'Jan', participants: 35, completed: 28 },
  { name: 'Fév', participants: 42, completed: 32 },
  { name: 'Mar', participants: 45, completed: 35 },
  { name: 'Avr', participants: 52, completed: 44 },
  { name: 'Mai', participants: 58, completed: 48 },
  { name: 'Jun', participants: 63, completed: 52 },
];

const categoryData = [
  { name: 'Management', value: 40 },
  { name: 'Soft Skills', value: 25 },
  { name: 'Technique', value: 20 },
  { name: 'Bureautique', value: 15 },
];

const satisfactionData = [
  { name: '1⭐', value: 5 },
  { name: '2⭐', value: 8 },
  { name: '3⭐', value: 15 },
  { name: '4⭐', value: 32 },
  { name: '5⭐', value: 40 },
];

const COLORS = ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];

const chartConfig = {
  participants: {
    label: "Participants",
    theme: {
      light: "#8B5CF6",
      dark: "#8B5CF6",
    },
  },
  completed: {
    label: "Certifiés",
    theme: {
      light: "#10B981",
      dark: "#10B981",
    },
  },
};

const DashboardAnalytics = () => {
  // Calculate some metrics
  const totalParticipants = monthlyData.reduce((acc, curr) => acc + curr.participants, 0);
  const totalCompleted = monthlyData.reduce((acc, curr) => acc + curr.completed, 0);
  const completionRate = Math.round((totalCompleted / totalParticipants) * 100);
  
  return (
    <div className="space-y-6">
      <AnimatedSection>
        <h1 className="text-3xl font-bold">Statistiques</h1>
        <p className="text-muted-foreground">Visualisez les performances de votre plateforme de formation</p>
      </AnimatedSection>
      
      <AnimatedSection delay={100} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalParticipants}</div>
            <p className="text-xs text-muted-foreground">+15% par rapport au trimestre précédent</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompleted}</div>
            <p className="text-xs text-muted-foreground">+12% par rapport au trimestre précédent</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taux de complétion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <p className="text-xs text-muted-foreground">+2% par rapport au trimestre précédent</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Formations actives</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+4 par rapport au trimestre précédent</p>
          </CardContent>
        </Card>
      </AnimatedSection>
      
      <AnimatedSection delay={200}>
        <Card>
          <CardHeader>
            <CardTitle>Évolution mensuelle</CardTitle>
            <CardDescription>Nombre de participants et de certifications par mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="participants"
                  stroke="var(--color-participants)"
                  name="participants"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="var(--color-completed)"
                  name="completed"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </AnimatedSection>
      
      <div className="grid gap-6 md:grid-cols-2">
        <AnimatedSection delay={300}>
          <Card>
            <CardHeader>
              <CardTitle>Répartition par catégorie</CardTitle>
              <CardDescription>Distribution des formations par catégorie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.name} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
        
        <AnimatedSection delay={400}>
          <Card>
            <CardHeader>
              <CardTitle>Satisfaction globale</CardTitle>
              <CardDescription>Évaluation des formations par les participants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={satisfactionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]}>
                      {satisfactionData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[3]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
