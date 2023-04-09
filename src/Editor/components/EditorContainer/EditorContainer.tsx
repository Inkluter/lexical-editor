import React from 'react';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import EditorPlaceholder from '../EditorPlaceholder/EditorPlaceholder';
import styles from './EditorContainer.css';

const EditorContainer = () => {
  return (
    <div className={styles.container}>
      <RichTextPlugin
        contentEditable={<ContentEditable className={styles.content} />}
        placeholder={EditorPlaceholder}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </div>
  );
};

export default EditorContainer;
