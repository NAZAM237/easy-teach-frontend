import {useState} from "react";
import AnimatedSection from "@/components/AnimatedSection.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {EmptyTrainingPathState} from "@/components/dashboard/courses/EmptyCoursesState.tsx";
import {CardContent} from "@/components/ui/card.tsx";
import {coursesData} from "@/data/coursesData.ts";
import {CourseLargeCard} from "@/components/dashboard/training-path/CourseLargeCard.tsx";
import {TrainingPathCreationDialog} from "@/components/dashboard/training-path/TrainingPathCreationDialog.tsx";

const TrainingPath = () => {
    const [activeTab, setActiveTab] = useState("published");

    return (
        <div className="space-y-6 flex flex-col justify-center items-center">
            <AnimatedSection>
                <div className="flex flex-col gap-2 pb-8 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Parcours de formations</h1>
                        <p className="text-muted-foreground">Créez et administrez vos parcours de formations</p>
                    </div>
                </div>
            </AnimatedSection>

            <AnimatedSection delay={100}  className="flex flex-col justify-center items-center">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 grid lg:w-[800px]">
                    <div className="flex flex-col gap-2 px-6 sm:flex-row sm:items-center sm:justify-between">
                        <TabsList>
                            <TabsTrigger value="published">Publiés</TabsTrigger>
                            <TabsTrigger value="drafted">Brouillons</TabsTrigger>
                            <TabsTrigger value="archived">Archivés</TabsTrigger>
                        </TabsList>
                        <TrainingPathCreationDialog />
                    </div>
                    <TabsContent value="published">
                        <CardContent>
                            {coursesData.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6">
                                    {coursesData.map((course) => (
                                        <CourseLargeCard key={course.id} course={course} />
                                    ))}
                                </div>
                            ) : (
                                <EmptyTrainingPathState />
                            )}
                        </CardContent>
                    </TabsContent>
                    <TabsContent value="drafted">
                        <CardContent>
                            <EmptyTrainingPathState />
                        </CardContent>
                    </TabsContent>
                    <TabsContent value="archived">
                        <CardContent>
                            <EmptyTrainingPathState />
                        </CardContent>
                    </TabsContent>
                </Tabs>
            </AnimatedSection>
        </div>
    );
};

export default TrainingPath;
