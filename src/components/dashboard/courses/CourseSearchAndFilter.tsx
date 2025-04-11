import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";

interface CourseSearchAndFilterProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export const CourseSearchAndFilter = ({ searchTerm, onSearchChange }: CourseSearchAndFilterProps) => {
    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Rechercher..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </div>
    );
};