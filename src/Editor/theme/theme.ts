import type { EditorThemeClasses } from 'lexical';

import './theme.css';

export const theme: EditorThemeClasses = {
  text: {
    bold: 'lexicalEditorTheme__textBold',
    code: 'lexicalEditorTheme__textCode',
    italic: 'lexicalEditorTheme__textItalic',
    strikethrough: 'lexicalEditorTheme__textStrikethrough',
    subscript: 'lexicalEditorTheme__textSubscript',
    superscript: 'lexicalEditorTheme__textSuperscript',
    underline: 'lexicalEditorTheme__textUnderline',
    underlineStrikethrough: 'lexicalEditorTheme__textUnderlineStrikethrough',
  },
  list: {
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
    listitem: 'editor-listitem',
  },
};
