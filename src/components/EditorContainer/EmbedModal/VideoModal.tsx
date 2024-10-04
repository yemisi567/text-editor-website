import React, { useState } from "react";
import Select from "../../Select/Select";
import { validateURL } from "../../helpers";
import { ModalProps } from "../../types";
import CancelIcon from "../../Icons/Cancel";

const VideoModal: React.FC<ModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [videoURL, setVideoURL] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<string | null>(
    "youtube"
  );
  const [errorMessage, setErrorMessage] = useState("");

  // function to submit file to show in editor
  const handleEmbed = () => {
    if (
      videoURL &&
      selectedProvider &&
      validateURL(videoURL, selectedProvider)
    ) {
      onUpload("video", videoURL);
      onClose();
      setVideoURL("");
    } else {
      setErrorMessage("Please provide a valid URL for the selected provider.");
    }
  };

  if (!isOpen) return null;

  // function to handle user select dropdown
  const handleSelect = (value: string) => {
    setSelectedProvider(value);
    setErrorMessage("");
    setVideoURL("");
  };

  // function to update and validate url when the user types in the input
  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoURL(e.target.value);
    if (selectedProvider && validateURL(e.target.value, selectedProvider)) {
      setErrorMessage("");
    } else if (e.target.value) {
      setErrorMessage("Invalid URL. Please provide a valid URL.");
    } else {
      setErrorMessage("");
    }
  };

  const options = [
    { label: "Youtube", value: "youtube" },
    { label: "Vimeo", value: "vimeo" },
  ];

  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-[0px 1px 4px #00000014] w-full max-w-[659px] p-6 relative">
        <div className="flex justify-between">
          <h2 className="text-base font-bold mb-4">Embed</h2>
          <button onClick={onClose}>
            <CancelIcon />
          </button>
        </div>
        <p className="text-misc-blue font-normal text-[10px] mb-2">
          VIDEO PROVIDER
        </p>
        <Select options={options} onSelect={handleSelect} />
        <p className="text-misc-blue font-normal text-[10px] mt-4">URL</p>
        <input
          id="video-url"
          type="url"
          className={`w-full p-2 h-[34px] border ${
            errorMessage ? "border-red-500" : "border-[#E7F1E9]"
          } rounded mt-2 bg-light-bg text-xs font-normal hover:border-light-green focus:border-light-green focus:outline-none`}
          placeholder={
            selectedProvider === "youtube"
              ? "https://www.youtube.com/watch?v=..."
              : "https://vimeo.com/..."
          }
          value={videoURL}
          onChange={handleURLChange}
          disabled={!selectedProvider}
        />
        {errorMessage && (
          <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
        )}
        <div className="flex  mt-6">
          <button
            disabled={!videoURL || !!errorMessage || !selectedProvider}
            className={`${
              !videoURL || !!errorMessage || !selectedProvider
                ? "bg-[#0A7227] bg-opacity-15 cursor-not-allowed"
                : "bg-[#0A7227] cursor-pointer"
            } text-white text-sm font-semibold px-4 py-2 rounded`}
            onClick={handleEmbed}
          >
            Embed
          </button>
          <button
            className="ml-2 bg-transparent text-primary border border-[#CEE3D4] px-4 py-2 rounded text-sm font-semibold"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
