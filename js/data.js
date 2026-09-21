/**
 * Free Fire Nickname Studio - Data Engine
 * Research-based Unicode font maps, symbols library, Free Fire decoration patterns,
 * and battle-tested themed presets tailored for mobile gaming players.
 */

// Comprehensive Unicode Font Transformations for Free Fire
const FONT_MAPS = {
  normal: (text) => text,

  // Small Capitals: e.g. ᴅᴀʀᴋ ᴋɪɴɢ
  smallCaps: (text) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const sc = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ';
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? sc[idx] : c;
    }).join('');
  },

  // Bold Serif: 𝐃𝐚𝐫𝐤 𝐊𝐢𝐧𝐠
  bold: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const boldChars = '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗';
    const boldArr = Array.from(boldChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? boldArr[idx] : c;
    }).join('');
  },

  // Bold Sans-Serif: 𝗗𝗮𝗿𝗸 𝗞𝗶𝗻𝗴
  boldSans: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const boldSansChars = '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵';
    const arr = Array.from(boldSansChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? arr[idx] : c;
    }).join('');
  },

  // Italic Sans-Serif: 𝘋𝘢𝘳𝘬 𝘒𝘪𝘯𝘨
  italic: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const italicChars = '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝲘𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻';
    const italicArr = Array.from(italicChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? italicArr[idx] : c;
    }).join('');
  },

  // Bold Italic Sans: 𝘿𝙖𝙧𝙠 𝙆𝙞𝙣𝙜
  boldItalic: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const biChars = '𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯';
    const biArr = Array.from(biChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? biArr[idx] : c;
    }).join('');
  },

  // Gothic / Fraktur: 𝕯𝖆𝖗𝖐 𝕶𝖎𝖓𝖌
  gothic: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const gothicChars = '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟';
    const gothicArr = Array.from(gothicChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? gothicArr[idx] : c;
    }).join('');
  },

  // Light Fraktur: 𝔇𝔞𝔯𝔨 𝔎𝔦𝔫𝔤
  lightFraktur: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const lfChars = '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷';
    const lfArr = Array.from(lfChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? lfArr[idx] : c;
    }).join('');
  },

  // Script / Cursive: 𝒟𝒶𝓇𝓀 𝒦𝒾𝓃𝑔
  script: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const scriptChars = '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓉𝓾𝓿𝔀𝔁𝔂𝔩';
    const scriptArr = Array.from(scriptChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? scriptArr[idx] : c;
    }).join('');
  },

  // Double-Struck / Blackboard: 𝔻𝕒𝕣𝕜 𝕂𝕚𝕟𝕘
  doubleStruck: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const dsChars = '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝛄𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡';
    const dsArr = Array.from(dsChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? dsArr[idx] : c;
    }).join('');
  },

  // Monospace / Retro Hacker: 𝙳𝚊𝚛𝚔 𝙺𝚒𝚗𝚐
  monospace: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const monoChars = '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿';
    const monoArr = Array.from(monoChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? monoArr[idx] : c;
    }).join('');
  },

  // Fullwidth / Vaporwave: Ｄａｒｋ Ｋｉｎｇ
  fullwidth: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const fwChars = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９';
    const fwArr = Array.from(fwChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? fwArr[idx] : c;
    }).join('');
  },

  // Invisible Spaced (Using Hangul Filler U+3164 between uppercase letters)
  invisibleSpaced: (text) => {
    return text.toUpperCase().split('').join('\u3164');
  },

  // Letter Spaced: D A R K
  spaced: (text) => {
    return text.toUpperCase().split('').join(' ');
  },

  // Circled White: ⓓⓐⓡⓚ
  bubbles: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const bubbleChars = 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨';
    const bubbleArr = Array.from(bubbleChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? bubbleArr[idx] : c;
    }).join('');
  },

  // Circled Black / Inverted: 🅓🅐🅡🅚
  bubblesBlack: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const bbChars = ' his 🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🅓🅐🅡🅚';
    const map = {
      'a':'🅐','b':'🅑','c':'🅒','d':'🅓','e':'🅔','f':'🅕','g':'🅖','h':'🅗','i':'🅘','j':'🅙',
      'k':'🅚','l':'🅛','m':'🅜','n':'🅝','o':'🅞','p':'🅟','q':'🅠','r':'🅡','s':'🅢','t':'🅣',
      'u':'🅤','v':'🅥','w':'🅦','x':'🅧','y':'🅨','z':'🅩',
      'A':'🅐','B':'🅑','C':'🅒','D':'🅓','E':'🅔','F':'🅕','G':'🅖','H':'🅗','I':'🅘','J':'🅙',
      'K':'🅚','L':'🅛','M':'🅜','N':'🅝','O':'🅞','P':'🅟','Q':'🅠','R':'🅡','S':'🅢','T':'🅣',
      'U':'🅤','V':'🅥','W':'🅦','X':'🅧','Y':'🅨','Z':'🅩'
    };
    return text.split('').map(c => map[c] || c).join('');
  },

  // Squared White: [D][A][R][K]
  squares: (text) => {
    const map = {
      'a':'🄰','b':'🄱','c':'🄲','d':'🄳','e':'🄴','f':'🄵','g':'🄶','h':'🄷','i':'🄸','j':'🄹',
      'k':'🄺','l':'🄻','m':'🄼','n':'🄽','o':'🄾','p':'🄿','q':'🅀','r':'🅁','s':'🅂','t':'🅃',
      'u':'🅄','v':'🅅','w':'🅆','x':'🅇','y':'🅈','z':'🅉',
      'A':'🄰','B':'🄱','C':'🄲','D':'🄳','E':'🄴','F':'🄵','G':'🄶','H':'🄷','I':'🄸','J':'🄹',
      'K':'🄺','L':'🄻','M':'🄼','N':'🄽','O':'🄾','P':'🄿','Q':'🅀','R':'🅁','S':'🅂','T':'🅃',
      'U':'🅄','V':'🅅','W':'🅆','X':'🅇','Y':'🅈','Z':'🅉'
    };
    return text.split('').map(c => map[c] || c).join('');
  },

  // Superscript: ᴰᵃʳᵏ
  superscript: (text) => {
    const map = {
      'a':'ᵃ','b':'ᵇ','c':'ᶜ','d':'ᵈ','e':'ᵉ','f':'ᶠ','g':'ᵍ','h':'ʰ','i':'ⁱ','j':'ʲ',
      'k':'ᵏ','l':'ˡ','m':'ᵐ','n':'ⁿ','o':'ᵒ','p':'ᵖ','r':'ʳ','s':'ˢ','t':'ᵗ','u':'ᵘ',
      'v':'ᵛ','w':'ʷ','x':'ˣ','y':'ʸ','z':'ᶻ',
      'A':'ᴬ','B':'ᴮ','C':'ᶜ','D':'ᴰ','E':'ᴱ','F':'ᶠ','G':'ᴳ','H':'ᴴ','I':'ᴵ','J':'ᴶ',
      'K':'ᴷ','L':'ᴸ','M':'ᴹ','N':'ᴺ','O':'ᴼ','P':'ᴾ','R':'ᴿ','S':'ˢ','T':'ᵀ','U':'ᵁ',
      'V':'ⱽ','W':'ᵂ','X':'ˣ','Y':'ʸ','Z':'ᶻ','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'
    };
    return text.split('').map(c => map[c] || c).join('');
  },

  // Strikethrough: D̶a̶r̶k̶
  strikethrough: (text) => {
    return text.split('').map(c => c + '\u0336').join('');
  },

  // Slash-Through: D̷a̷r̷k̷
  slashthrough: (text) => {
    return text.split('').map(c => c + '\u0338').join('');
  },

  // Underlined: D̲a̲r̲k̲
  underline: (text) => {
    return text.split('').map(c => c + '\u0332').join('');
  },

  // Double Underlined: D̳a̳r̳k̳
  doubleUnderline: (text) => {
    return text.split('').map(c => c + '\u0333').join('');
  },

  // Leet (1337): D4RK K1NG
  leet: (text) => {
    const map = { 'a':'4', 'A':'4', 'e':'3', 'E':'3', 'i':'1', 'I':'1', 'o':'0', 'O':'0', 's':'5', 'S':'5', 't':'7', 'T':'7' };
    return text.split('').map(c => map[c] || c).join('');
  }
};

