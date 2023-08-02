import { useLayoutEffect, MutableRefObject } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  FOCUS_COMMAND,
  BLUR_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  LexicalEditor,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';

interface LayoutPluginType {
  onFocus?: (event: Event, editor: LexicalEditor) => void;
  onBlur?: (event: Event, editor: LexicalEditor) => void;
  editorRef?: MutableRefObject<LexicalEditor | null>;
}

export const LayoutPlugin = ({
  onFocus,
  onBlur,
  editorRef,
}: LayoutPluginType): null => {
  const [editor] = useLexicalComposerContext();

  useLayoutEffect(() => {
    if (editorRef) {
      editorRef.current = editor;
    }

    onFocus &&
      mergeRegister(
        editor.registerCommand(
          FOCUS_COMMAND,
          (event, editor) => {
            onFocus(event, editor);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL
        )
      );

    onBlur &&
      mergeRegister(
        editor.registerCommand(
          BLUR_COMMAND,
          (event, editor) => {
            onBlur(event, editor);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL
        )
      );
  }, [editor]);

  return null;
};
