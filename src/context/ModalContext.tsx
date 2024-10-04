import React, { createContext, useState, useContext } from "react";

// Define the shape of the context
interface ModalContextProps {
  showModal: {
    picture: boolean;
    video: boolean;
    social: boolean;
    link: boolean;
  };
  handleTogglePictureModal: () => void;
  handleToggleVideoModal: () => void;
  handleToggleSocialModal: () => void;
  handleToggleLinkModal: () => void;
}

// Create the context
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

// Create a custom hook to use the context
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

// Create the provider component
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState({
    picture: false,
    video: false,
    social: false,
    link: false,
  });

  const handleTogglePictureModal = () => {
    setShowModal((prevState) => ({
      ...prevState,
      picture: !prevState.picture,
    }));
  };

  const handleToggleVideoModal = () => {
    setShowModal((prevState) => ({
      ...prevState,
      video: !prevState.video,
    }));
  };

  const handleToggleSocialModal = () => {
    setShowModal((prevState) => ({
      ...prevState,
      social: !prevState.social,
    }));
  };

  const handleToggleLinkModal = () => {
    setShowModal((prevState) => ({
      ...prevState,
      link: !prevState.link,
    }));
  };
  return (
    <ModalContext.Provider
      value={{
        showModal,
        handleTogglePictureModal,
        handleToggleVideoModal,
        handleToggleSocialModal,
        handleToggleLinkModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
