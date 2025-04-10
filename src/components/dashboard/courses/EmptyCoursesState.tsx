import {Button} from "@/components/ui/button";
import {BookOpen} from "lucide-react";

interface EmptyCoursesStateProps {
    onClearSearch?: () => void;
}

export const EmptyCoursesState = ({ onClearSearch }: EmptyCoursesStateProps) => {
    return (
        <div className="text-center py-10">
            <BookOpen className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucun parcours trouvé</h3>
            <p className="text-muted-foreground mb-4">
                Aucun parcours de formation ne correspond à votre recherche.
            </p>
            <Button variant="outline" onClick={onClearSearch}>
                Effacer la recherche
            </Button>
        </div>
    );
};