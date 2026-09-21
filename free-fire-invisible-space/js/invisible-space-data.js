/**
 * Free Fire Invisible Space - Data & Character Definitions
 * Unicode characters, troubleshooting decision tree, and curated battle-tested examples.
 */

const INVISIBLE_CHARACTERS = [
  {
    id: 'u3164',
    code: 'U+3164',
    name: 'Hangul Filler',
    char: '\u3164',
    status: 'Commonly Used',
    statusClass: 'status-common',
    description: 'The most popular invisible character used in Free Fire nicknames and clan tags.',
    displayWidth: 'Standard space width (acts like a regular full character cell)',
    technicalNotes: 'Unicode category: Letter, other (Lo). Does not collapse like regular whitespace in many game engines.',
    fallbackReason: 'Primary recommendation for both spaced names and blank name attempts.'
  },
  {
    id: 'u00a0',
    code: 'U+00A0',
    name: 'No-Break Space (NBSP)',
    char: '\u00A0',
    status: 'Alternative',
    statusClass: 'status-alt',
    description: 'Prevents automatic line breaks and often accepted as a single gap in game names.',
    displayWidth: 'Standard word space width',
    technicalNotes: 'Unicode category: Separator, space (Zs). May collapse in some versions if placed adjacent to another space.',
    fallbackReason: 'Try this if U+3164 is rejected as an invalid Hangul character on your server.'
  },
  {
    id: 'u2800',
    code: 'U+2800',
    name: 'Braille Pattern Blank',
    char: '\u2800',
    status: 'Alternative',
    statusClass: 'status-alt',
    description: 'A blank braille cell with all 6 or 8 dots unraised, creating an empty glyph.',
    displayWidth: 'Fixed monospace braille cell width',
    technicalNotes: 'Unicode category: Other Symbol (So). Rendered as an empty glyph in standard Unicode fonts.',
    fallbackReason: 'Useful if game sanitization strips whitespace categories (Zs).'
  },
  {
    id: 'uffa0',
    code: 'U+FFA0',
    name: 'Halfwidth Hangul Filler',
    char: '\uFFA0',
    status: 'Alternative',
    statusClass: 'status-alt',
    description: 'Halfwidth variant of the Hangul Filler, producing a narrower invisible separation.',
    displayWidth: 'Half-width character gap',
    technicalNotes: 'Unicode category: Letter, other (Lo). Compatibility depends on Asian font fallback support.',
    fallbackReason: 'Try when you need a smaller, more subtle space between words or symbols.'
  },
  {
    id: 'u2000',
    code: 'U+2000',
    name: 'En Quad',
    char: '\u2000',
    status: 'Technical Alternative',
    statusClass: 'status-tech',
    description: 'Typographical space character with a width equal to one en (approx. half an em).',
    displayWidth: 'En width (medium gap)',
    technicalNotes: 'Unicode category: Separator, space (Zs).',
    fallbackReason: 'Useful if testing alternative typographic spaces.'
  },
  {
    id: 'u205f',
    code: 'U+205F',
    name: 'Medium Mathematical Space',
    char: '\u205F',
    status: 'Technical Alternative',
    statusClass: 'status-tech',
    description: 'A 4/18 em space used in mathematical notation.',
    displayWidth: 'Compact gap',
    technicalNotes: 'Unicode category: Separator, space (Zs).',
    fallbackReason: 'Alternative whitespace character for narrow spacing.'
  }
];

const TROUBLESHOOTING_GUIDES = [
  {
    id: 'rejected',
    title: 'Name Rejected / Invalid Name',
    icon: '❌',
    summary: 'The game displays "Nickname contains invalid characters" or refuses to save.',
    causes: [
      'The current game patch or your regional server may have restricted Hangul (U+3164) characters.',
      'The total character byte length might exceed Free Fire\'s 12-character limit.',
      'Some servers reject names composed entirely of non-alphanumeric characters.'
    ],
    solutions: [
      'Try switching to the No-Break Space (U+00A0) or Braille Blank (U+2800).',
      'Ensure you have at least 1–2 visible alphanumeric letters in your nickname.',
      'Shorten the visible part of the name so the total count stays under 12 characters.'
    ],
    recommendedCharId: 'u00a0'
  },
  {
    id: 'disappeared',
    title: 'Space Disappeared / Collapsed',
    icon: '👻',
    summary: 'You pasted the space, but the words joined back together with no gap.',
    causes: [
      'The game\'s text input field stripped leading, trailing, or consecutive standard whitespace.',
      'A normal keyboard space was used instead of an invisible Unicode filler.'
    ],
    solutions: [
      'Use the Hangul Filler (U+3164) instead of standard space, as it is classified as a letter glyph rather than whitespace.',
      'Avoid placing invisible spaces at the very beginning or end of your name if your client trims strings.',
      'Combine 2 invisible fillers for a more noticeable separation.'
    ],
    recommendedCharId: 'u3164'
  },
  {
    id: 'box',
    title: 'Shows a Box □ or Question Mark',
    icon: '🔲',
    summary: 'Instead of an invisible gap, a hollow rectangle (tofu) or "?" appears.',
    causes: [
      'Your phone OS or device font renderer lacks the glyph map for that specific Unicode point.',
      'Some custom Android keyboard clipboards corrupt complex Unicode sequences upon paste.'
    ],
    solutions: [
      'Switch immediately to Braille Pattern Blank (U+2800) or No-Break Space (U+00A0).',
      'Copy directly using our tool button rather than typing through your keyboard.',
      'Verify the character using our Character Inspector before pasting into the game.'
    ],
    recommendedCharId: 'u2800'
  },
  {
    id: 'nothing',
    title: 'Nothing Pasted / Clipboard Empty',
    icon: '📋',
    summary: 'Tapping paste does nothing or produces no visible change in the input.',
    causes: [
      'Because the character is 100% invisible, it may have pasted successfully without visible feedback.',
      'Browser clipboard permissions might have blocked the copy action.'
    ],
    solutions: [
      'Type a test letter like "A", paste the invisible space, then type "B". If "A B" has a gap, it worked!',
      'Click the "Copy Invisible Space" button again and ensure the "✓ Copied!" toast appears.',
      'Test your clipboard in our Character Inspector below to verify it contains invisible characters.'
    ],
    recommendedCharId: 'u3164'
  },
  {
    id: 'too-long',
    title: 'Name Too Long / Exceeds Limit',
    icon: '📏',
    summary: 'The game tells you the nickname is too long even though it looks short.',
    causes: [
      'Free Fire strictly counts character units (maximum 12). Invisible characters count toward this limit!',
      'Each invisible space consumes 1 full character slot.'
    ],
    solutions: [
      'Reduce the number of invisible spaces (e.g. use 1 space instead of 3).',
      'Shorten the visible nickname text to 6–9 characters to leave room for gaps.',
      'Check the live character counter in our Nickname Builder before copying.'
    ],
    recommendedCharId: 'u3164'
  }
];

