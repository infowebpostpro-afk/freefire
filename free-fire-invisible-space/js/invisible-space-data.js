/**
 * Free Fire Invisible Space - Data & Character Definitions
 * Verified against standard Unicode specifications (U+3164, U+00A0, U+2800, U+FFA0).
 * Reflects genuine September 2026 SERP findings: conflicting third-party compatibility reports,
 * transparent fallback workflow, and in-game verification principles.
 */

const INVISIBLE_CHARACTERS = [
  {
    id: 'u3164',
    optionLetter: 'Option A',
    code: 'U+3164',
    name: 'Hangul Filler',
    standardName: 'HANGUL FILLER',
    char: '\u3164',
    status: 'Needs Site Verification',
    statusClass: 'status-unverified',
    category: 'Letter, other (Lo)',
    displayWidth: 'Full character cell width',
    description: 'Traditionally the most widely cited invisible character for Free Fire names and clan tags. Third-party reports currently conflict on whether it remains accepted across all server regions.',
    technicalNotes: 'Unicode category: Letter, other (Lo). Standardized Unicode name: HANGUL FILLER. Technically a Korean script filler character rather than an ordinary typographic space.',
    fallbackReason: 'Primary testing candidate. If rejected in your Free Fire client, switch directly to Option B (U+00A0).'
  },
  {
    id: 'u00a0',
    optionLetter: 'Option B',
    code: 'U+00A0',
    name: 'No-Break Space (NBSP)',
    standardName: 'NO-BREAK SPACE',
    char: '\u00A0',
    status: 'Needs Site Verification',
    statusClass: 'status-unverified',
    category: 'Separator, space (Zs)',
    displayWidth: 'Standard space width',
    description: 'An official Unicode space character that prevents line breaks. Recommended by certain competitors as their primary working option, but permanent compatibility remains unverified.',
    technicalNotes: 'Unicode category: Separator, space (Zs). Standardized Unicode name: NO-BREAK SPACE. Has regular space width but does not contain a visible symbol.',
    fallbackReason: 'First fallback option if U+3164 is blocked or stripped by game client sanitization.'
  },
  {
    id: 'u2800',
    optionLetter: 'Option C',
    code: 'U+2800',
    name: 'Braille Pattern Blank',
    standardName: 'BRAILLE PATTERN BLANK',
    char: '\u2800',
    status: 'Needs Site Verification',
    statusClass: 'status-unverified',
    category: 'Other Symbol (So)',
    displayWidth: 'Fixed monospace braille cell',
    description: 'An empty braille cell with all dots unraised. Unicode explicitly notes that it may render as a fixed-width blank without technically behaving as a typographic space.',
    technicalNotes: 'Unicode category: Other Symbol (So). Standardized Unicode name: BRAILLE PATTERN BLANK. Rendered as an empty symbol in standard Unicode fonts.',
    fallbackReason: 'Second fallback option when game sanitizers specifically target whitespace (Zs) categories.'
  },
  {
    id: 'uffa0',
    optionLetter: 'Option D',
    code: 'U+FFA0',
    name: 'Halfwidth Hangul Filler',
    standardName: 'HALFWIDTH HANGUL FILLER',
    char: '\uFFA0',
    status: 'Narrow Alternative',
    statusClass: 'status-tech',
    category: 'Letter, other (Lo)',
    displayWidth: 'Half-width character cell',
    description: 'Halfwidth variant of the Hangul Filler, occupying a narrower visual width for subtle spacing between clan tags and names.',
    technicalNotes: 'Unicode category: Letter, other (Lo). Standardized Unicode name: HALFWIDTH HANGUL FILLER. Compatibility varies by font fallback.',
    fallbackReason: 'Useful when standard spacing creates too wide of a gap in your nickname.'
  }
];

