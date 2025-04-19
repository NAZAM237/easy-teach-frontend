import React, {useEffect} from "react";
import {EditorContent, Extension, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {cn} from "@/libs/utils";
import {EditorToolbar} from "./editor-toolbar";
import {EditorBubbleMenu} from "./editor-bubble-menu";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    minHeight?: string;
}

const CustomDocument = Extension.create({
    name: 'customDoc',
    topNode: true,
    content: 'block+',
    renderHTML: () => [{ class: 'prose' }, 0]
});

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
                                                                  value,
                                                                  onChange,
                                                                  placeholder = "Commencez à écrire ou collez du contenu ici...",
                                                                  className,
                                                                  minHeight = "min-h-[300px]",
                                                              }) => {
    const editor = useEditor({
        extensions: [
            CustomDocument,
            StarterKit,
            Placeholder.configure({
                placeholder,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary underline cursor-pointer",
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "rounded-md mx-auto my-4 max-w-full",
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right'],
                defaultAlignment: 'left',
            }),
            TextStyle,
            Color,
        ],
        autofocus: true,
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [editor, value]);

    if (!editor) {
        return null;
    }

    return (
        <div className={cn("border rounded-md overflow-hidden", className)}>
            <EditorToolbar editor={editor} />
            <EditorBubbleMenu editor={editor} />
            <EditorContent
                editor={editor}
                className={cn("prose max-w-none p-4 focus:outline-none", minHeight)}
            />
        </div>
    );
};

// Re-export the components
export * from "./color-selector";
export * from "./editor-toolbar";
export * from "./editor-bubble-menu";