import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  CSSProperties,
} from 'react';
import { createPortal } from 'react-dom';
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
  onToolbarButtonClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  toolbarRef?: React.RefObject<HTMLDivElement>;
}

export const EditorDropdown = ({
  name,
  options,
  activeValue,
  onOptionClick,
  style,
  showValue = false,
  onToolbarButtonClick,
  toolbarRef,
}: EditorDropdownType) => {
  const [isListVisible, setIsListVisible] = useState(false);
  const [listPosition, setListPosition] = useState(null);
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

  const handleDropdownButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onToolbarButtonClick(event);
    setIsListVisible(!isListVisible);
  };

  useEffect(() => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();

      setListPosition({
        x: buttonRect.x,
        y: buttonRect.y + buttonRect.height,
      });
    }
  }, [buttonRef]);

  useEffect(() => {
    const toolbarScrollHandler = () => {
      setIsListVisible(false);

      const buttonRect = buttonRef.current.getBoundingClientRect();

      setListPosition({
        x: buttonRect.x,
        y: buttonRect.y + buttonRect.height,
      });
    };

    if (toolbarRef.current) {
      toolbarRef.current.addEventListener('scroll', toolbarScrollHandler);
    }

    return () =>
      toolbarRef.current.removeEventListener('scroll', toolbarScrollHandler);
  }, [toolbarRef]);

  return (
    <div className="lexical_editor_dropdown_wrapper">
      <button
        ref={buttonRef}
        onClick={(e) => handleDropdownButtonClick(e)}
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

      {isListVisible &&
        createPortal(
          <div
            ref={listRef}
            className={clsx('lexical_editor_dropdown_list')}
            style={{
              left: listPosition.x,
              top: listPosition.y,
            }}
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
          </div>,
          document.body
        )}
    </div>
  );
};
