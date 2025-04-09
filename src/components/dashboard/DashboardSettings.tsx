import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Switch} from "@/components/ui/switch";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Label} from "@/components/ui/label";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import AnimatedSection from "@/components/AnimatedSection";
import {Bell, Building, Save, Shield, User} from "lucide-react";
import {toast} from "sonner";

const DashboardSettings = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    toast.success("Paramètres sauvegardés avec succès", {
      description: "Vos modifications ont été enregistrées"
    });
  };

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">Gérez les paramètres de votre plateforme</p>
      </AnimatedSection>
      
      <AnimatedSection delay={100}>
        <Tabs defaultValue="profile">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profil</span>
            </TabsTrigger>
            <TabsTrigger value="platform" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>Plateforme</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Sécurité</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informations du profil</CardTitle>
                  <CardDescription>
                    Mettez à jour vos informations personnelles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-col items-center gap-3 sm:flex-row">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="" />
                          <AvatarFallback className="text-lg">AD</AvatarFallback>
                        </Avatar>
                        <div className="flex gap-2">
                          <Button type="button" variant="outline" size="sm">
                            Changer l'image
                          </Button>
                          <Button type="button" variant="ghost" size="sm">
                            Supprimer
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input id="firstName" defaultValue="Admin" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom</Label>
                          <Input id="lastName" defaultValue="Utilisateur" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Adresse email</Label>
                        <Input id="email" type="email" defaultValue="admin@formagest.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" type="tel" defaultValue="06 12 34 56 78" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biographie</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          defaultValue="Administrateur de la plateforme FormaGest."
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer les modifications
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="platform">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de la plateforme</CardTitle>
                  <CardDescription>
                    Configurez les options générales de votre plateforme de formation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="platformName">Nom de la plateforme</Label>
                        <Input id="platformName" defaultValue="FormaGest" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="language">Langue par défaut</Label>
                        <Select defaultValue="fr">
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Sélectionnez une langue" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="en">Anglais</SelectItem>
                            <SelectItem value="es">Espagnol</SelectItem>
                            <SelectItem value="de">Allemand</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Fuseau horaire</Label>
                        <Select defaultValue="paris">
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paris">Paris (UTC+1/UTC+2)</SelectItem>
                            <SelectItem value="london">London (UTC+0/UTC+1)</SelectItem>
                            <SelectItem value="newyork">New York (UTC-5/UTC-4)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">Mode maintenance</Label>
                          <p className="text-sm text-muted-foreground">
                            Activer le mode maintenance sur la plateforme
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">Inscriptions publiques</Label>
                          <p className="text-sm text-muted-foreground">
                            Autoriser les utilisateurs à créer un compte
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer les modifications
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences de notification</CardTitle>
                  <CardDescription>
                    Gérez la façon dont vous recevez les notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">Notifications par email</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir des notifications par email
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">Nouvelles inscriptions</Label>
                          <p className="text-sm text-muted-foreground">
                            Être notifié lorsqu'un utilisateur s'inscrit à une formation
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">Rappels de sessions</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir des rappels avant les sessions de formation
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">Rapports hebdomadaires</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir un rapport d'activité hebdomadaire
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer les modifications
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité du compte</CardTitle>
                  <CardDescription>
                    Gérez les options de sécurité de votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">Authentification à deux facteurs</Label>
                          <p className="text-sm text-muted-foreground">
                            Ajouter une couche de sécurité supplémentaire
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">Sessions actives</Label>
                          <p className="text-sm text-muted-foreground">
                            Gérer les appareils connectés à votre compte
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Voir les sessions
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer les modifications
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </AnimatedSection>
    </div>
  );
};

export default DashboardSettings;
