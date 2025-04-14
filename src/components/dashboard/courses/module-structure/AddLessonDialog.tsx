import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Mail} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useEffect} from "react";
import {Label} from "@/components/ui/label.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {nanoid} from "nanoid";
import {z} from "zod";
import {Lesson} from "@/types/course.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";

const templates = [
    { id: nanoid(5), name: "Bienvenue", description: "Email de bienvenue pour les nouveaux inscrits" },
    { id: nanoid(5), name: "Promotion", description: "Annonce d'une offre promotionnelle" },
    { id: nanoid(5), name: "Rappel événement", description: "Rappel avant un événement planifié" },
    { id: nanoid(5), name: "Suivi formation", description: "Suivi après une formation" },
];

const lessonSchema = z.object({
    title: z.string(),
    content: z.string(),
    position: z.string(),
});

type LessonFormValues = z.infer<typeof lessonSchema>;

interface LessonFormDialogProps {
    onCreateLesson: (data: LessonFormValues) => void;
    onUpdateLesson: (lessonId: string, data: LessonFormValues) => void;
    editingLesson: Lesson | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const AddLessonDialog = ({
    onCreateLesson,
    onUpdateLesson,
    editingLesson,
    isOpen,
    onOpenChange}: LessonFormDialogProps) => {

    const form = useForm<LessonFormValues>({
        resolver: zodResolver(lessonSchema),
        defaultValues: {
            title: editingLesson?.title || "",
            content: editingLesson?.content || "Bienvenue",
            position: editingLesson?.position || "",
        },
    });

    // Update form values when editingLesson changes
    useEffect(() => {
        if (editingLesson) {
            form.reset({ title: editingLesson.title, content: editingLesson.content, position: editingLesson.position });
        } else {
            form.reset({ title: "", content: "Bienvenu", position: "" });
        }
    }, [editingLesson, form]);

    const onSubmit = (data: LessonFormValues) => {
        console.log(data);
        if (editingLesson) {
            onUpdateLesson(editingLesson.id, data);
        } else {
            onCreateLesson(data);
        }
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Nouvelle leçon</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-1 items-center pb-3">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-muted-foreground text-sm">Titre</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="col-span-3"
                                                    required
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="grid grid-cols-1 items-center pb-3">
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-muted-foreground text-sm">Type de leçon</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                                    >
                                                        {templates.map(template => (
                                                            <div className="relative" key={template.id}>
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <RadioGroupItem
                                                                            id={`template-${template.id}`}
                                                                            className="peer sr-only"
                                                                            value={template.name}
                                                                        />
                                                                    </FormControl>
                                                                    <Label
                                                                        htmlFor={`template-${template.id}`}
                                                                        className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-all flex items-center gap-3 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                                                                    >
                                                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                                            <Mail className="w-5 h-5 text-primary" />
                                                                        </div>
                                                                        <div>
                                                                            <p className="font-medium">{template.name}</p>
                                                                            <p className="text-xs text-muted-foreground">{template.description}</p>
                                                                        </div>
                                                                    </Label>
                                                                </FormItem>
                                                            </div>
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 items-center pb-3">
                                <FormField
                                    control={form.control}
                                    name="position"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-muted-foreground text-sm">Position</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    id="position"
                                                    className="col-span-3"
                                                    required
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="justify-between">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Annuler
                            </Button>
                            <Button type="submit">Créer</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddLessonDialog