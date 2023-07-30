import React, { useEffect, useRef } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { LinkNode } from '@lexical/link';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';

import EditorContainer from './components/EditorContainer/EditorContainer';
import EditorToolbar from './components/EditorToolbar/EditorToolbar';
import { InitialValuePlugin } from './plugins/InitialValuePlugin';
import { theme } from './theme/theme';
import './theme/theme.css';
import './Editor.css';

interface EditorType {
  initialValue?: string;
}

function onError(error: Error) {
  console.error(error);
}

function Editor({ initialValue }: EditorType) {
  const editorWrapperRef = useRef(null);
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [ListNode, ListItemNode, LinkNode, QuoteNode],
  };

  useEffect(() => {}, []);

  return (
    <div ref={editorWrapperRef} className="lexical_editor_wrapper">
      <LexicalComposer initialConfig={initialConfig}>
        <EditorToolbar editorWrapperRef={editorWrapperRef} />
        <EditorContainer />
        <TabIndentationPlugin />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <InitialValuePlugin initialValue={initialValue} />
      </LexicalComposer>
    </div>
  );
}

export default Editor;