// Symbols Database
const SYMBOLS_DATABASE = [
  // Popular & Gaming Signature
  { char: '亗', name: 'Trident Crown of Power', cat: 'popular', tags: ['popular', 'crown', 'pro', 'signature', 'trident'] },
  { char: '꧁', name: 'Left Wing Ornamental Banner', cat: 'popular', tags: ['popular', 'wings', 'bracket', 'banner', 'extreme'] },
  { char: '꧂', name: 'Right Wing Ornamental Banner', cat: 'popular', tags: ['popular', 'wings', 'bracket', 'banner', 'extreme'] },
  { char: '༒', name: 'Tibetan Cross Honor', cat: 'popular', tags: ['popular', 'dark', 'royal', 'cross', 'pro'] },
  { char: '☬', name: 'Khanda Warrior Emblem', cat: 'popular', tags: ['popular', 'warrior', 'royal', 'weapon', 'pro'] },
  { char: '★', name: 'Solid Star', cat: 'stars', tags: ['stars', 'popular', 'clean', 'hero'] },
  { char: '☆', name: 'Hollow Star', cat: 'stars', tags: ['stars', 'clean'] },
  { char: '✦', name: 'Sparkle Star', cat: 'stars', tags: ['stars', 'sparkle', 'stylish'] },
  { char: '✧', name: 'Diamond Sparkle', cat: 'stars', tags: ['stars', 'luxury', 'stylish'] },
  { char: '✪', name: 'Circled Star', cat: 'stars', tags: ['stars', 'badge', 'military'] },
  
  // Crowns & Royal
  { char: '👑', name: 'Imperial Crown', cat: 'crown', tags: ['crown', 'royal', 'king', 'queen'] },
  { char: '♛', name: 'Black Queen Crown', cat: 'crown', tags: ['crown', 'queen', 'chess', 'royal', 'dark'] },
  { char: '♚', name: 'Black King Crown', cat: 'crown', tags: ['crown', 'king', 'chess', 'royal', 'dark'] },
  { char: '♕', name: 'White Queen Crown', cat: 'crown', tags: ['crown', 'queen', 'chess', 'royal', 'clean'] },
  { char: '♔', name: 'White King Crown', cat: 'crown', tags: ['crown', 'king', 'chess', 'royal', 'clean'] },
  
  // Weapons & Battle
  { char: '⚔', name: 'Crossed Swords', cat: 'weapons', tags: ['weapons', 'swords', 'battle', 'war', 'gaming'] },
  { char: '🗡', name: 'Dagger Blade', cat: 'weapons', tags: ['weapons', 'knife', 'dagger', 'ninja'] },
  { char: '🏹', name: 'Bow and Arrow', cat: 'weapons', tags: ['weapons', 'arrow', 'sniper', 'hunter'] },
  { char: '𓊈', name: 'Shield Guard Left', cat: 'weapons', tags: ['weapons', 'bracket', 'shield', 'armor'] },
  { char: '𓊉', name: 'Shield Guard Right', cat: 'weapons', tags: ['weapons', 'bracket', 'shield', 'armor'] },
  { char: '⌖', name: 'Sniper Scope Crosshair', cat: 'weapons', tags: ['weapons', 'crosshair', 'sniper', 'aim', 'gaming'] },
  { char: '🎯', name: 'Bullseye Target', cat: 'weapons', tags: ['weapons', 'target', 'headshot'] },
  
  // Skull & Dark
  { char: '☠', name: 'Skull and Crossbones', cat: 'skull', tags: ['skull', 'dark', 'death', 'poison', 'pirate'] },
  { char: '💀', name: 'Human Skull', cat: 'skull', tags: ['skull', 'dark', 'headshot', 'deadly'] },
  { char: '👻', name: 'Ghost Spectre', cat: 'skull', tags: ['skull', 'dark', 'ghost', 'cute'] },
  { char: '☣', name: 'Biohazard Warning', cat: 'skull', tags: ['skull', 'dark', 'toxic', 'hazard'] },
  { char: '☢', name: 'Radioactive Fallout', cat: 'skull', tags: ['skull', 'dark', 'toxic', 'nuclear'] },
  
  // Wings & Aesthetics
  { char: '𓆩', name: 'Hieroglyph Wing Left', cat: 'wings', tags: ['wings', 'aesthetic', 'pro', 'shield'] },
  { char: '𓆪', name: 'Hieroglyph Wing Right', cat: 'wings', tags: ['wings', 'aesthetic', 'pro', 'shield'] },
  { char: 'ʚ', name: 'Feather Wing Left', cat: 'wings', tags: ['wings', 'cute', 'aesthetic', 'angel'] },
  { char: 'ɞ', name: 'Feather Wing Right', cat: 'wings', tags: ['wings', 'cute', 'aesthetic', 'angel'] },
  
  // Japanese & Katakana
  { char: 'メ', name: 'Katakana Me Slash', cat: 'japanese', tags: ['japanese', 'ninja', 'slash', 'pro'] },
  { char: '乂', name: 'Cross Slash Scissors', cat: 'japanese', tags: ['japanese', 'ninja', 'slash', 'cross', 'pro'] },
  { char: '乡', name: 'Chinese Village Banner', cat: 'japanese', tags: ['japanese', 'pro', 'esports'] },
  { char: '父', name: 'Father Kanji Pillar', cat: 'japanese', tags: ['japanese', 'ninja', 'kanji'] },
  { char: '气', name: 'Chi Spirit Vapor', cat: 'japanese', tags: ['japanese', 'energy', 'spirit', 'ninja'] },
  { char: 'シ', name: 'Katakana Shi Smile', cat: 'japanese', tags: ['japanese', 'cute', 'anime'] },
  { char: 'ツ', name: 'Katakana Tsu Wink', cat: 'japanese', tags: ['japanese', 'cute', 'anime', 'smile'] },
  { char: '彡', name: 'Triple Slash Whisk', cat: 'japanese', tags: ['japanese', 'speed', 'slash'] },
  
  // Brackets
  { char: '『', name: 'Corner Bracket Left', cat: 'brackets', tags: ['brackets', 'clean', 'japanese', 'pro'] },
  { char: '』', name: 'Corner Bracket Right', cat: 'brackets', tags: ['brackets', 'clean', 'japanese', 'pro'] },
  { char: '【', name: 'Heavy Black Lenticular Left', cat: 'brackets', tags: ['brackets', 'heavy', 'pro'] },
  { char: '】', name: 'Heavy Black Lenticular Right', cat: 'brackets', tags: ['brackets', 'heavy', 'pro'] },
  { char: '《', name: 'Double Angle Left', cat: 'brackets', tags: ['brackets', 'stylish'] },
  { char: '》', name: 'Double Angle Right', cat: 'brackets', tags: ['brackets', 'stylish'] },
  
  // Lightning & Fire
  { char: '⚡', name: 'High Voltage Lightning', cat: 'lightning', tags: ['lightning', 'energy', 'fire', 'speed', 'thunder'] },
  { char: '🔥', name: 'Blazing Fire Flame', cat: 'lightning', tags: ['lightning', 'fire', 'flame', 'energy'] },
  { char: 'ϟ', name: 'Greek Koppa Spark', cat: 'lightning', tags: ['lightning', 'electric', 'sharp'] },
  
  // Invisible Space
  { char: 'ㅤ', name: 'Hangul Filler (Invisible Space)', cat: 'rare', tags: ['rare', 'invisible', 'space', 'blank', 'pro'] }
];

