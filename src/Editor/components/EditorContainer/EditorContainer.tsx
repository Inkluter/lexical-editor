import React from 'react';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import EditorPlaceholder from '../EditorPlaceholder/EditorPlaceholder';
import './EditorContainer.css';

interface EditorContainerType {
  placeholder?: string;
}

const EditorContainer = ({ placeholder }: EditorContainerType) => {
  return (
    <div className="lexical_editor_container">
      <RichTextPlugin
        contentEditable={<ContentEditable className="lexical_editor_content" />}
        placeholder={
          placeholder
            ? () => <EditorPlaceholder placeholder={placeholder} />
            : null
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
    </div>
  );
};

export default EditorContainer;
