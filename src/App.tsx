import React from 'react';

import Editor from './Editor/Editor';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Editor playground</h1>
      <Editor
        initialValue="sdfsdfsdfdfs sdfdsf sdfsdf fffff sssddf  fdfddf  fdfdfdfdfdf  fdfdfd fdf sdfsdfsdfdfs sdfdsf sdfsdf fffff sssddf  fdfddf  fdfdfdfdfdf  fdfdfd fdf sdfsdfsdfdfs sdfdsf sdfsdf"
        placeholder="Enter some text..."
      />
    </div>
  );
};

export default App;
