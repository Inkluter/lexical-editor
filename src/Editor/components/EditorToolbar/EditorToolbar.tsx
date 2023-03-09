import React from "react";

import ToolbarButton from "./ToolbarButton";
import { DEFAULT_CONFIG } from "../../constants/editorConfig";

const EditorToolbar = () => {
  return (
    <div className="le-toolbar">
      {DEFAULT_CONFIG.map((toolbarItem) => (
        <ToolbarButton key={toolbarItem} toolbarItem={toolbarItem} />
      ))}
    </div>
  );
};

export default EditorToolbar;
