import React from 'react';
import classNames from 'classnames';
import { ToolbarItem, AlignItem } from 'src/Editor/constants/enums';
import { Icon } from 'src/Editor/components/Icons/Icon';

import styles from './ToolbarButton.css';

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
  code: () => <Icon icon="list-unordered" />,
};

const ToolbarButton = ({ toolbarItem, active, onClick }: ToolbarItemType) => {
  const ButtonLabel = Label[toolbarItem as ToolbarItem];

  return (
    <button
      className={classNames(
        styles.toolbar_button,
        active && styles.toolbar_button__active
      )}
      onClick={() => onClick(toolbarItem)}
    >
      <ButtonLabel />
    </button>
  );
};

export default ToolbarButton;
