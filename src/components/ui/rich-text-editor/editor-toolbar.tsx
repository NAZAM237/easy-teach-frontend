import React from "react";
import {Editor} from "@tiptap/react";
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Image as ImageIcon,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    Quote,
    Redo,
    Undo,
} from "lucide-react";
import {Toggle} from "@/components/ui/toggle";
import {ColorSelector} from "./color-selector";

interface EditorToolbarProps {
    editor: Editor;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
    const toggleBold = () => editor?.chain().focus().toggleBold().run();
    const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
    const toggleBulletList = () => editor?.chain().focus().toggleBulletList().run();
    const toggleOrderedList = () => editor?.chain().focus().toggleOrderedList().run();
    const toggleBlockquote = () => editor?.chain().focus().toggleBlockquote().run();
    const toggleCodeBlock = () => editor?.chain().focus().toggleCodeBlock().run();
    const setHeading1 = () => editor?.chain().focus().toggleHeading({ level: 1 }).run();
    const setHeading2 = () => editor?.chain().focus().toggleHeading({ level: 2 }).run();
    const setHeading3 = () => editor?.chain().focus().toggleHeading({ level: 3 }).run();
    const undo = () => editor?.chain().focus().undo().run();
    const redo = () => editor?.chain().focus().redo().run();

    const addImage = () => {
        const url = window.prompt("URL de l'image");
        if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor?.getAttributes("link").href;
        const url = window.prompt("URL du lien", previousUrl);

        if (url === null) {
            return;
        }

        if (url === "") {
            editor?.chain().focus().extendMarkRange("link").unsetMark("link").run();
            return;
        }

        editor
            ?.chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url, target: "_blank" })
            .run();
    };

    const setTextAlign = (alignment: 'left' | 'center' | 'right') => {
        editor?.chain().focus().setTextAlign(alignment).run();
    };

    return (
        <div className="bg-muted/40 border-b p-2 flex flex-wrap gap-1">
            <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={toggleBold}
                aria-label="Gras"
            >
                <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={toggleItalic}
                aria-label="Italique"
            >
                <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={setHeading1}
                aria-label="Titre 1"
            >
                <Heading1 className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={setHeading2}
                aria-label="Titre 2"
            >
                <Heading2 className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={setHeading3}
                aria-label="Titre 3"
            >
                <Heading3 className="h-4 w-4" />
            </Toggle>
            <div className="w-px h-6 bg-border mx-1" />

            <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: 'left' })}
                onPressedChange={() => setTextAlign('left')}
                aria-label="Aligner à gauche"
            >
                <AlignLeft className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: 'center' })}
                onPressedChange={() => setTextAlign('center')}
                aria-label="Centrer"
            >
                <AlignCenter className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: 'right' })}
                onPressedChange={() => setTextAlign('right')}
                aria-label="Aligner à droite"
            >
                <AlignRight className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-border mx-1" />

            <ColorSelector editor={editor} />

            <div className="w-px h-6 bg-border mx-1" />

            <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={toggleBulletList}
                aria-label="Liste à puces"
            >
                <List className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={toggleOrderedList}
                aria-label="Liste numérotée"
            >
                <ListOrdered className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("blockquote")}
                onPressedChange={toggleBlockquote}
                aria-label="Citation"
            >
                <Quote className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("codeBlock")}
                onPressedChange={toggleCodeBlock}
                aria-label="Bloc de code"
            >
                <Code className="h-4 w-4" />
            </Toggle>
            <div className="w-px h-6 bg-border mx-1" />
            <Toggle
                size="sm"
                onPressedChange={setLink}
                aria-label="Lien"
            >
                <LinkIcon className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                onPressedChange={addImage}
                aria-label="Image"
            >
                <ImageIcon className="h-4 w-4" />
            </Toggle>
            <div className="w-px h-6 bg-border mx-1" />
            <Toggle
                size="sm"
                onPressedChange={undo}
                aria-label="Annuler"
            >
                <Undo className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                onPressedChange={redo}
                aria-label="Rétablir"
            >
                <Redo className="h-4 w-4" />
            </Toggle>
        </div>
    );
};
