import {BookOpen} from "lucide-react";
import {Button} from "../Button.tsx";
import {Link} from "react-router-dom";

export default function Header() {

    return (
        <header className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
            <div className="mx-auto px-8 pb-8 pt-12">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center">
                        <BookOpen className="w-8 h-8 mr-2" />
                        <a href="/" className="text-2xl font-bold">EasyTeach</a>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="hover:underline">Fonctionnalités</a>
                        <a href="#benefits" className="hover:underline">Avantages</a>
                        <a href="#pricing" className="hover:underline">Tarifs</a>
                        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <Link to="/login" className="item-center mt-auto mb-auto mr-4 hover:underline">
                            Connexion
                        </Link>
                        <Link to="/register">
                            <Button size="default" className="bg-white text-indigo-600 hover:bg-indigo-50 group">
                                Commencez
                            </Button>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}