import { ToolbarConfig } from 'src/Editor/constants/models';

export const DEFAULT_INLINE_CONFIG = [
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'superscript',
  'subscript',
  'code',
];

export const DEFAULT_FONT_SIZE_OPTIONS = [
  { label: '8px', value: '8px' },
  { label: '9px', value: '9px' },
  { label: '10px', value: '10px' },
  { label: '11px', value: '11px' },
  { label: '12px', value: '12px' },
  { label: '15px', value: '15px' },
  { label: '14px', value: '14px' },
  { label: '16px', value: '16px' },
  { label: '18px', value: '18px' },
  { label: '20px', value: '20px' },
  { label: '24px', value: '24px' },
  { label: '28px', value: '28px' },
  { label: '32px', value: '32px' },
  { label: '36px', value: '36px' },
  { label: '40px', value: '40px' },
  { label: '48px', value: '48px' },
  { label: '56px', value: '56px' },
  { label: '64px', value: '64px' },
  { label: '72px', value: '72px' },
  { label: '80px', value: '80px' },
  { label: '96px', value: '96px' },
];

export const DEFAULT_FONT_FAMILY_OPTIONS = [
  { label: 'Arial', value: 'Arial' },
  { label: 'Verdana', value: 'Verdana' },
  { label: 'Courier New', value: 'Courier New' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Impact', value: 'Impact' },
];

export const DEFAULT_TEXT_ALIGN_OPTIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
  { label: 'Justify', value: 'justify' },
];

export const DEFAULT_BLOCK_TYPE_OPTIONS = [
  { label: 'Normal', value: 'paragraph' },
  { label: 'Quote', value: 'quote' },
  { label: 'Heading 1', value: 'h1' },
  { label: 'Heading 2', value: 'h2' },
  { label: 'Heading 3', value: 'h3' },
];

export enum BLOCK_TYPE {
  code = 'Code Block',
  h1 = 'Heading 1',
  h2 = 'Heading 2',
  h3 = 'Heading 3',
  h4 = 'Heading 4',
  h5 = 'Heading 5',
  h6 = 'Heading 6',
  paragraph = 'Normal',
  quote = 'Quote',
}

export const DEFAULT_TOOLBAR_CONFIG: ToolbarConfig = {
  inline: {
    display: true,
    options: DEFAULT_INLINE_CONFIG,
  },
  type: {
    display: true,
    options: DEFAULT_BLOCK_TYPE_OPTIONS,
  },
  fontSize: {
    display: true,
    options: DEFAULT_FONT_SIZE_OPTIONS,
  },
  undoRedo: {
    display: true,
  },
  fontFamily: {
    display: true,
    options: DEFAULT_FONT_FAMILY_OPTIONS,
  },
  align: {
    display: true,
    options: DEFAULT_TEXT_ALIGN_OPTIONS,
  },
  list: {
    display: true,
  },
  link: {
    display: true,
  },
};

export type ToolbarOverflow = 'scroll' | 'show';
