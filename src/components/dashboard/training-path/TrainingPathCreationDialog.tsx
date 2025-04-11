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
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const TrainingPathCreationDialog = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleCreateTrainingPath = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/dashboard/course-creation');
        /*toast.success("Formation créée avec succès", {
            description: "Votre nouvelle formation a été ajoutée"
        });*/
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[680px]">
                <DialogHeader className="items-center">
                    <DialogTitle>Nouveau parcours de formation</DialogTitle>
                    <DialogDescription>
                        Entrez le nom de votre parcours de formation. Vous pourrez le modifier à tout moment.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateTrainingPath}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 items-center gap-4">
                            <Input
                                id="title"
                                className="col-span-3 h-14 text-2xl"
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
    );
};