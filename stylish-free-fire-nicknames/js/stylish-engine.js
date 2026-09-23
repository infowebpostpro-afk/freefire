/**
 * Free Fire Nickname Transformation Engine
 * High-speed Unicode font transforms, gaming frames, decoration levels & simpler-fallback resolution.
 */

const StylishEngine = {
  // 1. Unicode Font Alphabets
  alphabets: {
    smallCaps: {
      'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ',
      'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ',
      'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ',
      's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x',
      'y': 'ʏ', 'z': 'ᴢ'
    },
    boldSerif: {
      'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟',
      'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥',
      'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫',
      's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱',
      'y': '𝐲', 'z': '𝐳',
      'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅',
      'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋',
      'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑',
      'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗',
      'Y': '𝐘', 'Z': '𝐙',
      '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓',
      '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
    },
    boldSans: {
      'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳',
      'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹',
      'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿',
      's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅',
      'y': '𝘆', 'z': '𝘇',
      'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙',
      'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟',
      'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥',
      'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫',
      'Y': '𝗬', 'Z': '𝗭',
      '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱',
      '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
    },
    italicSerif: {
      'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓',
      'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙',
      'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟',
      's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥',
      'y': '𝑦', 'z': '𝑧',
      'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹',
      'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿',
      'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅',
      'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋',
      'Y': '𝑌', 'Z': '𝑍'
    },
    boldItalic: {
      'a': '𝒂', 'b': '𝒃', 'c': '𝒄', 'd': '𝒅', 'e': '𝒆', 'f': '𝒇',
      'g': '𝒈', 'h': '𝒉', 'i': '𝒊', 'j': '𝒋', 'k': '𝒌', 'l': '𝒍',
      'm': '𝒎', 'n': '𝒏', 'o': '𝒐', 'p': '𝒑', 'q': '𝒒', 'r': '𝒓',
      's': '𝒔', 't': '𝒕', 'u': '𝒖', 'v': '𝒗', 'w': '𝒘', 'x': '𝒙',
      'y': '𝒚', 'z': '𝒛',
      'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭',
      'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱', 'K': '𝑲', 'L': '𝑳',
      'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹',
      'S': '𝑺', 'T': '𝑻', 'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿',
      'Y': '𝒀', 'Z': '𝒁'
    },
    gothic: {
      'a': '𝖆', 'b': '𝖇', 'c': '𝖈', 'd': '𝖉', 'e': '𝖊', 'f': '𝖋',
      'g': '𝖌', 'h': '𝖍', 'i': '𝖎', 'j': '𝖏', 'k': '𝖐', 'l': '𝖑',
      'm': '𝖒', 'n': '𝖓', 'o': '𝖔', 'p': '𝖕', 'q': '𝖖', 'r': '𝖗',
      's': '𝖘', 't': '𝖙', 'u': '𝖚', 'v': '𝖛', 'w': '𝖜', 'x': '𝖝',
      'y': '𝖞', 'z': '𝖟',
      'A': '𝕬', 'B': '𝕭', 'C': '𝕮', 'D': '𝕯', 'E': '𝕰', 'F': '𝕱',
      'G': '𝕲', 'H': '𝕳', 'I': '𝕴', 'J': '𝕵', 'K': '𝕶', 'L': '𝕷',
      'M': '𝕸', 'N': '𝕹', 'O': '𝕺', 'P': '𝕻', 'Q': '𝕼', 'R': '𝕽',
      'S': '𝕾', 'T': '𝕿', 'U': '𝖀', 'V': '𝖁', 'W': '𝖂', 'X': '𝖃',
      'Y': '𝖄', 'Z': '𝖅'
    },
    doubleStruck: {
      'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗',
      'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝',
      'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣',
      's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩',
      'y': '𝕪', 'z': '𝕫',
      'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽',
      'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃',
      'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ',
      'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏',
      'Y': '𝕐', 'Z': 'ℤ',
      '0': '𝟘', '1': '𝟙', '2': '𝟚', '3': '𝟛', '4': '𝟜', '5': '𝟝',
      '6': '𝟞', '7': '𝟟', '8': '𝟠', '9': '𝟡'
    },
    script: {
      'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯',
      'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳', 'k': '𝕜', 'l': '𝓵',
      'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻',
      's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁',
      'y': '𝔂', 'z': '𝔃',
      'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕',
      'G': '𝓖', 'H': '𝓗', 'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛',
      'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡',
      'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧',
      'Y': '', 'Z': '𝓩'
    },
    fullwidth: {
      'a': 'ａ', 'b': 'ｂ', 'c': 'ｃ', 'd': 'ｄ', 'e': 'ｅ', 'f': 'ｆ',
      'g': 'ｇ', 'h': 'ｈ', 'i': 'ｉ', 'j': 'ｊ', 'k': 'ｋ', 'l': 'ｌ',
      'm': 'ｍ', 'n': 'ｎ', 'o': 'ｏ', 'p': 'ｐ', 'q': 'ｑ', 'r': 'ｒ',
      's': 'ｓ', 't': 'ｔ', 'u': 'ｕ', 'v': 'ｖ', 'w': 'ｗ', 'x': 'ｘ',
      'y': 'ｙ', 'z': 'ｚ',
      'A': 'Ａ', 'B': 'Ｂ', 'C': 'Ｃ', 'D': 'Ｄ', 'E': 'Ｅ', 'F': 'Ｆ',
      'G': 'Ｇ', 'H': 'Ｈ', 'I': 'Ｉ', 'J': 'Ｊ', 'K': 'Ｋ', 'L': 'Ｌ',
      'M': 'Ｍ', 'N': 'Ｎ', 'O': 'Ｏ', 'P': 'Ｐ', 'Q': 'Ｑ', 'R': 'Ｒ',
      'S': 'Ｓ', 'T': 'Ｔ', 'U': 'Ｕ', 'V': 'Ｖ', 'W': 'Ｗ', 'X': 'Ｘ',
      'Y': 'Ｙ', 'Z': 'Ｚ',
      '0': '０', '1': '１', '2': '２', '3': '３', '4': '４', '5': '５',
      '6': '６', '7': '７', '8': '８', '9': '９'
    },
    monospace: {
      'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏',
      'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕',
      'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛',
      's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡',
      'y': '𝚢', 'z': '𝚣',
      'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵',
      'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹', 'K': '𝙺', 'L': '𝙻',
      'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁',
      'S': '𝚂', 'T': '𝚃', 'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇',
      'Y': '𝚈', 'Z': '𝚉',
      '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻',
      '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'
    }
  },

  // 2. Text Transformation Helper
  transformText(text, fontType) {
    if (!text) return "";
    switch (fontType) {
      case 'smallcaps': {
        const map = this.alphabets.smallCaps;
        return text.toLowerCase().split('').map(c => map[c] || c).join('');
      }
      case 'bold': {
        const map = this.alphabets.boldSerif;
        return text.split('').map(c => map[c] || c).join('');
      }
      case 'bold-sans': {
        const map = this.alphabets.boldSans;
        return text.split('').map(c => map[c] || c).join('');
      }
      case 'italic': {
        const map = this.alphabets.italicSerif;
        return text.split('').map(c => map[c] || c).join('');
      }
      case 'bold-italic': {
        const map = this.alphabets.boldItalic;
        return text.split('').map(c => map[c] || c).join('');
      }
      case 'gothic': {
        const map = this.alphabets.gothic;
        return text.split('').map(c => map[c] || c).join('');
      }
      case 'double-struck': {
        const map = this.alphabets.doubleStruck;
        return text.split('').map(c => map[c] || c).join('');
      }
      case 'script': {
        const map = this.alphabets.script;
        return text.split('').map(c => map[c] || c).join('');
      }
      case 'fullwidth': {
        const map = this.alphabets.fullwidth;
        return text.split('').map(c => map[c] || c).join('');
      }
      case 'monospace': {
        const map = this.alphabets.monospace;
        return text.split('').map(c => map[c] || c).join('');
      }
      case 'spaced': {
        return text.toUpperCase().split('').join(' ');
      }
      case 'uppercase': {
        return text.toUpperCase();
      }
      case 'lowercase': {
        return text.toLowerCase();
      }
      case 'none':
      default:
        return text;
    }
  },

  // 3. Transformation Styles Catalog
  stylesCatalog: [
    // -------------------------------------------------------------
    // SIMPLE LEVEL (Clean fonts, high readability, minimal/zero noise)
    // -------------------------------------------------------------
    {
      id: 'sc-simple',
      label: 'Small Caps',
      level: 'simple',
      category: 'smallcaps',
      transform: 'smallcaps',
      prefix: '',
      suffix: '',
      simplerId: 'plain-clean',
      desc: 'Clean condensed typography with maximum readability.'
    },
    {
      id: 'bold-simple',
      label: 'Bold Serif',
      level: 'simple',
      category: 'bold',
      transform: 'bold',
      prefix: '',
      suffix: '',
      simplerId: 'plain-clean',
      desc: 'Heavyweight authoritative letters with solid presence.'
    },
    {
      id: 'bold-sans-simple',
      label: 'Bold Sans',
      level: 'simple',
      category: 'bold',
      transform: 'bold-sans',
      prefix: '',
      suffix: '',
      simplerId: 'plain-clean',
      desc: 'Modern tactical sans-serif bold weight.'
    },
    {
      id: 'gothic-simple',
      label: 'Gothic Fraktur',
      level: 'simple',
      category: 'gothic',
      transform: 'gothic',
      prefix: '',
      suffix: '',
      simplerId: 'sc-simple',
      desc: 'Historic medieval German blackletter glyphs.'
    },
    {
      id: 'script-simple',
      label: 'Cursive Script',
      level: 'simple',
      category: 'symbols',
      transform: 'script',
      prefix: '',
      suffix: '',
      simplerId: 'bold-italic-simple',
      desc: 'Fluid flowing calligraphy script.'
    },
    {
      id: 'bold-italic-simple',
      label: 'Bold Italic',
      level: 'simple',
      category: 'bold',
      transform: 'bold-italic',
      prefix: '',
      suffix: '',
      simplerId: 'bold-simple',
      desc: 'Dynamic slanted gaming posture.'
    },
    {
      id: 'fullwidth-simple',
      label: 'Fullwidth Vapor',
      level: 'simple',
      category: 'clean',
      transform: 'fullwidth',
      prefix: '',
      suffix: '',
      simplerId: 'plain-clean',
      desc: 'Japanese fullwidth monospaced aesthetic.'
    },
    {
      id: 'monospace-simple',
      label: 'Terminal Monospace',
      level: 'simple',
      category: 'clean',
      transform: 'monospace',
      prefix: '',
      suffix: '',
      simplerId: 'plain-clean',
      desc: 'Code-terminal fixed-width typewriter style.'
    },
    {
      id: 'double-struck-simple',
      label: 'Double-Struck',
      level: 'simple',
      category: 'symbols',
      transform: 'double-struck',
      prefix: '',
      suffix: '',
      simplerId: 'bold-simple',
      desc: 'Mathematical blackboard hollow outlines.'
    },
    {
      id: 'spaced-simple',
      label: 'Spaced Upper',
      level: 'simple',
      category: 'clean',
      transform: 'spaced',
      prefix: '',
      suffix: '',
      simplerId: 'plain-clean',
      desc: 'Wide tracking cinematic gaming spacing.'
    },
    {
      id: 'plain-clean',
      label: 'Pure Clean',
      level: 'simple',
      category: 'clean',
      transform: 'none',
      prefix: '',
      suffix: '',
      simplerId: 'plain-clean',
      desc: 'Original standard name for zero-conflict pasting.'
    },

    // -------------------------------------------------------------
    // BALANCED LEVEL (Light gaming decoration, frames, single accents)
    // -------------------------------------------------------------
    {
      id: 'gaming-cross-sc',
      label: 'Cross Swords',
      level: 'balanced',
      category: 'gaming',
      transform: 'smallcaps',
      prefix: '乂',
      suffix: '乂',
      simplerId: 'sc-simple',
      desc: 'Classic Free Fire crossed blades flanking the name.'
    },
    {
      id: 'gaming-cross-bold',
      label: 'Bold Cross',
      level: 'balanced',
      category: 'gaming',
      transform: 'bold',
      prefix: '乂',
      suffix: '乂',
      simplerId: 'bold-simple',
      desc: 'Crossed blades with bold letterforms.'
    },
    {
      id: 'frame-japanese-sc',
      label: 'Japanese Frame',
      level: 'balanced',
      category: 'symbols',
      transform: 'smallcaps',
      prefix: '『',
      suffix: '』',
      simplerId: 'sc-simple',
      desc: 'Signature anime & manga bracket border.'
    },
    {
      id: 'frame-bold-brackets',
      label: 'Bold Brackets',
      level: 'balanced',
      category: 'symbols',
      transform: 'bold',
      prefix: '【',
      suffix: '】',
      simplerId: 'bold-simple',
      desc: 'Solid corner frames giving shield protection.'
    },
    {
      id: 'royal-crown-sc',
      label: 'Royal Crown',
      level: 'balanced',
      category: 'royal',
      transform: 'smallcaps',
      prefix: '♛',
      suffix: '♛',
      simplerId: 'sc-simple',
      desc: 'Grandmaster crown guard emblems.'
    },
    {
      id: 'royal-king-sc',
      label: 'Monarch King',
      level: 'balanced',
      category: 'royal',
      transform: 'bold',
      prefix: '♚',
      suffix: '♚',
      simplerId: 'bold-simple',
      desc: 'Heavy king chess piece insignia.'
    },
    {
      id: 'symbol-trident-sc',
      label: 'Trident Guard',
      level: 'balanced',
      category: 'gaming',
      transform: 'smallcaps',
      prefix: '亗',
      suffix: '亗',
      simplerId: 'sc-simple',
      desc: 'The iconic Free Fire trident badge on both sides.'
    },
    {
      id: 'symbol-star-sc',
      label: 'Star Sentinel',
      level: 'balanced',
      category: 'symbols',
      transform: 'smallcaps',
      prefix: '★',
      suffix: '★',
      simplerId: 'sc-simple',
      desc: 'Competitive star shields marking veteran rank.'
    },
    {
      id: 'symbol-thunder-bold',
      label: 'Thunder Blitz',
      level: 'balanced',
      category: 'gaming',
      transform: 'bold-sans',
      prefix: '⚡',
      suffix: '⚡',
      simplerId: 'bold-sans-simple',
      desc: 'High-voltage lightning speed emblems.'
    },
    {
      id: 'gothic-cross-balanced',
      label: 'Gothic Swords',
      level: 'balanced',
      category: 'gothic',
      transform: 'gothic',
      prefix: '乂',
      suffix: '乂',
      simplerId: 'gothic-simple',
      desc: 'Blackletter medieval typography with crossed swords.'
    },
    {
      id: 'gothic-slash-balanced',
      label: 'Gothic Slash',
      level: 'balanced',
      category: 'gothic',
      transform: 'gothic',
      prefix: '〆',
      suffix: '〆',
      simplerId: 'gothic-simple',
      desc: 'Japanese end-stroke slash marks framing gothic letters.'
    },
    {
      id: 'gaming-vector-sc',
      label: 'Vector Angle',
      level: 'balanced',
      category: 'gaming',
      transform: 'smallcaps',
      prefix: '⟨',
      suffix: '⟩',
      simplerId: 'sc-simple',
      desc: 'Precise angular crosshair brackets.'
    },
    {
      id: 'symbol-dot-sc',
      label: 'Tactical Bullet',
      level: 'balanced',
      category: 'symbols',
      transform: 'smallcaps',
      prefix: '•',
      suffix: '•',
      simplerId: 'sc-simple',
      desc: 'Subtle clean bullet dots centered on each side.'
    },

    // -------------------------------------------------------------
    // DECORATED LEVEL (Wings, layered emblems, ornate gaming frames)
    // -------------------------------------------------------------
    {
      id: 'wings-angel-sc',
      label: 'Angel Wings',
      level: 'decorated',
      category: 'gaming',
      transform: 'smallcaps',
      prefix: '꧁༒',
      suffix: '༒꧂',
      simplerId: 'gaming-cross-sc',
      desc: 'Supreme mythical Tibetan scroll & wing framing.'
    },
    {
      id: 'wings-angel-gothic',
      label: 'Gothic Wings',
      level: 'decorated',
      category: 'gothic',
      transform: 'gothic',
      prefix: '꧁༒',
      suffix: '༒꧂',
      simplerId: 'gothic-cross-balanced',
      desc: 'Ornate scrolls surrounding ancient Fraktur letters.'
    },
    {
      id: 'royal-wings-sc',
      label: 'Royal Wings',
      level: 'decorated',
      category: 'royal',
      transform: 'smallcaps',
      prefix: '༺',
      suffix: '༻',
      simplerId: 'royal-crown-sc',
      desc: 'Ethereal curved wing feathers.'
    },
    {
      id: 'trident-frame-sc',
      label: 'Trident Japanese Frame',
      level: 'decorated',
      category: 'gaming',
      transform: 'smallcaps',
      prefix: '亗『',
      suffix: '』亗',
      simplerId: 'frame-japanese-sc',
      desc: 'Combined Japanese brackets crowned by tridents.'
    },
    {
      id: 'smile-killer-sc',
      label: 'Deadly Smile',
      level: 'decorated',
      category: 'gaming',
      transform: 'smallcaps',
      prefix: '×͜× ',
      suffix: '',
      simplerId: 'sc-simple',
      desc: 'The viral anime menace smirking face.'
    },
    {
      id: 'dark-skull-sc',
      label: 'Shadow Skull',
      level: 'decorated',
      category: 'gaming',
      transform: 'smallcaps',
      prefix: '☠️',
      suffix: '☠️',
      simplerId: 'gaming-cross-sc',
      desc: 'Danger crossbones emblem for aggressive rushers.'
    },
    {
      id: 'royal-crown-wings',
      label: 'Crown of Glory',
      level: 'decorated',
      category: 'royal',
      transform: 'bold',
      prefix: '👑꧁',
      suffix: '꧂👑',
      simplerId: 'royal-crown-sc',
      desc: 'Imperial golden crown resting on ornate flourishes.'
    },
    {
      id: 'fire-slash-sc',
      label: 'Flame Slasher',
      level: 'decorated',
      category: 'gaming',
      transform: 'smallcaps',
      prefix: '🔥彡',
      suffix: '彡🔥',
      simplerId: 'gaming-cross-sc',
      desc: 'Blazing flame tails with tactical speed dashes.'
    },
    {
      id: 'star-shield-decorated',
      label: 'Star Diamond Shield',
      level: 'decorated',
      category: 'symbols',
      transform: 'bold',
      prefix: '★『',
      suffix: '』★',
      simplerId: 'symbol-star-sc',
      desc: 'Framed Japanese brackets locked with dual stars.'
    },
    {
      id: 'ninja-scroll-sc',
      label: 'Ninja Scroll',
      level: 'decorated',
      category: 'symbols',
      transform: 'smallcaps',
      prefix: '☬',
      suffix: '☬',
      simplerId: 'sc-simple',
      desc: 'Sacred warrior mandala emblems flanking the name.'
    },
    {
      id: 'heart-aesthetic-sc',
      label: 'Heart Blossom',
      level: 'decorated',
      category: 'symbols',
      transform: 'script',
      prefix: '♡',
      suffix: '♡',
      simplerId: 'script-simple',
      desc: 'Delicate heart accents for aesthetic and duo handles.'
    }
  ],

  // 4. Render a single template with given baseName
  render(baseName, template) {
    const raw = (baseName && baseName.trim()) ? baseName.trim() : "Shadow";
    const transformed = this.transformText(raw, template.transform);
    const prefix = template.prefix || "";
    const suffix = template.suffix || "";
    return `${prefix}${transformed}${suffix}`;
  },

  // 5. Retrieve simpler version of a template
  getSimplerVersion(template, baseName) {
    if (!template) return { template: this.stylesCatalog.find(s => s.id === 'plain-clean'), rendered: this.render(baseName, this.stylesCatalog.find(s => s.id === 'plain-clean')) };
    
    // Find target simpler template
    const simplerId = template.simplerId;
    const simplerTemplate = this.stylesCatalog.find(s => s.id === simplerId) || 
                            this.stylesCatalog.find(s => s.id === 'sc-simple') || 
                            this.stylesCatalog.find(s => s.id === 'plain-clean');
    
    return {
      template: simplerTemplate,
      rendered: this.render(baseName, simplerTemplate)
    };
  },

  // 6. Generate all variants matching filters
  generate(baseName, filterLevel = 'all', filterCategory = 'all') {
    const raw = (baseName && baseName.trim()) ? baseName.trim() : "Shadow";

    return this.stylesCatalog
      .filter(item => {
        if (filterLevel !== 'all' && item.level !== filterLevel) return false;
        if (filterCategory !== 'all') {
          if (filterCategory === 'symbols' && item.category !== 'symbols') return false;
          if (filterCategory === 'gaming' && item.category !== 'gaming') return false;
          if (filterCategory === 'smallcaps' && item.category !== 'smallcaps') return false;
          if (filterCategory === 'bold' && item.category !== 'bold') return false;
          if (filterCategory === 'gothic' && item.category !== 'gothic') return false;
          if (filterCategory === 'royal' && item.category !== 'royal') return false;
          if (filterCategory === 'clean' && item.category !== 'clean') return false;
        }
        return true;
      })
      .map(item => {
        const rendered = this.render(raw, item);
        const simpler = this.getSimplerVersion(item, raw);
        return {
          ...item,
          rendered,
          simplerRendered: simpler.rendered,
          simplerTemplate: simpler.template
        };
      });
  },

  // 7. Calculate character stats
  calculateStats(str) {
    const chars = Array.from(str || '');
    return {
      length: chars.length,
      isOverFreeFireLimit: chars.length > 12 // 12-char advisory note
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = StylishEngine;
}
