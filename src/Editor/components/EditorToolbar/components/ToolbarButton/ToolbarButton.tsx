import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';
import { ToolbarItem } from 'src/Editor/constants/enums';

import styles from './ToolbarButton.css';

interface ToolbarItemType {
  toolbarItem: string;
}

const Bold = () => <span style={{ fontWeight: 'bold' }}>B</span>;
const Italic = () => (
  <span style={{ fontStyle: 'italic', fontFamily: 'Georgia' }}>I</span>
);
const Underline = () => <span style={{ textDecoration: 'underline' }}>U</span>;
const Strikethrough = () => (
  <span style={{ textDecoration: 'line-through' }}>S</span>
);
const Superscript = () => (
  <span>
    X{' '}
    <span style={{ position: 'relative', bottom: '0.5em', fontSize: '0.8em' }}>
      2
    </span>
  </span>
);
const Subscript = () => (
  <span>
    X{' '}
    <span style={{ position: 'relative', top: '0.5em', fontSize: '0.8em' }}>
      2
    </span>
  </span>
);

const Label = {
  [ToolbarItem.Bold]: Bold,
  [ToolbarItem.Italic]: Italic,
  [ToolbarItem.Underline]: Underline,
  [ToolbarItem.Strikethrough]: Strikethrough,
  [ToolbarItem.Superscript]: Superscript,
  [ToolbarItem.Subscript]: Subscript,
};

const ToolbarButton = ({ toolbarItem }: ToolbarItemType) => {
  const [editor] = useLexicalComposerContext();

  const ButtonLabel = Label[toolbarItem as ToolbarItem];

  return (
    <button
      className={styles.toolbar_button}
      onClick={() => {
        editor.dispatchCommand(
          FORMAT_TEXT_COMMAND,
          toolbarItem as TextFormatType
        );
      }}
    >
      <ButtonLabel />
    </button>
  );
};

export default ToolbarButton;
