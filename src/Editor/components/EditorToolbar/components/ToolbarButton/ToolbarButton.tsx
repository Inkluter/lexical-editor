import React from 'react';
import clsx from 'clsx';
import { ToolbarItem, AlignItem } from 'src/Editor/constants/enums';
import { Icon } from 'src/Editor/components/Icons/Icon';
import {
  $getSelection,
  $isRangeSelection,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
} from 'lexical';
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
  $selectAll,
  $setBlocksType_experimental,
} from '@lexical/selection';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingTagType,
} from '@lexical/rich-text';
import './ToolbarButton.css';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface ToolbarItemType {
  toolbarItem: string;
  active?: boolean;
  onClick: (command: string) => void;
}

const Superscript = () => (
  <span style={{ fontSize: 14, marginTop: 2 }}>
    X{' '}
    <span style={{ position: 'relative', bottom: '0.7em', fontSize: '0.7em' }}>
      2
    </span>
  </span>
);
const Subscript = () => (
  <span style={{ fontSize: 14, marginTop: 2 }}>
    X{' '}
    <span style={{ position: 'relative', top: '0.4em', fontSize: '0.7em' }}>
      2
    </span>
  </span>
);

const Label = {
  [ToolbarItem.Bold]: () => <Icon icon="bold" />,
  [ToolbarItem.Italic]: () => <Icon icon="italic" />,
  [ToolbarItem.Underline]: () => <Icon icon="underline" />,
  [ToolbarItem.Strikethrough]: () => <Icon icon="strikethrough" />,
  [ToolbarItem.Superscript]: Superscript,
  [ToolbarItem.Subscript]: Subscript,
  [AlignItem.Left]: () => <Icon icon="left" />,
  [AlignItem.Right]: () => <Icon icon="right" />,
  [AlignItem.Center]: () => <Icon icon="center" />,
  [AlignItem.Justify]: () => <Icon icon="justify" />,
  link: () => <Icon icon="link" />,
  'list-ordered': () => <Icon icon="list-ordered" />,
  'list-unordered': () => <Icon icon="list-unordered" />,
  [ToolbarItem.Code]: () => <Icon icon="code" />,
  [ToolbarItem.Quote]: () => <Icon icon="quote" />,
};

const ToolbarButton = ({ toolbarItem, active, onClick }: ToolbarItemType) => {
  const ButtonLabel = Label[toolbarItem as ToolbarItem];
  const [editor] = useLexicalComposerContext();

  const handleClick = () => {
    if (toolbarItem === ToolbarItem.Quote) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType_experimental(selection, () => $createQuoteNode());
        }
      });
    }

    onClick(toolbarItem);
  };

  return (
    <button
      className={clsx(
        'lexical_editor_toolbar_button',
        active && 'lexical_editor_toolbar_button__active'
      )}
      onClick={handleClick}
    >
      <ButtonLabel />
    </button>
  );
};

export default ToolbarButton;
