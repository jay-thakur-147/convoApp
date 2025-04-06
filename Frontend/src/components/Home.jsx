import React, { useState, useRef, useEffect } from 'react';
import { FaFileLines } from "react-icons/fa6";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setDownloadError("");
    setConvert("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setSelectedFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    setLoading(true);
    setUploadProgress(0);
    setConvert("");
    setDownloadError("");

    try {
      const response = await axios.post("https://convoapp-sl1o.onrender.com/convertFile", formData, {
        responseType: "blob",
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      setConvert("✅ File Converted Successfully");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success("🎉 File converted and downloaded!");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setDownloadError("❌ " + error.response.data.message);
        toast.error("❌ Conversion failed: " + error.response.data.message);
      } else {
        setConvert("");
        toast.error("❌ Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  useEffect(() => {
    if (convert === "✅ File Converted Successfully") {
      const timer = setTimeout(() => setConvert(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [convert]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className='flex min-h-screen items-center justify-center'>
          <div
            className='border-2 border-dashed px-6 py-10 border-indigo-500 bg-white rounded-2xl shadow-2xl w-full max-w-2xl transition-all'
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <h1 className='text-4xl font-bold text-center mb-3 text-indigo-600'>Word to PDF Converter</h1>
            <p className='text-center text-gray-500 mb-6'>
              Upload a Word document (.doc/.docx) and download the converted PDF instantly.
            </p>

            <div className='flex flex-col items-center space-y-4'>
              <input
                ref={fileInputRef}
                type="file"
                accept='.doc, .docx'
                onChange={handleFileChange}
                className='hidden'
                id='FileInput'
              />
              <label
                htmlFor="FileInput"
                className='w-full flex items-center justify-center px-4 py-6 bg-gray-50 text-gray-700 rounded-lg shadow-md cursor-pointer border hover:bg-indigo-600 hover:text-white transition-all duration-300 max-w-md'
              >
                <FaFileLines className='text-3xl mr-3' />
                <span className='text-lg'>{selectedFile ? selectedFile.name : "Choose or Drag & Drop a File"}</span>
              </label>

              <button
                onClick={handleSubmit}
                disabled={!selectedFile || loading}
                className='text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-medium w-full max-w-md transition-all duration-300'
              >
                {loading ? 'Converting...' : 'Convert to PDF'}
              </button>

              {uploadProgress > 0 && (
                <div className="w-full max-w-md bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}

              {convert && (
                <div className="text-green-600 text-center font-semibold">{convert}</div>
              )}
              {downloadError && (
                <div className="text-red-600 text-center font-semibold">{downloadError}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
