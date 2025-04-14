import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Card} from "@/components/ui/card.tsx";
import {useState} from "react";
import UploadCoverImageBloc from "@/components/dashboard/shared/UploadCoverImageBloc.tsx";
import LessonList from "@/components/dashboard/courses/module-structure/LessonList.tsx";
import {nanoid} from "nanoid";
import {toast} from "sonner";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import AddLessonDialog from "@/components/dashboard/courses/module-structure/AddLessonDialog.tsx";
import {Lesson} from "@/types/course.ts";

const sampleLessons: Lesson[] = [
    {
        id: nanoid(8),
        title: "Communication verbale",
        content: "Techniques de communication verbale efficace...",
        position: "1"
    },
    {
        id: nanoid(8),
        title: "Communication non-verbale",
        content: "Impact et importance de la communication non-verbale...",
        position: "2"
    },
    {
        id: nanoid(8),
        title: "Méthodologies de gestion de projet",
        content: "Présentation des différentes méthodologies de gestion de projet...",
        position: "3"
    }
];

const ModuleStructure = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [position, setPosition] = useState("")

    const [lessons, setLessons] = useState<Lesson[]>(sampleLessons)
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = (lesson?: Lesson) => {
        if (lesson) {
            setEditingLesson(lesson);
        } else {
            setEditingLesson(null);
        }
        setIsDialogOpen(true);
    };

    const handleCreateLesson = (data: { title: string, content: string, position: string }) => {
        const newLesson: Lesson = {
            id: nanoid(8),
            title: data.title,
            content: data.content,
            position: data.position,
        };
        setLessons([...lessons, newLesson]);
        toast.success("Module créé avec succès");
    };

    const handleUpdateLesson = (lessonId: string, data: { title: string, content: string, position: string }) => {
        const updatedLessons = lessons.map(lesson =>
            lesson.id === lessonId ? { ...lesson, title: data.title, content: data.content, position: data.position } : lesson
        );
        setLessons(updatedLessons);
        toast.success("Leçon mis à jour avec succès");
    };

    const handleDeleteLesson = (id: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette leçon ?")) {
            setLessons(lessons.filter(lesson => lesson.id !== id));
            toast.success("Leçon supprimée avec succès");
        }
    };

    return (
        <>
            <Card className="mb-5">
                <div className="container mx-auto py-8 w-4/5 px-4">
                    <div className="flex mb-6">
                        <h1 className="text-3xl pb-6 font-bold">Module XXXXXXX...</h1>
                    </div>
                    <form>
                        <div className="grid grid-cols-2 space-x-4">
                            <div>
                                <div className="grid grid-cols-1 items-center pb-4">
                                    <UploadCoverImageBloc />
                                </div>
                            </div>
                            <div>
                                <div className="pb-4">
                                    <Label htmlFor="title" className="text-muted-foreground">Titre du module</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="h-11"
                                    />
                                </div>
                                <div className="pb-4">
                                    <Label htmlFor="description" className="text-muted-foreground">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Décrivez votre formation en quelques phrases..."
                                        className="min-h-[145px]"
                                        rows={4}
                                    />
                                </div>
                                <div className="pb-4">
                                    <Label htmlFor="position" className="text-muted-foreground">Position</Label>
                                    <Input
                                        id="position"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                        className="h-11"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Card>
            <Card>
                <div className="container mx-auto py-8 w-4/5 px-4">
                    <LessonList
                        lessons={lessons}
                        onEditLesson={handleOpenDialog}
                        onDeleteLesson={handleDeleteLesson}
                    />
                </div>
                <div className="text-center mb-8">
                    <Button onClick={() => handleOpenDialog()}>
                        <Plus className="h-4 w-4" />
                        Ajouter une leçon
                    </Button>
                </div>
                <AddLessonDialog
                    onCreateLesson={handleCreateLesson}
                    onUpdateLesson={handleUpdateLesson}
                    editingLesson={editingLesson}
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                />
            </Card>
        </>
    )
}

export default ModuleStructure