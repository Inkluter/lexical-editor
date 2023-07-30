import React, { useCallback, useEffect, useRef, useState, useId } from 'react';
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
  EditorState,
  LexicalEditor,
} from 'lexical';
import { TOGGLE_LINK_COMMAND, $isLinkNode } from '@lexical/link';
import { mergeRegister } from '@lexical/utils';
import { getSelectedNode } from 'src/Editor/utils/getSelectedNode';

import { LinkEditorButton } from './LinkEditorButton/LinkEditorButton';
import './LinkEditor.css';

const LowPriority = 1;

function positionEditorElement(
  editor: HTMLElement,
  rect: DOMRect | null,
  editorWrapperRef: React.RefObject<HTMLDivElement> | null
) {
  if (rect === null) {
    editor.style.opacity = '0';
    editor.style.top = '-1000px';
    editor.style.left = '-1000px';
  } else {
    const editorWrapper = editorWrapperRef.current;
    const editorRect = editorWrapper.getBoundingClientRect();

    editor.style.opacity = '1';
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    editor.style.left = `${rect.left}px`;
  }
}

interface LinkEditorProps {
  editor: LexicalEditor;
  editorWrapperRef: React.RefObject<HTMLDivElement>;
}

export function LinkEditor({ editor, editorWrapperRef }: LinkEditorProps) {
  const editorRef = useRef(null);
  const inputRef = useRef(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState(null);
  const [isTargetBlank, setIsTargetBlank] = useState(false);
  const checkboxId = useId();

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      setIsTargetBlank(parent.__target === '_blank');
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl('');
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0);
      let rect;
      if (nativeSelection.anchorNode === rootElement) {
        let inner: Element = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange.getBoundingClientRect();
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect, editorWrapperRef);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== 'link-input') {
      positionEditorElement(editorElem, null, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl('');
    }

    return true;
  }, [editor]);

  const handleTargetCheckboxClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;

      setIsTargetBlank(isChecked);
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
        url: linkUrl,
        target: isChecked ? '_blank' : '',
      });
    },
    [editor, linkUrl]
  );

  const handleConfirmClick = useCallback(() => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
      url: linkUrl,
      target: isTargetBlank ? '_blank' : '',
    });
    setEditMode(false);
  }, [editor, isTargetBlank, linkUrl]);

  const handleRemoveClick = useCallback(() => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    setEditMode(false);
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(
        ({ editorState }: { editorState: EditorState }) => {
          editorState.read(() => {
            updateLinkEditor();
          });
        }
      ),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LowPriority
      )
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div ref={editorRef} className="lexical_editor_link_editor">
      {isEditMode ? (
        <div className="lexical_editor_link_editor_mode_wrapper">
          <input
            ref={inputRef}
            className="lexical_editor_link_editor_input"
            value={linkUrl}
            onChange={(event) => {
              setLinkUrl(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                if (lastSelection !== null) {
                  if (linkUrl !== '') {
                    editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
                      url: linkUrl,
                      target: '_blank',
                    });
                  }
                  setEditMode(false);
                }
              } else if (event.key === 'Escape') {
                event.preventDefault();
                setEditMode(false);
              }
            }}
          />
          <LinkEditorButton
            iconName="cancel"
            onClick={() => setEditMode(false)}
            className="lexical_editor_link_editor_edit"
          />
          <LinkEditorButton
            iconName="confirm"
            onClick={handleConfirmClick}
            className="lexical_editor_link_editor_remove"
          />
        </div>
      ) : (
        <div className="lexical_editor_link_editor_mode_wrapper">
          <div className="lexical_editor_link_editor_input">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkUrl}
            </a>
            <LinkEditorButton
              iconName="remove"
              onClick={handleRemoveClick}
              className="lexical_editor_link_editor_edit"
            />
            <LinkEditorButton
              iconName="edit-link"
              onClick={() => {
                setEditMode(true);
              }}
              className="lexical_editor_link_editor_remove"
            />
          </div>
          <div className="lexical_editor_link_editor_label_wrapper">
            <input
              id={checkboxId}
              type="checkbox"
              // @ts-ignore
              onChange={handleTargetCheckboxClick}
              checked={isTargetBlank}
            />
            <label className="lexical_editor_link_editor_label" htmlFor={checkboxId}>
              Open link in new window
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
