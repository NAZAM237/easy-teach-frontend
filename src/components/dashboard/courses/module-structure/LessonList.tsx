import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {BookOpen, BookOpenCheck, Clock, FileText, MoreVertical, Pencil, Trash2} from "lucide-react";
import {Lesson} from "@/types/course.ts";

interface LessonListProps {
    lessons: Lesson[];
    onEditLesson: (lesson: Lesson) => void;
    onDeleteLesson: (id: string) => void;
}

const LessonList = ({lessons, onEditLesson, onDeleteLesson}: LessonListProps) => {

    // Fonction pour tronquer le texte
    const truncateText = (text: string, maxLength: number = 120) => {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + "...";
    };

    function handleShow(id: string) {
        console.log(id);
    }

    return (
        <>
            <div className="flex mb-6">
                <h1 className="text-xl pb-6 font-bold">Les leçons</h1>
            </div>
            {
                lessons.length > 0 && lessons.map(lesson =>
                    <Card key={lesson.id} className="grid grid-cols-3 mb-4 mt-4 w-4/5 transition-all hover:shadow-md hover:border-primary/40 cursor-pointer">
                        <div className="p-4">
                            <div className="w-full h-full rounded-lg bg-blue-400"></div>
                        </div>
                        <div className="col-span-2">
                            <CardHeader className="pb-0 pt-4 pl-4 pr-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg leading-tight hover:text-blue-600">{lesson.position}. {lesson.title}</CardTitle>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleShow(lesson.id)}>
                                                <FileText className="mr-2 h-4 w-4" />
                                                Contenu
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onEditLesson(lesson)}>
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Modifier
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onDeleteLesson(lesson.id)}>
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Supprimer
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <div className="max-h-24 mb-3">
                                    <p className="text-sm text-muted-foreground">
                                        {truncateText(lesson.content, 150)}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <Clock className="mr-1 h-3.5 w-3.5"/>
                                        2h
                                    </div>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <BookOpenCheck className="mr-1 h-3.5 w-3.5"/>
                                        4 leçons
                                    </div>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                )
            }
            {lessons.length === 0 && (
                <div className="text-center py-4">
                    <BookOpen className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground">Aucune leçon n'a été créée</h3>
                </div>
            )}
        </>
    )
}

export default LessonList