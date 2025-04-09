import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Copy, Eye, FileEdit, Plus, Trash} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import {useToast} from "@/components/ui/use-toast";

const templates = [
  { id: 1, name: "Formation professionnelle", thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40" },
  { id: 2, name: "Webinaire", thumbnail: "https://images.unsplash.com/photo-1543269865-cbf427effbad" },
  { id: 3, name: "Coaching personnalisé", thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df" },
  { id: 4, name: "E-book & Ressources", thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c" },
];

const savedPages = [
  { id: 1, name: "Formation Excel Avancé", status: "Publié", views: 245, conversions: 12 },
  { id: 2, name: "Masterclass Management", status: "Brouillon", views: 0, conversions: 0 },
  { id: 3, name: "Webinaire Leadership", status: "Publié", views: 189, conversions: 8 },
];

const SalesPageGenerator = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { toast } = useToast();

  const handleCreate = () => {
    toast({
      title: "Page de vente créée",
      description: "Votre page a été enregistrée en tant que brouillon.",
    });
  };

  const handleDuplicate = (id?: number) => {
    toast({
      title: "Page "+ id +" dupliquée",
      description: "Une copie de cette page a été créée.",
    });
  };

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <h1 className="text-3xl font-bold">Générateur de pages de vente</h1>
        <p className="text-muted-foreground">Créez et gérez vos pages de vente pour vos formations</p>
      </AnimatedSection>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">Créer une page</TabsTrigger>
          <TabsTrigger value="my-pages">Mes pages</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <AnimatedSection delay={100}>
            <Card>
              <CardHeader>
                <CardTitle>Choisir un modèle</CardTitle>
                <CardDescription>Sélectionnez un modèle de départ pour votre page de vente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {templates.map((template) => (
                    <div 
                      key={template.id}
                      className="border rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-all"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={template.thumbnail} 
                          alt={template.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-medium">{template.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <Card>
              <CardHeader>
                <CardTitle>Informations de la page</CardTitle>
                <CardDescription>Personnalisez votre page de vente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre de la formation</Label>
                    <Input id="title" placeholder="ex: Formation Excel Avancé" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL de la page</Label>
                    <Input id="slug" placeholder="ex: formation-excel-avance" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Décrivez votre formation..." 
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (€)</Label>
                    <Input id="price" type="number" placeholder="ex: 199" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select defaultValue="draft">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Brouillon</SelectItem>
                        <SelectItem value="published">Publié</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Aperçu</Button>
                <Button onClick={handleCreate}>Créer la page</Button>
              </CardFooter>
            </Card>
          </AnimatedSection>
        </TabsContent>

        <TabsContent value="my-pages">
          <AnimatedSection delay={100}>
            <Card>
              <CardHeader>
                <CardTitle>Mes pages de vente</CardTitle>
                <CardDescription>Gérez vos pages de vente existantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nom</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Statut</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Vues</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Conversions</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {savedPages.map((page) => (
                        <tr 
                          key={page.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">{page.name}</td>
                          <td className="p-4 align-middle">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              page.status === 'Publié' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {page.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle">{page.views}</td>
                          <td className="p-4 align-middle">{page.conversions}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" title="Modifier">
                                <FileEdit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Dupliquer" onClick={() => handleDuplicate(page.id)}>
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Aperçu">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Supprimer">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={() => setActiveTab("create")}>
                  <Plus className="mr-2 h-4 w-4" /> Nouvelle page
                </Button>
              </CardFooter>
            </Card>
          </AnimatedSection>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesPageGenerator;