// Presets for Style Categories & Intensity (120+ research-based battle configurations)
const STYLE_PRESETS = {
  popular: [
    { prefix: '亗 ', suffix: ' 亗', font: 'smallCaps', intensity: 'clean', desc: 'Trident Small Caps' },
    { prefix: '亗 ', suffix: ' 亗', font: 'boldSans', intensity: 'clean', desc: 'Trident Bold Pro' },
    { prefix: '꧁༒', suffix: '༒꧂', font: 'bold', intensity: 'pro', desc: 'Classic Winged Banner' },
    { prefix: '『', suffix: '』', font: 'smallCaps', intensity: 'clean', desc: 'Japanese Bracket' },
    { prefix: 'メ ', suffix: ' メ', font: 'spaced', intensity: 'clean', desc: 'Katakana Slash Pro' },
    { prefix: '亗『', suffix: '』亗', font: 'bold', intensity: 'pro', desc: 'Royal Enclosed Trident' },
    { prefix: '★彡[', suffix: ']彡★', font: 'boldSans', intensity: 'pro', desc: 'Star Commander Frame' },
    { prefix: '×͜× ', suffix: '', font: 'smallCaps', intensity: 'clean', desc: 'Dead Eye Esports' },
    { prefix: '༺', suffix: '༻', font: 'gothic', intensity: 'clean', desc: 'Legendary Ornament' },
    { prefix: '⚡ ', suffix: ' ⚡', font: 'boldSans', intensity: 'clean', desc: 'Voltage Lightning' },
    { prefix: '亗ㅤ', suffix: 'ㅤ亗', font: 'boldSans', intensity: 'pro', desc: 'Invisible Spaced Trident' },
    { prefix: '꧁༒☬', suffix: '☬༒꧂', font: 'gothic', intensity: 'extreme', desc: 'Master Khanda Dynasty' },
    { prefix: '', suffix: '', font: 'smallCaps', intensity: 'clean', desc: 'Clean Small Capitals' },
    { prefix: '', suffix: '', font: 'boldSans', intensity: 'clean', desc: 'Clean Bold Sans' },
    { prefix: '【', suffix: '】', font: 'bold', intensity: 'clean', desc: 'Heavy Bracket Tag' }
  ],

  pro: [
    { prefix: '亗 ', suffix: ' 亗', font: 'boldSans', intensity: 'clean', desc: 'Pro Tournament Trident' },
    { prefix: 'OPㅤ', suffix: '', font: 'boldSans', intensity: 'clean', desc: 'Overpowered Clan Tag' },
    { prefix: '亗ㅤ', suffix: '', font: 'smallCaps', intensity: 'clean', desc: 'Trident Stealth Space' },
    { prefix: 'B2K⚡', suffix: '', font: 'boldSans', intensity: 'pro', desc: 'Born To Kill Tag' },
    { prefix: 'i am | ', suffix: '', font: 'boldSans', intensity: 'clean', desc: 'Solo King Identifier' },
    { prefix: '777ㅤ', suffix: ' 亗', font: 'boldSans', intensity: 'pro', desc: 'Lucky 777 Apex' },
    { prefix: '4Kㅤ', suffix: '', font: 'boldSans', intensity: 'clean', desc: 'Ultra HD Clan' },
    { prefix: '亗『PRO』', suffix: '亗', font: 'boldSans', intensity: 'extreme', desc: 'Grandmaster Crown' },
    { prefix: '𓆩', suffix: '𓆪', font: 'boldSans', intensity: 'pro', desc: 'Aesthetic Wing Shield' },
    { prefix: '꧁༒', suffix: '༒꧂', font: 'smallCaps', intensity: 'pro', desc: 'Winged Small Caps' },
    { prefix: '乂', suffix: '亗', font: 'boldSans', intensity: 'pro', desc: 'Slash Trident Pro' },
    { prefix: '【PRO】', suffix: '', font: 'boldSans', intensity: 'clean', desc: 'Verified Pro Tag' }
  ],

  invisible: [
    { prefix: '', suffix: '', font: 'invisibleSpaced', intensity: 'clean', desc: 'Pure Invisible Spacing (U+3164)' },
    { prefix: '亗ㅤ', suffix: 'ㅤ亗', font: 'invisibleSpaced', intensity: 'pro', desc: 'Trident + Invisible Spaces' },
    { prefix: '👑ㅤ', suffix: 'ㅤ👑', font: 'invisibleSpaced', intensity: 'pro', desc: 'Crown + Invisible Spaced' },
    { prefix: '★ㅤ', suffix: 'ㅤ★', font: 'invisibleSpaced', intensity: 'clean', desc: 'Star Invisible Spaced' },
    { prefix: 'メㅤ', suffix: 'ㅤメ', font: 'invisibleSpaced', intensity: 'pro', desc: 'Slash Invisible Spaced' },
    { prefix: '☠️ㅤ', suffix: 'ㅤ☠️', font: 'invisibleSpaced', intensity: 'pro', desc: 'Skull Invisible Gap' },
    { prefix: '『', suffix: '』', font: 'invisibleSpaced', intensity: 'clean', desc: 'Bracketed Invisible Spacing' },
    { prefix: '⚡ㅤ', suffix: 'ㅤ⚡', font: 'invisibleSpaced', intensity: 'clean', desc: 'Volt Invisible Spaced' },
    { prefix: '亗ㅤ', suffix: '', font: 'invisibleSpaced', intensity: 'clean', desc: 'Prefix Trident Gap' }
  ],

  japanese: [
    { prefix: 'メ ', suffix: ' メ', font: 'spaced', intensity: 'clean', desc: 'Katakana Me Slash' },
    { prefix: '乂 ', suffix: ' 乂', font: 'boldSans', intensity: 'clean', desc: 'Dual Katana Cross' },
    { prefix: '『', suffix: '』', font: 'smallCaps', intensity: 'clean', desc: 'Corner Brackets' },
    { prefix: '【', suffix: '】', font: 'boldSans', intensity: 'clean', desc: 'Heavy Lenticular' },
    { prefix: '乡', suffix: '乡', font: 'boldSans', intensity: 'clean', desc: 'Clan Banner Kanji' },
    { prefix: '彡', suffix: '彡', font: 'italic', intensity: 'clean', desc: 'Wind Slasher' },
    { prefix: '父 ', suffix: ' 父', font: 'boldSans', intensity: 'pro', desc: 'Kanji Pillar' },
    { prefix: '气 ', suffix: ' 气', font: 'gothic', intensity: 'clean', desc: 'Spirit Vapor' },
    { prefix: 'シ ', suffix: ' ツ', font: 'italic', intensity: 'clean', desc: 'Anime Smile Duo' },
    { prefix: '꧁乂', suffix: '乂꧂', font: 'boldSans', intensity: 'pro', desc: 'Winged Assassin' },
    { prefix: '亗乂', suffix: '乂亗', font: 'boldSans', intensity: 'pro', desc: 'Shogun Cross' }
  ],

  dark: [
    { prefix: '☠ ', suffix: ' ☠', font: 'gothic', intensity: 'clean', desc: 'Toxic Reaper Skull' },
    { prefix: '💀 ', suffix: ' 💀', font: 'boldSans', intensity: 'clean', desc: 'Death March' },
    { prefix: '༒☬', suffix: '☬༒', font: 'gothic', intensity: 'pro', desc: 'Shadow Khanda' },
    { prefix: '☣ ', suffix: ' ☣', font: 'monospace', intensity: 'clean', desc: 'Biohazard Hazard' },
    { prefix: '꧁☠', suffix: '☠꧂', font: 'gothic', intensity: 'pro', desc: 'Winged Skeleton' },
    { prefix: '꧁༒☬☠', suffix: '☠☬༒꧂', font: 'gothic', intensity: 'extreme', desc: 'Underworld Overlord' },
    { prefix: 'ψ ', suffix: ' ψ', font: 'gothic', intensity: 'clean', desc: 'Nether Pitchfork' },
    { prefix: '⚰ ', suffix: ' ⚰', font: 'gothic', intensity: 'pro', desc: 'Grave Walker' },
    { prefix: '👻 ', suffix: ' 👻', font: 'boldSans', intensity: 'clean', desc: 'Ghost Spectre' },
    { prefix: '亗☠', suffix: '☠亗', font: 'gothic', intensity: 'pro', desc: 'Trident Grim Reaper' }
  ],

  attitude: [
    { prefix: 'BADㅤBOY ', suffix: '', font: 'boldSans', intensity: 'clean', desc: 'Bad Boy Tag' },
    { prefix: 'MRㅤDEVIL ', suffix: ' 亗', font: 'boldSans', intensity: 'pro', desc: 'Mr Devil Trident' },
    { prefix: 'NOOBㅤKILLER ', suffix: '', font: 'boldSans', intensity: 'clean', desc: 'Noob Killer' },
    { prefix: 'KILLER 亗 ', suffix: '', font: 'boldSans', intensity: 'pro', desc: 'Killer Crown' },
    { prefix: 'TOXIC ⚡ ', suffix: '', font: 'boldSans', intensity: 'clean', desc: 'Toxic Voltage' },
    { prefix: 'DEVILㅤ', suffix: ' 😈', font: 'smallCaps', intensity: 'clean', desc: 'Devil Emoji' },
    { prefix: '亗 T O X I C 亗', suffix: '', font: 'normal', intensity: 'clean', desc: 'Attitude Spaced' },
    { prefix: '×͜× ', suffix: ' 亗', font: 'smallCaps', intensity: 'pro', desc: 'Edgy Dead Eyes' },
    { prefix: 'VIPERㅤ', suffix: ' 🐍', font: 'boldSans', intensity: 'clean', desc: 'Viper Strike' }
  ],

  royal: [
    { prefix: '👑 ', suffix: ' 👑', font: 'boldSans', intensity: 'clean', desc: 'Imperial Monarch' },
    { prefix: '♛ ', suffix: ' ♛', font: 'gothic', intensity: 'pro', desc: 'Queen Dynasty' },
    { prefix: '♚ ', suffix: ' ♚', font: 'gothic', intensity: 'pro', desc: 'King Sovereign' },
    { prefix: '꧁👑', suffix: '👑꧂', font: 'script', intensity: 'pro', desc: 'Winged Royal Highness' },
    { prefix: '亗👑 ', suffix: ' 👑亗', font: 'boldSans', intensity: 'extreme', desc: 'Emperor Supreme' },
    { prefix: '『KING』', suffix: '', font: 'boldSans', intensity: 'clean', desc: 'Monarch Prefix' },
    { prefix: '♕ ', suffix: ' ♕', font: 'doubleStruck', intensity: 'clean', desc: 'Noble Queen' },
    { prefix: '亗 R O Y A L 亗 ', suffix: '', font: 'smallCaps', intensity: 'pro', desc: 'Royal Prestige' }
  ],

  gaming: [
    { prefix: '⌖ ', suffix: ' ⌖', font: 'monospace', intensity: 'clean', desc: 'Sniper Scope Crosshair' },
    { prefix: '🎯 ', suffix: ' 🎯', font: 'boldSans', intensity: 'clean', desc: 'Bullseye Headshot' },
    { prefix: '【FF】', suffix: '', font: 'boldSans', intensity: 'clean', desc: 'Free Fire Clan Tag' },
    { prefix: '『AIM』', suffix: '', font: 'monospace', intensity: 'clean', desc: 'Aim God Tag' },
    { prefix: '꧁⌖', suffix: '⌖꧂', font: 'boldSans', intensity: 'pro', desc: 'Elite Sniper Wing' },
    { prefix: '亗🎯', suffix: '🎯亗', font: 'boldSans', intensity: 'extreme', desc: 'Headshot Monarch' },
    { prefix: '⚡⌖', suffix: '⌖⚡', font: 'monospace', intensity: 'pro', desc: 'Volt Sniper' },
    { prefix: 'BOOYAHㅤ', suffix: '', font: 'boldSans', intensity: 'clean', desc: 'Booyah Champion' }
  ],

  stylish: [
    { prefix: '✦ ', suffix: ' ✦', font: 'doubleStruck', intensity: 'clean', desc: 'Celestial Shimmer' },
    { prefix: '✧ ', suffix: ' ✧', font: 'smallCaps', intensity: 'clean', desc: 'Diamond Glimmer' },
    { prefix: '𓆩✧', suffix: '✧𓆪', font: 'boldSans', intensity: 'pro', desc: 'Winged Starlight' },
    { prefix: '꧁✦', suffix: '✦꧂', font: 'doubleStruck', intensity: 'pro', desc: 'Astral Aura' },
    { prefix: '亗✦', suffix: '✦亗', font: 'boldSans', intensity: 'pro', desc: 'Starlight Sovereign' },
    { prefix: '꧁༒✧', suffix: '✧༒꧂', font: 'doubleStruck', intensity: 'extreme', desc: 'Cosmic Majesty' },
    { prefix: '', suffix: '', font: 'gothic', intensity: 'clean', desc: 'Pure Gothic Font' },
    { prefix: '', suffix: '', font: 'script', intensity: 'clean', desc: 'Pure Script Cursive' },
    { prefix: '', suffix: '', font: 'doubleStruck', intensity: 'clean', desc: 'Pure Double-Struck' },
    { prefix: '', suffix: '', font: 'fullwidth', intensity: 'clean', desc: 'Vaporwave Fullwidth' }
  ],

  cute: [
    { prefix: '♡ ', suffix: ' ♡', font: 'script', intensity: 'clean', desc: 'Sweet Heart' },
    { prefix: '✿ ', suffix: ' ✿', font: 'italic', intensity: 'clean', desc: 'Cherry Blossom' },
    { prefix: 'ʚ ', suffix: ' ɞ', font: 'script', intensity: 'clean', desc: 'Angel Feathers' },
    { prefix: '❥ ', suffix: ' ❥', font: 'italic', intensity: 'clean', desc: 'Floral Bullet Heart' },
    { prefix: '❀ ', suffix: ' ❀', font: 'doubleStruck', intensity: 'clean', desc: 'Blossom Dream' },
    { prefix: '꧁♡', suffix: '♡꧂', font: 'script', intensity: 'pro', desc: 'Winged Romance' },
    { prefix: '✿ Q U E E N ✿ ', suffix: '', font: 'smallCaps', intensity: 'pro', desc: 'Queen Blossom' }
  ],

  luxury: [
    { prefix: '💎 ', suffix: ' 💎', font: 'boldSans', intensity: 'clean', desc: 'Diamond Elite' },
    { prefix: '『VIP』', suffix: '', font: 'boldSans', intensity: 'clean', desc: 'VIP Club Tag' },
    { prefix: '亗💎', suffix: '💎亗', font: 'boldSans', intensity: 'pro', desc: 'Royal Diamond Crest' },
    { prefix: '꧁💎', suffix: '💎꧂', font: 'doubleStruck', intensity: 'pro', desc: 'Gilded Prestige' },
    { prefix: '【LUX】', suffix: '', font: 'boldSans', intensity: 'clean', desc: 'Luxury Pass' },
    { prefix: '亗 LUXURY 亗 ', suffix: '', font: 'smallCaps', intensity: 'pro', desc: 'Luxury Elite' }
  ]
};

