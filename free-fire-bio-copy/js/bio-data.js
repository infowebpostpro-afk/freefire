/**
 * Free Fire Bio Studio - Data Definitions
 * Curated bio database, categories, persona vibes, color presets, and troubleshooting.
 */

const BIO_CATEGORIES = [
  { id: 'popular', label: 'Popular', icon: '🔥' },
  { id: 'pro', label: 'Pro / Competitive', icon: '⚡' },
  { id: 'attitude', label: 'Attitude', icon: '😈' },
  { id: 'king', label: 'King / Royal', icon: '👑' },
  { id: 'love', label: 'Love', icon: '❤️' },
  { id: 'broken', label: 'Broken Heart', icon: '💔' },
  { id: 'funny', label: 'Funny', icon: '😂' },
  { id: 'dark', label: 'Dark', icon: '☠' },
  { id: 'aesthetic', label: 'Aesthetic', icon: '✨' },
  { id: 'onetap', label: 'One Tap', icon: '🎯' },
  { id: 'weapon', label: 'Weapon / Gun', icon: '🔫' },
  { id: 'rank', label: 'Rank', icon: '🏆' },
  { id: 'guild', label: 'Guild / Squad', icon: '🛡' },
  { id: 'gaming', label: 'Gaming', icon: '🎮' },
  { id: 'cool', label: 'Cool', icon: '😎' },
  { id: 'short', label: 'Short', icon: '💎' }
];

