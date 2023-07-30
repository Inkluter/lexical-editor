import type { EditorThemeClasses } from 'lexical';

import './theme.css';

export const theme: EditorThemeClasses = {
  paragraph: 'lexical_editor__paragraph',
  text: {
    bold: 'lexical_editor__text_bold',
    code: 'lexical_editor__text_code',
    italic: 'lexical_editor__text_italic',
    strikethrough: 'lexical_editor__text_strikethrough',
    subscript: 'lexical_editor__text_subscript',
    superscript: 'lexical_editor__text_superscript',
    underline: 'lexical_editor__text_underline',
    underlineStrikethrough: 'lexical_editor__text_underline_strikethrough',
  },
  quote: 'lexical_editor__quote',
  list: {
    listitem: 'lexical_editor__list_item',
    nested: {
      listitem: 'lexical_editor__nested_list_item',
    },
    olDepth: [
      'lexical_editor__ol1',
      'lexical_editor__ol2',
      'lexical_editor__ol3',
      'lexical_editor__ol4',
      'lexical_editor__ol5',
    ],
    ul: 'lexical_editor__ul',
  },
};
