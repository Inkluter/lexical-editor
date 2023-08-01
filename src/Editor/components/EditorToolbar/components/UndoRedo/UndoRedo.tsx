import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import ToolbarButton from 'src/Editor/components/EditorToolbar/components/ToolbarButton/ToolbarButton';
import { ToolbarDivider } from 'src/Editor/components/EditorToolbar/components/ToolbarDivider/ToolbarDivider';
import { Icon } from 'src/Editor/components/Icons/Icon';
import { REDO_COMMAND, UNDO_COMMAND } from 'lexical';

interface UndoRedoType {
  canUndo: boolean;
  canRedo: boolean;
  onToolbarButtonClick?: () => void;
}

export const UndoRedo = ({
  canUndo,
  canRedo,
  onToolbarButtonClick,
}: UndoRedoType) => {
  const [editor] = useLexicalComposerContext();

  const handleUndoClick = () => {
    onToolbarButtonClick();
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };
  const handleRedoClick = () => {
    onToolbarButtonClick();
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  return (
    <>
      <ToolbarButton
        icon={<Icon icon="undo" />}
        disabled={!canUndo}
        onClick={handleUndoClick}
      />
      <ToolbarButton
        icon={<Icon icon="redo" />}
        disabled={!canRedo}
        onClick={handleRedoClick}
      />
      <ToolbarDivider />
    </>
  );
};
