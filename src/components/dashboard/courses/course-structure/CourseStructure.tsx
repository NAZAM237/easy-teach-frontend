import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Plus} from "lucide-react";
import {Card} from "@/components/ui/card.tsx";
import {useState} from "react";
import {toast} from "sonner";
import {nanoid} from "nanoid";
import AddModuleDialog from "@/components/dashboard/courses/course-structure/AddModuleDialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import UploadCoverImageBloc from "@/components/dashboard/shared/UploadCoverImageBloc.tsx";
import ModuleList from "@/components/dashboard/courses/course-structure/ModuleList.tsx";
import {Module} from "@/types/course.ts";

const sampleModules: Module[] = [];

const CourseStructure = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [position, setposition] = useState("")
    const [level, setLevel] = useState("")

    const [modules, setModules] = useState<Module[]>(sampleModules);
    const [editingModule, setEditingModule] = useState<Module | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);


    const handleOpenDialog = (module?: Module) => {
        if (module) {
            setEditingModule(module);
        } else {
            setEditingModule(null);
        }
        setIsDialogOpen(true);
    };

    const handleCreateModule = (data: { title: string, description: string, position: string }) => {
        const newModule: Module = {
            id: nanoid(8),
            title: data.title,
            description: data.description,
            position: data.position,
        };
        setModules([...modules, newModule]);
        toast.success("Module créé avec succès");
    };

    const handleUpdateModule = (moduleId: string, data: { title: string, description: string, position: string }) => {
        const updatedModules = modules.map(module =>
            module.id === moduleId ? { ...module, title: data.title, description: data.description, position: data.position } : module
        );
        setModules(updatedModules);
        toast.success("Module mis à jour avec succès");
    };

    const handleDeleteModule = (id: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce module ?")) {
            setModules(modules.filter(module => module.id !== id));
            toast.success("Module supprimé avec succès");
        }
    };

    return (
        <>
            <Card className="mb-5">
                <div className="container mx-auto py-8 w-4/5 px-4">
                    <div className="flex mb-6">
                        <h1 className="text-3xl pb-6 font-bold">Formation XXXXXXX...</h1>
                    </div>
                    <form>
                        <div className="grid grid-cols-2 space-x-4">
                            <div>
                                <div className="grid grid-cols-1 items-center pb-4">
                                    {/* Upload Section */}
                                    <UploadCoverImageBloc />
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 space-x-4 pb-6">
                                    <div className="pb-4">
                                        <Label htmlFor="category" className="text-muted-foreground">Catégorie</Label>
                                        <Select value={position} onValueChange={setposition}>
                                            <SelectTrigger id="category" className="h-12 rounded-none">
                                                <SelectValue placeholder="Sélectionner une catégorie" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="design">Design</SelectItem>
                                                <SelectItem value="development">Développement</SelectItem>
                                                <SelectItem value="marketing">Marketing</SelectItem>
                                                <SelectItem value="business">Business</SelectItem>
                                                <SelectItem value="photography">Photographie</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="pb-4">
                                        <Label htmlFor="level" className="text-muted-foreground">Niveau</Label>
                                        <Select value={level} onValueChange={setLevel}>
                                            <SelectTrigger id="level" className="h-12 rounded-none">
                                                <SelectValue placeholder="Sélectionner un niveau" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="beginner">Débutant</SelectItem>
                                                <SelectItem value="intermediate">Intermédiaire</SelectItem>
                                                <SelectItem value="advanced">Avancé</SelectItem>
                                                <SelectItem value="expert">Expert</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="pb-4">
                                    <Label htmlFor="title" className="text-muted-foreground">Titre de la formation</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                                <div className="pb-4">
                                    <Label htmlFor="title" className="text-muted-foreground">Sous-titre</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                                <div className="pb-4">
                                    <Label htmlFor="description" className="text-muted-foreground">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Décrivez votre formation en quelques phrases..."
                                        className="min-h-[231px]"
                                        rows={4}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Card>
            <Card>
                <div className="container mx-auto py-8 w-4/5 px-4">
                    <ModuleList
                        modules={modules}
                        onEditModule={handleOpenDialog}
                        onDeleteModule={handleDeleteModule}
                    />
                </div>
                <div className="text-center mb-8">
                    <Button onClick={() => handleOpenDialog()}>
                        <Plus className="h-4 w-4" />
                        Ajouter un module
                    </Button>
                </div>
                <AddModuleDialog
                    onCreateModule={handleCreateModule}
                    onUpdateModule={handleUpdateModule}
                    editingModule={editingModule}
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                />
            </Card>
        </>
    )
}

export default CourseStructure