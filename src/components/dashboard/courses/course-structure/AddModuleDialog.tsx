import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useEffect} from "react";
import {z} from "zod";
import {Module} from "@/types/course.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import UploadCoverImageBloc from "@/components/dashboard/shared/UploadCoverImageBloc.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";

const moduleSchema = z.object({
    title: z.string(),
    description: z.string(),
    position: z.string(),
});

type ModuleFormValues = z.infer<typeof moduleSchema>;

interface ModuleFormDialogProps {
    onCreateModule: (data: ModuleFormValues) => void;
    onUpdateModule: (moduleId: string, data: ModuleFormValues) => void;
    editingModule: Module | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const AddModuleDialog = ({onCreateModule, onUpdateModule, editingModule, isOpen, onOpenChange}: ModuleFormDialogProps) => {
    const form = useForm<ModuleFormValues>({
        resolver: zodResolver(moduleSchema),
        defaultValues: {
            title: editingModule?.title || "",
            description: editingModule?.description || "",
            position: editingModule?.position || "",
        },
    });

    // Update form values when editingModule changes
    useEffect(() => {
        if (editingModule) {
            form.reset({ title: editingModule.title, description: editingModule.description, position: editingModule.position });
        } else {
            form.reset({ title: "", description: "", position: "" });
        }
    }, [editingModule, form]);

    const onSubmit = (data: ModuleFormValues) => {
        console.log(data);
        if (editingModule) {
            onUpdateModule(editingModule.id, data);
        } else {
            onCreateModule(data);
        }
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Nouveau module</DialogTitle>
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
                            <div className="grid grid-cols-1 items-center pb-3">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-muted-foreground text-sm">Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    id="description"
                                                    className="col-span-3"
                                                    required
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                            <div className="grid grid-cols-1 items-center pb-4">
                                <UploadCoverImageBloc />
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

export default AddModuleDialog