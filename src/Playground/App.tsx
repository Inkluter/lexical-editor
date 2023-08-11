import React, { useRef } from 'react';
import { $generateHtmlFromNodes } from '@lexical/html';

import Editor from '../Editor/Editor';
import { DEFAULT_TOOLBAR_CONFIG } from '../Editor/constants/editorConfig';
import './App.css';

const App = () => {
  const editorRef = useRef(null);

  const handleShowHtml = () => {
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
      />
      <div style={{ padding: 10 }}>
        <button onClick={handleShowHtml}>show html</button>
      </div>
    </div>
  );
};

export default App;
