import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Filter, Search} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

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

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Tous</DropdownMenuItem>
                    <DropdownMenuItem>En cours</DropdownMenuItem>
                    <DropdownMenuItem>Planifiés</DropdownMenuItem>
                    <DropdownMenuItem>Terminés</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};