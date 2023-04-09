import React from 'react';
import { Option } from '../../../constants/models';
import styles from './EditorDropdown.module.css';

interface EditorDropdownType {
  name: string;
  options: Array<Option>;
  onChange: (option: string | number) => void;
}

export const EditorDropdown = ({
  name,
  options,
  onChange,
}: EditorDropdownType) => {
  return (
    <div>
      <div>
        <span>{name}</span>
      </div>
      {options.map((option) => (
        <div onClick={() => onChange(option.value)} key={option.value}>
          {option.label}
        </div>
      ))}
    </div>
  );
};
