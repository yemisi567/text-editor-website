import React, { useState, useRef, useEffect, useCallback } from "react";
import { useModalContext } from "../../../context/ModalContext";
import { AiFillPicture } from "react-icons/ai";
import { TiVideo } from "react-icons/ti";
import { PiShareNetworkFill } from "react-icons/pi";
import { AiFillCloseCircle } from "react-icons/ai";
import { convertToEmbedURL } from "../../helpers";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { MdFormatAlignLeft } from "react-icons/md";
import { MdFormatAlignRight } from "react-icons/md";
import { MdFormatAlignCenter } from "react-icons/md";
import { MdFormatItalic } from "react-icons/md";
import { MdFormatBold } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";
import { BsBlockquoteLeft } from "react-icons/bs";
import { EditorProps } from "../../types";

const Editor: React.FC<EditorProps> = ({ blocks, setBlocks, linkMeta }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [showParagraphDropdown, setShowParagraphDropdown] = useState(false);
  const [selectedParagraph, setSelectedParagraph] =
    useState<string>("Paragraph");
  const {
    handleTogglePictureModal,
    handleToggleVideoModal,
    handleToggleSocialModal,
    handleToggleLinkModal,
  } = useModalContext();

  // Handle text input
  const handleEditorInput = (
    e: React.FormEvent<HTMLDivElement>,
    blockIndex: number
  ) => {
    const updatedText = e.currentTarget.textContent || "";
    const updatedBlocks = [...blocks];
    updatedBlocks[blockIndex].content = updatedText;
    setBlocks(updatedBlocks);
  };

  // function to handle format
  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value || "");
  };

  // function to handle paragraph select
  const handleParagraphSelect = (tag: string, label: string) => {
    setSelectedParagraph(label);
    setShowParagraphDropdown(false);
    formatText("formatBlock", tag);
  };

  // Handle removing embedded items
  const handleRemoveEmbed = (indexToRemove: number) => {
    let updatedBlocks = blocks.filter((_, index) => index !== indexToRemove);
    updatedBlocks = updatedBlocks.filter(
      (block) => !(block.type === "text" && block.content.trim() === "")
    );
    setBlocks([...updatedBlocks, { type: "text", content: "" }]);
  };

  // place the cursor at the end of the last editable block
  const focusOnLastTextBlock = useCallback(() => {
    const lastBlockIndex = blocks.length - 1;
    const lastTextBlock = editorRef.current?.querySelector(
      `[data-block-index="${lastBlockIndex}"]`
    );
    if (lastTextBlock && lastTextBlock instanceof HTMLDivElement) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(lastTextBlock);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
      lastTextBlock.focus();
    }
  }, [blocks, editorRef]);

  useEffect(() => {
    focusOnLastTextBlock();
  }, [blocks, focusOnLastTextBlock]);

  return (
    <div className="mt-4 overflow-auto" ref={editorRef}>
      <div className="flex border border-[#E7F1E9] h-[40px] rounded-[5px] items-center px-3 mb-4 w-fit">
        <div
          className="text-primary text-xs font-normal flex gap-[18px] items-center cursor-pointer relative"
          onClick={() => setShowParagraphDropdown(!showParagraphDropdown)}
        >
          <p>{selectedParagraph}</p>
          <IoChevronDownOutline />
        </div>
        <div className="border-r border-r-[ #E7F1E9] h-full ml-2" />
        <div className="flex items-center gap-[16px] ml-2">
          <button onClick={handleToggleLinkModal}>
            <IoIosLink />
          </button>
          <button onClick={handleTogglePictureModal}>
            <AiFillPicture />
          </button>
        </div>
        <div className="border-r border-r-[ #E7F1E9] h-full ml-2" />
        <div className="flex items-center gap-[16px] ml-2">
          <button onClick={() => formatText("justifyLeft")}>
            <MdFormatAlignLeft />
          </button>
          <button onClick={() => formatText("justifyCenter")}>
            <MdFormatAlignCenter />
          </button>
          <button onClick={() => formatText("justifyRight")}>
            <MdFormatAlignRight />
          </button>
        </div>
        <div className="border-r border-r-[ #E7F1E9] h-full ml-2" />
        <div className="flex items-center gap-[16px] ml-2">
          <button onClick={() => formatText("bold")}>
            <MdFormatBold />
          </button>
          <button onClick={() => formatText("italic")}>
            <MdFormatItalic />
          </button>
        </div>
        <div className="border-r border-r-[ #E7F1E9] h-full ml-2" />
        <div className="flex items-center gap-[16px] ml-2">
          <button onClick={() => formatText("insertOrderedList")}>
            <MdFormatListNumbered />
          </button>
          <button onClick={() => formatText("insertUnorderedList")}>
            <MdFormatListBulleted />
          </button>
          <button onClick={() => formatText("formatBlock", "blockquote")}>
            <BsBlockquoteLeft />
          </button>
        </div>
      </div>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "text":
            return (
              <div
                key={index}
                className="mb-2 bg-transparent border-none focus:outline-none resize-none text-primary text-sm font-normal"
                contentEditable
                data-block-index={index}
                suppressContentEditableWarning={true}
                onInput={(e) => handleEditorInput(e, index)}
              >
                {block.content}
              </div>
            );

          case "image":
            return (
              <div key={index} className="relative group mb-2">
                <button
                  onClick={() => handleRemoveEmbed(index)}
                  className="absolute top-0 right-0 p-1 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <AiFillCloseCircle size={24} />
                </button>
                <img
                  src={block.content}
                  alt="Embedded content"
                  className="rounded-[4px] h-[323px] w-full"
                />
              </div>
            );

          case "link":
            const meta = linkMeta[index];
            return (
              <div key={index} className="relative group mb-4">
                <button
                  onClick={() => handleRemoveEmbed(index)}
                  className="absolute top-0 right-0 p-1 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <AiFillCloseCircle size={24} />
                </button>
                <a
                  href={block.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-light-green underline"
                >
                  {meta ? meta.text : block.content}
                </a>
              </div>
            );

          case "video":
            const embedURL = convertToEmbedURL(block.content);
            return (
              <div key={index} className="relative group mb-4">
                <button
                  onClick={() => handleRemoveEmbed(index)}
                  className="absolute top-0 right-0 p-1 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <AiFillCloseCircle size={24} />
                </button>
                <iframe
                  src={embedURL}
                  title="Embedded Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-[4px] h-[323px] w-full"
                ></iframe>
              </div>
            );

          case "social":
            return (
              <div key={index} className="relative group mb-4">
                <button
                  onClick={() => handleRemoveEmbed(index)}
                  className="absolute top-0 right-0 p-1 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <AiFillCloseCircle size={24} />
                </button>
                <a
                  href={block.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-light-green underline"
                >
                  {block.content}
                </a>
              </div>
            );

          default:
            return null;
        }
      })}

      {/* Plus Icon at the bottom of the text area */}
      <div
        className="absolute bg-[#E7F1E9] rounded-full w-[32px] h-[32px] flex items-center justify-center cursor-pointer"
        style={{ left: "16px" }}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <button className="text-[18px]">+</button>
      </div>

      {/* Paragraph Dropdown */}
      {showParagraphDropdown && (
        <div className="absolute top-[100px] left-0 z-10 bg-white border border-gray-300 rounded-md shadow-md p-2">
          <p
            className="cursor-pointer p-2 hover:bg-light-bg text-primary text-xs font-normal"
            onClick={() => handleParagraphSelect("p", "Paragraph")}
          >
            Paragraph
          </p>
          <p
            className="cursor-pointer p-2 hover:bg-light-bg text-primary text-xs font-normal"
            onClick={() => handleParagraphSelect("h1", "Heading 1")}
          >
            Heading 1
          </p>
          <p
            className="cursor-pointer p-2 hover:bg-light-bg text-primary text-xs font-normal"
            onClick={() => handleParagraphSelect("h2", "Heading 2")}
          >
            Heading 2
          </p>
          <p
            className="cursor-pointer p-2 hover:bg-light-bg text-primary] text-xs font-normal"
            onClick={() => handleParagraphSelect("h3", "Heading 3")}
          >
            Heading 3
          </p>
          <p
            className="cursor-pointer p-2 hover:bg-[light-bg text-primary text-xs font-normal"
            onClick={() => handleParagraphSelect("blockquote", "Blockquote")}
          >
            Blockquote
          </p>
        </div>
      )}

      {/* Embed options dropdown */}
      {showDropdown && (
        <div
          className="absolute bg-white border border-[#E7F1E9] rounded-md shadow-[0px 1px 4px #00000014] p-2 w-[277px] h-[181px] mt-[38px]"
          style={{ left: "10px" }}
        >
          <p className="text-misc-blue font-normal text-[10px] mb-2">EMBEDS</p>
          <div
            className="py-2 cursor-pointer flex items-start gap-2 hover:bg-secondary-bg focus:bg-secondary-bg"
            onClick={() => {
              handleTogglePictureModal();
              setShowDropdown(false);
            }}
          >
            <span>
              <AiFillPicture />
            </span>
            <div>
              <p className="font-semibold text-[#010E05] text-xs">Picture</p>
              <p className="text-[8px] text-primary text-normal">Jpeg, png</p>
            </div>
          </div>

          <div
            className="py-2 cursor-pointer flex items-start gap-2 hover:bg-secondary-bg focus:bg-secondary-bg"
            onClick={() => {
              handleToggleVideoModal();
              setShowDropdown(false);
            }}
          >
            <span>
              <TiVideo />
            </span>
            <div>
              <p className="font-semibold text-[#010E05] text-xs">Video</p>
              <p className="text-[8px] text-primary text-normal">
                Embed a YouTube video
              </p>
            </div>
          </div>
          <div
            className="py-2 cursor-pointer flex items-start gap-2 hover:bg-secondary-bg focus:bg-secondary-bg"
            onClick={() => {
              handleToggleSocialModal();
              setShowDropdown(false);
            }}
          >
            <span>
              <PiShareNetworkFill />
            </span>
            <div>
              <p className="font-semibold text-[#010E05] text-xs -mt-1">
                Social
              </p>
              <p className="text-[8px] text-primary text-normal">
                Embed a Facebook link
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
