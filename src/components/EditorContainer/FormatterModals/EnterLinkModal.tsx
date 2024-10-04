import React, { useState } from "react";
import { ModalProps } from "../../types";
import CancelIcon from "../../Icons/Cancel";

const EnterLinkModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [link, setLink] = useState("");
  const [text, setText] = useState("");

  // function to submit file to show in editor
  const handleEmbed = () => {
    if (link) {
      onUpload("link", link, text)
      onClose();
      setLink("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-[0px 1px 4px #00000014] w-full max-w-[659px] p-6 relative">
        <div className="flex justify-between">
          <h2 className="text-base font-bold mb-4">Add Link</h2>
          <button onClick={onClose}>
            <CancelIcon />
          </button>
        </div>
        <p className="text-[#333333] font-normal text-[10px] mt-4">TEXT</p>
        <input
          id="TEXT"
          type="url"
          className={`w-full p-2 h-[34px] border border-[#E7F1E9]
          rounded mt-2 bg-[#FAFAFA] text-xs font-normal hover:border-[#9DC7A9] focus:border-[#9DC7A9] focus:outline-none`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <p className="text-[#333333] font-normal text-[10px] mt-4">LINK</p>
        <input
          id="link-url"
          type="url"
          className={`w-full p-2 h-[34px] border border-[#E7F1E9]
          rounded mt-2 bg-[#FAFAFA] text-xs font-normal hover:border-[#9DC7A9] focus:border-[#9DC7A9] focus:outline-none`}
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <div className="flex mt-6">
          <button
            className={`bg-[#0A7227] cursor-pointer" text-white text-sm font-semibold px-4 py-2 rounded`}
            onClick={handleEmbed}
          >
            Add Link
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

export default EnterLinkModal;
