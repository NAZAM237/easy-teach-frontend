import {useState} from "react";
import {Link} from "react-router-dom";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Filter, Grid3X3, Plus, Search} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

const TrainingPath = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-6">
            <AnimatedSection>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Gestion des parcours de formations</h1>
                        <p className="text-muted-foreground">Créez et gérez des parcours de formations ou des packs de cours</p>
                    </div>
                    <Button asChild>
                        <Link to="/dashboard/course-creation">
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau parcours
                        </Link>
                    </Button>
                </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <CardTitle>Parcours de formations</CardTitle>
                                <CardDescription>
                                    Gérez vos parcours de formations/packs de cours
                                </CardDescription>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Rechercher..."
                                        className="pl-8"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
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

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Grid3X3 className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Vue liste</DropdownMenuItem>
                                        <DropdownMenuItem>Vue grille</DropdownMenuItem>
                                        <DropdownMenuItem>Vue calendrier</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </AnimatedSection>
        </div>
    );
};

export default TrainingPath;
