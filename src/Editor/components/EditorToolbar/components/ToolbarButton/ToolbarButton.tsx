import React from 'react';
import clsx from 'clsx';
import './ToolbarButton.css';

interface ToolbarItemType {
  toolbarItem?: string;
  active?: boolean;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    command: string
  ) => void;
  icon: React.ReactNode;
}

const ToolbarButton = ({
  toolbarItem,
  active,
  onClick,
  icon,
}: ToolbarItemType) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    toolbarItem: string
  ) => {
    onClick(event, toolbarItem);
  };

  return (
    <button
      className={clsx(
        'lexical_editor_toolbar_button',
        active && 'lexical_editor_toolbar_button__active'
      )}
      onClick={(e) => handleClick(e, toolbarItem)}
    >
      {icon}
    </button>
  );
};

export default ToolbarButton;
