import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { $generateHtmlFromNodes } from '@lexical/html';
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
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from '@lexical/list';
import { $getSelectionStyleValueForProperty } from '@lexical/selection';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister, $getNearestNodeOfType } from '@lexical/utils';
import { ACTIVE_FORMATS } from 'src/Editor/constants/objects';
import { ACTIVE_FORMATS_TYPE } from 'src/Editor/constants/models';
import { TOGGLE_LINK_COMMAND, $isLinkNode } from '@lexical/link';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isCodeNode, getDefaultCodeLanguage } from '@lexical/code';
import { getSelectedNode } from 'src/Editor/utils/getSelectedNode';
import { EditorDropdown } from 'src/Editor/components/EditorToolbar/components/EditorDropdown/EditorDropdown';

import ToolbarButton from './components/ToolbarButton/ToolbarButton';
import { LinkEditor } from './components/LinkEditor/LinkEditor';
import { ToolbarDivider } from './components/ToolbarDivider/ToolbarDivider';
import './EditorToolbar.css';

interface EditorToolbarProps {
  editorWrapperRef: React.RefObject<HTMLDivElement>;
}

const EditorToolbar = ({ editorWrapperRef }: EditorToolbarProps) => {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] =
    useState<ACTIVE_FORMATS_TYPE>(ACTIVE_FORMATS);
  const [fontSize, setFontSize] = useState('15px');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textAlign, setTextAlign] = useState('');
  const [isLink, setIsLink] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [codeLanguage, setCodeLanguage] = useState('');

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
      }
      Object.keys(ACTIVE_FORMATS).forEach((format) => {
        if (selection.hasFormat(format as TextFormatType)) {
          setActiveFormats((prev) => ({ ...prev, [format]: true }));
        } else {
          setActiveFormats((prev) => ({ ...prev, [format]: false }));
        }
      });

      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

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

  const handleHtmlClick = useCallback(() => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      console.log(htmlString);
    });
  }, [editor]);

  const handleFormatElementClick = useCallback(
    (command: ElementFormatType) => {
      editor.dispatchCommand(
        FORMAT_ELEMENT_COMMAND,
        command as ElementFormatType
      );
    },
    [editor]
  );

  const handleFormatOrderedListClick = () => {
    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      console.log('insert');
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      console.log('remove');
    }
    // setShowBlockOptionsDropDown(false);
  };

  const handleFormatUnorderedListClick = () => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      console.log('insert');
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      console.log('remove');
    }
    // setShowBlockOptionsDropDown(false);
  };

  const handleSetLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  return (
    <div className="toolbar">
      {DEFAULT_CONFIG.map((toolbarItem) => (
        <ToolbarButton
          key={toolbarItem}
          toolbarItem={toolbarItem}
          active={activeFormats[toolbarItem as keyof ACTIVE_FORMATS_TYPE]}
          onClick={handleFormatTextClick}
        />
      ))}
      <ToolbarDivider />
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
      <ToolbarDivider />
      {DEFAULT_TEXT_ALIGN_OPTIONS.map((textAlignOption) => (
        <ToolbarButton
          key={textAlignOption.value}
          toolbarItem={textAlignOption.value}
          onClick={handleFormatElementClick}
          active={textAlignOption.value === textAlign}
        />
      ))}
      <ToolbarDivider />
      <ToolbarButton
        toolbarItem="list-ordered"
        onClick={handleFormatOrderedListClick}
      />
      <ToolbarButton
        toolbarItem="list-unordered"
        onClick={handleFormatUnorderedListClick}
      />
      <ToolbarDivider />
      <ToolbarButton toolbarItem="link" onClick={handleSetLink} />
      {isLink &&
        createPortal(
          <LinkEditor editor={editor} editorWrapperRef={editorWrapperRef} />,
          document.body
        )}
      <ToolbarButton
        toolbarItem="code"
        active={false}
        onClick={handleHtmlClick}
      />
    </div>
  );
};

export default EditorToolbar;
