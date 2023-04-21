import React, { useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_CONFIG, DEFAULT_FONT_FAMILY_OPTIONS,
  DEFAULT_FONT_SIZE_OPTIONS,
} from 'src/Editor/constants/editorConfig';
import { $getSelection, $isRangeSelection, TextFormatType } from 'lexical';
import { $getSelectionStyleValueForProperty } from '@lexical/selection';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import { ACTIVE_FORMATS } from 'src/Editor/constants/objects';
import { ACTIVE_FORMATS_TYPE } from 'src/Editor/constants/models';

import ToolbarButton from './components/ToolbarButton/ToolbarButton';
import { EditorDropdown } from './EditorDropdown/EditorDropdown';
import styles from './EditorToolbar.css';

const EditorToolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] =
    useState<ACTIVE_FORMATS_TYPE>(ACTIVE_FORMATS);
  const [fontSize, setFontSize] = useState('15px');

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      Object.keys(ACTIVE_FORMATS).forEach((format) => {
        if (selection.hasFormat(format as TextFormatType)) {
          setActiveFormats((prev) => ({ ...prev, [format]: true }));
        } else {
          setActiveFormats((prev) => ({ ...prev, [format]: false }));
        }
      });
      setFontSize(
        $getSelectionStyleValueForProperty(selection, 'font-size', '15px')
      );
    }
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
      <EditorDropdown
        name="Font size"
        options={DEFAULT_FONT_SIZE_OPTIONS}
        style="font-size"
      />
      <EditorDropdown
        name="Font family"
        options={DEFAULT_FONT_FAMILY_OPTIONS}
        style="font-family"
      />
    </div>
  );
};

export default EditorToolbar;
