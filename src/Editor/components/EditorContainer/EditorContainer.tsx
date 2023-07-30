import React from 'react';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import EditorPlaceholder from '../EditorPlaceholder/EditorPlaceholder';
import './EditorContainer.css';

const EditorContainer = () => {
  return (
    <div className="lexical_editor_container">
      <RichTextPlugin
        contentEditable={<ContentEditable className="lexical_editor_content" />}
        placeholder={EditorPlaceholder}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </div>
  );
};

export default EditorContainer;
