import React from 'react';
import ToolbarButton from 'src/Editor/components/EditorToolbar/components/ToolbarButton/ToolbarButton';
import { Icon } from 'src/Editor/components/Icons/Icon';

export const UndoRedo = () => {
  return (
    <>
      <ToolbarButton icon={<Icon icon="undo" />} onClick={() => {}} />
    </>
  );
};
