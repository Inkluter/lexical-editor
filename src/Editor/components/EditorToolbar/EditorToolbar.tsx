import React from 'react';

import ToolbarButton from './ToolbarButton';
// import { EditorDropdown } from './EditorDropdown/EditorDropdown';
import {
  DEFAULT_CONFIG,
  // FONT_SIZE_OPTIONS,
} from '../../constants/editorConfig';
import styles from './EditorToolbar.css';

const EditorToolbar = () => {
  return (
    <div className={styles.toolbar}>
      {DEFAULT_CONFIG.map((toolbarItem) => (
        <ToolbarButton key={toolbarItem} toolbarItem={toolbarItem} />
      ))}
      {/*<EditorDropdown*/}
      {/*  name="Font size"*/}
      {/*  options={FONT_SIZE_OPTIONS}*/}
      {/*  onChange={(option) => console.log(option)}*/}
      {/*/>*/}
    </div>
  );
};

export default EditorToolbar;
