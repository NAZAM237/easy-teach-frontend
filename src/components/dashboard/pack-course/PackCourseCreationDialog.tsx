import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {ImagePlus, Plus, X} from "lucide-react";
import {toast} from "sonner";
import {useState} from "react";

export const PackCourseCreationDialog = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [courseCover, setCourseCover] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const handleCreateCourse = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Formation créée avec succès", {
            description: "Votre nouvelle formation a été ajoutée"
        });
        setIsDialogOpen(false);
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4" />
                    Créer
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Créer un pack de cours</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateCourse}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 items-center pb-3">
                            <label htmlFor="title" className="text-muted-foreground text-sm">Titre</label>
                            <Input
                                id="title"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 items-center pb-3">
                            <label htmlFor="category" className="text-muted-foreground text-sm">Catégorie</label>
                            <Input
                                id="category"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 items-center pb-3">
                            <label htmlFor="description" className="text-muted-foreground text-sm">Description</label>
                            <Textarea
                                id="description"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 items-center pb-4">
                            {/* Upload Section */}
                            <label htmlFor="training-pack-image" className="text-muted-foreground text-sm">Image de couverture</label>
                            <label
                                htmlFor="file-upload"
                                className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md transition-all duration-200 cursor-pointer ${
                                    isDragging
                                        ? "border-primary bg-primary/5"
                                        : isHovering
                                            ? "border-primary/30 bg-primary/5"
                                            : "border-gray-300 hover:border-primary/20 hover:bg-gray-50"
                                } ${
                                    courseCover ? "h-64" : "h-40"
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
                    <DialogFooter className="justify-between">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Annuler
                        </Button>
                        <Button type="submit">Créer la formation</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};