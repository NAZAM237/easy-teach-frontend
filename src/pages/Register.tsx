import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {BookOpen, Eye, EyeOff, Lock, Mail, User} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {useToast} from '@/hooks/use-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // Vérification des mots de passe
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        setIsLoading(true);

        try {
            // Simulation d'une inscription réussie
            setTimeout(() => {
                toast({
                    title: "Inscription réussie",
                    description: "Votre compte a été créé avec succès",
                });
                navigate('/login');
            }, 1500);
        } catch (err) {
            setError("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Form section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-background order-2 lg:order-1">
                <div className="w-full max-w-md">
                    <div className="lg:hidden text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                                <BookOpen className="h-6 w-6 text-primary-foreground" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold">FormaGest</h1>
                        <p className="text-muted-foreground mt-2">Créez votre compte FormaGest</p>
                    </div>

                    <Card className="w-full shadow-lg animate-fade-in">
                        <CardHeader className="pb-4">
                            <h2 className="text-xl font-semibold">Créer un compte</h2>
                        </CardHeader>
                        <CardContent>
                            {error && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nom complet</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Votre nom"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="votre@email.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Mot de passe</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="pl-10"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                            <Input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="pl-10"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Création en cours..." : "Créer un compte"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 pt-0">
                            <div className="text-sm text-center text-muted-foreground mt-4">
                                Vous avez déjà un compte?{" "}
                                <Link to="/login" className="text-primary font-medium hover:underline">
                                    Se connecter
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>

                    <div className="text-center mt-4 text-sm text-muted-foreground lg:hidden">
                        <p>
                            En vous inscrivant, vous acceptez nos{" "}
                            <a href="#" className="text-primary hover:underline">
                                Conditions d'utilisation
                            </a>{" "}
                            et notre{" "}
                            <a href="#" className="text-primary hover:underline">
                                Politique de confidentialité
                            </a>
                        </p>
                        <p className="mt-2">&copy; {new Date().getFullYear()} FormaGest. Tous droits réservés.</p>
                    </div>
                </div>
            </div>

            {/* Image section */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-indigo-600 to-purple-700 p-12 flex-col justify-between relative overflow-hidden order-1 lg:order-2">
                <div className="z-10 relative">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-600">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">FormaGest</h1>
                    </div>
                    <div className="space-y-6 mt-20">
                        <h2 className="text-4xl font-bold text-white leading-tight">Rejoignez notre communauté de formateurs</h2>
                        <p className="text-white/80 text-xl max-w-md">
                            Créez, gérez et commercialisez vos formations en ligne avec des outils puissants et intuitifs.
                        </p>
                    </div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 z-0 opacity-20">
                    <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="white" d="M31.9,-52.8C42.4,-44.8,52.9,-38.3,59.9,-28.3C66.9,-18.3,70.3,-4.9,68.1,7.6C65.9,20,58.1,31.4,48.9,40.8C39.7,50.2,29.2,57.5,17,61.6C4.9,65.6,-8.9,66.4,-20.3,62C-31.6,57.5,-40.6,48,-48,37.4C-55.4,26.9,-61.2,15.3,-62.5,2.6C-63.7,-10,-60.4,-21.2,-54,-30.5C-47.7,-39.9,-38.3,-47.4,-28,-53.5C-17.6,-59.6,-6.3,-64.3,2.6,-68.1C11.5,-71.9,21.4,-60.7,31.9,-52.8Z" transform="translate(100 100)" />
                    </svg>
                </div>

                <div className="text-white/70 z-10 mt-auto">
                    <p>
                        En vous inscrivant, vous acceptez nos{" "}
                        <a href="#" className="text-white hover:underline">
                            Conditions d'utilisation
                        </a>{" "}
                        et notre{" "}
                        <a href="#" className="text-white hover:underline">
                            Politique de confidentialité
                        </a>
                    </p>
                    <p className="mt-2">&copy; {new Date().getFullYear()} FormaGest. Tous droits réservés.</p>
                </div>
            </div>
        </div>
    );
};

export default Register;