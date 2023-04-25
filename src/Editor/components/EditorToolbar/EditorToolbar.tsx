import React, { useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_CONFIG,
  DEFAULT_FONT_FAMILY_OPTIONS,
  DEFAULT_FONT_SIZE_OPTIONS,
  DEFAULT_TEXT_ALIGN_OPTIONS,
} from 'src/Editor/constants/editorConfig';
import {
  $getSelection,
  $isRangeSelection,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
} from 'lexical';
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
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textAlign, setTextAlign] = useState('');

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
      setFontFamily(
        $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial')
      );
      const alignment = selection.anchor.getNode().getParent().getFormatType();
      setTextAlign(alignment);
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

  const handleFormatTextClick = useCallback(
    (command: TextFormatType) => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, command);
    },
    [editor]
  );

  const handleFormatElementClick = useCallback(
    (command: ElementFormatType) => {
      editor.dispatchCommand(
        FORMAT_ELEMENT_COMMAND,
        command as ElementFormatType
      );
    },
    [editor]
  );

  return (
    <div className={styles.toolbar}>
      {DEFAULT_CONFIG.map((toolbarItem) => (
        <ToolbarButton
          key={toolbarItem}
          toolbarItem={toolbarItem}
          active={activeFormats[toolbarItem as keyof ACTIVE_FORMATS_TYPE]}
          onClick={handleFormatTextClick}
        />
      ))}
      <EditorDropdown
        name="Font size"
        options={DEFAULT_FONT_SIZE_OPTIONS}
        style="font-size"
        activeValue={fontSize}
        showValue
      />
      <EditorDropdown
        name="Font family"
        options={DEFAULT_FONT_FAMILY_OPTIONS}
        style="font-family"
        activeValue={fontFamily}
        showValue
      />
      {DEFAULT_TEXT_ALIGN_OPTIONS.map((textAlignOption) => (
        <ToolbarButton
          key={textAlignOption.value}
          toolbarItem={textAlignOption.value}
          onClick={handleFormatElementClick}
          active={textAlignOption.value === textAlign}
        />
      ))}
      {/*<ToolbarButton toolbarItem={'link'} format="element" />*/}
    </div>
  );
};

export default EditorToolbar;
