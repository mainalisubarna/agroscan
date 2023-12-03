import React, { useState, useRef, useEffect } from "react";

import { useDropzone } from "react-dropzone";

const DropZone = ({ handleModalShow }) => {
  const [capturedImageUrl, setCapturedImageUrl] = useState(null);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isRetakeMode, setIsRetakeMode] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setConvertedImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
  });
  const handleImageSearch = () => {
    console.log('Search clicked with file:', convertedImage);
  };
  const handlePhotoSearch = () => {
    console.log('searched');
  }
  const handleCameraStart = async () => {
    setIsCameraOpen(true);
    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(cameraStream);
      if (videoRef.current) {
        videoRef.current.srcObject = cameraStream;
        videoRef.current.play();
      }
    } catch (error) {
      setIsCameraOpen(false);
      console.log("Error accessing camera:", error);
    }
  };
  const handleCameraStop = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
    }
  };
  const handleCancel = () => {
    handleCameraStop();
    setIsCameraOpen(false);
    handleModalShow();
  };

  const handleCameraCapture = async () => {
    const captureCanvas = document.createElement("canvas");
    const captureContext = captureCanvas.getContext("2d");
    captureCanvas.width = videoRef.current.videoWidth;
    captureCanvas.height = videoRef.current.videoHeight;
    captureContext.drawImage(videoRef.current, 0, 0);

    const imageDataUrl = await captureCanvas.toDataURL("image/png");
    setCapturedImageUrl(imageDataUrl);
    setIsRetakeMode(true);
    // Pause the video
    videoRef.current.pause();

    // Stop the video stream after a delay to allow for proper pausing
    setTimeout(() => {
      handleCameraStop();
    }, 200);
  };

  const handleRetake = () => {
    // Clear the captured image URL and retake mode
    setCapturedImageUrl(null);
    setIsRetakeMode(false);

    // Start the camera again
    handleCameraStart();
  };

  // Stop the camera when the component is unmounted
  useEffect(() => {
    return () => {
      handleCameraStop();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-h-[60vh] gap-4">
      {!isCameraOpen ? (
        <>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed p-8 text-center cursor-pointer ${isDragActive ? 'border-green-500 bg-green-100' : 'border-gray-300'
              }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-green-500">Drop the files here</p>
            ) : (
              <p className="text-gray-600">Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
          {convertedImage && <img
            src={convertedImage}
            alt="Uploaded"
            className="w-auto h-[20vh]"
          />}
        </>
      ) : (
        <>
          {capturedImageUrl ? (
            <img
              src={capturedImageUrl}
              alt="Captured"
              className="max-w-full h-auto"
            />
          ) : (
            <video
              ref={videoRef}
              className="max-w-[22vh] h-auto"
              style={{ display: "block", cursor: "pointer" }}
              onClick={() => videoRef.current.play()}
            />
          )}
        </>
      )}

      <div className="flex gap-4 mt-4">
        <button
          onClick={
            isCameraOpen
              ? stream && !isRetakeMode
                ? handleCameraCapture
                : handleRetake
              : handleCameraStart
          }
          className={`bg-blue-500 text-white rounded-md px-3 py-2 hover:bg-blue-600`}
        >
          {isCameraOpen
            ? stream && !isRetakeMode
              ? "Capture"
              : "Retake"
            : "Open Camera"}
        </button>

        <button
          onClick={capturedImageUrl ? handlePhotoSearch : handleImageSearch}
          className="bg-green-600 text-white rounded-md px-4 py-2"
        >
          Search
        </button>

        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DropZone;
