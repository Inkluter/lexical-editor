import React from 'react';

import './EditorPlaceholder.css';

interface EditorPlaceholderType {
  placeholder?: string;
}

const EditorPlaceholder = ({ placeholder }: EditorPlaceholderType) => {
  return <div className="lexical_editor_placeholder">{placeholder}</div>;
};

export default EditorPlaceholder;
