import React from 'react';

import Editor from './Editor/Editor';
import styles from './App.css';

const App = () => {
  return (
    <div className={styles.app}>
      <h1>Editor playground</h1>
      <Editor initialValue="sdfsdfsdfdfs" />
    </div>
  );
};

export default App;
