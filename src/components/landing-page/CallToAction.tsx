import {Button} from "../Button.tsx";

const CallToAction = () => {
    return (
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
    )
}

export default CallToAction;