const COMPATIBILITY_MATRIX = [
  {
    character: 'U+3164 Hangul Filler',
    code: 'U+3164',
    category: 'Letter, other (Lo)',
    apparentWidth: 'Full Cell',
    currentStatus: 'Unverified (Conflicting Reports)',
    statusBadge: 'status-badge-warn',
    recommendation: 'Primary candidate to test first. If rejected, immediately switch to Option B.'
  },
  {
    character: 'U+00A0 No-Break Space',
    code: 'U+00A0',
    category: 'Separator, space (Zs)',
    apparentWidth: 'Word Space',
    currentStatus: 'Unverified (Third-Party Claim)',
    statusBadge: 'status-badge-warn',
    recommendation: 'Primary fallback if Hangul Filler is filtered by regional game validation.'
  },
  {
    character: 'U+2800 Braille Blank',
    code: 'U+2800',
    category: 'Other Symbol (So)',
    apparentWidth: 'Fixed Cell',
    currentStatus: 'Unverified (Alternative)',
    statusBadge: 'status-badge-info',
    recommendation: 'Use when looking for a blank symbol that does not classify as standard whitespace.'
  },
  {
    character: 'U+FFA0 Halfwidth Filler',
    code: 'U+FFA0',
    category: 'Letter, other (Lo)',
    apparentWidth: 'Narrow Gap',
    currentStatus: 'Unverified (Alternative)',
    statusBadge: 'status-badge-info',
    recommendation: 'Ideal for compact gaps between letters or subtle clan tag separation.'
  }
];

