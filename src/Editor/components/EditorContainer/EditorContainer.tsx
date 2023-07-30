import React from 'react';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import EditorPlaceholder from '../EditorPlaceholder/EditorPlaceholder';
import './EditorContainer.css';

const EditorContainer = () => {
  return (
    <div className="container">
      <RichTextPlugin
        contentEditable={<ContentEditable className="content" />}
        placeholder={EditorPlaceholder}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </div>
  );
};

export default EditorContainer;
