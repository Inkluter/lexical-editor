import React, { useState, useRef, useCallback, CSSProperties } from 'react';
import { useOnClickOutside } from 'src/Editor/hooks/useOnClickOutside';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $patchStyleText } from '@lexical/selection';
import classNames from 'classnames';
import { Icon } from 'src/Editor/components/Icons/Icon';

import { Option } from '../../../../constants/models';
import styles from './EditorDropdown.css';

interface EditorDropdownType {
  name: string;
  options: Array<Option>;
  activeValue: string;
  style?: string;
  showValue?: boolean;
}

export const EditorDropdown = ({
  name,
  options,
  activeValue,
  style,
  showValue = false,
}: EditorDropdownType) => {
  const [editor] = useLexicalComposerContext();
  const [isListVisible, setIsListVisible] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isFontFamily = style === 'font-family';

  useOnClickOutside(listRef, (event) => {
    if (buttonRef.current?.contains(event.target as Node)) return;
    setIsListVisible(false);
  });

  const handleClick = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            [style]: option,
          });
        }
      });
      setIsListVisible(false);
    },
    [editor, style]
  );

  return (
    <div className={styles.dropdown_wrapper}>
      <button
        ref={buttonRef}
        onClick={() => setIsListVisible(!isListVisible)}
        className={classNames(
          styles.dropdown_button,
          isListVisible && styles.dropdown_button__active
        )}
      >
        {showValue ? activeValue : name}
        <div className={styles.dropdown_icon}>
          <Icon icon={isListVisible ? 'arrow-up' : 'arrow-down'} />
        </div>
      </button>
      {isListVisible && (
        <div ref={listRef} className={styles.dropdown_list}>
          {options.map((option) => (
            <div
              className={classNames(
                styles.dropdown_option,
                activeValue === option.value && styles.dropdown_option__active
              )}
              onClick={() => handleClick(option.value as string)}
              key={option.value}
              style={
                isFontFamily
                  ? {
                      fontFamily: option.value as CSSProperties['fontFamily'],
                    }
                  : {}
              }
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};