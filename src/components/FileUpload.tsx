import { useState, useCallback, useRef } from "react";
import { Upload, FileText, X, CheckCircle } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  acceptedFormats?: string[];
  maxSizeMB?: number;
}

const FileUpload = ({ 
  onFileSelect, 
  acceptedFormats = [".doc", ".docx", ".pdf"],
  maxSizeMB = 10 
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const extension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedFormats.includes(extension)) {
      setError(`Invalid format. Please upload ${acceptedFormats.join(", ")} files.`);
      return false;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large. Maximum size is ${maxSizeMB}MB.`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleFile = useCallback((selectedFile: File) => {
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  }, [onFileSelect, acceptedFormats, maxSizeMB]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    onFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-3">
      {!file ? (
        <div
          className={`upload-zone cursor-pointer ${isDragging ? "upload-zone-active" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={acceptedFormats.join(",")}
            onChange={handleInputChange}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium mb-1">
                Drop your article file here
              </p>
              <p className="text-muted-foreground text-sm">
                or click to browse • {acceptedFormats.join(", ")} • Max {maxSizeMB}MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-success/30 bg-success/5 rounded-xl p-4 flex items-center gap-4 animate-fade-in">
          <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-success" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{file.name}</p>
            <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="w-8 h-8 rounded-full hover:bg-destructive/10 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
            </button>
          </div>
        </div>
      )}
      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
