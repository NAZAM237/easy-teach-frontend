import {Button} from "../Button.tsx";
import {ArrowRight, BarChart, Users} from "lucide-react";

const Hero = () => {
    return (
        <section className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
            <div className="container mx-auto px-6 pb-16 pt-40">
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
        </section>
    )
}

export default Hero