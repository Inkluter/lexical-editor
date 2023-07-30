import React from 'react';
import clsx from 'clsx';
import 'src/Editor/components/EditorToolbar/components/LinkEditor/LinkEditor.css';
import { Icon } from 'src/Editor/components/Icons/Icon';

interface LinkEditorButtonProps {
  iconName: string;
  onClick: () => void;
  className?: string;
}

export const LinkEditorButton = ({
  iconName,
  onClick,
  className,
}: LinkEditorButtonProps) => (
  <div
    className={clsx(className, 'lexical_editor_link_editor_button')}
    role="button"
    tabIndex={0}
    onMouseDown={(event) => event.preventDefault()}
    onClick={onClick}
  >
    <Icon icon={iconName} />
  </div>
);
