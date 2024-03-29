import React, { useCallback, useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  $getSelection,
  $isRangeSelection,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
  $createParagraphNode,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
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
import {
  ACTIVE_FORMATS_TYPE,
  ToolbarConfig,
} from 'src/Editor/constants/models';
import { TOGGLE_LINK_COMMAND, $isLinkNode } from '@lexical/link';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isCodeNode, getDefaultCodeLanguage } from '@lexical/code';
import { getSelectedNode } from 'src/Editor/utils/getSelectedNode';
import { EditorDropdown } from 'src/Editor/components/EditorToolbar/components/EditorDropdown/EditorDropdown';
import { Icon } from 'src/Editor/components/Icons/Icon';

import ToolbarButton from './components/ToolbarButton/ToolbarButton';
import { LinkEditor } from './components/LinkEditor/LinkEditor';
import { ToolbarDivider } from './components/ToolbarDivider/ToolbarDivider';
import { UndoRedo } from './components/UndoRedo/UndoRedo';

import './EditorToolbar.css';

interface EditorToolbarProps {
  editorWrapperRef: React.RefObject<HTMLDivElement>;
  onToolbarButtonClick?: () => void;
  toolbarConfig?: ToolbarConfig;
  customToolbar?: React.JSX.Element;
}

const EditorToolbar = ({
  editorWrapperRef,
  onToolbarButtonClick,
  toolbarConfig,
  customToolbar,
}: EditorToolbarProps) => {
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
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const toolbarRef = useRef(null);

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
      const alignment = selection.anchor.getNode().getParent()?.getFormatType();
      setTextAlign(alignment);
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [editor, updateToolbar]);

  const handleFormatTextClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, command: string) => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, command as TextFormatType);
    },
    [editor]
  );

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
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const handleFormatUnorderedListClick = () => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
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
    <div
      className="lexical_editor_toolbar"
      id="lexical_editor_toolbar"
      ref={toolbarRef}
    >
      {toolbarConfig.undoRedo.display && (
        <UndoRedo
          // onToolbarButtonClick={onToolbarButtonClick}
          canUndo={canUndo}
          canRedo={canRedo}
        />
      )}
      {toolbarConfig.type.display && (
        <>
          <EditorDropdown
            name="Type"
            options={toolbarConfig?.type.options}
            onOptionClick={handleTypeDropdownClick}
            onToolbarButtonClick={onToolbarButtonClick}
            toolbarRef={toolbarRef}
          />
          <ToolbarDivider />
        </>
      )}
      {toolbarConfig.inline.display && (
        <>
          {toolbarConfig.inline.options.map((toolbarItem) => (
            <ToolbarButton
              key={toolbarItem}
              toolbarItem={toolbarItem}
              active={activeFormats[toolbarItem as keyof ACTIVE_FORMATS_TYPE]}
              onClick={handleFormatTextClick}
              icon={<Icon icon={toolbarItem} />}
              onToolbarButtonClick={onToolbarButtonClick}
            />
          ))}
          <ToolbarDivider />
        </>
      )}
      {toolbarConfig.fontSize.display && (
        <EditorDropdown
          name="Font size"
          options={toolbarConfig.fontSize.options}
          activeValue={fontSize}
          showValue
          onOptionClick={handleFontSizeDropdownClick}
          onToolbarButtonClick={onToolbarButtonClick}
          toolbarRef={toolbarRef}
        />
      )}
      {toolbarConfig.fontFamily.display && (
        <EditorDropdown
          name="Font family"
          options={toolbarConfig.fontFamily.options}
          style="font-family"
          activeValue={fontFamily}
          showValue
          onOptionClick={handleFontFamilyDropdownClick}
          onToolbarButtonClick={onToolbarButtonClick}
          toolbarRef={toolbarRef}
        />
      )}
      {(toolbarConfig.fontSize.display || toolbarConfig.fontFamily.display) && (
        <ToolbarDivider />
      )}
      {toolbarConfig.align.display && (
        <>
          {toolbarConfig.align.options.map((textAlignOption) => (
            <ToolbarButton
              key={textAlignOption.value}
              toolbarItem={textAlignOption.value as string}
              onClick={handleFormatElementClick}
              active={textAlignOption.value === textAlign}
              icon={<Icon icon={textAlignOption.value as string} />}
              onToolbarButtonClick={onToolbarButtonClick}
            />
          ))}
          <ToolbarDivider />
        </>
      )}
      {toolbarConfig.list.display && (
        <>
          <ToolbarButton
            toolbarItem="list-ordered"
            onClick={handleFormatOrderedListClick}
            icon={<Icon icon="list-ordered" />}
            onToolbarButtonClick={onToolbarButtonClick}
          />
          <ToolbarButton
            toolbarItem="list-unordered"
            onClick={handleFormatUnorderedListClick}
            icon={<Icon icon="list-unordered" />}
            onToolbarButtonClick={onToolbarButtonClick}
          />
          <ToolbarDivider />
        </>
      )}
      {toolbarConfig.link.display && (
        <ToolbarButton
          toolbarItem="link"
          onClick={handleSetLink}
          icon={<Icon icon="link" />}
          onToolbarButtonClick={onToolbarButtonClick}
        />
      )}
      {isLink &&
        createPortal(
          <LinkEditor editor={editor} editorWrapperRef={editorWrapperRef} />,
          document.body
        )}
      {customToolbar && customToolbar}
    </div>
  );
};

export default EditorToolbar;
