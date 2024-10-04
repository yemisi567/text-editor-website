import React, { useState } from "react";
import Select from "../../Select/Select";
import { validateURL } from "../../helpers";
import { ModalProps } from "../../types";
import CancelIcon from "../../Icons/Cancel";

const SocialModal: React.FC<ModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [socialURL, setSocialURL] = useState("");
  const [code, setCode] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(
    "facebook"
  );
  const [urlError, setUrlError] = useState("");

  // function to submit file to show in editor
  const handleEmbed = () => {
    if (socialURL || code) {
      const combinedContent = [socialURL, code].filter(Boolean).join("\n\n");
      onUpload("social", combinedContent);
      onClose();
      setSocialURL("");
      setCode("");
      setSelectedPlatform("");
    }
  };

  if (!isOpen) return null;

  // function to handle user select dropdown
  const handleSelect = (value: string) => {
    setSelectedPlatform(value);
    setUrlError("");
    setSocialURL("");
    setCode("");
  };

  // function to update and validate url when the user types in the input
  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setSocialURL(url);

    if (selectedPlatform && validateURL(url, selectedPlatform)) {
      setUrlError("");
    } else if (url) {
      setUrlError("Invalid URL. Please provide a valid URL.");
    } else {
      setUrlError("");
    }
  };

  const options = [
    { label: "Facebook", value: "facebook" },
    { label: "Instagram", value: "instagram" },
    { label: "Tiktok", value: "tiktok" },
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
        <p className="text-[#333333] font-normal text-[10px] mb-2">
          SOCIAL MEDIA PLATFORM
        </p>
        <Select options={options} onSelect={handleSelect} />
        <p className="text-[#333333] font-normal text-[10px] mt-4">URL</p>
        <input
          id="social-url"
          type="url"
          className={`w-full p-2 h-[34px] border ${
            urlError ? "border-red-500" : "border-[#E7F1E9]"
          } rounded mt-2 bg-[#FAFAFA] text-xs font-normal hover:border-[#9DC7A9] focus:border-[#9DC7A9] focus:outline-none`}
          placeholder={`Enter ${selectedPlatform || "social media"} URL`}
          value={socialURL}
          onChange={handleURLChange}
        />
        {urlError && <p className="text-red-500 text-xs mt-1">{urlError}</p>}
        <p className="text-[#333333] font-normal text-[10px] mt-4">CODE</p>
        <input
          id="video-url"
          type="url"
          className="w-full p-2 h-[34px] border border-[#E7F1E9] rounded mt-2 bg-[#FAFAFA] text-xs font-normal hover:border-[#9DC7A9] focus:border-[#9DC7A9] focus:outline-none"
          placeholder="https://www.youtube.com/watch?v=..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="flex items-center justify-between mt-4">
          <span className="text-[#343E37] text-xs font-normal">
            Disable caption
          </span>
          <div className="pt-2">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-9 h-5 bg-[#999F9B] bg-opacity-[80%] peer-focus:outline-none rounded-full peer dark:bg-[#999F9B] dark:bg-opacity-[80%] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-[#999F9B] after:border after:rounded-full after:h-[16px] after:w-[16px] after:transition-all dark:border-none peer-checked:bg-[#0A7227] peer-checked:bg-opacity-[40%]"></div>
            </label>
          </div>
        </div>
        <div className="flex mt-6">
          <button
            disabled={(!socialURL && !code) || !!urlError}
            className={`${
              (!socialURL && !code) || !!urlError
                ? "bg-[#0A7227] bg-opacity-15 cursor-not-allowed"
                : "bg-[#0A7227] cursor-pointer"
            } text-white text-sm font-semibold px-4 py-2 rounded`}
            onClick={handleEmbed}
          >
            Embed
          </button>
          <button
            className="ml-2 bg-transparent text-[#343E37] border border-[#CEE3D4] px-4 py-2 rounded text-sm font-semibold"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialModal;
