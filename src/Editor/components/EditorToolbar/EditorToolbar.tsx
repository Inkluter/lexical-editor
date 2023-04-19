import React, { useCallback, useEffect, useState } from 'react';
import { DEFAULT_CONFIG } from 'src/Editor/constants/editorConfig';
import { $getSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import { ACTIVE_FORMATS } from 'src/Editor/constants/objects';
import { ACTIVE_FORMATS_TYPE } from 'src/Editor/constants/models';

import ToolbarButton from './components/ToolbarButton/ToolbarButton';
// import { EditorDropdown } from './EditorDropdown/EditorDropdown';
// import {
//   DEFAULT_CONFIG,
//   // FONT_SIZE_OPTIONS,
// } from '../../constants/editorConfig';
import styles from './EditorToolbar.css';

const EditorToolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] =
    useState<ACTIVE_FORMATS_TYPE>(ACTIVE_FORMATS);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    Object.keys(ACTIVE_FORMATS).forEach((format) => {
      if (selection.hasFormat(format)) {
        setActiveFormats((prev) => ({ ...prev, [format]: true }));
      } else {
        setActiveFormats((prev) => ({ ...prev, [format]: false }));
      }
    });
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      })
    );
  }, [editor, updateToolbar]);

  return (
    <div className={styles.toolbar}>
      {DEFAULT_CONFIG.map((toolbarItem) => (
        <ToolbarButton
          key={toolbarItem}
          toolbarItem={toolbarItem}
          active={activeFormats[toolbarItem as keyof ACTIVE_FORMATS_TYPE]}
        />
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
