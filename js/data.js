/**
 * Free Fire Nickname Studio - Data Engine
 * Unicode font maps, symbols library, decoration patterns, and themed presets
 */

const FONT_MAPS = {
  normal: (text) => text,
  bold: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const boldChars = '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗';
    const boldArr = Array.from(boldChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? boldArr[idx] : c;
    }).join('');
  },
  italic: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const italicChars = '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝲘𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻';
    const italicArr = Array.from(italicChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? italicArr[idx] : c;
    }).join('');
  },
  gothic: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const gothicChars = '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟';
    const gothicArr = Array.from(gothicChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? gothicArr[idx] : c;
    }).join('');
  },
  script: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const scriptChars = '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓉𝓾𝓿𝔀𝔁𝔂𝔩';
    const scriptArr = Array.from(scriptChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? scriptArr[idx] : c;
    }).join('');
  },
  doubleStruck: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const dsChars = '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡';
    const dsArr = Array.from(dsChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? dsArr[idx] : c;
    }).join('');
  },
  smallCaps: (text) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const scChars = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ';
    return text.split('').map(c => {
      const idx = chars.indexOf(c.toLowerCase());
      return idx !== -1 ? scChars[idx] : c;
    }).join('');
  },
  monospace: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const monoChars = '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿';
    const monoArr = Array.from(monoChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? monoArr[idx] : c;
    }).join('');
  },
  bubbles: (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const bubbleChars = 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨';
    const bubbleArr = Array.from(bubbleChars);
    return text.split('').map(c => {
      const idx = chars.indexOf(c);
      return idx !== -1 ? bubbleArr[idx] : c;
    }).join('');
  }
};

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
  { char: '✰', name: 'Shadow Star', cat: 'stars', tags: ['stars', 'cool'] },
  
  // Crowns & Royal
  { char: '👑', name: 'Imperial Crown', cat: 'crown', tags: ['crown', 'royal', 'king', 'queen'] },
  { char: '♛', name: 'Black Queen Crown', cat: 'crown', tags: ['crown', 'queen', 'chess', 'royal', 'dark'] },
  { char: '♚', name: 'Black King Crown', cat: 'crown', tags: ['crown', 'king', 'chess', 'royal', 'dark'] },
  { char: '♕', name: 'White Queen Crown', cat: 'crown', tags: ['crown', 'queen', 'chess', 'royal', 'clean'] },
  { char: '♔', name: 'White King Crown', cat: 'crown', tags: ['crown', 'king', 'chess', 'royal', 'clean'] },
  { char: '༗', name: 'Golden Crest Coronet', cat: 'crown', tags: ['crown', 'royal', 'rare'] },
  
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
  { char: '⚰', name: 'Coffin of Oblivion', cat: 'skull', tags: ['skull', 'dark', 'grave'] },
  { char: '☣', name: 'Biohazard Warning', cat: 'skull', tags: ['skull', 'dark', 'toxic', 'hazard'] },
  { char: '☢', name: 'Radioactive Fallout', cat: 'skull', tags: ['skull', 'dark', 'toxic', 'nuclear'] },
  { char: 'ψ', name: 'Greek Psi Pitchfork', cat: 'skull', tags: ['skull', 'dark', 'devil', 'trident'] },
  
  // Wings & Angels
  { char: '༆', name: 'Tibetan Wing Feathers', cat: 'wings', tags: ['wings', 'royal', 'rare'] },
  { char: '༇', name: 'Sacred Angelic Wing', cat: 'wings', tags: ['wings', 'rare', 'angel'] },
  { char: 'ʚ', name: 'Feather Wing Left', cat: 'wings', tags: ['wings', 'cute', 'aesthetic', 'angel'] },
  { char: 'ɞ', name: 'Feather Wing Right', cat: 'wings', tags: ['wings', 'cute', 'aesthetic', 'angel'] },
  { char: '𓆩', name: 'Hieroglyph Wing Left', cat: 'wings', tags: ['wings', 'aesthetic', 'pro', 'shield'] },
  { char: '𓆪', name: 'Hieroglyph Wing Right', cat: 'wings', tags: ['wings', 'aesthetic', 'pro', 'shield'] },
  
  // Hearts & Cute
  { char: '❤', name: 'Classic Red Heart', cat: 'hearts', tags: ['hearts', 'cute', 'love'] },
  { char: '♡', name: 'Hollow Heart', cat: 'hearts', tags: ['hearts', 'cute', 'clean', 'aesthetic'] },
  { char: '❥', name: 'Heart Floral Bullet', cat: 'hearts', tags: ['hearts', 'cute', 'stylish'] },
  { char: 'ღ', name: 'Georgian Heart Bloom', cat: 'hearts', tags: ['hearts', 'cute', 'soft'] },
  { char: 'დ', name: 'Georgian Smile Heart', cat: 'hearts', tags: ['hearts', 'cute', 'aesthetic'] },
  { char: '♥', name: 'Playing Card Heart', cat: 'hearts', tags: ['hearts', 'cute', 'retro'] },
  
  // Brackets & Enclosures
  { char: '『', name: 'Corner Bracket Left', cat: 'brackets', tags: ['brackets', 'clean', 'japanese', 'pro'] },
  { char: '』', name: 'Corner Bracket Right', cat: 'brackets', tags: ['brackets', 'clean', 'japanese', 'pro'] },
  { char: '【', name: 'Heavy Black Lenticular Left', cat: 'brackets', tags: ['brackets', 'heavy', 'pro'] },
  { char: '】', name: 'Heavy Black Lenticular Right', cat: 'brackets', tags: ['brackets', 'heavy', 'pro'] },
  { char: '〖', name: 'Hollow Lenticular Left', cat: 'brackets', tags: ['brackets', 'clean'] },
  { char: '〗', name: 'Hollow Lenticular Right', cat: 'brackets', tags: ['brackets', 'clean'] },
  { char: '《', name: 'Double Angle Left', cat: 'brackets', tags: ['brackets', 'stylish'] },
  { char: '》', name: 'Double Angle Right', cat: 'brackets', tags: ['brackets', 'stylish'] },
  { char: '⟦', name: 'Mathematical White Bracket L', cat: 'brackets', tags: ['brackets', 'cyber'] },
  { char: '⟧', name: 'Mathematical White Bracket R', cat: 'brackets', tags: ['brackets', 'cyber'] },
  
  // Lightning & Energy
  { char: '⚡', name: 'High Voltage Lightning', cat: 'lightning', tags: ['lightning', 'energy', 'fire', 'speed', 'thunder'] },
  { char: 'ϟ', name: 'Greek Koppa Spark', cat: 'lightning', tags: ['lightning', 'electric', 'sharp'] },
  { char: '🔥', name: 'Blazing Fire Flame', cat: 'lightning', tags: ['lightning', 'fire', 'flame', 'energy'] },
  { char: '☄', name: 'Fiery Comet Meteor', cat: 'lightning', tags: ['lightning', 'fire', 'comet', 'space'] },
  { char: '💥', name: 'Explosive Impact', cat: 'lightning', tags: ['lightning', 'fire', 'impact'] },
  
  // Japanese & Asian Style
  { char: '乂', name: 'Cross Slash Scissors', cat: 'japanese', tags: ['japanese', 'ninja', 'slash', 'cross', 'pro'] },
  { char: '父', name: 'Father Kanji Pillar', cat: 'japanese', tags: ['japanese', 'ninja', 'kanji'] },
  { char: '气', name: 'Chi Spirit Vapor', cat: 'japanese', tags: ['japanese', 'energy', 'spirit', 'ninja'] },
  { char: 'シ', name: 'Katakana Shi Smile', cat: 'japanese', tags: ['japanese', 'cute', 'anime'] },
  { char: 'ツ', name: 'Katakana Tsu Wink', cat: 'japanese', tags: ['japanese', 'cute', 'anime', 'smile'] },
  { char: '彡', name: 'Triple Slash Whisk', cat: 'japanese', tags: ['japanese', 'speed', 'slash'] },
  { char: '々', name: 'Noma Repetition Mark', cat: 'japanese', tags: ['japanese', 'clean'] },
  
  // Decorative & Aesthetic
  { char: '✿', name: 'Cherry Blossom Bloom', cat: 'decorative', tags: ['decorative', 'cute', 'flower'] },
  { char: '❀', name: 'Open Flower Petals', cat: 'decorative', tags: ['decorative', 'cute', 'flower'] },
  { char: '❁', name: 'Sunflower Pattern', cat: 'decorative', tags: ['decorative', 'flower'] },
  { char: '✤', name: 'Heavy Diamond Star Four', cat: 'decorative', tags: ['decorative', 'star', 'diamond'] },
  { char: '✥', name: 'Diamond Club Cross', cat: 'decorative', tags: ['decorative', 'cross', 'royal'] },
  { char: '❦', name: 'Fleuron Leaf Accent', cat: 'decorative', tags: ['decorative', 'vintage', 'aesthetic'] },
  
  // Special & Invisible Space Helper
  { char: 'ㅤ', name: 'Hangul Filler (Invisible Space)', cat: 'rare', tags: ['rare', 'invisible', 'space', 'blank', 'pro'] },
  { char: '♾', name: 'Infinite Eternity', cat: 'rare', tags: ['rare', 'clean', 'gaming', 'loop'] },
  { char: 'Ø', name: 'Zero Slash Diameter', cat: 'rare', tags: ['rare', 'clean', 'gaming', 'cyber'] },
  { char: '☯', name: 'Yin Yang Balance', cat: 'rare', tags: ['rare', 'ninja', 'balance'] }
];

