import {useState} from "react";
import {Link} from "react-router-dom";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {
  BookOpenCheck,
  Calendar,
  Clock,
  Edit,
  FileText,
  Film,
  Filter,
  Grid3X3,
  MoreVertical,
  Plus,
  Search,
  Trash,
  Users
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {toast} from "sonner";

// Sample data
const coursesData = [
  { 
    id: 1, 
    title: 'Introduction au management', 
    category: 'Management',
    duration: '16h',
    students: 24, 
    instructor: 'Marie Dupont',
    status: 'En cours',
    startDate: '15 Juin 2023',
    modules: 4,
    lessons: 12
  },
  { 
    id: 2, 
    title: 'Excel avancé', 
    category: 'Bureautique',
    duration: '8h',
    students: 18, 
    instructor: 'Jean Martin',
    status: 'Planifié',
    startDate: '22 Juin 2023',
    modules: 3,
    lessons: 8
  },
  { 
    id: 3, 
    title: 'Communication professionnelle', 
    category: 'Soft Skills',
    duration: '24h',
    students: 22, 
    instructor: 'Sophie Lefebvre',
    status: 'Terminé',
    startDate: '5 Mai 2023',
    modules: 5,
    lessons: 15
  },
  { 
    id: 4, 
    title: 'Gestion de projet', 
    category: 'Management',
    duration: '40h',
    students: 15, 
    instructor: 'Thomas Bernard',
    status: 'En cours',
    startDate: '1 Juin 2023',
    modules: 6,
    lessons: 18
  },
  { 
    id: 5, 
    title: 'Marketing digital', 
    category: 'Marketing',
    duration: '32h',
    students: 20, 
    instructor: 'Claire Dubois',
    status: 'Planifié',
    startDate: '30 Juin 2023',
    modules: 5,
    lessons: 14
  },
];

const CourseManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCourses = coursesData.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDelete = (id: number) => {
    toast.info("Cette fonctionnalité sera disponible prochainement", {
      description: "La suppression n'est pas implémentée dans cette démo" +id
    });
  };
  
  const handleEdit = (id: number) => {
    toast.info("Cette fonctionnalité sera disponible prochainement", {
      description: "L'édition n'est pas implémentée dans cette démo" +id
    });
  };

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestion des formations</h1>
            <p className="text-muted-foreground">Gérez vos formations et leurs contenus</p>
          </div>
          <Button asChild>
            <Link to="/dashboard/course-creation">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle formation
            </Link>
          </Button>
        </div>
      </AnimatedSection>
      
      <AnimatedSection delay={100}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <CardTitle>Formations</CardTitle>
                <CardDescription>
                  Gérez toutes vos formations et leur contenu
                </CardDescription>
              </div>
              
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Tous</DropdownMenuItem>
                    <DropdownMenuItem>En cours</DropdownMenuItem>
                    <DropdownMenuItem>Planifiés</DropdownMenuItem>
                    <DropdownMenuItem>Terminés</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Vue liste</DropdownMenuItem>
                    <DropdownMenuItem>Vue grille</DropdownMenuItem>
                    <DropdownMenuItem>Vue calendrier</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Formation</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Formateur</TableHead>
                  <TableHead>Structure</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date de début</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3.5 w-3.5 text-muted-foreground" /> 
                          {course.duration}
                        </div>
                      </TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center text-xs">
                            <BookOpenCheck className="mr-1 h-3.5 w-3.5 text-muted-foreground" /> 
                            {course.modules} modules
                          </div>
                          <div className="flex items-center text-xs">
                            <Film className="mr-1 h-3.5 w-3.5 text-muted-foreground" /> 
                            {course.lessons} leçons
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="mr-1 h-3.5 w-3.5 text-muted-foreground" /> 
                          {course.students}
                        </div>
                      </TableCell>
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
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3.5 w-3.5 text-muted-foreground" /> 
                          {course.startDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEdit(course.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(course.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Contenu
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                Participants
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                Sessions
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      Aucune formation trouvée.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          
          <CardFooter className="flex items-center justify-between border-t p-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredCourses.length}</strong> of <strong>{coursesData.length}</strong> formations
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>
                Précédent
              </Button>
              <Button variant="outline" size="sm" disabled>
                Suivant
              </Button>
            </div>
          </CardFooter>
        </Card>
      </AnimatedSection>
    </div>
  );
};

export default CourseManagement;
