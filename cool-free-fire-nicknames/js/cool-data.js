/**
 * Cool Free Fire Nicknames - Curated Database & Customizer Transformers
 * 
 * Strict Editorial Standards:
 * - Curated original combinations (no unverified claims)
 * - Transparent rendering compatibility notices
 * - Structured taxonomy vibes: clean, dark, pro, aesthetic, oneword, symbols
 */

const COOL_NICKNAMES_DATA = [
  // 1. Clean & Minimal (Vibe: clean)
  { id: 'c-clean-1', name: 'Vexon', plain: 'Vexon', category: 'clean', vibe: 'Clean', complexity: 'Clean' },
  { id: 'c-clean-2', name: 'Nyrox', plain: 'Nyrox', category: 'clean', vibe: 'Clean', complexity: 'Clean' },
  { id: 'c-clean-3', name: 'Kaizen', plain: 'Kaizen', category: 'clean', vibe: 'Clean', complexity: 'Clean' },
  { id: 'c-clean-4', name: 'Flux', plain: 'Flux', category: 'clean', vibe: 'Clean', complexity: 'Clean' },
  { id: 'c-clean-5', name: 'Onyx', plain: 'Onyx', category: 'clean', vibe: 'Clean', complexity: 'Clean' },
  { id: 'c-clean-6', name: 'RiftX', plain: 'RiftX', category: 'clean', vibe: 'Clean', complexity: 'Clean' },
  { id: 'c-clean-7', name: 'Zorin', plain: 'Zorin', category: 'clean', vibe: 'Clean', complexity: 'Clean' },
  { id: 'c-clean-8', name: 'Vanta', plain: 'Vanta', category: 'clean', vibe: 'Clean', complexity: 'Clean' },
  { id: 'c-clean-9', name: 'Kryo', plain: 'Kryo', category: 'clean', vibe: 'Clean', complexity: 'Clean' },
  { id: 'c-clean-10', name: 'Hexar', plain: 'Hexar', category: 'clean', vibe: 'Clean', complexity: 'Clean' },
  { id: 'c-clean-11', name: 'Nox', plain: 'Nox', category: 'clean', vibe: 'Clean', complexity: 'Clean' },
  { id: 'c-clean-12', name: 'Volt', plain: 'Volt', category: 'clean', vibe: 'Clean', complexity: 'Clean' },
  { id: 'c-clean-13', name: 'Apex', plain: 'Apex', category: 'clean', vibe: 'Clean', complexity: 'Clean' },
  { id: 'c-clean-14', name: 'Zenith', plain: 'Zenith', category: 'clean', vibe: 'Clean', complexity: 'Clean' },

  // 2. Dark & Mysterious (Vibe: dark)
  { id: 'c-dark-1', name: 'VoidX', plain: 'VoidX', category: 'dark', vibe: 'Dark', complexity: 'Clean' },
  { id: 'c-dark-2', name: 'NightVex', plain: 'NightVex', category: 'dark', vibe: 'Dark', complexity: 'Clean' },
  { id: 'c-dark-3', name: 'DarkNova', plain: 'DarkNova', category: 'dark', vibe: 'Dark', complexity: 'Clean' },
  { id: 'c-dark-4', name: 'GhostX', plain: 'GhostX', category: 'dark', vibe: 'Dark', complexity: 'Clean' },
  { id: 'c-dark-5', name: 'RavenX', plain: 'RavenX', category: 'dark', vibe: 'Dark', complexity: 'Clean' },
  { id: 'c-dark-6', name: 'HexVoid', plain: 'HexVoid', category: 'dark', vibe: 'Dark', complexity: 'Clean' },
  { id: 'c-dark-7', name: 'Noctis', plain: 'Noctis', category: 'dark', vibe: 'Dark', complexity: 'Clean' },
  { id: 'c-dark-8', name: 'GrimVolt', plain: 'GrimVolt', category: 'dark', vibe: 'Dark', complexity: 'Clean' },
  { id: 'c-dark-9', name: 'DuskX', plain: 'DuskX', category: 'dark', vibe: 'Dark', complexity: 'Clean' },
  { id: 'c-dark-10', name: 'VantaX', plain: 'VantaX', category: 'dark', vibe: 'Dark', complexity: 'Clean' },
  { id: 'c-dark-11', name: 'ShadeX', plain: 'ShadeX', category: 'dark', vibe: 'Dark', complexity: 'Clean' },
  { id: 'c-dark-12', name: 'VoidFang', plain: 'VoidFang', category: 'dark', vibe: 'Dark', complexity: 'Clean' },
  { id: 'c-dark-13', name: 'ShadowRift', plain: 'ShadowRift', category: 'dark', vibe: 'Dark', complexity: 'Clean' },
  { id: 'c-dark-14', name: 'Eclipse', plain: 'Eclipse', category: 'dark', vibe: 'Dark', complexity: 'Clean' },

  // 3. Pro-Style (Vibe: pro)
  { id: 'c-pro-1', name: 'AceVolt', plain: 'AceVolt', category: 'pro', vibe: 'Pro', complexity: 'Clean' },
  { id: 'c-pro-2', name: 'ClutchX', plain: 'ClutchX', category: 'pro', vibe: 'Pro', complexity: 'Clean' },
  { id: 'c-pro-3', name: 'VexPro', plain: 'VexPro', category: 'pro', vibe: 'Pro', complexity: 'Clean' },
  { id: 'c-pro-4', name: 'RushX', plain: 'RushX', category: 'pro', vibe: 'Pro', complexity: 'Clean' },
  { id: 'c-pro-5', name: 'ScopeX', plain: 'ScopeX', category: 'pro', vibe: 'Pro', complexity: 'Clean' },
  { id: 'c-pro-6', name: 'NovaAce', plain: 'NovaAce', category: 'pro', vibe: 'Pro', complexity: 'Clean' },
  { id: 'c-pro-7', name: 'RiftPro', plain: 'RiftPro', category: 'pro', vibe: 'Pro', complexity: 'Clean' },
  { id: 'c-pro-8', name: 'VoltX', plain: 'VoltX', category: 'pro', vibe: 'Pro', complexity: 'Clean' },
  { id: 'c-pro-9', name: 'AimVex', plain: 'AimVex', category: 'pro', vibe: 'Pro', complexity: 'Clean' },
  { id: 'c-pro-10', name: 'FluxOP', plain: 'FluxOP', category: 'pro', vibe: 'Pro', complexity: 'Clean' },
  { id: 'c-pro-11', name: 'ViperX', plain: 'ViperX', category: 'pro', vibe: 'Pro', complexity: 'Clean' },
  { id: 'c-pro-12', name: 'ZeroAce', plain: 'ZeroAce', category: 'pro', vibe: 'Pro', complexity: 'Clean' },
  { id: 'c-pro-13', name: 'HeadshotX', plain: 'HeadshotX', category: 'pro', vibe: 'Pro', complexity: 'Clean' },
  { id: 'c-pro-14', name: 'OneTapPro', plain: 'OneTapPro', category: 'pro', vibe: 'Pro', complexity: 'Clean' },

  // 4. Aesthetic & Styled (Vibe: aesthetic)
  { id: 'c-aes-1', name: '✦ Nova ✦', plain: 'Nova', category: 'aesthetic', vibe: 'Aesthetic', complexity: 'Light Style' },
  { id: 'c-aes-2', name: '『 Rogue 』', plain: 'Rogue', category: 'aesthetic', vibe: 'Aesthetic', complexity: 'Light Style' },
  { id: 'c-aes-3', name: '« Zephyr »', plain: 'Zephyr', category: 'aesthetic', vibe: 'Aesthetic', complexity: 'Light Style' },
  { id: 'c-aes-4', name: '❄ FrostX ❄', plain: 'FrostX', category: 'aesthetic', vibe: 'Aesthetic', complexity: 'Light Style' },
  { id: 'c-aes-5', name: '✦ Vanta ✦', plain: 'Vanta', category: 'aesthetic', vibe: 'Aesthetic', complexity: 'Light Style' },
  { id: 'c-aes-6', name: '『 Nexus 』', plain: 'Nexus', category: 'aesthetic', vibe: 'Aesthetic', complexity: 'Light Style' },
  { id: 'c-aes-7', name: '« Cipher »', plain: 'Cipher', category: 'aesthetic', vibe: 'Aesthetic', complexity: 'Light Style' },
  { id: 'c-aes-8', name: '✦ Kryo ✦', plain: 'Kryo', category: 'aesthetic', vibe: 'Aesthetic', complexity: 'Light Style' },
  { id: 'c-aes-9', name: '『 Specter 』', plain: 'Specter', category: 'aesthetic', vibe: 'Aesthetic', complexity: 'Light Style' },
  { id: 'c-aes-10', name: '✦ Lunar ✦', plain: 'Lunar', category: 'aesthetic', vibe: 'Aesthetic', complexity: 'Light Style' },
  { id: 'c-aes-11', name: '« Solace »', plain: 'Solace', category: 'aesthetic', vibe: 'Aesthetic', complexity: 'Light Style' },
  { id: 'c-aes-12', name: '✦ Velvet ✦', plain: 'Velvet', category: 'aesthetic', vibe: 'Aesthetic', complexity: 'Light Style' },

  // 5. Cool One-Word Handles (Vibe: oneword)
  { id: 'c-word-1', name: 'Vortex', plain: 'Vortex', category: 'oneword', vibe: 'One Word', complexity: 'Clean' },
  { id: 'c-word-2', name: 'Cipher', plain: 'Cipher', category: 'oneword', vibe: 'One Word', complexity: 'Clean' },
  { id: 'c-word-3', name: 'Specter', plain: 'Specter', category: 'oneword', vibe: 'One Word', complexity: 'Clean' },
  { id: 'c-word-4', name: 'Zephyr', plain: 'Zephyr', category: 'oneword', vibe: 'One Word', complexity: 'Clean' },
  { id: 'c-word-5', name: 'Reaper', plain: 'Reaper', category: 'oneword', vibe: 'One Word', complexity: 'Clean' },
  { id: 'c-word-6', name: 'Nova', plain: 'Nova', category: 'oneword', vibe: 'One Word', complexity: 'Clean' },
  { id: 'c-word-7', name: 'Blaze', plain: 'Blaze', category: 'oneword', vibe: 'One Word', complexity: 'Clean' },
  { id: 'c-word-8', name: 'Nexus', plain: 'Nexus', category: 'oneword', vibe: 'One Word', complexity: 'Clean' },
  { id: 'c-word-9', name: 'Titan', plain: 'Titan', category: 'oneword', vibe: 'One Word', complexity: 'Clean' },
  { id: 'c-word-10', name: 'Phantom', plain: 'Phantom', category: 'oneword', vibe: 'One Word', complexity: 'Clean' },
  { id: 'c-word-11', name: 'Matrix', plain: 'Matrix', category: 'oneword', vibe: 'One Word', complexity: 'Clean' },
  { id: 'c-word-12', name: 'Hydra', plain: 'Hydra', category: 'oneword', vibe: 'One Word', complexity: 'Clean' },

  // 6. Cool Names with Symbols (Vibe: symbols)
  { id: 'c-sym-1', name: '亗 Vortex 亗', plain: 'Vortex', category: 'symbols', vibe: 'Symbols', complexity: 'Decorated' },
  { id: 'c-sym-2', name: '✦ Nova ✦', plain: 'Nova', category: 'symbols', vibe: 'Symbols', complexity: 'Light Style' },
  { id: 'c-sym-3', name: '『 Rogue 』', plain: 'Rogue', category: 'symbols', vibe: 'Symbols', complexity: 'Light Style' },
  { id: 'c-sym-4', name: '⚡ Vex ⚡', plain: 'Vex', category: 'symbols', vibe: 'Symbols', complexity: 'Light Style' },
  { id: 'c-sym-5', name: '乂 Onyx 乂', plain: 'Onyx', category: 'symbols', vibe: 'Symbols', complexity: 'Decorated' },
  { id: 'c-sym-6', name: '𓊈 Ghost 𓊉', plain: 'Ghost', category: 'symbols', vibe: 'Symbols', complexity: 'Decorated' },
  { id: 'c-sym-7', name: '𒆜 Hunter 𒆜', plain: 'Hunter', category: 'symbols', vibe: 'Symbols', complexity: 'Decorated' },
  { id: 'c-sym-8', name: '꧁ OneTap ꧂', plain: 'OneTap', category: 'symbols', vibe: 'Symbols', complexity: 'Decorated' },
  { id: 'c-sym-9', name: '亗 Titan 亗', plain: 'Titan', category: 'symbols', vibe: 'Symbols', complexity: 'Decorated' },
  { id: 'c-sym-10', name: '❄ Frost ❄', plain: 'Frost', category: 'symbols', vibe: 'Symbols', complexity: 'Light Style' },
  { id: 'c-sym-11', name: '« Matrix »', plain: 'Matrix', category: 'symbols', vibe: 'Symbols', complexity: 'Light Style' },
  { id: 'c-sym-12', name: '👑 Kingpin 👑', plain: 'Kingpin', category: 'symbols', vibe: 'Symbols', complexity: 'Decorated' }
];

