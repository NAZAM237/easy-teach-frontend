import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {ImagePlus, X} from "lucide-react";
import {Card} from "@/components/ui/card.tsx";
import React, {useState} from "react";
import {toast} from "sonner";
import AddCourseModuleDialog from "@/components/dashboard/courses/AddCourseModuleDialog.tsx";

const CourseStructure = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [level, setLevel] = useState("")
    const [courseCover, setCourseCover] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const handleCreateCourse = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Formation créée avec succès", {
            description: "Votre nouvelle formation a été ajoutée"
        });
        setCourseCover(null);
    };

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

    return (
        <Card>
            <div className="container mx-auto py-8 w-4/5 px-4">
                <div className="flex mb-6">
                    <h1 className="text-3xl pb-6 font-bold">Formation XXXXXXX...</h1>
                </div>
                <form onSubmit={handleCreateCourse}>
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
                            <div className="grid grid-cols-1 lg:grid-cols-2 space-x-4 pb-6">
                                <div className="pb-4">
                                    <Label htmlFor="category" className="text-muted-foreground">Catégorie</Label>
                                    <Select value={category} onValueChange={setCategory}>
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
                                    <Select value={level} onValueChange={setLevel} className="h-12">
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
                    <div className="flex flex-row items-center justify-center">
                        <AddCourseModuleDialog/>
                    </div>
                </form>
            </div>
        </Card>
    )
}

export default CourseStructure