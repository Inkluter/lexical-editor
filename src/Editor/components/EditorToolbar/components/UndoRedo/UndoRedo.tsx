import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import ToolbarButton from 'src/Editor/components/EditorToolbar/components/ToolbarButton/ToolbarButton';
import { ToolbarDivider } from 'src/Editor/components/EditorToolbar/components/ToolbarDivider/ToolbarDivider';
import { Icon } from 'src/Editor/components/Icons/Icon';
import { REDO_COMMAND, UNDO_COMMAND } from 'lexical';

interface UndoRedoType {
  canUndo: boolean;
  canRedo: boolean;
}

export const UndoRedo = ({ canUndo, canRedo }: UndoRedoType) => {
  const [editor] = useLexicalComposerContext();

  const handleUndoClick = () => editor.dispatchCommand(UNDO_COMMAND, undefined);
  const handleRedoClick = () => editor.dispatchCommand(REDO_COMMAND, undefined);

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