const TROUBLESHOOTING_GUIDES = [
  {
    id: 'rejected',
    title: 'Name Rejected / Invalid Characters',
    icon: '❌',
    summary: 'Free Fire displays "Nickname contains invalid characters" or refuses to save the new name.',
    causes: [
      'The current game patch or your regional server may filter Hangul Filler (U+3164).',
      'The nickname may exceed Free Fire\'s strict 12-character limit (each invisible space counts as 1 slot).',
      'Certain server regions reject nicknames composed purely of non-alphanumeric characters.'
    ],
    solutions: [
      'Switch immediately to Option B (U+00A0 No-Break Space) or Option C (U+2800 Braille Blank).',
      'Ensure your nickname contains at least 1 or 2 visible letters or numbers.',
      'Check character count: keep visible letters plus invisible spaces under 12 characters.'
    ],
    recommendedCharId: 'u00a0'
  },
  {
    id: 'disappeared',
    title: 'Space Disappeared / Words Collapsed',
    icon: '👻',
    summary: 'You pasted the space, but the words joined back together with no visible gap.',
    causes: [
      'Free Fire\'s text field trimmed consecutive or standard whitespace characters.',
      'A normal keyboard space (ASCII 32) was pasted instead of an invisible Unicode filler.',
      'The space was placed at the very start or end where the game engine trims whitespace.'
    ],
    solutions: [
      'Use Option A (U+3164 Hangul Filler) or Option C (U+2800 Braille Blank), which are categorized as letters/symbols rather than whitespace.',
      'Place the invisible character strictly between two visible letters (e.g. DARK[space]KING).',
      'Try 2 consecutive invisible spaces for a wider, more distinct separation.'
    ],
    recommendedCharId: 'u3164'
  },
  {
    id: 'box',
    title: 'Shows a Square Box □ or Question Mark',
    icon: '🔲',
    summary: 'Instead of an invisible gap, a hollow box (tofu) or question mark symbol appears.',
    causes: [
      'Your phone operating system or game font renderer lacks the glyph map for that specific Unicode character.',
      'A custom keyboard clipboard manager corrupted or replaced the Unicode character on paste.'
    ],
    solutions: [
      'Switch to Option B (U+00A0 No-Break Space), which is universally supported across virtually all fonts.',
      'Alternatively, try Option C (U+2800 Braille Pattern Blank).',
      'Use our Character Inspector / Clipboard Tester to confirm what was actually copied.'
    ],
    recommendedCharId: 'u00a0'
  },
  {
    id: 'nothing',
    title: 'Nothing Pasted / Clipboard Appears Empty',
    icon: '📋',
    summary: 'Tapping paste appears to do nothing because the character is completely invisible.',
    causes: [
      'Because the character has no visible glyph, it may have pasted successfully without visual indication.',
      'Browser clipboard permissions might have failed on certain mobile browsers.'
    ],
    solutions: [
      'Type "A", paste the character, then type "B". If you see "A B", the invisible space was pasted successfully!',
      'Tap the Copy button again and watch for the "✓ Copied" confirmation notification.',
      'Paste into our Paste-Back Unicode Detector below to verify the character is on your clipboard.'
    ],
    recommendedCharId: 'u3164'
  },
  {
    id: 'exists',
    title: 'Name Already Exists (Unavailable)',
    icon: '🚫',
    summary: 'The game reports that the nickname is already taken, especially when trying a blank name.',
    causes: [
      'Another player has already registered that identical sequence of invisible characters on your server.',
      'A blank-looking nickname still contains specific underlying Unicode characters.'
    ],
    solutions: [
      'Change the quantity of invisible spaces (e.g., use 2 or 4 characters instead of 3).',
      'Mix different Unicode characters (e.g., combine U+3164 with U+00A0 or U+2800).',
      'Add a small visible accent or gaming symbol (e.g. 亗 or ★) to make the sequence unique.'
    ],
    recommendedCharId: 'u2800'
  },
  {
    id: 'too-long',
    title: 'Name Too Long / Exceeds 12-Char Limit',
    icon: '📏',
    summary: 'Free Fire says the nickname is too long even though it appears short on screen.',
    causes: [
      'Free Fire enforces a strict 12-character limit. Invisible characters take up full character slots!',
      'Adding 3 invisible spaces to an 11-letter name produces 14 characters, causing rejection.'
    ],
    solutions: [
      'Reduce the invisible space count from 2 or 3 down to a single space.',
      'Shorten the visible nickname text to 7–9 characters to leave room for spacing.',
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
  { code: 'U+3164', char: '\u3164', name: 'Hangul Filler', category: 'Letter, other (Lo)' },
  { code: 'U+00A0', char: '\u00A0', name: 'No-Break Space', category: 'Separator, space (Zs)' },
  { code: 'U+2800', char: '\u2800', name: 'Braille Pattern Blank', category: 'Other Symbol (So)' },
  { code: 'U+FFA0', char: '\uFFA0', name: 'Halfwidth Hangul Filler', category: 'Letter, other (Lo)' },
  { code: 'U+2000', char: '\u2000', name: 'En Quad', category: 'Separator, space (Zs)' },
  { code: 'U+2001', char: '\u2001', name: 'Em Quad', category: 'Separator, space (Zs)' },
  { code: 'U+2002', char: '\u2002', name: 'En Space', category: 'Separator, space (Zs)' },
  { code: 'U+2003', char: '\u2003', name: 'Em Space', category: 'Separator, space (Zs)' },
  { code: 'U+2004', char: '\u2004', name: 'Three-Per-Em Space', category: 'Separator, space (Zs)' },
  { code: 'U+2005', char: '\u2005', name: 'Four-Per-Em Space', category: 'Separator, space (Zs)' },
  { code: 'U+2006', char: '\u2006', name: 'Six-Per-Em Space', category: 'Separator, space (Zs)' },
  { code: 'U+2007', char: '\u2007', name: 'Figure Space', category: 'Separator, space (Zs)' },
  { code: 'U+2008', char: '\u2008', name: 'Punctuation Space', category: 'Separator, space (Zs)' },
  { code: 'U+2009', char: '\u2009', name: 'Thin Space', category: 'Separator, space (Zs)' },
  { code: 'U+200A', char: '\u200A', name: 'Hair Space', category: 'Separator, space (Zs)' },
  { code: 'U+200B', char: '\u200B', name: 'Zero Width Space', category: 'Other, format (Cf)' },
  { code: 'U+202F', char: '\u202F', name: 'Narrow No-Break Space', category: 'Separator, space (Zs)' },
  { code: 'U+205F', char: '\u205F', name: 'Medium Mathematical Space', category: 'Separator, space (Zs)' },
  { code: 'U+3000', char: '\u3000', name: 'Ideographic Space', category: 'Separator, space (Zs)' }
];
