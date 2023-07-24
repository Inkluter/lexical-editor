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
const AlignLeftLabel = () => <Icon icon="align-left" />;
const AlignRightLabel = () => <Icon icon="align-right" />;
const AlignCenterLabel = () => <Icon icon="align-center" />;
const AlignJustifyLabel = () => <Icon icon="align-justify" />;

const Label = {
  [ToolbarItem.Bold]: Bold,
  [ToolbarItem.Italic]: Italic,
  [ToolbarItem.Underline]: Underline,
  [ToolbarItem.Strikethrough]: Strikethrough,
  [ToolbarItem.Superscript]: Superscript,
  [ToolbarItem.Subscript]: Subscript,
  [AlignItem.Left]: AlignLeftLabel,
  [AlignItem.Right]: AlignRightLabel,
  [AlignItem.Center]: AlignCenterLabel,
  [AlignItem.Justify]: AlignJustifyLabel,
  link: () => <Icon icon="link" />,
  'list-ordered': () => <Icon icon="list-ordered" />,
  'list-unordered': () => <Icon icon="list-unordered" />,
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
