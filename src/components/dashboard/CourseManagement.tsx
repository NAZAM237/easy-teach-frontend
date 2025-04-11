import {useState} from "react";
import {CardContent} from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import {coursesData} from "@/data/coursesData";
import {EmptyCoursesState} from "@/components/dashboard/courses/EmptyCoursesState";
import {CourseSearchAndFilter} from "@/components/dashboard/courses/CourseSearchAndFilter";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {TrainingPathCreationDialog} from "@/components/dashboard/training-path/TrainingPathCreationDialog.tsx";
import {CourseLargeCard} from "@/components/dashboard/training-path/CourseLargeCard.tsx";

const CourseManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("published");

    const filteredCourses = coursesData.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 flex flex-col justify-center items-center">
            <AnimatedSection>
                <div className="flex flex-col gap-2 pb-8 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-center">Mes formations</h1>
                        <p className="text-muted-foreground">Créer et administrer vos formations et leurs contenus</p>
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
                        <div className="flex flex-row gap-2">
                            <CourseSearchAndFilter
                                searchTerm={searchTerm}
                                onSearchChange={setSearchTerm}
                            />
                            <TrainingPathCreationDialog />
                        </div>
                    </div>
                    <TabsContent value="published">
                        <CardContent>
                            {filteredCourses.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6">
                                    {filteredCourses.map((course) => (
                                        <CourseLargeCard key={course.id} course={course} />
                                    ))}
                                </div>
                            ) : (
                                <EmptyCoursesState onClearSearch={() => setSearchTerm("")} />
                            )}
                        </CardContent>
                    </TabsContent>
                    <TabsContent value="drafted">
                        <CardContent>
                            <EmptyCoursesState onClearSearch={() => setSearchTerm("")} />
                        </CardContent>
                    </TabsContent>
                    <TabsContent value="archived">
                        <CardContent>
                            <EmptyCoursesState onClearSearch={() => setSearchTerm("")} />
                        </CardContent>
                    </TabsContent>
                </Tabs>
            </AnimatedSection>
        </div>
    );
};

export default CourseManagement;