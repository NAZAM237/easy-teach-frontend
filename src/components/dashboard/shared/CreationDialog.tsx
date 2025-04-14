import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {Plus} from "lucide-react";
import {memo, useState} from "react";
import {useNavigate} from "react-router-dom";

interface CreationDialogProps {
    currentComponent: string
}

export const CreationDialog = memo(({currentComponent}: CreationDialogProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();
    console.log(currentComponent);
    const handleCreateTrainingPath = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentComponent && currentComponent === "training-path") navigate('/dashboard/course-creation');
        if (currentComponent && currentComponent === "course-management") navigate('/dashboard/new-course');
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4" />
                    Créer
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
});