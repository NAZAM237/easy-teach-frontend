import {CheckCircle} from "lucide-react";
import {Button} from "../Button.tsx";

const Pricing = () => {

    const pricingItems = [
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
    ]

    return (
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
                    {pricingItems.map((plan, index) => (
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
    )
}

export default Pricing;