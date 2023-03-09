import React from "react";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import EditorPlaceholder from "./EditorPlaceholder";

const EditorContainer = () => {
  return (
    <div className="le-container">
      <RichTextPlugin
        contentEditable={<ContentEditable className="le-content" />}
        placeholder={EditorPlaceholder}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </div>
  );
};

export default EditorContainer;
