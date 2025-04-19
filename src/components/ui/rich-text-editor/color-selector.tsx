import React from "react";
import {Editor} from "@tiptap/react";
import {Palette} from "lucide-react";
import {Toggle} from "@/components/ui/toggle";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export interface ColorOption {
    name: string;
    color: string;
}

export const TEXT_COLORS: ColorOption[] = [
    { name: "Noir", color: "#000000" },
    { name: "Rouge", color: "#ef4444" },
    { name: "Bleu", color: "#3b82f6" },
    { name: "Vert", color: "#22c55e" },
    { name: "Jaune", color: "#eab308" },
    { name: "Orange", color: "#f97316" },
    { name: "Violet", color: "#8b5cf6" },
    { name: "Rose", color: "#ec4899" },
];

interface ColorSelectorProps {
    editor: Editor;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ editor }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Toggle
                    size="sm"
                    aria-label="Couleur du texte"
                >
                    <Palette className="h-4 w-4" />
                </Toggle>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40 p-1">
                {TEXT_COLORS.map((item) => (
                    <DropdownMenuItem
                        key={item.color}
                        onClick={() => editor.chain().focus().setColor(item.color).run()}
                        className="flex items-center gap-2 px-2 cursor-pointer"
                    >
            <span
                className="block w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: item.color }}
            />
                        <span>{item.name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};