const READY_BIOS = [
  // Popular
  { id: 'pop-1', text: 'Silent in lobby. Loud in game.', category: 'popular', tags: ['popular', 'pro', 'lobby', 'silent'], rawCode: '[FF0000]Silent in lobby. [FFD700]Loud in game.' },
  { id: 'pop-2', text: 'Born to clutch, forced to revive.', category: 'popular', tags: ['popular', 'funny', 'clutch'], rawCode: '[FFAA00]Born to clutch, [00E5FF]forced to revive.' },
  { id: 'pop-3', text: '亗 Headshot Specialist 亗', category: 'popular', tags: ['popular', 'trident', 'headshot'], rawCode: '[FF5722]亗 Headshot Specialist 亗' },
  { id: 'pop-4', text: 'No mercy. Just headshots.', category: 'popular', tags: ['popular', 'attitude', 'headshot'], rawCode: '[FF1744]No mercy. [FFFFFF]Just headshots.' },
  { id: 'pop-5', text: 'Your rank is my warm up.', category: 'popular', tags: ['popular', 'attitude', 'rank'], rawCode: '[FFD700]Your rank [FF2A5F]is my warm up.' },

  // Pro / Competitive
  { id: 'pro-1', text: '⚡ 100% Headshot Rate ⚡', category: 'pro', tags: ['pro', 'competitive', 'headshot'], rawCode: '[FFD700]⚡ [FF0000]100% Headshot Rate [FFD700]⚡' },
  { id: 'pro-2', text: 'Play like a beast or die like a noob.', category: 'pro', tags: ['pro', 'rush', 'competitive'], rawCode: '[FF3B30]Play like a beast [FFFFFF]or die like a noob.' },
  { id: 'pro-3', text: 'Full rush. Zero camping.', category: 'pro', tags: ['pro', 'rush', 'aggressive'], rawCode: '[FF5722]Full rush. [00E5FF]Zero camping.' },
  { id: 'pro-4', text: 'Leader of the winning squad.', category: 'pro', tags: ['pro', 'leader', 'squad'], rawCode: '[FFD700]Leader [FFFFFF]of the winning squad.' },
  { id: 'pro-5', text: '4v1 is my favorite gamemode.', category: 'pro', tags: ['pro', 'clutch', 'competitive'], rawCode: '[FF2A5F]4v1 [FFFFFF]is my favorite gamemode.' },
  { id: 'pro-6', text: 'Calculated shots, zero panic.', category: 'pro', tags: ['pro', 'calm', 'sniper'], rawCode: '[00E5FF]Calculated shots, [FFFFFF]zero panic.' },

  // Attitude
  { id: 'att-1', text: 'I don’t follow rules, I make them.', category: 'attitude', tags: ['attitude', 'bad boy', 'edgy'], rawCode: '[FF0000]I don’t follow rules, [FFD700]I make them.' },
  { id: 'att-2', text: 'Hate me or love me, you can’t beat me.', category: 'attitude', tags: ['attitude', 'confident'], rawCode: '[FF2A5F]Hate me or love me, [00FF87]you can’t beat me.' },
  { id: 'att-3', text: 'My name is enough to scare the lobby.', category: 'attitude', tags: ['attitude', 'fear', 'lobby'], rawCode: '[FF5722]My name is enough [FFFFFF]to scare the lobby.' },
  { id: 'att-4', text: 'Too good to be benched.', category: 'attitude', tags: ['attitude', 'short', 'proud'], rawCode: '[FFD700]Too good [FFFFFF]to be benched.' },
  { id: 'att-5', text: 'Don’t judge me by my rank, fear my aim.', category: 'attitude', tags: ['attitude', 'aim', 'rank'], rawCode: '[00E5FF]Don’t judge my rank, [FF0000]fear my aim.' },

  // King / Royal
  { id: 'kng-1', text: '👑 Long Live The King 👑', category: 'king', tags: ['king', 'royal', 'crown'], rawCode: '[FFD700]👑 Long Live The King 👑' },
  { id: 'kng-2', text: 'Born to rule Bermuda.', category: 'king', tags: ['king', 'bermuda', 'royal'], rawCode: '[FFD700]Born to rule [FFFFFF]Bermuda.' },
  { id: 'kng-3', text: '♛ Crowned by victory ♛', category: 'king', tags: ['king', 'crown', 'victory'], rawCode: '[FFD700]♛ [FFFFFF]Crowned by victory [FFD700]♛' },
  { id: 'kng-4', text: 'Every king was once a rookie.', category: 'king', tags: ['king', 'inspirational'], rawCode: '[FFD700]Every king [FFFFFF]was once a rookie.' },
  { id: 'kng-5', text: 'Royalty doesn’t beg for respect.', category: 'king', tags: ['king', 'attitude', 'royal'], rawCode: '[FFD700]Royalty [FF2A5F]doesn’t beg for respect.' },

  // Love / Couple
  { id: 'lov-1', text: '❤️ Playing for my Queen ❤️', category: 'love', tags: ['love', 'couple', 'queen'], rawCode: '[FF2D55]❤️ Playing for my Queen ❤️' },
  { id: 'lov-2', text: 'I revive her before I loot.', category: 'love', tags: ['love', 'couple', 'cute'], rawCode: '[FF2D55]I revive her [FFFFFF]before I loot.' },
  { id: 'lov-3', text: 'She is my medkit in battle.', category: 'love', tags: ['love', 'couple', 'medkit'], rawCode: '[FF2D55]She is my medkit [00E5FF]in battle.' },
  { id: 'lov-4', text: 'Duo for life. In game & out.', category: 'love', tags: ['love', 'duo', 'partner'], rawCode: '[FF2D55]Duo for life. [FFFFFF]In game & out.' },
  { id: 'lov-5', text: 'Protected by my King 👑', category: 'love', tags: ['love', 'queen', 'couple'], rawCode: '[FF2D55]Protected by [FFD700]my King 👑' },

  // Broken Heart
  { id: 'brk-1', text: '💔 Alone in the battleground.', category: 'broken', tags: ['broken', 'sad', 'alone'], rawCode: '[647087]💔 Alone in the battleground.' },
  { id: 'brk-2', text: 'Heart broken, aim sharpened.', category: 'broken', tags: ['broken', 'attitude', 'aim'], rawCode: '[FF1744]Heart broken, [00E5FF]aim sharpened.' },
  { id: 'brk-3', text: 'She left. Now I carry solo vs squad.', category: 'broken', tags: ['broken', 'solo', 'funny'], rawCode: '[A2ABBD]She left. [FF0000]Now I carry solo vs squad.' },
  { id: 'brk-4', text: 'Tears dry, but recoil stays true.', category: 'broken', tags: ['broken', 'gaming', 'sad'], rawCode: '[00E5FF]Tears dry, [FFFFFF]recoil stays true.' },
  { id: 'brk-5', text: 'No heart to break anymore.', category: 'broken', tags: ['broken', 'dark', 'short'], rawCode: '[647087]No heart to break anymore.' },

  // Funny
  { id: 'fun-1', text: 'I knock enemies, gravity knocks me.', category: 'funny', tags: ['funny', 'humor', 'fall'], rawCode: '[FFAA00]I knock enemies, [FF2A5F]gravity knocks me.' },
  { id: 'fun-2', text: 'Certified loot goblin 🎒', category: 'funny', tags: ['funny', 'loot', 'goblin'], rawCode: '[00E676]Certified loot goblin 🎒' },
  { id: 'fun-3', text: '99% potato aim, 1% luck.', category: 'funny', tags: ['funny', 'aim', 'potato'], rawCode: '[FF9100]99% potato aim, [00E5FF]1% luck.' },
  { id: 'fun-4', text: 'Here for the airdrop, not the fight.', category: 'funny', tags: ['funny', 'airdrop'], rawCode: '[FF0000]Here for the airdrop, [FFFFFF]not the fight.' },
  { id: 'fun-5', text: 'Professional danger zone hugger.', category: 'funny', tags: ['funny', 'zone', 'danger'], rawCode: '[FF1744]Professional danger zone hugger.' },

  // Dark
  { id: 'drk-1', text: '☠ Ghost of the red zone ☠', category: 'dark', tags: ['dark', 'ghost', 'death'], rawCode: '[647087]☠ [FF0000]Ghost of the red zone [647087]☠' },
  { id: 'drk-2', text: 'Welcome to your graveyard.', category: 'dark', tags: ['dark', 'grave', 'scary'], rawCode: '[FF1744]Welcome to your graveyard.' },
  { id: 'drk-3', text: 'Silence before the massacre.', category: 'dark', tags: ['dark', 'silent', 'kill'], rawCode: '[647087]Silence [FF0000]before the massacre.' },
  { id: 'drk-4', text: 'I don’t leave survivors.', category: 'dark', tags: ['dark', 'short', 'ruthless'], rawCode: '[FF0000]I don’t leave survivors.' },
  { id: 'drk-5', text: 'Shadows whisper your defeat.', category: 'dark', tags: ['dark', 'shadow', 'aesthetic'], rawCode: '[A2ABBD]Shadows whisper [FF2A5F]your defeat.' },

  // Aesthetic
  { id: 'aes-1', text: '✧ lost in a virtual sunset ✧', category: 'aesthetic', tags: ['aesthetic', 'chill', 'stars'], rawCode: '[00E5FF]✧ lost in a virtual sunset ✧' },
  { id: 'aes-2', text: '꧁ peaceful in the storm ꧂', category: 'aesthetic', tags: ['aesthetic', 'peace', 'wings'], rawCode: '[FFD700]꧁ [FFFFFF]peaceful in the storm [FFD700]꧂' },
  { id: 'aes-3', text: 'clouds, coffee, and headshots.', category: 'aesthetic', tags: ['aesthetic', 'chill', 'vibe'], rawCode: '[A2ABBD]clouds, coffee, [FF5722]and headshots.' },
  { id: 'aes-4', text: '☾ neon dreams & midnight games ☽', category: 'aesthetic', tags: ['aesthetic', 'neon', 'night'], rawCode: '[9B51E0]☾ [00F2FE]neon dreams & midnight games [9B51E0]☽' },
  { id: 'aes-5', text: 'stargazer with a sniper rifle.', category: 'aesthetic', tags: ['aesthetic', 'stars', 'sniper'], rawCode: '[00E5FF]stargazer [FFD700]with a sniper rifle.' },

  // One Tap
  { id: 'one-1', text: '🎯 One Tap • Lobby Sent 🎯', category: 'onetap', tags: ['onetap', 'headshot', 'sniper'], rawCode: '[FF0000]🎯 One Tap • [FFD700]Lobby Sent 🎯' },
  { id: 'one-2', text: 'Single click, back to lobby.', category: 'onetap', tags: ['onetap', 'fast', 'attitude'], rawCode: '[FF1744]Single click, [FFFFFF]back to lobby.' },
  { id: 'one-3', text: 'M1887 in hand, game over.', category: 'onetap', tags: ['onetap', 'shotgun', 'm1887'], rawCode: '[FF5722]M1887 in hand, [00FF87]game over.' },
  { id: 'one-4', text: 'Headshots are not luck, they are habit.', category: 'onetap', tags: ['onetap', 'skill', 'habit'], rawCode: '[FFD700]Headshots are not luck, [00E5FF]they are habit.' },
  { id: 'one-5', text: 'Desert Eagle specialist.', category: 'onetap', tags: ['onetap', 'deagle', 'gun'], rawCode: '[FFAA00]Desert Eagle specialist.' },

  // Weapon / Gun
  { id: 'wep-1', text: 'AWM loaded. Stay in cover.', category: 'weapon', tags: ['weapon', 'awm', 'sniper'], rawCode: '[00E5FF]AWM loaded. [FF0000]Stay in cover.' },
  { id: 'wep-2', text: 'MP40 fire rate faster than your thoughts.', category: 'weapon', tags: ['weapon', 'mp40', 'smg'], rawCode: '[FF5722]MP40 fire rate [FFD700]faster than you.' },
  { id: 'wep-3', text: 'AK47 recoil mastered.', category: 'weapon', tags: ['weapon', 'ak47', 'recoil'], rawCode: '[FFAA00]AK47 recoil mastered.' },
  { id: 'wep-4', text: 'Groza lover since season 1.', category: 'weapon', tags: ['weapon', 'groza', 'og'], rawCode: '[00E676]Groza lover [FFFFFF]since season 1.' },
  { id: 'wep-5', text: 'Double Vector = Lobby Express.', category: 'weapon', tags: ['weapon', 'vector', 'rush'], rawCode: '[FF1744]Double Vector [FFFFFF]= Lobby Express.' },

  // Rank
  { id: 'rnk-1', text: '🏆 Road to Grandmaster 🏆', category: 'rank', tags: ['rank', 'grandmaster', 'heroic'], rawCode: '[FFD700]🏆 Road to Grandmaster 🏆' },
  { id: 'rnk-2', text: 'Heroic since day one.', category: 'rank', tags: ['rank', 'heroic', 'veteran'], rawCode: '[FF2A5F]Heroic [FFFFFF]since day one.' },
  { id: 'rnk-3', text: 'Points drop, skills don’t.', category: 'rank', tags: ['rank', 'points', 'grind'], rawCode: '[00E5FF]Points drop, [FFD700]skills don’t.' },
  { id: 'rnk-4', text: 'Rank push grind never stops.', category: 'rank', tags: ['rank', 'push', 'grind'], rawCode: '[FFAA00]Rank push grind [FFFFFF]never stops.' },
  { id: 'rnk-5', text: 'Master tier mentality.', category: 'rank', tags: ['rank', 'master', 'mindset'], rawCode: '[FF0000]Master tier mentality.' },

  // Guild / Squad
  { id: 'gld-1', text: '🛡️ Loyal to my Guild 🛡️', category: 'guild', tags: ['guild', 'squad', 'clan'], rawCode: '[FFD700]🛡️ Loyal to my Guild 🛡️' },
  { id: 'gld-2', text: 'We fight as four, we win as one.', category: 'guild', tags: ['guild', 'squad', 'team'], rawCode: '[00E5FF]We fight as four, [FFD700]we win as one.' },
  { id: 'gld-3', text: 'Clan war champion.', category: 'guild', tags: ['guild', 'war', 'champion'], rawCode: '[FF5722]Clan war champion.' },
  { id: 'gld-4', text: 'Squad leader • Rusher • Shot caller', category: 'guild', tags: ['guild', 'roles', 'squad'], rawCode: '[FFAA00]Squad leader • [FF2A5F]Rusher' },
  { id: 'gld-5', text: 'Recruiting active rushers.', category: 'guild', tags: ['guild', 'recruit', 'join'], rawCode: '[00FF87]Recruiting active rushers.' },

  // Gaming
  { id: 'gam-1', text: '🎮 Eat • Sleep • Free Fire • Repeat', category: 'gaming', tags: ['gaming', 'routine', 'fun'], rawCode: '[FF5722]🎮 Eat • [FFD700]Sleep • [00E5FF]Free Fire' },
  { id: 'gam-2', text: 'Bermuda is my second home.', category: 'gaming', tags: ['gaming', 'bermuda', 'map'], rawCode: '[00E676]Bermuda [FFFFFF]is my second home.' },
  { id: 'gam-3', text: 'Gaming is my meditation.', category: 'gaming', tags: ['gaming', 'chill', 'mindset'], rawCode: '[00E5FF]Gaming is my meditation.' },
  { id: 'gam-4', text: 'Gamer by passion, rusher by choice.', category: 'gaming', tags: ['gaming', 'passion', 'rush'], rawCode: '[FF3B30]Gamer by passion, [FFD700]rusher by choice.' },
  { id: 'gam-5', text: 'Level 70+ Veteran Player.', category: 'gaming', tags: ['gaming', 'level', 'veteran'], rawCode: '[FFD700]Level 70+ [FFFFFF]Veteran Player.' },

  // Cool
  { id: 'col-1', text: 'Ice in my veins, fire in my hands.', category: 'cool', tags: ['cool', 'ice', 'fire'], rawCode: '[00E5FF]Ice in my veins, [FF5722]fire in my hands.' },
  { id: 'col-2', text: 'Calm mind, deadly trigger.', category: 'cool', tags: ['cool', 'calm', 'deadly'], rawCode: '[A2ABBD]Calm mind, [FF1744]deadly trigger.' },
  { id: 'col-3', text: 'Not loud, just unstoppable.', category: 'cool', tags: ['cool', 'unstoppable'], rawCode: '[FFD700]Not loud, [FFFFFF]just unstoppable.' },
  { id: 'col-4', text: 'Built different under pressure.', category: 'cool', tags: ['cool', 'clutch', 'pressure'], rawCode: '[00FF87]Built different [FFFFFF]under pressure.' },
  { id: 'col-5', text: 'Too focused to get distracted.', category: 'cool', tags: ['cool', 'focus', 'mindset'], rawCode: '[00E5FF]Too focused to get distracted.' },

  // Short
  { id: 'sho-1', text: 'Silent Death.', category: 'short', tags: ['short', 'clean', 'stealth'], rawCode: '[647087]Silent [FF0000]Death.' },
  { id: 'sho-2', text: 'Full Rush.', category: 'short', tags: ['short', 'rush', 'aggressive'], rawCode: '[FF5722]Full Rush.' },
  { id: 'sho-3', text: '亗 CLUTCH 亗', category: 'short', tags: ['short', 'trident', 'clutch'], rawCode: '[FFD700]亗 CLUTCH 亗' },
  { id: 'sho-4', text: 'No Mercy.', category: 'short', tags: ['short', 'attitude'], rawCode: '[FF1744]No Mercy.' },
  { id: 'sho-5', text: 'One Tap.', category: 'short', tags: ['short', 'onetap'], rawCode: '[00E5FF]One Tap.' },
  { id: 'sho-6', text: 'Lone Wolf.', category: 'short', tags: ['short', 'solo', 'wolf'], rawCode: '[A2ABBD]Lone Wolf.' },
  { id: 'sho-7', text: 'Unstoppable.', category: 'short', tags: ['short', 'clean'], rawCode: '[00FF87]Unstoppable.' }
];

