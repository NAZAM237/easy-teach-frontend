import {useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {EmptyCoursesState} from "@/components/dashboard/courses/EmptyCoursesState.tsx";
import {CardContent} from "@/components/ui/card.tsx";
import {coursesData} from "@/data/coursesData.ts";
import {CourseLargeCard} from "@/components/dashboard/courses/CourseLargeCard.tsx";

const TrainingPath = () => {
    const [activeTab, setActiveTab] = useState("published");

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
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="published">Publiés</TabsTrigger>
                        <TabsTrigger value="drafted">Brouillons</TabsTrigger>
                        <TabsTrigger value="archived">Archivés</TabsTrigger>
                    </TabsList>
                    <TabsContent value="published">
                        <CardContent>
                            {coursesData.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {coursesData.map((course) => (
                                        <CourseLargeCard key={course.id} course={course} />
                                    ))}
                                </div>
                            ) : (
                                <EmptyCoursesState />
                            )}
                        </CardContent>
                    </TabsContent>
                </Tabs>
            </AnimatedSection>
        </div>
    );
};

export default TrainingPath;
