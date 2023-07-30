import React from 'react';

import Editor from './Editor/Editor';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Editor playground</h1>
      <Editor initialValue="sdfsdfsdfdfs" />
    </div>
  );
};

export default App;