const PERSONA_VIBES = [
  {
    id: 'rusher',
    name: 'Rusher',
    icon: '🔥',
    tagline: 'Fast, aggressive, close-combat fighter',
    templates: [
      '{NAME} • Full Rush Only',
      '⚡ {NAME} • 0% Camp 100% Rush ⚡',
      '亗 {NAME} • First to enter, last to leave 亗'
    ],
    symbols: ['🔥', '⚡', '亗', '⚔️'],
    colorPreset: 'fire'
  },
  {
    id: 'sniper',
    name: 'Sniper',
    icon: '🎯',
    tagline: 'Patience, high accuracy, one-tap king',
    templates: [
      '{NAME} • Calculated Distance',
      '🎯 {NAME} • 1 Shot 1 Kill 🎯',
      'AWM Specialist • {NAME}'
    ],
    symbols: ['🎯', '🦅', '★', '⚡'],
    colorPreset: 'ice'
  },
  {
    id: 'leader',
    name: 'Leader',
    icon: '👑',
    tagline: 'Strategic guild leader and squad captain',
    templates: [
      '👑 {NAME} • Leading to Victory',
      '亗 {NAME} • Squad Commander 亗',
      'Loyalty & Honor • {NAME}'
    ],
    symbols: ['👑', '♛', '🛡️', '亗'],
    colorPreset: 'royal'
  },
  {
    id: 'onetap',
    name: 'One Tap',
    icon: '⚡',
    tagline: 'Lethal precision and fast headshots',
    templates: [
      '⚡ {NAME} • Desert Eagle Master',
      '🎯 {NAME} • Headshot Only 🎯',
      'Single tap lobby ticket • {NAME}'
    ],
    symbols: ['⚡', '🎯', '💥', '亗'],
    colorPreset: 'fire'
  },
  {
    id: 'dark',
    name: 'Dark',
    icon: '☠',
    tagline: 'Stealth, mystery, and aggressive intimidation',
    templates: [
      '☠ {NAME} • Shadow of Bermuda ☠',
      'Welcome to defeat • {NAME}',
      'Silent before the strike • {NAME}'
    ],
    symbols: ['☠', '⚔️', '🖤', '亗'],
    colorPreset: 'toxic'
  },
  {
    id: 'couple',
    name: 'Couple',
    icon: '❤️',
    tagline: 'Duo partners and gaming soulmates',
    templates: [
      '❤️ {NAME} • Playing for my Queen',
      'Duo Partner • {NAME} ❤️',
      'Protected by {NAME} 👑'
    ],
    symbols: ['❤️', '💍', '👑', '✨'],
    colorPreset: 'love'
  },
  {
    id: 'funny',
    name: 'Funny',
    icon: '😂',
    tagline: 'Lighthearted, humor, and self-aware fun',
    templates: [
      '{NAME} • Loot Goblin In Chief',
      '99% potato aim • {NAME}',
      '{NAME} • Here for the airdrop'
    ],
    symbols: ['😂', '🎒', '🤡', '🥔'],
    colorPreset: 'cyber'
  },
  {
    id: 'aesthetic',
    name: 'Aesthetic',
    icon: '✨',
    tagline: 'Minimalist, poetic, and relaxed visual vibe',
    templates: [
      '✧ {NAME} • lost in the sunset ✧',
      '꧁ {NAME} • peaceful storm ꧂',
      'moonlight & headshots • {NAME}'
    ],
    symbols: ['✨', '✧', '☾', '꧁', '꧂'],
    colorPreset: 'cyber'
  }
];

