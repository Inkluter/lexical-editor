import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';

import styles from './ToolbarButton.css';

interface ToolbarItemType {
  toolbarItem: string;
}

const ToolbarButton = ({ toolbarItem }: ToolbarItemType) => {
  const [editor] = useLexicalComposerContext();

  return (
    <button
      className={styles.toolbar_button}
      onClick={() => {
        editor.dispatchCommand(
          FORMAT_TEXT_COMMAND,
          toolbarItem as TextFormatType
        );
        console.log(toolbarItem);
      }}
    >
      {toolbarItem}
    </button>
  );
};

export default ToolbarButton;
