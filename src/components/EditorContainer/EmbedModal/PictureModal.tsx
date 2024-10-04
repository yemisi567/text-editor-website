import React, { useState } from "react";
import { ModalProps } from "../../types";
import CancelIcon from "../../Icons/Cancel";

const PictureModal: React.FC<ModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [fileSelected, setFileSelected] = useState("");

  // function to create the image url
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        const fileUrl = URL.createObjectURL(file);
        setFileSelected(fileUrl);
      } else {
        alert("Please upload a valid JPEG or PNG file.");
      }
    }
  };

  // function to submit file to show in editor
  const handleEmbed = () => {
    onUpload("image", fileSelected);
    onClose();
    setFileSelected("");
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-[0px 1px 4px #00000014] w-full max-w-[659px] p-6 relative">
        <div className="flex justify-between">
          <h2 className="text-base font-bold mb-4">Embed</h2>
          <button onClick={onClose}>
            <CancelIcon />
          </button>
        </div>
        <p className="font-semibold text-sm text-primary">Upload Image</p>
        <p className="text-misc-blue font-normal text-[10px] mt-[10px]">
          FILE UPLOAD
        </p>
        <div className="border-dashed border border-[#0A7227] p-6 rounded-md h-[141px] mt-[10px] flex items-center justify-center">
          <div className="text-center">
            {fileSelected ? (
              <img
                src={fileSelected}
                alt="Embedded content"
                className="rounded-[4px] h-[100px] w-full"
              />
            ) : (
              <>
                <label
                  htmlFor="file-upload"
                  className="bg-transparent text-primary border border-[#CEE3D4] px-4 py-2 rounded text-sm font-semibold cursor-pointer"
                >
                  Import Image from Device
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".jpeg, .png"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex  mt-6">
          <button
            disabled={!fileSelected}
            className={`${
              fileSelected
                ? "bg-[#0A7227] cursor-pointer"
                : "bg-[#0A7227] bg-opacity-15 cursor-not-allowed"
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

export default PictureModal;