// Presets for Style Categories & Intensity
const STYLE_PRESETS = {
  popular: [
    { prefix: '亗', suffix: '亗', font: 'bold', intensity: 'clean', desc: 'Classic Pro Trident' },
    { prefix: '꧁', suffix: '꧂', font: 'bold', intensity: 'pro', desc: 'Winged Pro Badge' },
    { prefix: '『', suffix: '』', font: 'bold', intensity: 'clean', desc: 'Japanese Bracket' },
    { prefix: '乂', suffix: '乂', font: 'normal', intensity: 'clean', desc: 'Ninja Slash Cross' },
    { prefix: '★', suffix: '★', font: 'bold', intensity: 'clean', desc: 'Star Commander' },
    { prefix: '༒', suffix: '༒', font: 'gothic', intensity: 'pro', desc: 'Tibetan Honor' },
    { prefix: '꧁༒☬', suffix: '☬༒꧂', font: 'gothic', intensity: 'extreme', desc: 'Master Khanda Dynasty' },
    { prefix: '亗『', suffix: '』亗', font: 'bold', intensity: 'pro', desc: 'Royal Enclosed Crown' },
    { prefix: '⚡', suffix: '⚡', font: 'bold', intensity: 'clean', desc: 'Thunder Spark' },
    { prefix: '༒', suffix: '亗', font: 'bold', intensity: 'pro', desc: 'Honor Trident' }
  ],
  cool: [
    { prefix: '⚡', suffix: '⚡', font: 'monospace', intensity: 'clean', desc: 'Voltage Surge' },
    { prefix: '𓊈', suffix: '𓊉', font: 'bold', intensity: 'pro', desc: 'Vanguard Shield' },
    { prefix: '⚔', suffix: '⚔', font: 'bold', intensity: 'clean', desc: 'Duelist Blades' },
    { prefix: '•', suffix: '•', font: 'bold', intensity: 'clean', desc: 'Sleek Minimal Bullet' },
    { prefix: '⟦', suffix: '⟧', font: 'monospace', intensity: 'clean', desc: 'Cyber Matrix' },
    { prefix: '꧁⚡', suffix: '⚡꧂', font: 'bold', intensity: 'pro', desc: 'Winged Thunder' },
    { prefix: '༒⚔', suffix: '⚔༒', font: 'gothic', intensity: 'extreme', desc: 'Battlefield Legend' },
    { prefix: '彡', suffix: '彡', font: 'italic', intensity: 'clean', desc: 'Wind Slasher' },
    { prefix: '✦', suffix: '✦', font: 'doubleStruck', intensity: 'clean', desc: 'Starlight Sparkle' }
  ],
  pro: [
    { prefix: '亗', suffix: '亗', font: 'bold', intensity: 'clean', desc: 'Competitive Trident' },
    { prefix: '『OP』', suffix: '', font: 'bold', intensity: 'clean', desc: 'Overpowered Tag' },
    { prefix: '【PRO】', suffix: '', font: 'bold', intensity: 'clean', desc: 'Verified Pro Tag' },
    { prefix: '꧁༒', suffix: '༒꧂', font: 'bold', intensity: 'pro', desc: 'Tournament Apex' },
    { prefix: '乂', suffix: '亗', font: 'bold', intensity: 'pro', desc: 'Slash-Trident Hybrid' },
    { prefix: '𓆩', suffix: '𓆪', font: 'bold', intensity: 'pro', desc: 'Aesthetic Wings' },
    { prefix: '亗『PRO』', suffix: '亗', font: 'bold', intensity: 'extreme', desc: 'Grandmaster Crown' },
    { prefix: '☬', suffix: '☬', font: 'bold', intensity: 'pro', desc: 'Warrior Crest' },
    { prefix: '亗⚡', suffix: '⚡亗', font: 'bold', intensity: 'pro', desc: 'Apex High-Volt' }
  ],
  royal: [
    { prefix: '👑', suffix: '👑', font: 'bold', intensity: 'clean', desc: 'Imperial Monarch' },
    { prefix: '♛', suffix: '♛', font: 'gothic', intensity: 'pro', desc: 'Queen Dynasty' },
    { prefix: '♚', suffix: '♚', font: 'gothic', intensity: 'pro', desc: 'King Sovereign' },
    { prefix: '꧁👑', suffix: '👑꧂', font: 'script', intensity: 'pro', desc: 'Winged Royal Highness' },
    { prefix: '亗👑', suffix: '👑亗', font: 'bold', intensity: 'extreme', desc: 'Emperor Supreme' },
    { prefix: '༗', suffix: '༗', font: 'doubleStruck', intensity: 'pro', desc: 'Golden Coronet' },
    { prefix: '『KING』', suffix: '', font: 'bold', intensity: 'clean', desc: 'Monarch Prefix' },
    { prefix: '♕', suffix: '♕', font: 'doubleStruck', intensity: 'clean', desc: 'Noble Queen' }
  ],
  dark: [
    { prefix: '☠', suffix: '☠', font: 'gothic', intensity: 'clean', desc: 'Toxic Reaper' },
    { prefix: '💀', suffix: '💀', font: 'gothic', intensity: 'clean', desc: 'Death March' },
    { prefix: '༒☬', suffix: '☬༒', font: 'gothic', intensity: 'pro', desc: 'Shadow Khanda' },
    { prefix: '☣', suffix: '☣', font: 'monospace', intensity: 'clean', desc: 'Biohazard Hazard' },
    { prefix: '꧁☠', suffix: '☠꧂', font: 'gothic', intensity: 'pro', desc: 'Winged Skeleton' },
    { prefix: '꧁༒☬☠', suffix: '☠☬༒꧂', font: 'gothic', intensity: 'extreme', desc: 'Underworld Overlord' },
    { prefix: 'ψ', suffix: 'ψ', font: 'gothic', intensity: 'clean', desc: 'Nether Pitchfork' },
    { prefix: '⚰', suffix: '⚰', font: 'gothic', intensity: 'pro', desc: 'Grave Walker' }
  ],
  cute: [
    { prefix: '♡', suffix: '♡', font: 'script', intensity: 'clean', desc: 'Sweet Heart' },
    { prefix: '✿', suffix: '✿', font: 'italic', intensity: 'clean', desc: 'Cherry Blossom' },
    { prefix: 'ʚ', suffix: 'ɞ', font: 'script', intensity: 'clean', desc: 'Angel Feathers' },
    { prefix: '❥', suffix: '❥', font: 'italic', intensity: 'clean', desc: 'Floral Bullet Heart' },
    { prefix: 'ღ', suffix: 'ღ', font: 'script', intensity: 'pro', desc: 'Georgian Sweet' },
    { prefix: '❀', suffix: '❀', font: 'doubleStruck', intensity: 'clean', desc: 'Blossom Dream' },
    { prefix: '꧁♡', suffix: '♡꧂', font: 'script', intensity: 'pro', desc: 'Winged Romance' },
    { prefix: 'シ', suffix: 'ツ', font: 'italic', intensity: 'clean', desc: 'Anime Smile Duo' }
  ],
  gaming: [
    { prefix: '⌖', suffix: '⌖', font: 'monospace', intensity: 'clean', desc: 'Sniper Crosshair' },
    { prefix: '🎯', suffix: '🎯', font: 'bold', intensity: 'clean', desc: 'Bullseye Hit' },
    { prefix: '【FF】', suffix: '', font: 'bold', intensity: 'clean', desc: 'Free Fire Tag' },
    { prefix: '『AIM』', suffix: '', font: 'monospace', intensity: 'clean', desc: 'Aim God Tag' },
    { prefix: '꧁⌖', suffix: '⌖꧂', font: 'bold', intensity: 'pro', desc: 'Elite Sniper Wing' },
    { prefix: '亗🎯', suffix: '🎯亗', font: 'bold', intensity: 'extreme', desc: 'Headshot Monarch' },
    { prefix: '⚡⌖', suffix: '⌖⚡', font: 'monospace', intensity: 'pro', desc: 'Volt Sniper' },
    { prefix: '⚔『FF』', suffix: '⚔', font: 'bold', intensity: 'pro', desc: 'Free Fire Blade' }
  ],
  stylish: [
    { prefix: '✦', suffix: '✦', font: 'doubleStruck', intensity: 'clean', desc: 'Celestial Shimmer' },
    { prefix: '✧', suffix: '✧', font: 'smallCaps', intensity: 'clean', desc: 'Diamond Glimmer' },
    { prefix: '𓆩✧', suffix: '✧𓆪', font: 'bold', intensity: 'pro', desc: 'Winged Starlight' },
    { prefix: '꧁✦', suffix: '✦꧂', font: 'doubleStruck', intensity: 'pro', desc: 'Astral Aura' },
    { prefix: '亗✦', suffix: '✦亗', font: 'bold', intensity: 'pro', desc: 'Starlight Sovereign' },
    { prefix: '✤', suffix: '✤', font: 'script', intensity: 'clean', desc: 'Ornate Diamond' },
    { prefix: '꧁༒✧', suffix: '✧༒꧂', font: 'doubleStruck', intensity: 'extreme', desc: 'Cosmic Majesty' }
  ],
  ninja: [
    { prefix: '乂', suffix: '乂', font: 'bold', intensity: 'clean', desc: 'Dual Katana Cross' },
    { prefix: '彡', suffix: '彡', font: 'italic', intensity: 'clean', desc: 'Shadow Flash' },
    { prefix: '🗡', suffix: '🗡', font: 'bold', intensity: 'clean', desc: 'Tanto Blade' },
    { prefix: '气', suffix: '气', font: 'gothic', intensity: 'clean', desc: 'Spirit Vapor' },
    { prefix: '☯', suffix: '☯', font: 'bold', intensity: 'clean', desc: 'Yin Yang Balance' },
    { prefix: '꧁乂', suffix: '乂꧂', font: 'bold', intensity: 'pro', desc: 'Winged Assassin' },
    { prefix: '亗乂', suffix: '乂亗', font: 'bold', intensity: 'pro', desc: 'Shogun Cross' },
    { prefix: '꧁༒🗡', suffix: '🗡༒꧂', font: 'gothic', intensity: 'extreme', desc: 'Shinobi Overlord' }
  ],
  luxury: [
    { prefix: '💎', suffix: '💎', font: 'bold', intensity: 'clean', desc: 'Diamond Elite' },
    { prefix: '『VIP』', suffix: '', font: 'bold', intensity: 'clean', desc: 'VIP Club Tag' },
    { prefix: '亗💎', suffix: '💎亗', font: 'bold', intensity: 'pro', desc: 'Royal Diamond Crest' },
    { prefix: '꧁💎', suffix: '💎꧂', font: 'doubleStruck', intensity: 'pro', desc: 'Gilded Prestige' },
    { prefix: '♔💎', suffix: '💎♔', font: 'doubleStruck', intensity: 'pro', desc: 'Monarch Jewel' },
    { prefix: '꧁༒💎', suffix: '💎༒꧂', font: 'doubleStruck', intensity: 'extreme', desc: 'Billionaire Crown' },
    { prefix: '【LUX】', suffix: '', font: 'bold', intensity: 'clean', desc: 'Luxury Pass' }
  ]
};

