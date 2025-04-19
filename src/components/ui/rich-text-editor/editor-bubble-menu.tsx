import React from "react";
import {BubbleMenu, Editor} from "@tiptap/react";
import {AlignCenter, AlignLeft, AlignRight, Bold, Italic, Link as LinkIcon,} from "lucide-react";
import {Toggle} from "@/components/ui/toggle";
import {ColorSelector} from "./color-selector";

interface EditorBubbleMenuProps {
  editor: Editor;
}

export const EditorBubbleMenu: React.FC<EditorBubbleMenuProps> = ({ editor }) => {
  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();

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
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="bg-popover shadow-md rounded-md overflow-hidden border flex p-1"
    >
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
        onPressedChange={setLink}
        aria-label="Lien"
      >
        <LinkIcon className="h-4 w-4" />
      </Toggle>

      <ColorSelector editor={editor} />

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
    </BubbleMenu>
  );
};