// Themed base name seeds for random generation
const RANDOM_NAME_SEEDS = {
  popular: ['Shadow', 'Venom', 'Ghost', 'Blaze', 'Viper', 'Apex', 'Storm', 'Phoenix', 'Titan', 'Frost', 'Hawk', 'Echo'],
  pro: ['Striker', 'Headshot', 'Sniper', 'Deadeye', 'Overlord', 'Immortal', 'Legend', 'Dominator', 'Ace', 'Raptor', 'Vortex', 'Reflex'],
  invisible: ['Dark', 'King', 'Ghost', 'Hunter', 'Shadow', 'Viper', 'Killer', 'Sniper', 'Toxic', 'Ninja'],
  japanese: ['Kage', 'Ronin', 'Katana', 'Shinobi', 'Shuriken', 'Senshi', 'Hanzo', 'Ryu', 'Sasuke', 'Genji', 'Kunai', 'Hayabusa'],
  dark: ['Grim', 'Lucifer', 'Oblivion', 'Hades', 'Venomous', 'Dementor', 'Corrupt', 'Nightmare', 'Abyss', 'Void', 'Necro', 'Carnage'],
  attitude: ['BadBoy', 'Devil', 'NoobKiller', 'Toxic', 'Savage', 'Mafia', 'Monster', 'Beast', 'Psycho', 'Rider', 'Rebel', 'Villain'],
  royal: ['Emperor', 'Kaiser', 'Majesty', 'Sovereign', 'Dynasty', 'Lord', 'Kingpin', 'Pharaoh', 'Crown', 'Baron', 'Tsar', 'Regal'],
  gaming: ['Frag', 'Clutch', 'Aimbot', 'Respawn', 'DropShot', 'Loot', 'Booyah', 'Rusher', 'Camping', 'Squad', 'NoScope', 'Gamer'],
  stylish: ['Nova', 'Cyber', 'Neon', 'Phantom', 'Havoc', 'Rogue', 'Chronos', 'Voltage', 'Cipher', 'Glitch', 'Aura', 'Zenith'],
  cute: ['Mochi', 'Boba', 'Panda', 'Kitten', 'Buttercup', 'Pixie', 'Bunny', 'Cookie', 'Blossom', 'Honey', 'Daisy', 'Marshmallow'],
  luxury: ['Gold', 'Platinum', 'VVS', 'Billion', 'Bling', 'Rolls', 'Diamond', 'Prestige', 'Rich', 'Opulent', 'Gucci', 'Rolex']
};

