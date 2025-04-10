import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {BookOpenCheck, Clock, Edit, FileText, GraduationCap, MoreVertical, Trash, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

interface CourseCardProps {
    course: {
        id: number;
        title: string;
        category: string;
        duration: string;
        students: number;
        instructor: string;
        status: string;
        startDate: string;
        modules: number;
        lessons: number;
        description: string;
        image: string;
        level: string;
    };
}

export const CourseCard = ({ course }: CourseCardProps) => {
    const handleEdit = (id: number) => {
        toast.info("Cette fonctionnalité sera disponible prochainement", {
            description: "L'édition n'est pas implémentée dans cette démo" +id
        });
    };

    const handleDelete = (id: number) => {
        toast.info("Cette fonctionnalité sera disponible prochainement", {
            description: "La suppression n'est pas implémentée dans cette démo" +id
        });
    };

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'En cours':
                return 'bg-blue-100 text-blue-800';
            case 'Terminé':
                return 'bg-green-100 text-green-800';
            case 'Planifié':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getLevelBadge = (level: string) => {
        switch(level) {
            case 'Débutant':
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Débutant</Badge>;
            case 'Intermédiaire':
                return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Intermédiaire</Badge>;
            case 'Avancé':
                return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Avancé</Badge>;
            default:
                return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Tous niveaux</Badge>;
        }
    };

    return (
        <Card
            key={course.id}
            className="overflow-hidden transition-all hover:shadow-md hover:scale-[1.02] hover:border-primary/40 cursor-pointer"
        >
            <div className="aspect-[16/9] relative overflow-hidden">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </div>
            </div>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                        <CardDescription className="text-sm mt-1">{course.category}</CardDescription>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(course.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(course.id)}>
                                <Trash className="mr-2 h-4 w-4" />
                                Supprimer
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Contenu
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                Participants
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                    <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3.5 w-3.5" />
                        {course.duration}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="mr-1 h-3.5 w-3.5" />
                        {course.students} participants
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <BookOpenCheck className="mr-1 h-3.5 w-3.5" />
                        {course.modules} modules
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <GraduationCap className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                        {getLevelBadge(course.level)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Par {course.instructor}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};