const COLOR_PRESETS = [
  {
    id: 'fire',
    name: 'Fire',
    colors: ['#FF3B30', '#FFAA00'],
    desc: 'Aggressive blazing red & orange gradient effect'
  },
  {
    id: 'royal',
    name: 'Royal',
    colors: ['#FFD700', '#FFFFFF'],
    desc: 'Prestige golden crown with clean white contrast'
  },
  {
    id: 'cyber',
    name: 'Cyber',
    colors: ['#00F2FE', '#9B51E0'],
    desc: 'Futuristic electric cyan & deep neon purple'
  },
  {
    id: 'love',
    name: 'Love',
    colors: ['#FF2D55', '#FF85A2'],
    desc: 'Passionate romantic pink and crimson'
  },
  {
    id: 'toxic',
    name: 'Toxic',
    colors: ['#00FF87', '#FFFFFF'],
    desc: 'High-contrast neon green with luminous white'
  },
  {
    id: 'ice',
    name: 'Ice',
    colors: ['#00E5FF', '#0072FF'],
    desc: 'Chilling arctic sniper blue & cyan glow'
  }
];

const QUICK_COLORS = [
  { name: 'Red', hex: '#FF0000', code: '[FF0000]' },
  { name: 'Gold', hex: '#FFD700', code: '[FFD700]' },
  { name: 'Orange', hex: '#FF5722', code: '[FF5722]' },
  { name: 'Green', hex: '#00E676', code: '[00E676]' },
  { name: 'Cyan', hex: '#00E5FF', code: '[00E5FF]' },
  { name: 'Blue', hex: '#2979FF', code: '[2979FF]' },
  { name: 'Purple', hex: '#9B51E0', code: '[9B51E0]' },
  { name: 'Pink', hex: '#FF2A5F', code: '[FF2A5F]' },
  { name: 'White', hex: '#FFFFFF', code: '[FFFFFF]' }
];

