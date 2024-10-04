export interface EditorProps {
  blocks: { type: string; content: string }[];
  setBlocks: React.Dispatch<
    React.SetStateAction<{ type: string; content: string }[]>
  >;
  linkMeta: {
    [key: number]: {
      text: string;
      url: string;
    }
  }
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (embedType: string, embedUrl: string, linkText?: string) => void;
}

export interface Option {
  label: string;
  value: string;
}

export interface SelectProps {
  options: Option[];
  placeholder?: string;
  onSelect: (value: string) => void;
}


// Define a type for the content of a block
type BlockContent = string | { text: string; url: string };

// Define a type for a single block
export interface Block {
  type: string;
  content: BlockContent;
}
