import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';

export const Test = () => {
  const [editor] = useLexicalComposerContext();

  const handleTestClick = () => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      console.log(htmlString);
    });
  };

  return <div onClick={handleTestClick}>111</div>;
};