// Reusable Cool Font Transforms for "Make It Cooler" generator & Customizer
const COOL_FONT_MAPS = {
  none: (str) => str,
  normal: (str) => str,
  smallCaps: (str) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const sc = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ';
    return str.split('').map(c => {
      const i = chars.indexOf(c);
      return i !== -1 ? sc[i] : c;
    }).join('');
  },
  boldSans: (str) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const boldChars = '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂ᴠ𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵';
    const arr = Array.from(boldChars);
    return str.split('').map(c => {
      const i = chars.indexOf(c);
      return i !== -1 ? arr[i] : c;
    }).join('');
  },
  spaced: (str) => str.split('').join(' ')
};

const COOL_FONT_PRESETS = [
  { id: 'none', name: 'Normal' },
  { id: 'smallCaps', name: 'Small Caps' },
  { id: 'boldSans', name: 'Bold Sans' },
  { id: 'spaced', name: 'Spaced' }
];

function transformTextWithFont(str, fontId) {
  if (!str) return '';
  if (COOL_FONT_MAPS && COOL_FONT_MAPS[fontId]) {
    return COOL_FONT_MAPS[fontId](str);
  }
  return str;
}

// Preset frames for customization
const COOL_CUSTOM_FRAMES = [
  { id: 'none', name: 'None', left: '', right: '' },
  { id: 'trident', name: '亗 Trident', left: '亗 ', right: ' 亗' },
  { id: 'sparkle', name: '✦ Sparkle', left: '✦ ', right: ' ✦' },
  { id: 'brackets', name: '『 Brackets 』', left: '『', right: '』' },
  { id: 'bolt', name: '⚡ Lightning', left: '⚡ ', right: ' ⚡' },
  { id: 'katana', name: '乂 Katana', left: '乂 ', right: ' 乂' },
  { id: 'shield', name: '𓊈 Shield 𓊉', left: '𓊈 ', right: ' 𓊉' },
  { id: 'chevrons', name: '« Chevrons »', left: '« ', right: ' »' },
  { id: 'wings', name: '꧁ Wings ꧂', left: '꧁', right: '꧂' },
  { id: 'ice', name: '❄ Frost', left: '❄ ', right: ' ❄' }
];

