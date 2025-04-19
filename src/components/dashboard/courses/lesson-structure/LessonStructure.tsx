import {Card} from "@/components/ui/card.tsx";
import {Video} from "lucide-react";
import {useState} from "react";
import UploadCoverImageBloc from "@/components/dashboard/shared/UploadCoverImageBloc.tsx";
import {UploadVideoBloc} from "@/components/dashboard/shared/UploadVideoBloc.tsx";
import {toast} from "sonner";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

type Video = {
    id: string;
    title: string;
    url: string;
    thumbnail?: string;
    duration?: string;
    uploadDate: string;
    format: string;
    size: string;
};

// Validation schema for lesson form
const lessonContentSchema = z.object({
    content: z.string(),
});

type LessonContentFormValues = z.infer<typeof lessonContentSchema>;

const LessonStructure = () => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [position, setPosition] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [video, setVideo] = useState<Video | null>(null);

    const form = useForm<LessonContentFormValues>({
        resolver: zodResolver(lessonContentSchema),
        defaultValues: {
            content: "",
        },
    });

    const handleUpload = (file: File) => {
        setUploading(true);
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);

                    setTimeout(() => {
                        const newVideo: Video = {
                            id: Date.now().toString(),
                            title: file.name,
                            url: URL.createObjectURL(file),
                            uploadDate: new Date().toISOString().split('T')[0],
                            format: file.type.split('/')[1].toUpperCase(),
                            size: `${Math.round(file.size / (1024 * 1024))} MB`,
                            duration: "0:00"
                        };
                        setVideo(newVideo);

                        setUploading(false);
                        setUploadProgress(0);
                        toast.success("Vidéo téléchargée avec succès");
                    }, 500);

                    return 100;
                }
                return prev + 5;
            });
        }, 200);
        console.log(video);
    };


    function onSubmit() {

    }

    return (
        <>
            <Card className="mb-5">
                <div className="container mx-auto py-8 w-4/5 px-4">
                    <div className="flex mb-6">
                        <h1 className="text-3xl pb-6 font-bold">Leçon XXXXXXX...</h1>
                    </div>
                    <form>
                        <div className="pb-4">
                            <Label htmlFor="title" className="text-muted-foreground">Titre</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="h-12"
                            />
                        </div>
                        <div className="grid grid-cols-2 space-x-4">
                            <div className="pb-4">
                                <Label htmlFor="category" className="text-muted-foreground">Type</Label>
                                <Select value={type} onValueChange={setType}>
                                    <SelectTrigger id="type" className="h-12 rounded-none">
                                        <SelectValue placeholder="Sélectionner un type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="design">Vidéo</SelectItem>
                                        <SelectItem value="development">Audio</SelectItem>
                                        <SelectItem value="marketing">Document</SelectItem>
                                        <SelectItem value="business">Plain text</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <div className="pb-4">
                                    <Label htmlFor="position" className="text-muted-foreground">Position</Label>
                                    <Input
                                        type="number"
                                        id="position"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Card>
            <Card className="p-6 mb-5">
                <div className="grid grid-cols-2 space-x-4">
                    <div>
                        <label htmlFor="training-pack-image" className="text-muted-foreground">Vidéo</label>
                        <UploadVideoBloc
                            className="h-80"
                            onUpload={handleUpload}
                            isUploading={uploading}
                            progress={uploadProgress}
                            maxSize={500}
                        />
                    </div>
                    <div>
                        <UploadCoverImageBloc />
                    </div>
                </div>
            </Card>
            <Card className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contenu</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            richText={true}
                                            onRichTextChange={field.onChange}
                                            value={field.value}
                                            placeholder="Entrez le contenu de la leçon"
                                            className="min-h-[300px]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </Card>
        </>
    )
}

export default LessonStructure;
