"use client";

import { useState } from "react";

interface ResumeUploadProps {
  userId: string;
  currentResume: string | null;
}

export function ResumeUpload({ userId, currentResume }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch(`/api/resume-upload?userId=${userId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload resume");
      }

      // Handle successful upload (e.g., show success message, update UI)
      console.log("Resume uploaded successfully");
    } catch (error) {
      console.error("Error uploading resume:", error);
      setUploadError("Failed to upload resume. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {currentResume && (
        <div>
          <p className="mb-2">Current Resume:</p>
          <a
            href={currentResume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Resume
          </a>
        </div>
      )}
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>
      {uploadError && <p className="text-red-500">{uploadError}</p>}
    </div>
  );
}