// Transformation function to generate variations from a user's word
function generateCoolVariants(rawWord) {
  const base = rawWord.trim() || 'Player';
  const clean = base.charAt(0).toUpperCase() + base.slice(1);
  const sc = COOL_FONT_MAPS.smallCaps(clean);
  const bold = COOL_FONT_MAPS.boldSans(clean);
  const spaced = COOL_FONT_MAPS.spaced(clean.toUpperCase());

  return [
    { name: `${clean}X`, vibe: 'Clean', complexity: 'Clean Suffix', plain: `${clean}X` },
    { name: `亗 ${clean} 亗`, vibe: 'Pro', complexity: 'Trident Crown', plain: clean },
    { name: `✦ ${clean} ✦`, vibe: 'Aesthetic', complexity: 'Sparkle Accent', plain: clean },
    { name: `『${clean}』`, vibe: 'Dark', complexity: 'Heavy Brackets', plain: clean },
    { name: `⚡ ${bold} ⚡`, vibe: 'Pro', complexity: 'Bold Voltage', plain: clean },
    { name: `乂 ${clean} 乂`, vibe: 'Symbols', complexity: 'Katana Slash', plain: clean },
    { name: `亗 ${sc} 亗`, vibe: 'Pro', complexity: 'SmallCaps Trident', plain: clean },
    { name: `« ${clean} »`, vibe: 'Clean', complexity: 'Guillemets', plain: clean },
    { name: `𓊈 ${clean} 𓊉`, vibe: 'Dark', complexity: 'Shield Guard', plain: clean },
    { name: `꧁༺${clean}༻꧂`, vibe: 'Symbols', complexity: 'Winged Crest', plain: clean },
    { name: `❄ ${spaced} ❄`, vibe: 'Aesthetic', complexity: 'Frost Spaced', plain: clean },
    { name: `${clean}Ace`, vibe: 'Pro', complexity: 'Pro Suffix', plain: `${clean}Ace` }
  ];
}
