import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';
import { $createParagraphNode, $createTextNode } from 'lexical';

interface InitialValuePluginType {
  initialValue?: string;
}

export const InitialValuePlugin = ({
  initialValue,
}: InitialValuePluginType): null => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (initialValue) {
      editor.update(() => {
        const root = $getRoot();
        $getRoot().clear();
        const paragraphNode = $createParagraphNode();
        const textNode = $createTextNode(initialValue);
        paragraphNode.append(textNode);
        root.append(paragraphNode);
      });
    }
  }, []);

  return null;
};
