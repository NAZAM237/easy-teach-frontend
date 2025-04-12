import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {BookOpenCheck, Clock, FileText, ImagePlus, MoreVertical, Pencil, Trash2, X} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import React, {useState} from "react";
import {toast} from "sonner";
import {nanoid} from "nanoid";
import {Separator} from "@/components/ui/separator.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import AddModuleLessonDialog from "@/components/dashboard/courses/AddModuleLessonDialog.tsx";

type Lesson = {
    id: string;
    title: string,
    content: string,
    position: number
}

const sampleLessons: Lesson[] = [
    {
        id: nanoid(8),
        title: "Communication verbale",
        content: "Techniques de communication verbale efficace...",
        position: 1
    },
    {
        id: nanoid(8),
        title: "Communication non-verbale",
        content: "Impact et importance de la communication non-verbale...",
        position: 2
    },
    {
        id: nanoid(8),
        title: "Méthodologies de gestion de projet",
        content: "Présentation des différentes méthodologies de gestion de projet...",
        position: 3
    }
];


const ModuleStructure = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [position, setPosition] = useState("")
    const [courseCover, setCourseCover] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [lessons, setLessons] = useState<Lesson[]>(sampleLessons);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                handleImageUpload(file);
            } else {
                toast.error("Format non supporté", {
                    description: "Veuillez télécharger une image (JPG, PNG, etc.)"
                });
            }
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleImageUpload(e.target.files[0]);
        }
    };

    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                setCourseCover(e.target.result as string);
                toast.success("Image téléchargée", {
                    description: "L'image de couverture a été ajoutée"
                });
            }
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setCourseCover(null);
        toast.info("Image supprimée", {
            description: "L'image de couverture a été retirée"
        });
    };

    const handleDeleteLesson = (id: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce module ?")) {
            setLessons(lessons.filter(lesson => lesson.id !== id));
            toast.success("Module supprimé avec succès");
        }
    };

    // Fonction pour tronquer le texte
    const truncateText = (text: string, maxLength: number = 120) => {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + "...";
    };

    function handleShow(id: string) {
        console.log(id);
    }

    function handleEditDialog(lesson: Lesson) {
        console.log(lesson);
    }

    return (
        <Card>
            <div className="container mx-auto py-8 w-4/5 px-4">
                <div className="flex mb-6">
                    <h1 className="text-3xl pb-6 font-bold">Module XXXXXXX...</h1>
                </div>
                <form>
                    <div className="grid grid-cols-2 space-x-4">
                        <div>
                            <div className="grid grid-cols-1 items-center pb-4">
                                {/* Upload Section */}
                                <label htmlFor="training-pack-image" className="text-muted-foreground">Image de couverture</label>
                                <label
                                    htmlFor="file-upload"
                                    className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md transition-all duration-200 cursor-pointer ${
                                        isDragging
                                            ? "border-primary bg-primary/5"
                                            : isHovering
                                                ? "border-primary/30 bg-primary/5"
                                                : "border-gray-300 hover:border-primary/20 hover:bg-gray-50"
                                    } ${
                                        courseCover ? "h-64" : "h-80"
                                    }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onMouseEnter={() => setIsHovering(true)}
                                    onMouseLeave={() => setIsHovering(false)}
                                >
                                    {courseCover ? (
                                        <div className="relative w-full h-full">
                                            <img
                                                src={courseCover}
                                                alt="Couverture du cours"
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3 text-center">
                                            <div className={`p-3 rounded-full bg-primary/5 ${isHovering ? 'scale-105' : ''} transition-transform duration-300`}>
                                                <ImagePlus className={`h-10 w-10 ${isHovering ? 'text-primary' : 'text-primary/70'} transition-colors duration-300`} />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">Glissez ou cliquez pour ajouter une image</p>
                                                <p className="text-xs text-muted-foreground">JPG, PNG ou GIF (max 5MB)</p>
                                            </div>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                accept="image/*"
                                                className="sr-only"
                                                onChange={handleFileInputChange}
                                            />
                                        </div>
                                    )}
                                </label>
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
                    <Separator />
                    <div className="flex flex-row items-center mt-6">
                        <AddModuleLessonDialog />
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
                                                    <DropdownMenuItem onClick={() => handleEditDialog(lesson)}>
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Modifier
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDeleteLesson(lesson.id)}>
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
                        <p className="text-slate-100">Aucune leçon à afficher...</p>
                    )}
                </form>
            </div>
        </Card>
    )
}

export default ModuleStructure