import React from "react";
import Editor from "./Editor/Editor";
import "./app.css";

const App = () => {
  return (
    <div className="app">
      <h1>Editor playground</h1>
      <Editor />
    </div>
  );
};

export default App;
