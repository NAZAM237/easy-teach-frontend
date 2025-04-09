import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Download, Eye, FileEdit, Plus, Settings, Trash} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import {useToast} from "@/components/ui/use-toast";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

// Données d'exemple
const forms = [
  { id: 1, name: "Pop-up Newsletter", status: "Actif", leads: 86, conversion: "6.5%" },
  { id: 2, name: "Formulaire page d'accueil", status: "Actif", leads: 132, conversion: "8.2%" },
  { id: 3, name: "Inscription webinaire", status: "Inactif", leads: 204, conversion: "12.7%" },
];

const leads = [
  { id: 1, name: "Sophie Martin", email: "sophie.m@exemple.fr", date: "2023-11-12", source: "Pop-up Newsletter", tags: ["Prospect", "Webinaire"] },
  { id: 2, name: "Thomas Dubois", email: "t.dubois@exemple.fr", date: "2023-11-10", source: "Page d'accueil", tags: ["Client", "Formation Excel"] },
  { id: 3, name: "Emma Leroux", email: "emma.l@exemple.fr", date: "2023-11-08", source: "Inscription webinaire", tags: ["Prospect"] },
  { id: 4, name: "Lucas Bernard", email: "lucas.b@exemple.fr", date: "2023-11-05", source: "Pop-up Newsletter", tags: ["Prospect", "Lead froid"] },
];

const LeadGeneration = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const { toast } = useToast();

  const handleCreate = () => {
    toast({
      title: "Formulaire créé",
      description: "Votre nouveau formulaire de capture est prêt à être utilisé.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exportation réussie",
      description: "Vos leads ont été exportés au format CSV.",
    });
  };

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <h1 className="text-3xl font-bold">Collecte de leads</h1>
        <p className="text-muted-foreground">Gérez vos formulaires et vos prospects</p>
      </AnimatedSection>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <AnimatedSection delay={100} className="flex-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total des leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">452</div>
              <p className="text-xs text-muted-foreground">+28 ce mois-ci</p>
            </CardContent>
          </Card>
        </AnimatedSection>
        
        <AnimatedSection delay={150} className="flex-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Taux de conversion moyen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.8%</div>
              <p className="text-xs text-muted-foreground">+1.2% par rapport au mois dernier</p>
            </CardContent>
          </Card>
        </AnimatedSection>
        
        <AnimatedSection delay={200} className="flex-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Formulaires actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">sur 3 formulaires</p>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="leads">Liste des leads</TabsTrigger>
          <TabsTrigger value="forms">Formulaires</TabsTrigger>
          <TabsTrigger value="create">Créer un formulaire</TabsTrigger>
        </TabsList>

        <TabsContent value="leads">
          <AnimatedSection delay={100}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Tous les leads</CardTitle>
                    <CardDescription>Liste complète de vos prospects</CardDescription>
                  </div>
                  <Button variant="outline" onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" /> Exporter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{new Date(lead.date).toLocaleDateString()}</TableCell>
                        <TableCell>{lead.source}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {lead.tags.map((tag, i) => (
                              <span 
                                key={i} 
                                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" title="Voir détails">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Supprimer">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </AnimatedSection>
        </TabsContent>

        <TabsContent value="forms">
          <AnimatedSection delay={100}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Formulaires de capture</CardTitle>
                    <CardDescription>Gérez vos différents formulaires de collecte</CardDescription>
                  </div>
                  <Button onClick={() => setActiveTab("create")}>
                    <Plus className="mr-2 h-4 w-4" /> Nouveau formulaire
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom du formulaire</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Leads collectés</TableHead>
                      <TableHead>Taux de conversion</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forms.map((form) => (
                      <TableRow key={form.id}>
                        <TableCell className="font-medium">{form.name}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            form.status === 'Actif' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {form.status}
                          </span>
                        </TableCell>
                        <TableCell>{form.leads}</TableCell>
                        <TableCell>{form.conversion}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" title="Modifier">
                              <FileEdit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Paramètres">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Supprimer">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </AnimatedSection>
        </TabsContent>

        <TabsContent value="create">
          <AnimatedSection delay={100}>
            <Card>
              <CardHeader>
                <CardTitle>Créer un nouveau formulaire</CardTitle>
                <CardDescription>Configurez votre formulaire de capture de leads</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="form-name">Nom du formulaire</Label>
                  <Input id="form-name" placeholder="ex: Inscription Newsletter" />
                </div>
                
                <div className="space-y-2">
                  <Label>Type de formulaire</Label>
                  <Select defaultValue="popup">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popup">Pop-up</SelectItem>
                      <SelectItem value="embed">Intégré à la page</SelectItem>
                      <SelectItem value="floating">Flottant (côté de l'écran)</SelectItem>
                      <SelectItem value="fullpage">Page complète</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Champs à inclure</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="name" defaultChecked />
                        <Label htmlFor="name">Nom</Label>
                      </div>
                      <span className="text-xs text-muted-foreground">Obligatoire</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="email" defaultChecked />
                        <Label htmlFor="email">Email</Label>
                      </div>
                      <span className="text-xs text-muted-foreground">Obligatoire</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="phone" />
                        <Label htmlFor="phone">Téléphone</Label>
                      </div>
                      <span className="text-xs text-muted-foreground">Optionnel</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="company" />
                        <Label htmlFor="company">Entreprise</Label>
                      </div>
                      <span className="text-xs text-muted-foreground">Optionnel</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="active">Activer le formulaire</Label>
                    <Switch id="active" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("forms")}>Annuler</Button>
                <Button onClick={handleCreate}>Créer le formulaire</Button>
              </CardFooter>
            </Card>
          </AnimatedSection>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadGeneration;
