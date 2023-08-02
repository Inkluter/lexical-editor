import { ToolbarItem } from 'src/Editor/constants/enums';

export interface Option {
  label: string;
  value: string | number;
}

export interface ACTIVE_FORMATS_TYPE {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  code: boolean;
  subscript: boolean;
  superscript: boolean;
}

export interface ToolbarConfig {
  inline: {
    display: boolean;
    options: Array<string>;
  };
  type: {
    display: boolean;
    options: Array<Option>;
  };
  fontSize: {
    display: boolean;
    options: Array<Option>;
  };
  undoRedo: {
    display: boolean;
  };
  fontFamily: {
    display: boolean;
    options: Array<Option>;
  };
  align: {
    display: boolean;
    options: Array<Option>;
  };
  list: {
    display: boolean;
  };
  link: {
    display: boolean;
  };
}
