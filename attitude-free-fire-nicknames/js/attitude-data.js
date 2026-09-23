/**
 * Attitude Free Fire Nicknames — Database & Vibe Taxonomy
 * Curated gaming identities categorized by persona, concept, tone, and semantic relationships.
 */

const ATTITUDE_VIBES = [
  { id: "all", name: "All Vibes", icon: "🔥", desc: "Browse all curated attitude names" },
  { id: "confident", name: "Confident", icon: "⚡", desc: "Fearless, unshaken, and dominant persona" },
  { id: "dark", name: "Dark", icon: "🌑", desc: "Shadows, night, void, and menacing handles" },
  { id: "rebel", name: "Rebel", icon: "😈", desc: "Defiant, anti-meta, and no-rules independent" },
  { id: "cold", name: "Cold", icon: "🧊", desc: "Calm, calculated, and emotionless clutch composure" },
  { id: "royal", name: "Royal", icon: "👑", desc: "Prestige, monarch, and supreme authority titles" },
  { id: "mysterious", name: "Mysterious", icon: "🥷", desc: "Cryptic, veiled, phantom, and unseen identity" }
];

const ATTITUDE_DATABASE = [
  // CONFIDENT VIBE
  { id: "unshaken", baseName: "Unshaken", vibes: ["confident"], dna: "Confident · Unflinching", prefix: "Un", suffix: "shaken", meaning: "Rock-solid resolve under pressure." },
  { id: "alphaace", baseName: "AlphaAce", vibes: ["confident"], dna: "Confident · Dominant", prefix: "Alpha", suffix: "Ace", meaning: "First in command, top-tier fragger." },
  { id: "zerodoubt", baseName: "ZeroDoubt", vibes: ["confident"], dna: "Confident · Fearless", prefix: "Zero", suffix: "Doubt", meaning: "Never second-guessing a push or rotation." },
  { id: "primesoul", baseName: "PrimeSoul", vibes: ["confident", "royal"], dna: "Confident · Elite", prefix: "Prime", suffix: "Soul", meaning: "Peak gaming condition and indomitable spirit." },
  { id: "ownlane", baseName: "OwnLane", vibes: ["confident", "rebel"], dna: "Confident · Independent", prefix: "Own", suffix: "Lane", meaning: "Carving your own path without following the herd." },
  { id: "boldmind", baseName: "BoldMind", vibes: ["confident"], dna: "Confident · Calculated", prefix: "Bold", suffix: "Mind", meaning: "Aggressive decision making with mental clarity." },
  { id: "trueace", baseName: "TrueAce", vibes: ["confident"], dna: "Confident · Pure", prefix: "True", suffix: "Ace", meaning: "Authentic competitive mastery." },
  { id: "fearnone", baseName: "FearNone", vibes: ["confident", "rebel"], dna: "Confident · Unstoppable", prefix: "Fear", suffix: "None", meaning: "Zero respect for enemy reputation." },
  { id: "solocode", baseName: "SoloCode", vibes: ["confident", "rebel"], dna: "Confident · Lone Wolf", prefix: "Solo", suffix: "Code", meaning: "Disciplined lone-wolf doctrine." },
  { id: "primetitan", baseName: "PrimeTitan", vibes: ["confident", "royal"], dna: "Confident · Heavyweight", prefix: "Prime", suffix: "Titan", meaning: "Colossal frontline presence." },
  { id: "bravox", baseName: "BravoX", vibes: ["confident"], dna: "Confident · Strike", prefix: "Bravo", suffix: "X", meaning: "Tactical courage and decisive action." },
  { id: "unbroken", baseName: "Unbroken", vibes: ["confident"], dna: "Confident · Resilient", prefix: "Un", suffix: "broken", meaning: "Surviving impossible odds." },

  // DARK VIBE
  { id: "darkviper", baseName: "DarkViper", vibes: ["dark", "cold"], dna: "Dark · Lethal", prefix: "Dark", suffix: "Viper", meaning: "Venomous precision from the shadows." },
  { id: "darkwolf", baseName: "DarkWolf", vibes: ["dark", "rebel"], dna: "Dark · Predator", prefix: "Dark", suffix: "Wolf", meaning: "Nocturnal hunter with predatory instinct." },
  { id: "silentvoid", baseName: "SilentVoid", vibes: ["dark", "mysterious"], dna: "Dark · Mysterious", prefix: "Silent", suffix: "Void", meaning: "Empty expanse swallowing all sound." },
  { id: "darknova", baseName: "DarkNova", vibes: ["dark"], dna: "Dark · Explosive", prefix: "Dark", suffix: "Nova", meaning: "Black cosmic burst of destructive force." },
  { id: "nightviper", baseName: "NightViper", vibes: ["dark", "cold"], dna: "Dark · Stealth", prefix: "Night", suffix: "Viper", meaning: "Lethal unseen venom in the midnight zone." },
  { id: "shadowace", baseName: "ShadowAce", vibes: ["dark", "mysterious"], dna: "Dark · Tactical", prefix: "Shadow", suffix: "Ace", meaning: "Invisible clutch master." },
  { id: "blackfrost", baseName: "BlackFrost", vibes: ["dark", "cold"], dna: "Dark · Freezing", prefix: "Black", suffix: "Frost", meaning: "Sub-zero coldness wrapped in pitch dark." },
  { id: "voidwolf", baseName: "VoidWolf", vibes: ["dark", "mysterious"], dna: "Dark · Enigma", prefix: "Void", suffix: "Wolf", meaning: "Spectral predator from between dimensions." },
  { id: "nightpulse", baseName: "NightPulse", vibes: ["dark"], dna: "Dark · Dynamic", prefix: "Night", suffix: "Pulse", meaning: "Rhythmic heartbeat of the night." },
  { id: "phantomx", baseName: "PhantomX", vibes: ["dark", "mysterious"], dna: "Dark · Ghostly", prefix: "Phantom", suffix: "X", meaning: "Passing through squad lines like a ghost." },
  { id: "darkace", baseName: "DarkAce", vibes: ["dark", "confident"], dna: "Dark · Champion", prefix: "Dark", suffix: "Ace", meaning: "Shadow master holding the winning hand." },
  { id: "grimstrike", baseName: "GrimStrike", vibes: ["dark"], dna: "Dark · Fatal", prefix: "Grim", suffix: "Strike", meaning: "Inevitable lethal elimination." },

  // REBEL VIBE
  { id: "norules", baseName: "NoRules", vibes: ["rebel"], dna: "Rebel · Bold", prefix: "No", suffix: "Rules", meaning: "Total defiance of traditional conventions." },
  { id: "roguex", baseName: "RogueX", vibes: ["rebel"], dna: "Rebel · Outlaw", prefix: "Rogue", suffix: "X", meaning: "Operating strictly outside squad command." },
  { id: "untamed", baseName: "Untamed", vibes: ["rebel", "confident"], dna: "Rebel · Wild", prefix: "Un", suffix: "tamed", meaning: "Wild spirit that refuses to be caged." },
  { id: "wildcode", baseName: "WildCode", vibes: ["rebel"], dna: "Rebel · Chaotic", prefix: "Wild", suffix: "Code", meaning: "Unpredictable chaotic combat doctrine." },
  { id: "ownway", baseName: "OwnWay", vibes: ["rebel", "confident"], dna: "Rebel · Independent", prefix: "Own", suffix: "Way", meaning: "Self-authored destiny on the battlefield." },
  { id: "rebelace", baseName: "RebelAce", vibes: ["rebel", "confident"], dna: "Rebel · Skilled", prefix: "Rebel", suffix: "Ace", meaning: "Top fragger who plays by their own instinct." },
  { id: "sololaw", baseName: "SoloLaw", vibes: ["rebel"], dna: "Rebel · Solitary", prefix: "Solo", suffix: "Law", meaning: "Your word is the only law that matters." },
  { id: "unbound", baseName: "Unbound", vibes: ["rebel"], dna: "Rebel · Free", prefix: "Un", suffix: "bound", meaning: "Free from restrictions and fear." },
  { id: "nofear", baseName: "NoFear", vibes: ["rebel", "confident"], dna: "Rebel · Defiant", prefix: "No", suffix: "Fear", meaning: "Absolute psychological invulnerability." },
  { id: "nolimits", baseName: "NoLimits", vibes: ["rebel", "confident"], dna: "Rebel · Extreme", prefix: "No", suffix: "Limits", meaning: "Pushing past every boundary and ceiling." },
  { id: "nocrown", baseName: "NoCrown", vibes: ["rebel"], dna: "Rebel · Anti-Royal", prefix: "No", suffix: "Crown", meaning: "Anarchist warrior bowing to no king." },
  { id: "nomaster", baseName: "NoMaster", vibes: ["rebel"], dna: "Rebel · Unconquered", prefix: "No", suffix: "Master", meaning: "Sovereign autonomy without allegiance." },

  // COLD VIBE
  { id: "coldmind", baseName: "ColdMind", vibes: ["cold"], dna: "Cold · Calm", prefix: "Cold", suffix: "Mind", meaning: "Clinical calculation without emotional interference." },
  { id: "silentace", baseName: "SilentAce", vibes: ["cold", "mysterious"], dna: "Calm · Confident", prefix: "Silent", suffix: "Ace", meaning: "Deadly execution delivered with zero noise." },
  { id: "frostx", baseName: "FrostX", vibes: ["cold"], dna: "Cold · Glacial", prefix: "Frost", suffix: "X", meaning: "Sub-zero chill that freezes enemy momentum." },
  { id: "calmshot", baseName: "CalmShot", vibes: ["cold", "confident"], dna: "Cold · Steady", prefix: "Calm", suffix: "Shot", meaning: "Unshakable crosshair stillness in clutch moments." },
  { id: "icesoul", baseName: "IceSoul", vibes: ["cold"], dna: "Cold · Impassive", prefix: "Ice", suffix: "Soul", meaning: "Frozen composure under heavy artillery fire." },
  { id: "zeronoise", baseName: "ZeroNoise", vibes: ["cold", "mysterious"], dna: "Cold · Stealth", prefix: "Zero", suffix: "Noise", meaning: "Complete acoustic stealth until the trigger pulls." },
  { id: "stillwolf", baseName: "StillWolf", vibes: ["cold"], dna: "Cold · Patient", prefix: "Still", suffix: "Wolf", meaning: "Patience of a predator waiting for the perfect angle." },
  { id: "coldviper", baseName: "ColdViper", vibes: ["cold", "dark"], dna: "Cold · Lethal", prefix: "Cold", suffix: "Viper", meaning: "Numbing poison delivered with pinpoint precision." },
  { id: "coldwolf", baseName: "ColdWolf", vibes: ["cold", "dark"], dna: "Cold · Solitary", prefix: "Cold", suffix: "Wolf", meaning: "Arctic lone operative thriving in blizzard conditions." },
  { id: "zerochill", baseName: "ZeroChill", vibes: ["cold", "confident"], dna: "Cold · Ruthless", prefix: "Zero", suffix: "Chill", meaning: "Relentless aggression delivered with cold detachment." },
  { id: "glacierx", baseName: "GlacierX", vibes: ["cold"], dna: "Cold · Massive", prefix: "Glacier", suffix: "X", meaning: "Unstoppable creeping wall of ice." },
  { id: "icefang", baseName: "IceFang", vibes: ["cold"], dna: "Cold · Sharp", prefix: "Ice", suffix: "Fang", meaning: "Piercing bite of zero-degree combat." },

  // ROYAL VIBE
  { id: "rogueking", baseName: "RogueKing", vibes: ["royal", "rebel"], dna: "Royal · Outlaw", prefix: "Rogue", suffix: "King", meaning: "Monarch of the wild frontier." },
  { id: "crownace", baseName: "CrownAce", vibes: ["royal", "confident"], dna: "Royal · Sovereign", prefix: "Crown", suffix: "Ace", meaning: "Imperial status backed by number one combat rating." },
  { id: "royalx", baseName: "RoyalX", vibes: ["royal"], dna: "Royal · Elite", prefix: "Royal", suffix: "X", meaning: "Pure prestige bloodline in the arena." },
  { id: "ironking", baseName: "IronKing", vibes: ["royal", "confident"], dna: "Royal · Heavy", prefix: "Iron", suffix: "King", meaning: "Imperious rule forged in hardened metal." },
  { id: "primeking", baseName: "PrimeKing", vibes: ["royal", "confident"], dna: "Royal · Dominion", prefix: "Prime", suffix: "King", meaning: "Supreme sovereign standing atop the leaderboard." },
  { id: "crownwolf", baseName: "CrownWolf", vibes: ["royal", "rebel"], dna: "Royal · Pack Leader", prefix: "Crown", suffix: "Wolf", meaning: "Leader of the pack with royal mandate." },
  { id: "kingvoid", baseName: "KingVoid", vibes: ["royal", "dark"], dna: "Royal · Dark", prefix: "King", suffix: "Void", meaning: "Ruler over the infinite abyss." },
  { id: "royalfrost", baseName: "RoyalFrost", vibes: ["royal", "cold"], dna: "Royal · Glacial", prefix: "Royal", suffix: "Frost", meaning: "Monarch of the arctic peaks." },
  { id: "monarchx", baseName: "MonarchX", vibes: ["royal"], dna: "Royal · Supreme", prefix: "Monarch", suffix: "X", meaning: "Absolute reign over ranked lobbies." },
  { id: "crownviper", baseName: "CrownViper", vibes: ["royal", "dark"], dna: "Royal · Lethal", prefix: "Crown", suffix: "Viper", meaning: "Imperial venom ruling from the shadows." },
  { id: "rexnova", baseName: "RexNova", vibes: ["royal"], dna: "Royal · Cosmic", prefix: "Rex", suffix: "Nova", meaning: "Emperor of the exploding stars." },
  { id: "imperialace", baseName: "ImperialAce", vibes: ["royal", "confident"], dna: "Royal · Prestigious", prefix: "Imperial", suffix: "Ace", meaning: "Noble dynasty warrior." },

  // MYSTERIOUS VIBE
  { id: "ghostviper", baseName: "GhostViper", vibes: ["mysterious", "cold"], dna: "Mysterious · Phantom", prefix: "Ghost", suffix: "Viper", meaning: "Unseen apparition leaving venomous traces." },
  { id: "voidace", baseName: "VoidAce", vibes: ["mysterious", "dark"], dna: "Mysterious · Occult", prefix: "Void", suffix: "Ace", meaning: "Aces pulled from empty dimensions." },
  { id: "ciphernova", baseName: "CipherNova", vibes: ["mysterious"], dna: "Mysterious · Cryptic", prefix: "Cipher", suffix: "Nova", meaning: "Encrypted burst of destructive brilliance." },
  { id: "shadowpulse", baseName: "ShadowPulse", vibes: ["mysterious", "dark"], dna: "Mysterious · Stealth", prefix: "Shadow", suffix: "Pulse", meaning: "Subconscious wave hidden in the fog." },
  { id: "hiddenwolf", baseName: "HiddenWolf", vibes: ["mysterious", "rebel"], dna: "Mysterious · Camouflage", prefix: "Hidden", suffix: "Wolf", meaning: "Camouflaged lone stalker." },
  { id: "nightshade", baseName: "NightShade", vibes: ["mysterious", "dark"], dna: "Mysterious · Poison", prefix: "Night", suffix: "Shade", meaning: "Deadly botanical veil." },
  { id: "onyxphantom", baseName: "OnyxPhantom", vibes: ["mysterious", "dark"], dna: "Mysterious · Black Gem", prefix: "Onyx", suffix: "Phantom", meaning: "Black gemstone spirit unseen by thermal scopes." },
  { id: "silentnova", baseName: "SilentNova", vibes: ["mysterious", "cold"], dna: "Mysterious · Blast", prefix: "Silent", suffix: "Nova", meaning: "Cataclysmic explosion without an audio cue." },
  { id: "cipherwolf", baseName: "CipherWolf", vibes: ["mysterious", "rebel"], dna: "Mysterious · Solo", prefix: "Cipher", suffix: "Wolf", meaning: "Unbreakable code of the lone ranger." }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ATTITUDE_VIBES, ATTITUDE_DATABASE };
}
