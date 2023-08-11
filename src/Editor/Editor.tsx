import React, { MutableRefObject, useRef } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { LinkNode } from '@lexical/link';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { LexicalEditor, EditorState } from 'lexical';
import { ToolbarConfig } from 'src/Editor/constants/models';
import { DEFAULT_TOOLBAR_CONFIG } from 'src/Editor/constants/editorConfig';
import { InitialHtml } from 'src/Editor/plugins/InitialHtml';
import { InitialString } from 'src/Editor/plugins/InitialString';

import ToolbarButton from './components/EditorToolbar/components/ToolbarButton/ToolbarButton';
import EditorContainer from './components/EditorContainer/EditorContainer';
import EditorToolbar from './components/EditorToolbar/EditorToolbar';
import { LayoutPlugin } from './plugins/LayoutPlugin';
import { theme } from './theme/theme';

import './theme/theme.css';
import './Editor.css';

interface EditorType {
  editorState?: EditorState;
  placeholder?: string;
  onFocus?: (event: Event, editor: LexicalEditor) => void;
  onBlur?: (event: Event, editor: LexicalEditor) => void;
  onChange?: () => void;
  onToolbarButtonClick?: () => void;
  toolbarConfig?: ToolbarConfig;
  editorRef?: MutableRefObject<LexicalEditor | null>;
  initialString?: {
    type: 'html' | 'string';
    value: string;
  };
  customToolbar?: React.JSX.Element;
  plugins?: React.JSX.Element;
}

function onError(error: Error) {
  console.error(error);
}

function Editor({
  placeholder,
  onFocus,
  onBlur,
  onChange,
  onToolbarButtonClick,
  toolbarConfig = DEFAULT_TOOLBAR_CONFIG,
  editorRef,
  editorState,
  initialString,
  customToolbar,
  plugins,
}: EditorType) {
  const editorWrapperRef = useRef(null);
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [ListNode, ListItemNode, LinkNode, QuoteNode, HeadingNode],
    editorState,
  };

  return (
    <div ref={editorWrapperRef} className="lexical_editor_wrapper">
      <LexicalComposer initialConfig={initialConfig}>
        <EditorToolbar
          onToolbarButtonClick={onToolbarButtonClick}
          editorWrapperRef={editorWrapperRef}
          toolbarConfig={toolbarConfig}
          customToolbar={customToolbar}
        />
        <EditorContainer placeholder={placeholder} />
        <TabIndentationPlugin />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <LayoutPlugin onFocus={onFocus} onBlur={onBlur} editorRef={editorRef} />
        <OnChangePlugin
          ignoreSelectionChange
          ignoreHistoryMergeTagChange
          onChange={onChange}
        />
        {initialString && initialString.type === 'html' && (
          <InitialHtml initialValue={initialString.value} />
        )}
        {initialString && initialString.type === 'string' && (
          <InitialString initialValue={initialString.value} />
        )}
        {plugins && plugins}
      </LexicalComposer>
    </div>
  );
}

export default Editor;

export { ToolbarButton };
