import React from 'react';

import Editor from './Editor/Editor';
import { DEFAULT_TOOLBAR_CONFIG } from './Editor/constants/editorConfig';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Editor playground</h1>
      <Editor
        initialValue="sdfsdfsdfdfs sdfdsf sdfsdf"
        placeholder="Enter some text..."
        onFocus={() => console.log('focus')}
        onBlur={() => console.log('blur')}
        onChange={() => console.log('change')}
        onToolbarButtonClick={() => console.log('toolbar button click')}
        toolbarConfig={DEFAULT_TOOLBAR_CONFIG}
      />
    </div>
  );
};

export default App;