const READY_MADE_EXAMPLES = [
  { name: 'DARK   KING', raw: 'DARK\u3164\u3164\u3164KING', tag: 'Aggressive' },
  { name: 'PRO   PLAYER', raw: 'PRO\u3164\u3164\u3164PLAYER', tag: 'Classic' },
  { name: 'GHOST   FF', raw: 'GHOST\u3164\u3164\u3164FF', tag: 'Stealth' },
  { name: '亗   SHADOW', raw: '亗\u3164\u3164\u3164SHADOW', tag: 'Trident' },
  { name: 'KING   亗', raw: 'KING\u3164\u3164\u3164亗', tag: 'Crown' },
  { name: '⚡   THUNDER', raw: '⚡\u3164\u3164\u3164THUNDER', tag: 'Energy' },
  { name: 'S N I P E R', raw: 'S\u3164N\u3164I\u3164P\u3164E\u3164R', tag: 'Spaced' },
  { name: 'V I P E R', raw: 'V\u3164I\u3164P\u3164E\u3164R', tag: 'Spaced' },
  { name: 'BAD   BOY', raw: 'BAD\u3164\u3164\u3164BOY', tag: 'Popular' },
  { name: 'NOOB   KILLER', raw: 'NOOB\u3164\u3164KILLER', tag: 'Humor' },
  { name: '꧁   FIRE   ꧂', raw: '꧁\u3164\u3164FIRE\u3164\u3164꧂', tag: 'Framed' },
  { name: 'ALPHA   007', raw: 'ALPHA\u3164\u3164007', tag: 'Squad' },
  { name: 'MR   DEVIL', raw: 'MR\u3164\u3164\u3164DEVIL', tag: 'Dark' },
  { name: 'TOXIC   99', raw: 'TOXIC\u3164\u3164\u316499', tag: 'Edgy' }
];

const INVISIBLE_REGEX_CHARS = [
  { code: 'U+3164', char: '\u3164', name: 'Hangul Filler' },
  { code: 'U+00A0', char: '\u00A0', name: 'No-Break Space' },
  { code: 'U+2800', char: '\u2800', name: 'Braille Pattern Blank' },
  { code: 'U+FFA0', char: '\uFFA0', name: 'Halfwidth Hangul Filler' },
  { code: 'U+2000', char: '\u2000', name: 'En Quad' },
  { code: 'U+2001', char: '\u2001', name: 'Em Quad' },
  { code: 'U+2002', char: '\u2002', name: 'En Space' },
  { code: 'U+2003', char: '\u2003', name: 'Em Space' },
  { code: 'U+2004', char: '\u2004', name: 'Three-Per-Em Space' },
  { code: 'U+2005', char: '\u2005', name: 'Four-Per-Em Space' },
  { code: 'U+2006', char: '\u2006', name: 'Six-Per-Em Space' },
  { code: 'U+2007', char: '\u2007', name: 'Figure Space' },
  { code: 'U+2008', char: '\u2008', name: 'Punctuation Space' },
  { code: 'U+2009', char: '\u2009', name: 'Thin Space' },
  { code: 'U+200A', char: '\u200A', name: 'Hair Space' },
  { code: 'U+200B', char: '\u200B', name: 'Zero Width Space' },
  { code: 'U+202F', char: '\u202F', name: 'Narrow No-Break Space' },
  { code: 'U+205F', char: '\u205F', name: 'Medium Mathematical Space' },
  { code: 'U+3000', char: '\u3000', name: 'Ideographic Space' }
];
