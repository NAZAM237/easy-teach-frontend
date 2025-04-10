import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Plus} from "lucide-react";
import {toast} from "sonner";
import {useState} from "react";

export const CourseCreationDialog = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCreateCourse = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Formation créée avec succès", {
            description: "Votre nouvelle formation a été ajoutée"
        });
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouvelle formation
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Créer une nouvelle formation</DialogTitle>
                    <DialogDescription>
                        Remplissez les informations pour créer une nouvelle formation
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateCourse}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="title" className="text-right">
                                Titre
                            </label>
                            <Input
                                id="title"
                                placeholder="Titre de la formation"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="category" className="text-right">
                                Catégorie
                            </label>
                            <Input
                                id="category"
                                placeholder="Ex: Management, Marketing, etc."
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="description" className="text-right">
                                Description
                            </label>
                            <Input
                                id="description"
                                placeholder="Description de la formation"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="level" className="text-right">
                                Niveau
                            </label>
                            <Input
                                id="level"
                                placeholder="Débutant, Intermédiaire, Avancé"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="duration" className="text-right">
                                Durée
                            </label>
                            <Input
                                id="duration"
                                placeholder="Ex: 8h, 16h, etc."
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
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