const NAME_SUFFIXES = ['X', 'OP', 'FF', 'Pro', 'God', 'King', '99', 'Zero', 'Rush', 'Lord', 'Boy', 'Girl', 'Aim', '77', 'YT', '4K'];

function generateSmartSuggestions(baseName) {
  const clean = baseName.trim() || 'Player';
  return {
    competitive: [`${clean}OP`, `${clean}FF`, `${clean}X`, `PRO_${clean}`, `${clean}Aim`],
    dark: [`Dark${clean}`, `${clean}☠`, `Night${clean}`, `${clean}༒`, `Void${clean}`],
    royal: [`King${clean}`, `亗${clean}`, `${clean}♛`, `Lord${clean}`, `Prince${clean}`],
    gaming: [`${clean}Rush`, `${clean}YT`, `Booyah${clean}`, `Clutch${clean}`, `${clean}77`]
  };
}

// Ready-made Free Fire Nicknames for Mode 1 (Find Nicknames)
const READY_MADE_NICKNAMES = [
  // Cool
  { name: '亗 GHOST 亗', cat: 'cool' },
  { name: '❄ F R O S T ❄', cat: 'cool' },
  { name: '『I C E B O U N D』', cat: 'cool' },
  { name: '⚡ BLIZZARD ⚡', cat: 'cool' },
  { name: '亗 ZERO-DEGREE 亗', cat: 'cool' },
  { name: '꧁༺ GLACIER ༻꧂', cat: 'cool' },
  { name: '𓊈 G H O S T 𓊉', cat: 'cool' },
  { name: '乂 P H A N T O M 乂', cat: 'cool' },
  { name: '『S H A D O W』', cat: 'cool' },
  { name: '✦ S P E C T E R ✦', cat: 'cool' },
  { name: '亗 M I R A G E 亗', cat: 'cool' },
  { name: '⚡ C Y B E R ⚡', cat: 'cool' },
  { name: '『M A T R I X』', cat: 'cool' },
  { name: '👑 V O R T E X 👑', cat: 'cool' },
  { name: '『A P E X』', cat: 'cool' },
  { name: '亗 T I T A N 亗', cat: 'cool' },
  { name: '🎯 D E A D E Y E 🎯', cat: 'cool' },
  { name: '『H E A D S H O T』', cat: 'cool' },
  { name: '亗 A W M - K I N G 亗', cat: 'cool' },
  { name: '𒆜 H U N T E R 𒆜', cat: 'cool' },
  { name: '✦ B U L L E T ✦', cat: 'cool' },
  { name: '꧁ O N E - T A P ꧂', cat: 'cool' },
  { name: '« H A W K E Y E »', cat: 'cool' },
  { name: 'N O X 亗', cat: 'cool' },
  { name: 'V E X ⚡', cat: 'cool' },
  { name: 'Z E R O ★', cat: 'cool' },

  // Stylish
  { name: '꧁✦ S T A R L I G H T ✦꧂', cat: 'stylish' },
  { name: '亗『L E G E N D』亗', cat: 'stylish' },
  { name: '𓆩✧ N O V A ✧𓆪', cat: 'stylish' },
  { name: '★Sʜᴀᴅᴏᴡ★', cat: 'stylish' },
  { name: '『C I P H E R』', cat: 'stylish' },
  { name: '꧁༒A U R A༒꧂', cat: 'stylish' },
  { name: '💎 V E N O M 💎', cat: 'stylish' },
  { name: '✦ Z E N I T H ✦', cat: 'stylish' },
  { name: '亗 ＫＩＮＧ 亗', cat: 'stylish' },
  { name: '꧁༺P H O E N I X༻꧂', cat: 'stylish' },
  { name: '𓊈S T O R M𓊉', cat: 'stylish' },
  { name: '« V O L T A G E »', cat: 'stylish' },
  { name: '亗 G L I T C H 亗', cat: 'stylish' },
  { name: '✦ H A V O C ✦', cat: 'stylish' },
  { name: '꧁𝕯𝖆𝖗𝖐 𝕬𝖓𝖌𝖊𝖑꧂', cat: 'stylish' },
  { name: '★彡[ 𝐒 𝐇 𝐀 𝐃 𝐎 𝐖 ]彡★', cat: 'stylish' },
  { name: '『𝚅 𝙴 𝙽 𝙾 𝙼』', cat: 'stylish' },
  { name: '亗 𝔻 𝔼 𝔸 𝕋 ℍ 亗', cat: 'stylish' },
  { name: '꧁༒☬P R O☬༒꧂', cat: 'stylish' },
  { name: '𓆩S H I N O B I𓆪', cat: 'stylish' },
  { name: '★ 𝓡 𝓞 𝓨 𝓐 𝓛 ★', cat: 'stylish' },
  { name: '亗 𝕍 𝕀 ℙ 亗', cat: 'stylish' },
  { name: '« 𝐄 𝐋 𝐈 𝐓 𝐄 »', cat: 'stylish' },
  { name: '꧁༺V A M P I R E༻꧂', cat: 'stylish' },
  { name: '✦ C E L E S T I A L ✦', cat: 'stylish' },

  // Attitude
  { name: 'BADㅤBOY 亗', cat: 'attitude' },
  { name: 'MRㅤDEVIL 😈', cat: 'attitude' },
  { name: '亗 T O X I C 亗', cat: 'attitude' },
  { name: 'NOOBㅤKILLER', cat: 'attitude' },
  { name: 'KILLER 亗', cat: 'attitude' },
  { name: '×͜× S A V A G E', cat: 'attitude' },
  { name: '亗 M A F I A 亗', cat: 'attitude' },
  { name: 'B E A S T ⚡', cat: 'attitude' },
  { name: 'P S Y C H O ☠', cat: 'attitude' },
  { name: '亗 R E B E L 亗', cat: 'attitude' },
  { name: 'V I L L A I N 🩸', cat: 'attitude' },
  { name: 'TOXICㅤBOY', cat: 'attitude' },
  { name: '亗 D A R K 亗', cat: 'attitude' },
  { name: 'R U T H L E S S 亗', cat: 'attitude' },
  { name: 'MRㅤS I N N E R ☠', cat: 'attitude' },
  { name: '亗 G A N G S T E R 亗', cat: 'attitude' },
  { name: 'D O N TㅤM E S S 亗', cat: 'attitude' },
  { name: 'B L O O D Y 🩸', cat: 'attitude' },
  { name: '亗 N OㅤM E R C Y 亗', cat: 'attitude' },
  { name: 'O U T L A W ☠', cat: 'attitude' },
  { name: '亗 B O S S 亗', cat: 'attitude' },
  { name: '×͜× D E V I L ×͜×', cat: 'attitude' },
  { name: 'F E A RㅤM E 亗', cat: 'attitude' },
  { name: '亗 V I P E R 亗', cat: 'attitude' },
  { name: 'D E A DㅤE Y E S ☠', cat: 'attitude' },

  // Boys
  { name: '亗 S T R I K E R 亗', cat: 'boys' },
  { name: '꧁༒B2K༒꧂', cat: 'boys' },
  { name: 'OPㅤV I P E R', cat: 'boys' },
  { name: '亗 R A P T O R 亗', cat: 'boys' },
  { name: '4KㅤH U N T E R', cat: 'boys' },
  { name: '亗 D O M I N A T O R 亗', cat: 'boys' },
  { name: '【PRO】A C E', cat: 'boys' },
  { name: '𓆩 W A R L O R D 𓆪', cat: 'boys' },
  { name: '亗 O V E R L O R D 亗', cat: 'boys' },
  { name: '乂 K A T A N A 乂', cat: 'boys' },
  { name: '亗 R O N I N 亗', cat: 'boys' },
  { name: '777ㅤB L A Z E 亗', cat: 'boys' },
  { name: '亗 K A I S E R 亗', cat: 'boys' },
  { name: '꧁༺D E S T R O Y E R༻꧂', cat: 'boys' },
  { name: 'I N F E R N O 亗', cat: 'boys' },
  { name: '亗 T H O R 亗', cat: 'boys' },
  { name: 'A L P H AㅤB O Y', cat: 'boys' },
  { name: '亗 K I N G P I N 亗', cat: 'boys' },
  { name: 'V O R T E X ⚡', cat: 'boys' },
  { name: '亗 B E R S E R K 亗', cat: 'boys' },
  { name: 'S N I P E RㅤG O D', cat: 'boys' },
  { name: '亗 M A X I M U S 亗', cat: 'boys' },
  { name: 'G O D F A T H E R 亗', cat: 'boys' },
  { name: '亗 H Y D R A 亗', cat: 'boys' },
  { name: 'P H A N T O MㅤB O Y', cat: 'boys' },

  // Girls
  { name: '✿ Q U E E N ✿', cat: 'girls' },
  { name: '꧁♡ A N G E L ♡꧂', cat: 'girls' },
  { name: 'ʚ M O C H I ɞ', cat: 'girls' },
  { name: '亗 P R I N C E S S 亗', cat: 'girls' },
  { name: '♡ B U N N Y ♡', cat: 'girls' },
  { name: '✿ B L O S S O M ✿', cat: 'girls' },
  { name: '꧁༺ V A L K Y R I E ༻꧂', cat: 'girls' },
  { name: '✧ D I V A ✧', cat: 'girls' },
  { name: '𓆩 C H E R R Y 𓆪', cat: 'girls' },
  { name: '亗 F I E R C E 亗', cat: 'girls' },
  { name: '✿ D A I S Y ✿', cat: 'girls' },
  { name: '꧁ M I S T R E S S ꧂', cat: 'girls' },
  { name: '♡ B A B YㅤD O L L ♡', cat: 'girls' },
  { name: '✿ S W E E T I E ✿', cat: 'girls' },
  { name: '亗 E M P R E S S 亗', cat: 'girls' },
  { name: 'ʚ H O N E Y ɞ', cat: 'girls' },
  { name: '꧁ P O I S O NㅤI V Y ꧂', cat: 'girls' },
  { name: '✧ G L I T T E R ✧', cat: 'girls' },
  { name: '✿ S U N F L O W E R ✿', cat: 'girls' },
  { name: '亗 B L A C KㅤR O S E 亗', cat: 'girls' },
  { name: '♡ C U T I EㅤP I E ♡', cat: 'girls' },
  { name: '꧁༺M O O N L I G H T༻꧂', cat: 'girls' },
  { name: '✧ A U R O R A ✧', cat: 'girls' },
  { name: '✿ B A R B I E ✿', cat: 'girls' },
  { name: '亗 S I R E N 亗', cat: 'girls' }
];

