import React, { useState, useEffect, useCallback } from "react";
import Editor from "./Editor/Editor";
import PictureModal from "./EmbedModal/PictureModal";
import VideoModal from "./EmbedModal/VideoModal";
import SocialModal from "./EmbedModal/SocialsModal";
import { useModalContext } from "../../context/ModalContext";
import EnterLinkModal from "./FormatterModals/EnterLinkModal";

const EditorContainer: React.FC = () => {
  const [blocks, setBlocks] = useState<{ type: string; content: string }[]>([
    { type: "text", content: "" },
  ]);
  const [linkMeta, setLinkMeta] = useState<{
    [key: number]: { text: string; url: string };
  }>({});
  const {
    showModal,
    handleTogglePictureModal,
    handleToggleVideoModal,
    handleToggleSocialModal,
    handleToggleLinkModal,
  } = useModalContext();

  const maxWords = 1000;
  const [wordCount, setWordCount] = useState(0);

  // Handle adding embedded items like images or videos
  const addEmbedItem = (
    embedType: string,
    embedContent: string,
    linkText?: string
  ) => {
    const newBlocks = [
      ...blocks,
      { type: embedType, content: embedContent },
      { type: "text", content: "" },
    ];
    setBlocks(newBlocks);

    if (embedType === "link" && linkText) {
      setLinkMeta({
        ...linkMeta,
        [newBlocks.length - 2]: { text: linkText, url: embedContent },
      });
    }
  };

  const calculateWordCount = useCallback(() => {
    let totalWords = 0;
    blocks.forEach((block) => {
      if (block.type === "text") {
        totalWords += block.content.trim().split(/\s+/).filter(Boolean).length;
      }
    });
    return totalWords;
  }, [blocks]);

  // Update word count whenever blocks change
  useEffect(() => {
    const totalWords = calculateWordCount();
    setWordCount(totalWords);
  }, [blocks, calculateWordCount]);

  const handlePostClick = () => {
    if (wordCount >= 1 && wordCount <= 1000) {
      alert("Post submitted successfully");
      setBlocks([{ type: "text", content: "" }]);
    } else {
      alert("Could not submit post");
    }
  };

  return (
    <div className="flex flex-col justify-center p-6 w-1/2 ">
      {/* Editor Section */}
      <div className="border border-[#E7F1E9] rounded h-screen w-full relative overflow-scroll">
        <div className="border-[#E7F1E9] border-b h-[48px] mb-[22px]" />
        <div className="p-4 mb-8">
          <input
            placeholder="Add Post Title"
            className="text-2xl font-bold appearance-none border-none focus:outline-none placeholder:font-bold placeholder:text-2xl placeholder:text-[#343E37] bg-transparent"
          />
          <div className="">
            <Editor blocks={blocks} setBlocks={setBlocks} linkMeta={linkMeta} />
          </div>
        </div>
        <div className="fixed flex bottom-0 left-0 right-0 px-4 py-2 bg-white border-t border-[#E7F1E9]">
          <p className="ml-auto text-sm text-gray-500">
            {`${wordCount}/${maxWords} words`}
          </p>
        </div>
      </div>
      {/* Post Button Section */}
      <div className="flex">
        <button
          disabled={wordCount < 1}
          className={`${
            wordCount < 1
              ? "bg-[#0A7227] bg-opacity-15 cursor-not-allowed"
              : "bg-[#0A7227] cursor-pointer"
          } text-white text-sm font-semibold px-4 py-2 rounded mt-8 flex ml-auto`}
          onClick={handlePostClick}
        >
          Post
        </button>
      </div>
      <PictureModal
        isOpen={showModal.picture}
        onClose={handleTogglePictureModal}
        onUpload={addEmbedItem}
      />
      <VideoModal
        isOpen={showModal.video}
        onClose={handleToggleVideoModal}
        onUpload={addEmbedItem}
      />
      <SocialModal
        isOpen={showModal.social}
        onClose={handleToggleSocialModal}
        onUpload={addEmbedItem}
      />
      <EnterLinkModal
        isOpen={showModal.link}
        onClose={handleToggleLinkModal}
        onUpload={addEmbedItem}
      />
    </div>
  );
};

export default EditorContainer;
