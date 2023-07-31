import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  CSSProperties,
} from 'react';
import { useOnClickOutside } from 'src/Editor/hooks/useOnClickOutside';
import clsx from 'clsx';
import { Icon } from 'src/Editor/components/Icons/Icon';

import { Option } from '../../../../constants/models';
import './EditorDropdown.css';

interface EditorDropdownType {
  name: string;
  options: Array<Option>;
  activeValue?: string;
  onOptionClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    option: string
  ) => void;
  style?: string;
  showValue?: boolean;
}

export const EditorDropdown = ({
  name,
  options,
  activeValue,
  onOptionClick,
  style,
  showValue = false,
}: EditorDropdownType) => {
  const [isListVisible, setIsListVisible] = useState(false);
  const [listWidth, setListWidth] = useState(null);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isFontFamily = style === 'font-family';

  useOnClickOutside(listRef, (event) => {
    if (buttonRef.current?.contains(event.target as Node)) return;
    setIsListVisible(false);
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>, option: string) => {
      onOptionClick(event, option);
      setIsListVisible(false);
    },
    [onOptionClick, setIsListVisible]
  );

  useEffect(() => {
    if (listRef.current) {
      setListWidth((listRef.current.children[0] as HTMLElement).offsetWidth);
    }
  }, [listRef]);

  return (
    <div className="lexical_editor_dropdown_wrapper">
      <button
        ref={buttonRef}
        onClick={() => setIsListVisible(!isListVisible)}
        className={clsx(
          'lexical_editor_dropdown_button',
          isListVisible && 'lexical_editor_dropdown_button__active'
        )}
      >
        {showValue ? activeValue : name}
        <div className="lexical_editor_dropdown_icon">
          <Icon icon={isListVisible ? 'arrow-up' : 'arrow-down'} />
        </div>
      </button>

      <div
        ref={listRef}
        className={clsx(
          'lexical_editor_dropdown_list',
          isListVisible && 'lexical_editor_dropdown_list__visible'
        )}
        style={
          listWidth
            ? {
                width: listWidth,
              }
            : {}
        }
      >
        {options.map((option) => (
          <div
            className={clsx(
              'lexical_editor_dropdown_option',
              activeValue === option.value &&
                'lexical_editor_dropdown_option__active'
            )}
            onClick={(event) => handleClick(event, option.value as string)}
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
    </div>
  );
};
