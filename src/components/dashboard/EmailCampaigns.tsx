import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {BarChart, Copy, FileEdit, Mail, Pause, Play, Plus, Trash} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useToast} from "@/components/ui/use-toast";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Progress} from "@/components/ui/progress";

// Données d'exemple
const campaigns = [
  { 
    id: 1, 
    name: "Bienvenue - Formation Excel", 
    status: "En cours", 
    type: "Automatique", 
    sent: 245, 
    opened: 182, 
    clicked: 124,
    lastSent: "2023-11-12"
  },
  { 
    id: 2, 
    name: "Promotion Automne", 
    status: "Terminé", 
    type: "Ponctuel", 
    sent: 1250, 
    opened: 875, 
    clicked: 432,
    lastSent: "2023-11-01"
  },
  { 
    id: 3, 
    name: "Rappel Webinaire", 
    status: "Planifié", 
    type: "Automatique", 
    sent: 0, 
    opened: 0, 
    clicked: 0,
    lastSent: "-"
  },
];

const templates = [
  { id: 1, name: "Bienvenue", description: "Email de bienvenue pour les nouveaux inscrits" },
  { id: 2, name: "Promotion", description: "Annonce d'une offre promotionnelle" },
  { id: 3, name: "Rappel événement", description: "Rappel avant un événement planifié" },
  { id: 4, name: "Suivi formation", description: "Suivi après une formation" },
];

const EmailCampaigns = () => {
  const [activeTab, setActiveTab] = useState("campaigns");
  const { toast } = useToast();

  const handleCreate = () => {
    toast({
      title: "Campagne créée",
      description: "Votre campagne email a été enregistrée et est prête à être envoyée.",
    });
  };

  const handleDuplicate = (id: number) => {
    toast({
      title: "Campagne dupliquée",
      description: "Une copie de cette campagne a été créée." +id,
    });
  };

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <h1 className="text-3xl font-bold">Campagnes Email</h1>
        <p className="text-muted-foreground">Créez et gérez vos campagnes d'email marketing</p>
      </AnimatedSection>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <AnimatedSection delay={100} className="flex-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Emails envoyés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,482</div>
              <p className="text-xs text-muted-foreground">+785 ce mois-ci</p>
            </CardContent>
          </Card>
        </AnimatedSection>
        
        <AnimatedSection delay={150} className="flex-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Taux d'ouverture moyen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68.2%</div>
              <p className="text-xs text-muted-foreground">+2.4% par rapport au mois dernier</p>
            </CardContent>
          </Card>
        </AnimatedSection>
        
        <AnimatedSection delay={200} className="flex-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Taux de clic moyen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32.5%</div>
              <p className="text-xs text-muted-foreground">+1.8% par rapport au mois dernier</p>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="create">Créer une campagne</TabsTrigger>
          <TabsTrigger value="templates">Modèles d'email</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <AnimatedSection delay={100}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Toutes les campagnes</CardTitle>
                    <CardDescription>Gérez vos campagnes email en cours et passées</CardDescription>
                  </div>
                  <Button onClick={() => setActiveTab("create")}>
                    <Plus className="mr-2 h-4 w-4" /> Nouvelle campagne
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Dernier envoi</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            campaign.status === 'En cours' 
                              ? 'bg-green-100 text-green-800' 
                              : campaign.status === 'Planifié'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {campaign.status}
                          </span>
                        </TableCell>
                        <TableCell>{campaign.type}</TableCell>
                        <TableCell>
                          {campaign.sent > 0 ? (
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>Ouvertures: {Math.round(campaign.opened / campaign.sent * 100)}%</span>
                                <span>{campaign.opened}/{campaign.sent}</span>
                              </div>
                              <Progress value={campaign.opened / campaign.sent * 100} />
                              
                              <div className="flex justify-between text-xs">
                                <span>Clics: {Math.round(campaign.clicked / campaign.sent * 100)}%</span>
                                <span>{campaign.clicked}/{campaign.sent}</span>
                              </div>
                              <Progress value={campaign.clicked / campaign.sent * 100} />
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">Pas encore envoyé</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {campaign.lastSent !== "-" ? new Date(campaign.lastSent).toLocaleDateString() : "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" title="Modifier">
                              <FileEdit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Dupliquer" onClick={() => handleDuplicate(campaign.id)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Statistiques">
                              <BarChart className="h-4 w-4" />
                            </Button>
                            {campaign.status === "En cours" ? (
                              <Button variant="ghost" size="icon" title="Mettre en pause">
                                <Pause className="h-4 w-4" />
                              </Button>
                            ) : campaign.status === "Planifié" ? (
                              <Button variant="ghost" size="icon" title="Lancer">
                                <Play className="h-4 w-4" />
                              </Button>
                            ) : null}
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
                <CardTitle>Créer une nouvelle campagne</CardTitle>
                <CardDescription>Configurez votre campagne email</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Nom de la campagne</Label>
                  <Input id="campaign-name" placeholder="ex: Newsletter Novembre 2023" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type de campagne</Label>
                    <Select defaultValue="one-time">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">Envoi ponctuel</SelectItem>
                        <SelectItem value="automated">Automatique</SelectItem>
                        <SelectItem value="scheduled">Récurrent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Destinataires</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez les destinataires" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les contacts</SelectItem>
                        <SelectItem value="students">Apprenants actifs</SelectItem>
                        <SelectItem value="leads">Prospects</SelectItem>
                        <SelectItem value="custom">Liste personnalisée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Modèle d'email</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.map((template) => (
                      <div 
                        key={template.id}
                        className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Mail className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{template.name}</p>
                            <p className="text-xs text-muted-foreground">{template.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Objet de l'email</Label>
                  <Input id="subject" placeholder="ex: Découvrez notre nouvelle formation !" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Contenu de l'email</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Rédigez le contenu de votre email..." 
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Utilisez l'éditeur avancé pour plus d'options de mise en forme.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Planification</Label>
                    <Select defaultValue="now">
                      <SelectTrigger>
                        <SelectValue placeholder="Quand envoyer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Envoyer maintenant</SelectItem>
                        <SelectItem value="later">Planifier pour plus tard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("campaigns")}>Annuler</Button>
                <div className="flex gap-2">
                  <Button variant="outline">Aperçu</Button>
                  <Button onClick={handleCreate}>Créer la campagne</Button>
                </div>
              </CardFooter>
            </Card>
          </AnimatedSection>
        </TabsContent>

        <TabsContent value="templates">
          <AnimatedSection delay={100}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Modèles d'email</CardTitle>
                    <CardDescription>Gérez vos modèles d'email réutilisables</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Nouveau modèle
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card key={template.id} className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription className="text-xs">{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                          <Mail className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="ghost" size="sm">
                          <FileEdit className="mr-2 h-4 w-4" /> Modifier
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="mr-2 h-4 w-4" /> Dupliquer
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailCampaigns;