// Themed base name generators for Mode B
const RANDOM_NAME_SEEDS = {
  popular: ['Shadow', 'Venom', 'Ghost', 'Blaze', 'Viper', 'Apex', 'Storm', 'Phoenix', 'Titan', 'Frost', 'Hawk', 'Echo'],
  pro: ['Striker', 'Headshot', 'Sniper', 'Deadeye', 'Overlord', 'Immortal', 'Legend', 'Dominator', 'Ace', 'Raptor', 'Vortex', 'Reflex'],
  cool: ['Zero', 'Nova', 'Cyber', 'Matrix', 'Neon', 'Phantom', 'Havoc', 'Rogue', 'Chronos', 'Voltage', 'Cipher', 'Glitch'],
  royal: ['Emperor', 'Kaiser', 'Majesty', 'Sovereign', 'Dynasty', 'Lord', 'Kingpin', 'Pharaoh', 'Crown', 'Baron', 'Tsar', 'Regal'],
  dark: ['Grim', 'Lucifer', 'Oblivion', 'Hades', 'Venomous', 'Dementor', 'Corrupt', 'Nightmare', 'Abyss', 'Void', 'Necro', 'Carnage'],
  cute: ['Mochi', 'Boba', 'Panda', 'Kitten', 'Buttercup', 'Pixie', 'Bunny', 'Cookie', 'Blossom', 'Honey', 'Daisy', 'Marshmallow'],
  gaming: ['Frag', 'Clutch', 'Aimbot', 'Respawn', 'DropShot', 'Loot', 'Booyah', 'Rusher', 'Camping', 'Squad', 'NoScope', 'Gamer'],
  ninja: ['Kage', 'Ronin', 'Katana', 'Shinobi', 'Shuriken', 'Senshi', 'Hanzo', 'Ryu', 'Sasuke', 'Genji', 'Kunai', 'Hayabusa'],
  luxury: ['Gold', 'Platinum', 'VVS', 'Billion', 'Bling', 'Rolls', 'Diamond', 'Prestige', 'Rich', 'Opulent', 'Gucci', 'Rolex']
};

const NAME_SUFFIXES = ['X', 'OP', 'FF', 'Pro', 'God', 'King', '99', 'Zero', 'Rush', 'Lord', 'Boy', 'Girl', 'Aim', '77', 'YT'];
const NAME_PREFIXES = ['The', 'Mr', 'Dr', 'Real', 'Dark', 'Iron', 'Lord', 'King', 'Elite', 'Alpha', 'Mega', 'Hyper'];

function generateSmartSuggestions(baseName) {
  const clean = baseName.trim() || 'Player';
  return {
    competitive: [`${clean}OP`, `${clean}FF`, `${clean}X`, `PRO_${clean}`, `${clean}Aim`],
    dark: [`Dark${clean}`, `${clean}☠`, `Night${clean}`, `${clean}༒`, `Void${clean}`],
    royal: [`King${clean}`, `亗${clean}`, `${clean}♛`, `Lord${clean}`, `Prince${clean}`],
    gaming: [`${clean}Rush`, `${clean}YT`, `Booyah${clean}`, `Clutch${clean}`, `${clean}77`]
  };
}
