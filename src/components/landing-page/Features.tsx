import {ArrowRight, BarChart, BookOpen, CheckCircle, Users, Zap} from "lucide-react";

export default function Features() {
    const featureItems = [
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
    ]

    return (
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
                    {featureItems.map((feature, index) => (
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
    )
}