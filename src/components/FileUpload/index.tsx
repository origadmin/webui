"use client";

import type React from "react";
import { useState, useRef } from "react";
import { X, Upload, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  onFilesChange?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
}

export interface UploadingFile extends File {
  id: string;
  progress: number;
  preview?: string;
}

export function FileUpload({ onFilesChange, multiple = true, accept = "*" }: FileUploadProps) {
  const [files, setFiles] = useState<UploadingFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) => ({
        ...file,
        id: Math.random().toString(36).substr(2, 9),
        progress: 0,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      }));
      // setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      // if (onFilesChange) {
      //   onFilesChange([...files, ...newFiles]);
      // }
      // simulateUpload(newFiles);
    }
  };

  const simulateUpload = (filesToUpload: UploadingFile[]) => {
    filesToUpload.forEach((file) => {
      const interval = setInterval(() => {
        // setFiles((prevFiles) =>
        //   prevFiles.map((f) => (f.id === file.id ? { ...f, progress: Math.min(f.progress + 10, 100) } : f)),
        // );
        if (file.progress >= 100) {
          clearInterval(interval);
        }
      }, 500);
    });
  };

  const handleRemoveFile = (fileToRemove: UploadingFile) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    if (onFilesChange) {
      onFilesChange(files.filter((file) => file !== fileToRemove));
    }
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='flex items-center gap-4'>
        <Input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          className='hidden'
          multiple={multiple}
          accept={accept}
        />
        <Button onClick={handleButtonClick} className='w-full'>
          <Upload className='mr-2 h-4 w-4' />
          Select the file
        </Button>
      </div>
      {files.length > 0 && (
        <ul className='mt-4 space-y-4'>
          {files.map((file) => (
            <li key={file.id} className='bg-gray-100 rounded p-4'>
              <div className='flex items-center justify-between mb-2'>
                <span className='truncate flex-1'>{file.name}</span>
                <Button variant='ghost' size='icon' onClick={() => handleRemoveFile(file)} className='ml-2'>
                  <X className='h-4 w-4' />
                  <span className='sr-only'>Remove file</span>
                </Button>
              </div>
              <Progress value={file.progress} className='w-full' />
              {file.preview && (
                <div className='mt-2'>
                  <img src={file.preview || "/placeholder.svg"} alt={file.name} className='max-w-full h-auto rounded' />
                </div>
              )}
              {!file.preview && file.type.startsWith("image/") && (
                <div className='mt-2 flex items-center justify-center bg-gray-200 rounded h-32'>
                  <ImageIcon className='h-8 w-8 text-gray-400' />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
