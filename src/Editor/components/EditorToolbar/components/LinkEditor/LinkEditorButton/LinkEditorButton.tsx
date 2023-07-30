import React from 'react';
import classNames from 'classnames';
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
    className={classNames(className, 'lexical_editor_link_editor_button')}
    role="button"
    tabIndex={0}
    onMouseDown={(event) => event.preventDefault()}
    onClick={onClick}
  >
    <Icon icon={iconName} />
  </div>
);
