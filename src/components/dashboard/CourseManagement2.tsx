import {useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import {coursesData} from "@/data/coursesData";
import {CourseCard} from "@/components/dashboard/courses/CourseCard";
import {EmptyCoursesState} from "@/components/dashboard/courses/EmptyCoursesState";
import {CourseCreationDialog} from "@/components/dashboard/courses/CourseCreationDialog";
import {CourseSearchAndFilter} from "@/components/dashboard/courses/CourseSearchAndFilter";

const CourseManagement2 = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCourses = coursesData.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <AnimatedSection>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Gestion des formations</h1>
                        <p className="text-muted-foreground">Gérez vos formations et leurs contenus</p>
                    </div>
                    <CourseCreationDialog />
                </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <CardTitle>Formations</CardTitle>
                                <CardDescription>
                                    Gérez toutes vos formations et leur contenu
                                </CardDescription>
                            </div>

                            <CourseSearchAndFilter
                                searchTerm={searchTerm}
                                onSearchChange={setSearchTerm}
                            />
                        </div>
                    </CardHeader>

                    <CardContent>
                        {filteredCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCourses.map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        ) : (
                            <EmptyCoursesState onClearSearch={() => setSearchTerm("")} />
                        )}
                    </CardContent>

                    <CardFooter className="flex items-center justify-between border-t p-4">
                        <div className="text-sm text-muted-foreground">
                            Affichage de <strong>{filteredCourses.length}</strong> sur <strong>{coursesData.length}</strong> formations
                        </div>
                    </CardFooter>
                </Card>
            </AnimatedSection>
        </div>
    );
};

export default CourseManagement2;