const COMPACT_SYMBOLS = [
  '★', '亗', '♛', '⚡', '☠', '♥', '乂', '彡', '꧁', '꧂', '🎯', '⚔️', '👑', '🔥', '✦', '✧', '◈', '💎'
];

const STARTER_TEMPLATES = [
  { label: 'Pro Rusher', text: '⚡ Headshot Specialist • Full Rush ⚡' },
  { label: 'Royal King', text: '👑 Long Live The King • Bermuda Rule 👑' },
  { label: 'Attitude', text: 'My name is enough to scare the lobby.' },
  { label: 'Love Duo', text: '❤️ Reviving my Queen before I loot ❤️' },
  { label: 'Sniper Aim', text: '🎯 AWM Loaded • One Tap Express 🎯' },
  { label: 'Clan Leader', text: '🛡️ Squad Captain • Winning Mentality 🛡️' },
  { label: 'Minimalist', text: 'Silent in lobby. Loud in game.' },
  { label: 'Dark Vibe', text: '☠ Ghost of Bermuda • No Survivors ☠' }
];

const TROUBLESHOOTING_BIO_GUIDES = [
  {
    id: 'color-plain',
    title: 'Color Not Showing / Code Appears as Text',
    icon: '🔤',
    summary: 'The game displays literal brackets like [FF0000] instead of colored text.',
    causes: [
      'The current regional server or game patch has disabled rich BBCode color tags in player signatures.',
      'A typo occurred in the hex code format (e.g. missing bracket, 5 digits instead of 6).',
      'The color code was placed in the player Nickname field instead of the Profile Signature field.'
    ],
    solutions: [
      'Ensure you are pasting the code into your Profile Signature/Bio field, NOT your player Nickname.',
      'Check that the color code is wrapped in capital hex brackets like [FF0000] without spaces.',
      'If your client version blocks color BBCode, click "Copy Plain Text" below for clean, error-free text.'
    ],
    fallbackAction: 'plain-text'
  },
  {
    id: 'box-tofu',
    title: 'Symbol Shows as Square Box □',
    icon: '🔲',
    summary: 'A symbol shows up as a hollow square or question mark in your profile.',
    causes: [
      'Your phone’s font library lacks the Unicode glyph for that specific symbol.',
      'The game font does not support the rare character set.'
    ],
    solutions: [
      'Use widely recognized gaming symbols like 亗 (trident), ⚡ (lightning), 👑 (crown), or ★ (star).',
      'Avoid rare decorative emoji or unmapped Unicode blocks.',
      'Test your symbol in our Nickname Builder or Symbol Studio before saving.'
    ],
    fallbackAction: 'replace-symbol'
  },
  {
    id: 'too-long',
    title: 'Bio Is Too Long / Cut Off',
    icon: '📏',
    summary: 'The game warns you that your signature exceeds the character limit.',
    causes: [
      'Free Fire counts every bracket and hex digit toward the signature limit (e.g. [FF0000] takes 8 characters!).',
      'Long colored bios can easily surpass the maximum length even with few visible words.'
    ],
    solutions: [
      'Use only one color code at the very start of your bio instead of coloring every word.',
      'Shorten your visible text to 15–25 characters.',
      'Check our dual character counter (Visible vs Code Length) in the customizer.'
    ],
    fallbackAction: 'shorten'
  },
  {
    id: 'paste-fail',
    title: 'Paste Failed / Nothing Appears',
    icon: '📋',
    summary: 'Tapping paste does not insert anything into the Free Fire bio field.',
    causes: [
      'Clipboard permissions were denied by the browser.',
      'The game keyboard cleared the clipboard cache.'
    ],
    solutions: [
      'Click the "Copy Bio" button again and ensure the "✓ Copied!" toast appears.',
      'Try holding your finger down in the Free Fire signature box until the system "PASTE" pill pops up.',
      'Open your mobile keyboard’s clipboard tray and tap the copied text item directly.'
    ],
    fallbackAction: 'retry'
  }
];
