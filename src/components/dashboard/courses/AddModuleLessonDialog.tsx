import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Mail, Plus} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {Label} from "@/components/ui/label.tsx";

const templates = [
    { id: 1, name: "Bienvenue", description: "Email de bienvenue pour les nouveaux inscrits" },
    { id: 2, name: "Promotion", description: "Annonce d'une offre promotionnelle" },
    { id: 3, name: "Rappel événement", description: "Rappel avant un événement planifié" },
    { id: 4, name: "Suivi formation", description: "Suivi après une formation" },
];

const AddModuleLessonDialog = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4" />
                    Ajouter une leçon
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Nouvelle leçon</DialogTitle>
                </DialogHeader>
                <form>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 items-center pb-3">
                            <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Titre</label>
                            <Input
                                id="title"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Modèle d'email</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {templates.map((template) => (
                                    <div
                                        key={template.id}
                                        className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                <Mail className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{template.name}</p>
                                                <p className="text-xs text-muted-foreground">{template.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center pb-3">
                            <label htmlFor="position" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Position</label>
                            <Input
                                type="number"
                                id="position"
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter className="justify-between">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Annuler
                        </Button>
                        <Button type="submit">Créer</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddModuleLessonDialog