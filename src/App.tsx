import React from "react";
import EditorContainer from "./components/EditorContainer/EditorContainer";
import { ModalProvider } from "./context/ModalContext";

const App: React.FC = () => {
  return (
    <div className="flex h-screen justify-center py-8 px-32">
      <div className="w-full bg-light-bg relative border border-light-bg flex justify-center">
        <ModalProvider>
          <EditorContainer />
        </ModalProvider>
      </div>
    </div>
  );
};

export default App;
