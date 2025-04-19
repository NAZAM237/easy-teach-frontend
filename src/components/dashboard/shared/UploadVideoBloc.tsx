import {ChangeEvent, useRef, useState} from "react";
import {AlertCircle, CheckCircle, FileVideo, UploadCloud, X} from "lucide-react";
import {cn} from "@/libs/utils";
import {Spinner} from "@/components/ui/spinner";
import {Progress} from "@/components/ui/progress";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export interface VideoUploadProps {
    onUpload: (file: File) => void;
    isUploading?: boolean;
    progress?: number;
    className?: string;
    accept?: string;
    maxSize?: number; // in MB
}

export const UploadVideoBloc = ({
                                onUpload,
                                isUploading = false,
                                progress = 0,
                                className,
                                accept = "video/*",
                                maxSize = 500
                            }: VideoUploadProps) => {
    const [dragActive, setDragActive] = useState(false);
    const [fileError, setFileError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const validateFile = (file: File): boolean => {
        setFileError(null);

        // Check if file is a video
        if (!file.type.startsWith('video/')) {
            setFileError("Seuls les fichiers vidéo sont acceptés");
            return false;
        }

        // Check file size
        const sizeInMB = file.size / (1024 * 1024);
        if (sizeInMB > maxSize) {
            setFileError(`La taille du fichier dépasse la limite de ${maxSize}MB`);
            return false;
        }

        return true;
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file: File) => {
        if (validateFile(file)) {
            setSelectedFile(file);
            onUpload(file);
        }
    };

    const handleCancelSelection = () => {
        setSelectedFile(null);
        setFileError(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className={cn("relative", className)}>
            {!selectedFile && !isUploading ? (
                <div
                    className={cn(
                        "border-2 border-dashed rounded-lg p-8 transition-all",
                        dragActive
                            ? "border-primary bg-primary/5"
                            : "border-muted-foreground/25 hover:border-primary/50",
                        fileError && "border-destructive/50 bg-destructive/5"
                    )}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                >
                    <Input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center animate-float">
                            {fileError ? (
                                <AlertCircle className="h-10 w-10 text-destructive" />
                            ) : (
                                <UploadCloud className="h-10 w-10 text-primary" />
                            )}
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Glissez et déposez votre vidéo</h3>
                            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                                {fileError ||
                                    `Formats acceptés: MP4, MOV, AVI, etc. Taille maximale: ${maxSize}MB`}
                            </p>
                        </div>
                        <div className="pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="relative overflow-hidden group"
                                onClick={() => inputRef.current?.click()}
                            >
                                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-primary/10 group-hover:translate-x-0"></span>
                                <FileVideo className="mr-2 h-5 w-5" />
                                <span className="relative">Parcourir les fichiers</span>
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="border rounded-lg p-6 bg-background/50">
                    {isUploading ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Spinner className="h-6 w-6 text-primary" />
                                    <div>
                                        <p className="font-medium">{selectedFile?.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Téléchargement en cours...
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleCancelSelection}
                                    className="text-muted-foreground hover:text-destructive"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="space-y-1.5">
                                <Progress value={progress} className="h-2" />
                                <p className="text-xs text-right text-muted-foreground">
                                    {progress}%
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">{selectedFile?.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Prêt à être utilisé
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCancelSelection}
                                className="text-muted-foreground hover:text-destructive"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
