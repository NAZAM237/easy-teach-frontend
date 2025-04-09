import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {BookOpen, Eye, EyeOff, Lock, Mail} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {useToast} from '@/hooks/use-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Simulation d'une connexion réussie
            setTimeout(() => {
                // Redirection vers le dashboard après connexion réussie
                toast({
                    title: "Connexion réussie",
                    description: "Bienvenue sur votre espace FormaGest",
                });
                navigate('/dashboard');
            }, 1500);
        } catch (err) {
            setError('Identifiants invalides. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Image section */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-600 to-indigo-800 p-12 flex-col justify-between relative overflow-hidden">
                <div className="z-10 relative">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-600">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">FormaGest</h1>
                    </div>
                    <div className="space-y-6 mt-20">
                        <h2 className="text-4xl font-bold text-white leading-tight">Transformez votre passion en formations impactantes</h2>
                        <p className="text-white/80 text-xl max-w-md">
                            La plateforme tout-en-un pour créer, gérer et vendre vos formations en ligne.
                        </p>
                    </div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute bottom-0 left-0 right-0 z-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white/10 fill-current">
                        <path d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>

                <div className="text-white/70 z-10 mt-auto">
                    <p>&copy; {new Date().getFullYear()} FormaGest. Tous droits réservés.</p>
                </div>
            </div>

            {/* Form section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-background">
                <div className="w-full max-w-md">
                    <div className="lg:hidden text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                                <BookOpen className="h-6 w-6 text-primary-foreground" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold">FormaGest</h1>
                        <p className="text-muted-foreground mt-2">Connectez-vous à votre espace</p>
                    </div>

                    <Card className="w-full shadow-lg animate-fade-in">
                        <CardHeader className="pb-4">
                            <h2 className="text-xl font-semibold">Connexion</h2>
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
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">Mot de passe</Label>
                                            <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                                                Mot de passe oublié?
                                            </Link>
                                        </div>
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
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Connexion en cours..." : "Se connecter"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 pt-0">
                            <div className="text-sm text-center text-muted-foreground mt-4">
                                Pas encore de compte?{" "}
                                <Link to="/register" className="text-primary font-medium hover:underline">
                                    Créer un compte
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>

                    <div className="text-center mt-8 text-sm text-muted-foreground lg:hidden">
                        <p>&copy; {new Date().getFullYear()} FormaGest. Tous droits réservés.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;