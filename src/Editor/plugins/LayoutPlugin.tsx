import { useState, useLayoutEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  FOCUS_COMMAND,
  BLUR_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  LexicalEditor,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';

interface LayoutPluginType {
  onFocus?: (editor: LexicalEditor) => void;
  onBlur?: (editor: LexicalEditor) => void;
}

export const LayoutPlugin = ({ onFocus, onBlur }: LayoutPluginType): null => {
  const [editor] = useLexicalComposerContext();

  const [hasFocus, setHasFocus] = useState(() => {
    return editor.getRootElement() === document.activeElement;
  });

  useLayoutEffect(() => {
    onFocus &&
      mergeRegister(
        editor.registerCommand(
          FOCUS_COMMAND,
          () => {
            onFocus(editor);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL
        )
      );

    onBlur &&
      mergeRegister(
        editor.registerCommand(
          BLUR_COMMAND,
          () => {
            onBlur(editor);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL
        )
      );
  }, [editor]);

  return null;
};
