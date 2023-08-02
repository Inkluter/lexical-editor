import React, { useRef } from 'react';
import { $generateHtmlFromNodes } from '@lexical/html';
import { $generateNodesFromDOM } from '@lexical/html';

import Editor from './Editor/Editor';
import { DEFAULT_TOOLBAR_CONFIG } from './Editor/constants/editorConfig';
import './App.css';

const str =
  '<p class="lexical_editor__paragraph" dir="ltr"><b><strong class="lexical_editor__text_bold">sdfsdfsdfdfs</strong></b></p>';

const App = () => {
  const editorRef = useRef(null);

  const handleShowHtml = () => {
    // console.log(editorRef.current.getEditorState());

    editorRef.current.update(() => {
      const htmlString = $generateHtmlFromNodes(editorRef.current, null);
      console.log(htmlString);
    });
  };

  return (
    <div className="app">
      <h1>Editor playground</h1>
      <Editor
        placeholder="Enter some text..."
        onFocus={() => console.log('focus')}
        onBlur={() => console.log('blur')}
        onChange={() => console.log('change')}
        onToolbarButtonClick={() => console.log('toolbar button click')}
        toolbarConfig={DEFAULT_TOOLBAR_CONFIG}
        editorRef={editorRef}
        initialString={{
          type: 'html',
          value: str,
        }}
      />
      <div style={{ padding: 10 }}>
        <button onClick={handleShowHtml}>show html</button>
      </div>
    </div>
  );
};

export default App;
