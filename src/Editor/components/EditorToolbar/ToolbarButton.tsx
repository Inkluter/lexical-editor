import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";

import { ToolbarItem } from "../../constants/enums";

interface ToolbarItemType {
  toolbarItem: ToolbarItem;
}

const ToolbarButton = ({ toolbarItem }: ToolbarItemType) => {
  const [editor] = useLexicalComposerContext();

  return (
    <button
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, toolbarItem);
        console.log(toolbarItem);
      }}
    >
      {toolbarItem}
    </button>
  );
};

export default ToolbarButton;
