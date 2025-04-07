import {ArrowRight, BarChart, BookOpen, CheckCircle, Users, Zap} from 'lucide-react';
import {Button} from '../components/Button';

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <header className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                <div className="container mx-auto px-6 py-16">
                    <nav className="flex justify-between items-center mb-16">
                        <div className="flex items-center">
                            <BookOpen className="w-8 h-8 mr-2" />
                            <span className="text-2xl font-bold">FormaPro</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="hover:underline">Fonctionnalités</a>
                            <a href="#benefits" className="hover:underline">Avantages</a>
                            <a href="#pricing" className="hover:underline">Tarifs</a>
                            {/*<Link to="/dashboard">
                                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-indigo-600">
                                    Se connecter
                                </Button>
                            </Link>*/}
                        </div>
                    </nav>

                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2 space-y-8 animate-fade-in" style={{ '--delay': '100ms' } as React.CSSProperties}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                Créez et gérez vos formations en toute simplicité
                            </h1>
                            <p className="text-xl text-indigo-100 max-w-2xl">
                                Une plateforme tout-en-un pour créer, vendre et administrer vos formations
                                en ligne sans compétence technique.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 group">
                                    Essayer gratuitement
                                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                                    Voir la démo
                                </Button>
                            </div>
                        </div>

                        <div className="lg:w-1/2 animate-fade-in" style={{ '--delay': '300ms' } as React.CSSProperties}>
                            <div className="relative">
                                <div className="bg-white p-2 rounded-xl shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b"
                                        alt="Plateforme de formation"
                                        className="w-full h-auto rounded-lg"
                                    />
                                </div>

                                <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-lg shadow-lg animate-float">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-blue-500" />
                                        <div>
                                            <p className="text-xs text-gray-500">Apprenants actifs</p>
                                            <p className="text-lg font-bold">2,580+</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -top-4 -right-4 bg-white p-3 rounded-lg shadow-lg animate-float">
                                    <div className="flex items-center gap-2">
                                        <BarChart className="w-5 h-5 text-green-500" />
                                        <div>
                                            <p className="text-xs text-gray-500">Taux de complétion</p>
                                            <p className="text-lg font-bold">94%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Tout ce dont vous avez besoin pour gérer vos formations
                        </h2>
                        <p className="text-xl text-gray-600">
                            Une suite complète d'outils pour chaque aspect de votre activité de formation
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
                                title: "Création de cours interactifs",
                                description: "Créez facilement des modules de formation avec vidéos, quiz et PDF."
                            },
                            {
                                icon: <Users className="w-8 h-8 text-indigo-600" />,
                                title: "Gestion des apprenants",
                                description: "Suivez les progrès et gérez les inscriptions de vos participants."
                            },
                            {
                                icon: <BarChart className="w-8 h-8 text-indigo-600" />,
                                title: "Analyses détaillées",
                                description: "Obtenez des insights précis sur l'engagement et la progression."
                            },
                            {
                                icon: <Zap className="w-8 h-8 text-indigo-600" />,
                                title: "Automatisation marketing",
                                description: "Envoyez des emails automatisés et générez des pages de vente."
                            },
                            {
                                icon: <CheckCircle className="w-8 h-8 text-indigo-600" />,
                                title: "Certification automatique",
                                description: "Délivrez des certificats personnalisés à vos apprenants."
                            },
                            {
                                icon: <ArrowRight className="w-8 h-8 text-indigo-600" />,
                                title: "Intégrations natives",
                                description: "Connectez vos outils préférés pour un flux de travail optimisé."
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-fade-in"
                                style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
                            >
                                <div className="w-16 h-16 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2 animate-fade-in">
                            <img
                                src="https://images.unsplash.com/photo-1552581234-26160f608093"
                                alt="Formateur avec des apprenants"
                                className="w-full h-auto rounded-xl shadow-lg"
                            />
                        </div>

                        <div className="lg:w-1/2 space-y-6 animate-fade-in">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Pourquoi choisir notre plateforme ?
                            </h2>

                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Gain de temps considérable",
                                        description: "Automatisez les tâches répétitives et concentrez-vous sur le contenu pédagogique."
                                    },
                                    {
                                        title: "Expérience apprenante optimale",
                                        description: "Offrez une interface intuitive et engageante à vos participants."
                                    },
                                    {
                                        title: "Revenus en augmentation",
                                        description: "Vendez plus efficacement vos formations grâce aux outils marketing intégrés."
                                    },
                                    {
                                        title: "Support technique réactif",
                                        description: "Notre équipe est disponible pour vous accompagner à chaque étape."
                                    }
                                ].map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-4 animate-fade-in"
                                        style={{ '--delay': `${index * 100 + 200}ms` } as React.CSSProperties}
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-6 h-6 text-green-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">{benefit.title}</h3>
                                            <p className="text-gray-600">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Des tarifs adaptés à vos besoins
                        </h2>
                        <p className="text-xl text-gray-600">
                            Choisissez la formule qui correspond à votre activité de formation
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                name: "Débutant",
                                price: "29€",
                                description: "Idéal pour commencer",
                                features: [
                                    "3 formations actives",
                                    "100 apprenants",
                                    "Support email",
                                    "Analyses de base"
                                ],
                                cta: "Commencer gratuitement",
                                popular: false
                            },
                            {
                                name: "Professionnel",
                                price: "89€",
                                description: "Pour les formateurs établis",
                                features: [
                                    "Formations illimitées",
                                    "1000 apprenants",
                                    "Outils marketing avancés",
                                    "Support prioritaire",
                                    "Analyses détaillées",
                                    "Pages de vente personnalisées"
                                ],
                                cta: "Essai gratuit de 14 jours",
                                popular: true
                            },
                            {
                                name: "Entreprise",
                                price: "249€",
                                description: "Solution complète pour équipes",
                                features: [
                                    "Tout Professionnel +",
                                    "Apprenants illimités",
                                    "Personnalisation avancée",
                                    "API complète",
                                    "Onboarding dédié",
                                    "Account manager"
                                ],
                                cta: "Contacter les ventes",
                                popular: false
                            }
                        ].map((plan, index) => (
                            <div
                                key={index}
                                className={`rounded-xl p-8 animate-fade-in ${
                                    plan.popular
                                        ? "bg-white border-2 border-indigo-500 shadow-xl relative"
                                        : "bg-white border border-gray-200"
                                }`}
                                style={{ '--delay': `${index * 150}ms` } as React.CSSProperties}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                        Populaire
                                    </div>
                                )}

                                <h3 className="text-2xl font-bold">{plan.name}</h3>
                                <p className="text-gray-600 mb-4">{plan.description}</p>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-gray-500">/mois</span>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    className={`w-full ${
                                        plan.popular
                                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                            : "bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                                    }`}
                                >
                                    {plan.cta}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-indigo-600 text-white">
                <div className="container mx-auto px-6 text-center animate-fade-in">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Prêt à transformer votre activité de formation ?
                    </h2>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
                        Rejoignez plus de 2000 formateurs qui utilisent notre plateforme pour développer leur business.
                    </p>
                    <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                        Commencer gratuitement
                    </Button>
                    <p className="mt-4 text-indigo-200">
                        Aucune carte de crédit requise • 14 jours d'essai gratuit
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <BookOpen className="w-6 h-6 mr-2" />
                                <span className="text-xl font-bold">FormaPro</span>
                            </div>
                            <p className="text-gray-400 mb-4">
                                La solution tout-en-un pour les formateurs et organismes de formation.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Produit</h3>
                            <ul className="space-y-2">
                                <li><a href="#fonctionnalites" className="text-gray-400 hover:text-white">Fonctionnalités</a></li>
                                <li><a href="#tarifs" className="text-gray-400 hover:text-white">Tarifs</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Témoignages</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Guide d'utilisation</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Ressources</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Webinaires</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Communauté</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">À propos</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Carrières</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Mentions légales</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0">
                            © {new Date().getFullYear()} FormaPro. Tous droits réservés.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-500 hover:text-white">Confidentialité</a>
                            <a href="#" className="text-gray-500 hover:text-white">Conditions d'utilisation</a>
                            <a href="#" className="text-gray-500 hover:text-white">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
