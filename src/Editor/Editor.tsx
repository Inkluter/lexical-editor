import React, { useRef } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { LinkNode } from '@lexical/link';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { LexicalEditor } from 'lexical';

import EditorContainer from './components/EditorContainer/EditorContainer';
import EditorToolbar from './components/EditorToolbar/EditorToolbar';
import { InitialValuePlugin } from './plugins/InitialValuePlugin';
import { LayoutPlugin } from './plugins/LayoutPlugin';
import { theme } from './theme/theme';
import './theme/theme.css';
import './Editor.css';

interface EditorType {
  initialValue?: string;
  placeholder?: string;
  onFocus?: (editor: LexicalEditor) => void;
  onBlur?: (editor: LexicalEditor) => void;
  onChange?: () => void;
  onToolbarButtonClick?: () => void;
}

function onError(error: Error) {
  console.error(error);
}

function Editor({
  initialValue,
  placeholder,
  onFocus,
  onBlur,
  onChange,
  onToolbarButtonClick,
}: EditorType) {
  const editorWrapperRef = useRef(null);
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [ListNode, ListItemNode, LinkNode, QuoteNode, HeadingNode],
  };

  return (
    <div ref={editorWrapperRef} className="lexical_editor_wrapper">
      <LexicalComposer initialConfig={initialConfig}>
        <EditorToolbar
          onToolbarButtonClick={onToolbarButtonClick}
          editorWrapperRef={editorWrapperRef}
        />
        <EditorContainer placeholder={placeholder} />
        <TabIndentationPlugin />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <InitialValuePlugin initialValue={initialValue} />
        <LayoutPlugin onFocus={onFocus} onBlur={onBlur} />
        <OnChangePlugin
          ignoreSelectionChange
          ignoreHistoryMergeTagChange
          onChange={onChange}
        />
      </LexicalComposer>
    </div>
  );
}

export default Editor;
