import {CheckCircle} from "lucide-react";

const Benefits = () => {

    const benefitItems = [
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
    ];

    return (
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
                            {benefitItems.map((benefit, index) => (
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
    )
}

export default Benefits;