import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { $generateHtmlFromNodes } from '@lexical/html';
import {
  DEFAULT_BLOCK_TYPE_OPTIONS,
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
  $createParagraphNode,
} from 'lexical';
import {
  $setBlocksType_experimental,
  $patchStyleText,
} from '@lexical/selection';
import {
  $createQuoteNode,
  $createHeadingNode,
  HeadingTagType,
} from '@lexical/rich-text';
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
import { Icon } from 'src/Editor/components/Icons/Icon';
import { ToolbarItem } from 'src/Editor/constants/enums';

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
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, command: string) => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, command as TextFormatType);
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
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      command: ElementFormatType
    ) => {
      editor.dispatchCommand(
        FORMAT_ELEMENT_COMMAND,
        command as ElementFormatType
      );
    },
    [editor]
  );

  const handleFontSizeDropdownClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>, option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            ['font-size']: option,
          });
        }
      });
    },
    [editor]
  );

  const formatHeading = (headingSize: string) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType_experimental(selection, () =>
            $createHeadingNode(headingSize as HeadingTagType)
          );
        }
      });
    }
  };

  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection))
          $setBlocksType_experimental(selection, () => $createParagraphNode());
      });
    }
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType_experimental(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const handleTypeDropdownClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>, option: string) => {
      if (option === 'h1' || option === 'h2' || option === 'h3') {
        formatHeading(option);
      }
      if (option === 'paragraph') {
        formatParagraph();
      }
      if (option === 'quote') {
        formatQuote();
      }
    },
    [editor, blockType]
  );

  const handleFontFamilyDropdownClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>, option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            ['font-family']: option,
          });
        }
      });
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
  };

  const handleFormatUnorderedListClick = () => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      console.log('insert');
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      console.log('remove');
    }
  };

  const handleSetLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  return (
    <div className="lexical_editor_toolbar">
      <EditorDropdown
        name="Type"
        options={DEFAULT_BLOCK_TYPE_OPTIONS}
        onOptionClick={handleTypeDropdownClick}
      />
      <ToolbarDivider />
      {DEFAULT_CONFIG.map((toolbarItem) => (
        <ToolbarButton
          key={toolbarItem}
          toolbarItem={toolbarItem}
          active={activeFormats[toolbarItem as keyof ACTIVE_FORMATS_TYPE]}
          onClick={handleFormatTextClick}
          icon={<Icon icon={toolbarItem} />}
        />
      ))}
      <ToolbarDivider />
      <EditorDropdown
        name="Font size"
        options={DEFAULT_FONT_SIZE_OPTIONS}
        activeValue={fontSize}
        showValue
        onOptionClick={handleFontSizeDropdownClick}
      />
      <EditorDropdown
        name="Font family"
        options={DEFAULT_FONT_FAMILY_OPTIONS}
        style="font-family"
        activeValue={fontFamily}
        showValue
        onOptionClick={handleFontFamilyDropdownClick}
      />
      <ToolbarDivider />
      {DEFAULT_TEXT_ALIGN_OPTIONS.map((textAlignOption) => (
        <ToolbarButton
          key={textAlignOption.value}
          toolbarItem={textAlignOption.value}
          onClick={handleFormatElementClick}
          active={textAlignOption.value === textAlign}
          icon={<Icon icon={textAlignOption.value} />}
        />
      ))}
      <ToolbarDivider />
      <ToolbarButton
        toolbarItem="list-ordered"
        onClick={handleFormatOrderedListClick}
        icon={<Icon icon="list-ordered" />}
      />
      <ToolbarButton
        toolbarItem="list-unordered"
        onClick={handleFormatUnorderedListClick}
        icon={<Icon icon="list-unordered" />}
      />
      <ToolbarDivider />
      <ToolbarButton
        toolbarItem="link"
        onClick={handleSetLink}
        icon={<Icon icon="link" />}
      />
      {isLink &&
        createPortal(
          <LinkEditor editor={editor} editorWrapperRef={editorWrapperRef} />,
          document.body
        )}
      {/*<ToolbarButton*/}
      {/*  toolbarItem="code"*/}
      {/*  active={false}*/}
      {/*  onClick={handleHtmlClick}*/}
      {/*  icon={<Icon icon="link" />}*/}
      {/*/>*/}
    </div>
  );
};

export default EditorToolbar;
