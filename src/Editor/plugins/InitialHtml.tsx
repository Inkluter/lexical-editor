import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateNodesFromDOM } from '@lexical/html';
import { $createParagraphNode, $getRoot } from 'lexical';

interface LoadInitialContentTypes {
  initialValue?: string;
}

export const InitialHtml = ({
                              initialValue,
}: LoadInitialContentTypes): null => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!initialValue) {
      return;
    }
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(initialValue, 'text/html');
      const nodes = $generateNodesFromDOM(editor, dom);
      console.log(dom, nodes);
      const paragraphNode = $createParagraphNode();
      nodes.forEach((n) => paragraphNode.append(n));
      $getRoot().append(paragraphNode);
    });
  }, []);

  return null;
};
