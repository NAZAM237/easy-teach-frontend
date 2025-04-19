import * as React from "react"
import {cn} from "@/libs/utils"
import {RichTextEditor} from "./rich-text-editor"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    richText?: boolean;
    onRichTextChange?: (value: string) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, richText, onRichTextChange, value, onChange, ...props }, ref) => {
        if (richText && onRichTextChange) {
            return (
                <RichTextEditor
                    value={value?.toString() || ""}
                    onChange={onRichTextChange}
                    className={className}
                    placeholder={props.placeholder}
                />
            )
        }

        return (
            <textarea
                className={cn(
                    "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                value={value}
                onChange={onChange}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }