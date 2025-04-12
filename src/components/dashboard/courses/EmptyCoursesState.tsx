import {Button} from "@/components/ui/button";
import {BookOpen} from "lucide-react";

interface EmptyCoursesStateProps {
    onClearSearch?: () => void;
}

const EmptyCoursesState = ({ onClearSearch }: EmptyCoursesStateProps) => {
    return (
        <div className="text-center py-10">
            <BookOpen className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-4">Aucun parcours trouvé</h3>
            <Button variant="outline" onClick={onClearSearch}>
                Effacer la recherche
            </Button>
        </div>
    );
};

const EmptyTrainingPathState = () => {
    return (
        <div className="text-center py-10">
            <BookOpen className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">Il n'y a rien ici pour le moment</h3>
        </div>
    )
}

export {EmptyCoursesState, EmptyTrainingPathState};