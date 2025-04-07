import {BookOpen} from "lucide-react";

const Footer = () => {

    return (
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
                            <li><a href="#features" className="text-gray-400 hover:text-white">Fonctionnalités</a></li>
                            <li><a href="#pricing" className="text-gray-400 hover:text-white">Tarifs</a></li>
                            <li><a href="#benefits" className="text-gray-400 hover:text-white">Avantages</a></li>
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
    )
}

export default Footer;