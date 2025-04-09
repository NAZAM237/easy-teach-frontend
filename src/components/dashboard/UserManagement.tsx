import {useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {
  BookOpen,
  Edit,
  Filter,
  Mail,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Trash,
  UserCheck,
  UserPlus
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import AnimatedSection from "@/components/AnimatedSection";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {toast} from "sonner";

// Sample data
const usersData = [
  { 
    id: 1, 
    name: 'Sophie Martin', 
    email: 'sophie.martin@example.com',
    phone: '06 12 34 56 78',
    role: 'Participant',
    status: 'Actif',
    courses: 3,
    avatar: '',
    initials: 'SM'
  },
  { 
    id: 2, 
    name: 'Thomas Dubois', 
    email: 'thomas.dubois@example.com',
    phone: '06 23 45 67 89',
    role: 'Formateur',
    status: 'Actif',
    courses: 2,
    avatar: '',
    initials: 'TD'
  },
  { 
    id: 3, 
    name: 'Julie Lefebvre', 
    email: 'julie.lefebvre@example.com',
    phone: '06 34 56 78 90',
    role: 'Administrateur',
    status: 'Actif',
    courses: 0,
    avatar: '',
    initials: 'JL'
  },
  { 
    id: 4, 
    name: 'Laurent Bernard', 
    email: 'laurent.bernard@example.com',
    phone: '06 45 67 89 01',
    role: 'Participant',
    status: 'Inactif',
    courses: 1,
    avatar: '',
    initials: 'LB'
  },
  { 
    id: 5, 
    name: 'Marie Petit', 
    email: 'marie.petit@example.com',
    phone: '06 56 78 90 12',
    role: 'Participant',
    status: 'Actif',
    courses: 2,
    avatar: '',
    initials: 'MP'
  },
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDelete = (id: number) => {
    toast.info("Cette fonctionnalité sera disponible prochainement", {
      description: "La suppression n'est pas implémentée dans cette démo" + id
    });
  };
  
  const handleEdit = (id: number) => {
    toast.info("Cette fonctionnalité sera disponible prochainement", {
      description: "L'édition n'est pas implémentée dans cette démo" + id
    });
  };
  
  const handleCreateUser = () => {
    toast.info("Cette fonctionnalité sera disponible prochainement", {
      description: "La création d'utilisateur n'est pas implémentée dans cette démo"
    });
  };

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestion des Apprenants</h1>
            <p className="text-muted-foreground">Gérez les participants à vos formations</p>
          </div>
          <Button onClick={handleCreateUser}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un apprenant
          </Button>
        </div>
      </AnimatedSection>
      
      <AnimatedSection delay={100}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <CardTitle>Apprenants</CardTitle>
                <CardDescription>
                  Gérez les apprenants de vos formations. Vous pouvez les ajouter, les modifier ou les supprimer.
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
                    <DropdownMenuItem>Administrateurs</DropdownMenuItem>
                    <DropdownMenuItem>Formateurs</DropdownMenuItem>
                    <DropdownMenuItem>Participants</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Formations</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <Mail className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                            {user.email}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="mr-1 h-3.5 w-3.5" />
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.role === 'Administrateur' 
                            ? 'bg-purple-100 text-purple-800' 
                            : user.role === 'Formateur' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status === 'Actif' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <BookOpen className="mr-1 h-3.5 w-3.5 text-muted-foreground" /> 
                          {user.courses}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEdit(user.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(user.id)}
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
                                <UserCheck className="mr-2 h-4 w-4" />
                                Changer le statut
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Assigner à une formation
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Aucun utilisateur trouvé.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          
          <CardFooter className="flex items-center justify-between border-t p-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredUsers.length}</strong> of <strong>{usersData.length}</strong> utilisateurs
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

export default UserManagement;
