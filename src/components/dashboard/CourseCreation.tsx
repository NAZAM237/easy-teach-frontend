import React, {useState} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Textarea} from '@/components/ui/textarea.tsx';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card.tsx';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select.tsx';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs.tsx';
import {Label} from '@/components/ui/label.tsx';
import {BookOpenCheck, Edit, PlusCircle, Save, Trash2} from 'lucide-react';
import {useToast} from '@/hooks/use-toast.ts';
import {v4 as uuidv4} from 'uuid';
import {Course, Lesson, Module} from '@/types/course.ts';

const CourseCreation = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('info');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [modules, setModules] = useState<Module[]>([]);
  const [currentModuleTitle, setCurrentModuleTitle] = useState('');
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const [currentLessonTitle, setCurrentLessonTitle] = useState('');
  const [currentLessonContent, setCurrentLessonContent] = useState('');
  const [editingLesson, setEditingLesson] = useState<{ moduleId: string; lessonId: string } | null>(null);
  
  const handleAddModule = () => {
    if (!currentModuleTitle.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre du module est requis",
        variant: "destructive"
      });
      return;
    }
    
    const newModule: Module = {
      id: uuidv4(),
      title: currentModuleTitle,
      lessons: []
    };
    
    setModules([...modules, newModule]);
    setCurrentModuleTitle('');
    
    toast({
      title: "Module ajouté",
      description: `Le module "${currentModuleTitle}" a été ajouté avec succès`
    });
  };
  
  const handleEditModule = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
      setCurrentModuleTitle(module.title);
      setEditingModule(moduleId);
    }
  };
  
  const handleUpdateModule = () => {
    if (!currentModuleTitle.trim() || !editingModule) return;
    
    setModules(modules.map(module => 
      module.id === editingModule 
        ? { ...module, title: currentModuleTitle } 
        : module
    ));
    
    setCurrentModuleTitle('');
    setEditingModule(null);
    
    toast({
      title: "Module mis à jour",
      description: "Le module a été mis à jour avec succès"
    });
  };
  
  const handleDeleteModule = (moduleId: string) => {
    setModules(modules.filter(module => module.id !== moduleId));
    
    toast({
      title: "Module supprimé",
      description: "Le module a été supprimé avec succès"
    });
  };
  
  const handleAddLesson = (moduleId: string) => {
    if (!currentLessonTitle.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre de la leçon est requis",
        variant: "destructive"
      });
      return;
    }
    
    const newLesson: Lesson = {
      id: uuidv4(),
      title: currentLessonTitle,
      content: currentLessonContent
    };
    
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, lessons: [...module.lessons, newLesson] } 
        : module
    ));
    
    setCurrentLessonTitle('');
    setCurrentLessonContent('');
    
    toast({
      title: "Leçon ajoutée",
      description: `La leçon "${currentLessonTitle}" a été ajoutée avec succès`
    });
  };
  
  const handleEditLesson = (moduleId: string, lessonId: string) => {
    const module = modules.find(m => m.id === moduleId);
    const lesson = module?.lessons.find(l => l.id === lessonId);
    
    if (lesson) {
      setCurrentLessonTitle(lesson.title);
      setCurrentLessonContent(lesson.content);
      setEditingLesson({ moduleId, lessonId });
    }
  };
  
  const handleUpdateLesson = () => {
    if (!currentLessonTitle.trim() || !editingLesson) return;
    
    setModules(modules.map(module => 
      module.id === editingLesson.moduleId 
        ? { 
            ...module, 
            lessons: module.lessons.map(lesson => 
              lesson.id === editingLesson.lessonId 
                ? { ...lesson, title: currentLessonTitle, content: currentLessonContent } 
                : lesson
            ) 
          } 
        : module
    ));
    
    setCurrentLessonTitle('');
    setCurrentLessonContent('');
    setEditingLesson(null);
    
    toast({
      title: "Leçon mise à jour",
      description: "La leçon a été mise à jour avec succès"
    });
  };
  
  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, lessons: module.lessons.filter(lesson => lesson.id !== lessonId) } 
        : module
    ));
    
    toast({
      title: "Leçon supprimée",
      description: "La leçon a été supprimée avec succès"
    });
  };
  
  const handleSaveCourse = () => {
    if (!title || !description || !duration || !category || !level) {
      toast({
        title: "Erreur",
        description: "Tous les champs d'information sont requis",
        variant: "destructive"
      });
      return;
    }
    
    if (modules.length === 0) {
      toast({
        title: "Erreur",
        description: "Vous devez ajouter au moins un module",
        variant: "destructive"
      });
      return;
    }
    
    const course: Course = {
      id: uuidv4(),
      title,
      description,
      duration,
      category,
      level,
      modules
    };
    
    console.log("Course saved:", course);
    
    toast({
      title: "Formation créée",
      description: "Votre formation a été créée avec succès"
    });
    
    // Here you would typically save to API or state management
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Créer une nouvelle formation</h1>
        <Button onClick={handleSaveCourse}>
          <Save className="mr-2 h-4 w-4" />
          Enregistrer la formation
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="info">Informations</TabsTrigger>
          <TabsTrigger value="content">Contenu</TabsTrigger>
          <TabsTrigger value="preview">Aperçu</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la formation</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Ex: Maîtriser Photoshop en 30 jours" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Décrivez votre formation en quelques phrases..." 
                  rows={4} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Durée</Label>
                  <Input 
                    id="duration" 
                    value={duration} 
                    onChange={(e) => setDuration(e.target.value)} 
                    placeholder="Ex: 12 heures" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="development">Développement</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="photography">Photographie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="level">Niveau</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Sélectionner un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Débutant</SelectItem>
                      <SelectItem value="intermediate">Intermédiaire</SelectItem>
                      <SelectItem value="advanced">Avancé</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setActiveTab('content')}>
                Suivant : Contenu
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Modules et leçons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="module-title">Titre du module</Label>
                  <Input 
                    id="module-title" 
                    value={currentModuleTitle} 
                    onChange={(e) => setCurrentModuleTitle(e.target.value)} 
                    placeholder="Ex: Introduction à Photoshop" 
                  />
                </div>
                {editingModule ? (
                  <Button onClick={handleUpdateModule}>
                    <Save className="mr-2 h-4 w-4" />
                    Mettre à jour
                  </Button>
                ) : (
                  <Button onClick={handleAddModule}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter un module
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                {modules.map((module) => (
                  <Card key={module.id} className="border border-gray-200">
                    <CardHeader className="bg-gray-50 py-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditModule(module.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteModule(module.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="py-4">
                      <div className="space-y-4">
                        <h4 className="font-medium">Leçons</h4>
                        
                        {module.lessons.length > 0 ? (
                          <ul className="space-y-2">
                            {module.lessons.map((lesson) => (
                              <li key={lesson.id} className="border-b pb-2">
                                <div className="flex justify-between items-center">
                                  <span>{lesson.title}</span>
                                  <div className="flex gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      onClick={() => handleEditLesson(module.id, lesson.id)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      onClick={() => handleDeleteLesson(module.id, lesson.id)}
                                    >
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic">Aucune leçon pour ce module</p>
                        )}
                        
                        <div className="pt-4 space-y-4 border-t">
                          <div className="space-y-2">
                            <Label htmlFor={`lesson-title-${module.id}`}>Titre de la leçon</Label>
                            <Input 
                              id={`lesson-title-${module.id}`} 
                              value={currentLessonTitle} 
                              onChange={(e) => setCurrentLessonTitle(e.target.value)} 
                              placeholder="Ex: Les bases de l'interface" 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`lesson-content-${module.id}`}>Contenu de la leçon</Label>
                            <Textarea 
                              id={`lesson-content-${module.id}`} 
                              value={currentLessonContent} 
                              onChange={(e) => setCurrentLessonContent(e.target.value)} 
                              placeholder="Entrez le contenu ou la description de la leçon..." 
                              rows={3} 
                            />
                          </div>
                          
                          {editingLesson?.moduleId === module.id ? (
                            <Button onClick={handleUpdateLesson}>
                              <Save className="mr-2 h-4 w-4" />
                              Mettre à jour la leçon
                            </Button>
                          ) : (
                            <Button onClick={() => handleAddLesson(module.id)}>
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Ajouter une leçon
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {modules.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <BookOpenCheck className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Aucun module créé pour le moment</p>
                    <p className="text-gray-400 text-sm mt-1">Commencez par ajouter un premier module à votre formation</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={() => setActiveTab('info')}>
                Retour : Informations
              </Button>
              <Button onClick={() => setActiveTab('preview')}>
                Suivant : Aperçu
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aperçu de la formation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{title || "Titre de la formation"}</h2>
                  <p className="text-gray-600">{description || "Aucune description fournie"}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Durée</div>
                    <div className="font-medium">{duration || "Non spécifiée"}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Catégorie</div>
                    <div className="font-medium">{category || "Non spécifiée"}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Niveau</div>
                    <div className="font-medium">{level || "Non spécifié"}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Programme</h3>
                  
                  {modules.length > 0 ? (
                    <div className="space-y-4">
                      {modules.map((module, moduleIndex) => (
                        <div key={module.id} className="border rounded-lg p-4">
                          <h4 className="text-lg font-medium mb-3">
                            Module {moduleIndex + 1}: {module.title}
                          </h4>
                          
                          {module.lessons.length > 0 ? (
                            <ol className="list-decimal list-inside space-y-2 ml-2">
                              {module.lessons.map((lesson) => (
                                <li key={lesson.id} className="text-gray-700">
                                  {lesson.title}
                                </li>
                              ))}
                            </ol>
                          ) : (
                            <p className="text-gray-500 italic">Aucune leçon pour ce module</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Aucun module créé pour le moment</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={() => setActiveTab('content')}>
                Retour : Contenu
              </Button>
              <Button onClick={handleSaveCourse}>
                <Save className="mr-2 h-4 w-4" />
                Finaliser la formation
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseCreation;
