/**
 * Free Fire Name Ideas — Data Bank & Semantic Taxonomies
 * Curated gaming identities categorized by persona, structure, length, and semantic roots.
 */

const IDEAS_VIBES = [
  { id: "all", name: "All Vibes", icon: "🔥", desc: "Explore all curated base name ideas" },
  { id: "competitive", name: "Competitive", icon: "⚡", desc: "Sharp, aggressive, fragger, clutch handles" },
  { id: "dark", name: "Dark", icon: "🌑", desc: "Shadows, night, void, grim, phantom themes" },
  { id: "clean", name: "Clean & Short", icon: "✨", desc: "Minimalist, sleek, readable, high impact" },
  { id: "funny", name: "Funny", icon: "🎯", desc: "Playful, sarcastic, squad humor, self-deprecating" },
  { id: "aesthetic", name: "Aesthetic", icon: "🌸", desc: "Atmospheric, sound-driven, poetic, stylish" },
  { id: "mysterious", name: "Mysterious", icon: "🥷", desc: "Enigmatic, veiled, cryptic, solitary handles" },
  { id: "oneword", name: "One Word", icon: "💎", desc: "Punchy single-word moniker identities" }
];

const IDEAS_DATABASE = [
  // COMPETITIVE
  { id: "rushvex", baseName: "RushVex", vibes: ["competitive"], prefix: "Rush", suffix: "Vex", length: "medium", dna: "Competitive • Rapid • Two-Part", concept: "Relentless entry fragger pace" },
  { id: "clutchnova", baseName: "ClutchNova", vibes: ["competitive"], prefix: "Clutch", suffix: "Nova", length: "medium", dna: "Competitive • Elite • Two-Part", concept: "Explosive performance in 1v4 endgames" },
  { id: "riftace", baseName: "RiftAce", vibes: ["competitive"], prefix: "Rift", suffix: "Ace", length: "medium", dna: "Competitive • Tactical • Two-Part", concept: "Zone-splitting squad leader" },
  { id: "vexrush", baseName: "VexRush", vibes: ["competitive"], prefix: "Vex", suffix: "Rush", length: "medium", dna: "Competitive • Fast • Two-Part", concept: "Aggressive flanking specialist" },
  { id: "blitzcore", baseName: "BlitzCore", vibes: ["competitive"], prefix: "Blitz", suffix: "Core", length: "medium", dna: "Competitive • Aggressive • Two-Part", concept: "Heart of high-tempo assaults" },
  { id: "novastrike", baseName: "NovaStrike", vibes: ["competitive"], prefix: "Nova", suffix: "Strike", length: "medium", dna: "Competitive • Lethal • Two-Part", concept: "Burst damage champion" },
  { id: "quickvex", baseName: "QuickVex", vibes: ["competitive", "clean"], prefix: "Quick", suffix: "Vex", length: "medium", dna: "Competitive • Agile • Two-Part", concept: "Sub-second reflex marksman" },
  { id: "apexrift", baseName: "ApexRift", vibes: ["competitive"], prefix: "Apex", suffix: "Rift", length: "medium", dna: "Competitive • Dominant • Two-Part", concept: "Top tier positioning player" },
  { id: "boltvex", baseName: "BoltVex", vibes: ["competitive", "clean"], prefix: "Bolt", suffix: "Vex", length: "medium", dna: "Competitive • Sharp • Two-Part", concept: "Lightning sprint fragger" },
  { id: "talonprime", baseName: "TalonPrime", vibes: ["competitive"], prefix: "Talon", suffix: "Prime", length: "medium", dna: "Competitive • Apex • Two-Part", concept: "Predatory clutch execution" },
  { id: "acepulse", baseName: "AcePulse", vibes: ["competitive"], prefix: "Ace", suffix: "Pulse", length: "medium", dna: "Competitive • Rhythmic • Two-Part", concept: "Consistent round-winning impact" },
  { id: "fluxace", baseName: "FluxAce", vibes: ["competitive"], prefix: "Flux", suffix: "Ace", length: "medium", dna: "Competitive • Dynamic • Two-Part", concept: "Adaptive tactical fragger" },
  { id: "voltrush", baseName: "VoltRush", vibes: ["competitive"], prefix: "Volt", suffix: "Rush", length: "medium", dna: "Competitive • Electric • Two-Part", concept: "High-voltage rush player" },
  { id: "apexbyte", baseName: "ApexByte", vibes: ["competitive"], prefix: "Apex", suffix: "Byte", length: "medium", dna: "Competitive • Precision • Two-Part", concept: "Calculated damage dealer" },
  { id: "ironclutch", baseName: "IronClutch", vibes: ["competitive"], prefix: "Iron", suffix: "Clutch", length: "medium", dna: "Competitive • Resilient • Two-Part", concept: "Unshakable final circle survivor" },
  { id: "rapidrift", baseName: "RapidRift", vibes: ["competitive"], prefix: "Rapid", suffix: "Rift", length: "medium", dna: "Competitive • Speed • Two-Part", concept: "Fast zone rotation master" },

  // DARK
  { id: "nightvex", baseName: "NightVex", vibes: ["dark", "competitive"], prefix: "Night", suffix: "Vex", length: "medium", dna: "Dark • Competitive • Two-Part", concept: "Nocturnal clutch marksman" },
  { id: "voidrift", baseName: "VoidRift", vibes: ["dark", "mysterious"], prefix: "Void", suffix: "Rift", length: "medium", dna: "Dark • Mysterious • Two-Part", concept: "Abyssal battlefield controller" },
  { id: "grimnova", baseName: "GrimNova", vibes: ["dark"], prefix: "Grim", suffix: "Nova", length: "medium", dna: "Dark • Heavy • Two-Part", concept: "Fatal cosmic collapse" },
  { id: "shadex", baseName: "ShadeX", vibes: ["dark", "clean"], prefix: "Shade", suffix: "X", length: "short", dna: "Dark • Minimal • Two-Part", concept: "Shadow assassin identity" },
  { id: "darkrift", baseName: "DarkRift", vibes: ["dark"], prefix: "Dark", suffix: "Rift", length: "medium", dna: "Dark • Menacing • Two-Part", concept: "Torn reality from the darkness" },
  { id: "ghostvex", baseName: "GhostVex", vibes: ["dark", "mysterious"], prefix: "Ghost", suffix: "Vex", length: "medium", dna: "Dark • Phantom • Two-Part", concept: "Unseen hunter behind cover" },
  { id: "nighthex", baseName: "NightHex", vibes: ["dark", "mysterious"], prefix: "Night", suffix: "Hex", length: "medium", dna: "Dark • Enigma • Two-Part", concept: "Curse cast in midnight gloom" },
  { id: "ashvoid", baseName: "AshVoid", vibes: ["dark", "clean"], prefix: "Ash", suffix: "Void", length: "medium", dna: "Dark • Desolate • Two-Part", concept: "Surviving in burned battlefields" },
  { id: "shadowhex", baseName: "ShadowHex", vibes: ["dark"], prefix: "Shadow", suffix: "Hex", length: "medium", dna: "Dark • Cryptic • Two-Part", concept: "Shadow magic precision" },
  { id: "shadowvex", baseName: "ShadowVex", vibes: ["dark", "competitive"], prefix: "Shadow", suffix: "Vex", length: "medium", dna: "Dark • Competitive • Two-Part", concept: "Covert aggression in squad clashes" },
  { id: "shadownyx", baseName: "ShadowNyx", vibes: ["dark", "aesthetic"], prefix: "Shadow", suffix: "Nyx", length: "medium", dna: "Dark • Aesthetic • Two-Part", concept: "Elegantly lethal night identity" },
  { id: "vexshade", baseName: "VexShade", vibes: ["dark"], prefix: "Vex", suffix: "Shade", length: "medium", dna: "Dark • Inverted • Two-Part", concept: "Inverted shadow identity" },
  { id: "duskfang", baseName: "DuskFang", vibes: ["dark"], prefix: "Dusk", suffix: "Fang", length: "medium", dna: "Dark • Predatory • Two-Part", concept: "Twilight predator strike" },
  { id: "netherpulse", baseName: "NetherPulse", vibes: ["dark"], prefix: "Nether", suffix: "Pulse", length: "medium", dna: "Dark • Underworld • Two-Part", concept: "Rhythm of the deep abyss" },
  { id: "eclipsecore", baseName: "EclipseCore", vibes: ["dark"], prefix: "Eclipse", suffix: "Core", length: "medium", dna: "Dark • Celestial • Two-Part", concept: "Total blackout battle presence" },
  { id: "grimstrike", baseName: "GrimStrike", vibes: ["dark", "competitive"], prefix: "Grim", suffix: "Strike", length: "medium", dna: "Dark • Fatal • Two-Part", concept: "Inevitable elimination delivery" },

  // CLEAN & SHORT
  { id: "vex", baseName: "Vex", vibes: ["clean", "oneword"], prefix: "Vex", suffix: "", length: "short", dna: "Clean • Agile • One Word", concept: "Ultra-sharp single syllable handle" },
  { id: "nyx", baseName: "Nyx", vibes: ["clean", "dark", "oneword"], prefix: "Nyx", suffix: "", length: "short", dna: "Clean • Dark • One Word", concept: "Classic night goddess brevity" },
  { id: "rift", baseName: "Rift", vibes: ["clean", "oneword"], prefix: "Rift", suffix: "", length: "short", dna: "Clean • Sharp • One Word", concept: "Dimensional tear identity" },
  { id: "kiro", baseName: "Kiro", vibes: ["clean", "oneword"], prefix: "Kiro", suffix: "", length: "short", dna: "Clean • Sleek • One Word", concept: "Modern smooth phonetic handle" },
  { id: "zyn", baseName: "Zyn", vibes: ["clean", "oneword"], prefix: "Zyn", suffix: "", length: "short", dna: "Clean • Minimal • One Word", concept: "Three-letter modern gaming tag" },
  { id: "raze", baseName: "Raze", vibes: ["clean", "competitive", "oneword"], prefix: "Raze", suffix: "", length: "short", dna: "Clean • Aggressive • One Word", concept: "To tear down defenses completely" },
  { id: "nox", baseName: "Nox", vibes: ["clean", "dark", "oneword"], prefix: "Nox", suffix: "", length: "short", dna: "Clean • Dark • One Word", concept: "Latin night, pure and punchy" },
  { id: "kael", baseName: "Kael", vibes: ["clean", "oneword"], prefix: "Kael", suffix: "", length: "short", dna: "Clean • Heroic • One Word", concept: "Short legendary gamer alias" },
  { id: "varo", baseName: "Varo", vibes: ["clean", "oneword"], prefix: "Varo", suffix: "", length: "short", dna: "Clean • Sleek • One Word", concept: "Crisp two-syllable moniker" },
  { id: "zyro", baseName: "Zyro", vibes: ["clean", "oneword"], prefix: "Zyro", suffix: "", length: "short", dna: "Clean • Futuristic • One Word", concept: "Cybernetic clean pseudonym" },
  { id: "jinx", baseName: "Jinx", vibes: ["clean", "funny", "oneword"], prefix: "Jinx", suffix: "", length: "short", dna: "Clean • Playful • One Word", concept: "Unpredictable squad catalyst" },
  { id: "vane", baseName: "Vane", vibes: ["clean", "oneword"], prefix: "Vane", suffix: "", length: "short", dna: "Clean • Wind • One Word", concept: "Direction indicator in chaos" },
  { id: "dash", baseName: "Dash", vibes: ["clean", "competitive", "oneword"], prefix: "Dash", suffix: "", length: "short", dna: "Clean • Fast • One Word", concept: "High-speed tactical entry" },
  { id: "milo", baseName: "Milo", vibes: ["clean", "oneword"], prefix: "Milo", suffix: "", length: "short", dna: "Clean • Friendly • One Word", concept: "Approachable simple gamer name" },
  { id: "kade", baseName: "Kade", vibes: ["clean", "oneword"], prefix: "Kade", suffix: "", length: "short", dna: "Clean • Punchy • One Word", concept: "Solid, dependable base identity" },
  { id: "shado", baseName: "Shado", vibes: ["clean", "dark", "oneword"], prefix: "Shado", suffix: "", length: "short", dna: "Clean • Stylized • One Word", concept: "Shortened sleek variant of Shadow" },

  // FUNNY
  { id: "oopsrush", baseName: "OopsRush", vibes: ["funny", "competitive"], prefix: "Oops", suffix: "Rush", length: "medium", dna: "Funny • Chaotic • Two-Part", concept: "Accidental wipe of an entire squad" },
  { id: "lootgoblin", baseName: "LootGoblin", vibes: ["funny"], prefix: "Loot", suffix: "Goblin", length: "medium", dna: "Funny • Relatable • Two-Part", concept: "Always looting while the team fights" },
  { id: "missedagain", baseName: "MissedAgain", vibes: ["funny"], prefix: "Missed", suffix: "Again", length: "medium", dna: "Funny • Self-Aware • Two-Part", concept: "Humorous sniper whiff apology" },
  { id: "panicaim", baseName: "PanicAim", vibes: ["funny"], prefix: "Panic", suffix: "Aim", length: "medium", dna: "Funny • Chaotic • Two-Part", concept: "Full spray at nothing when surprised" },
  { id: "wrongway", baseName: "WrongWay", vibes: ["funny"], prefix: "Wrong", suffix: "Way", length: "medium", dna: "Funny • Squad-Meme • Two-Part", concept: "Driving the Jeep into the danger zone" },
  { id: "noammo", baseName: "NoAmmo", vibes: ["funny", "clean"], prefix: "No", suffix: "Ammo", length: "short", dna: "Funny • Clean • Two-Part", concept: "Perpetually out of shotgun shells" },
  { id: "sneakypotato", baseName: "SneakyPotato", vibes: ["funny"], prefix: "Sneaky", suffix: "Potato", length: "medium", dna: "Funny • Whimsical • Two-Part", concept: "Grass-prone camping legend" },
  { id: "campsnack", baseName: "CampSnack", vibes: ["funny"], prefix: "Camp", suffix: "Snack", length: "medium", dna: "Funny • Cozy • Two-Part", concept: "Eating chips inside a watchtower" },
  { id: "couchsniper", baseName: "CouchSniper", vibes: ["funny"], prefix: "Couch", suffix: "Sniper", length: "medium", dna: "Funny • Casual • Two-Part", concept: "Ranked matches from the sofa" },
  { id: "lagmademedie", baseName: "LagMadeMeDie", vibes: ["funny"], prefix: "Lag", suffix: "MadeMeDie", length: "medium", dna: "Funny • Classic-Excuse • Phrase", concept: "The timeless ping excuse" },
  { id: "runawaynow", baseName: "RunAwayNow", vibes: ["funny"], prefix: "Run", suffix: "AwayNow", length: "medium", dna: "Funny • Warning • Phrase", concept: "Tactical retreat specialist" },
  { id: "potatoaim", baseName: "PotatoAim", vibes: ["funny"], prefix: "Potato", suffix: "Aim", length: "medium", dna: "Funny • Self-Deprecating • Two-Part", concept: "Missing shots from 2 meters away" },
  { id: "friendlyghost", baseName: "FriendlyGhost", vibes: ["funny", "mysterious"], prefix: "Friendly", suffix: "Ghost", length: "medium", dna: "Funny • Ironical • Two-Part", concept: "Spectral team cheerleader" },
  { id: "blameping", baseName: "BlamePing", vibes: ["funny"], prefix: "Blame", suffix: "Ping", length: "medium", dna: "Funny • Relatable • Two-Part", concept: "999+ ping legend" },
  { id: "medkitthief", baseName: "MedkitThief", vibes: ["funny"], prefix: "Medkit", suffix: "Thief", length: "medium", dna: "Funny • Squad-Drama • Two-Part", concept: "Stealing heals before teammates" },

  // AESTHETIC
  { id: "vesper", baseName: "Vesper", vibes: ["aesthetic", "clean", "oneword"], prefix: "Vesper", suffix: "", length: "short", dna: "Aesthetic • Evening • One Word", concept: "Evening twilight serenity" },
  { id: "lunavex", baseName: "LunaVex", vibes: ["aesthetic", "dark"], prefix: "Luna", suffix: "Vex", length: "medium", dna: "Aesthetic • Lunar • Two-Part", concept: "Moonlit elegance and sting" },
  { id: "serein", baseName: "Serein", vibes: ["aesthetic", "clean", "oneword"], prefix: "Serein", suffix: "", length: "short", dna: "Aesthetic • Poetic • One Word", concept: "Fine rain falling from a cloudless sky" },
  { id: "novamuse", baseName: "NovaMuse", vibes: ["aesthetic"], prefix: "Nova", suffix: "Muse", length: "medium", dna: "Aesthetic • Cosmic • Two-Part", concept: "Creative inspiration from dying stars" },
  { id: "halorift", baseName: "HaloRift", vibes: ["aesthetic"], prefix: "Halo", suffix: "Rift", length: "medium", dna: "Aesthetic • Luminous • Two-Part", concept: "Aura glowing around cosmic fractures" },
  { id: "velvetx", baseName: "VelvetX", vibes: ["aesthetic", "clean"], prefix: "Velvet", suffix: "X", length: "medium", dna: "Aesthetic • Smooth • Two-Part", concept: "Silky tactile gaming handle" },
  { id: "astravex", baseName: "AstraVex", vibes: ["aesthetic", "competitive"], prefix: "Astra", suffix: "Vex", length: "medium", dna: "Aesthetic • Starborne • Two-Part", concept: "Celestial energy with sharp focus" },
  { id: "noire", baseName: "Noire", vibes: ["aesthetic", "dark", "oneword"], prefix: "Noire", suffix: "", length: "short", dna: "Aesthetic • Dark • One Word", concept: "Classic cinematic darkness" },
  { id: "solis", baseName: "Solis", vibes: ["aesthetic", "clean", "oneword"], prefix: "Solis", suffix: "", length: "short", dna: "Aesthetic • Solar • One Word", concept: "Solar flare identity" },
  { id: "ethereal", baseName: "Ethereal", vibes: ["aesthetic", "oneword"], prefix: "Ethereal", suffix: "", length: "medium", dna: "Aesthetic • Atmospheric • One Word", concept: "Extremely delicate and light" },
  { id: "miragex", baseName: "MirageX", vibes: ["aesthetic", "mysterious"], prefix: "Mirage", suffix: "X", length: "medium", dna: "Aesthetic • Illusion • Two-Part", concept: "Desert shimmer in battle" },
  { id: "irisbloom", baseName: "IrisBloom", vibes: ["aesthetic"], prefix: "Iris", suffix: "Bloom", length: "medium", dna: "Aesthetic • Floral • Two-Part", concept: "Vibrant tactical bloom" },
  { id: "luster", baseName: "Luster", vibes: ["aesthetic", "clean", "oneword"], prefix: "Luster", suffix: "", length: "short", dna: "Aesthetic • Glow • One Word", concept: "Gentle sheen of radiant armor" },
  { id: "caelum", baseName: "Caelum", vibes: ["aesthetic", "oneword"], prefix: "Caelum", suffix: "", length: "short", dna: "Aesthetic • Celestial • One Word", concept: "Latin heaven and sky" },
  { id: "zephyrine", baseName: "Zephyrine", vibes: ["aesthetic", "oneword"], prefix: "Zephyrine", suffix: "", length: "medium", dna: "Aesthetic • Gentle Wind • One Word", concept: "West wind breeze in motion" },

  // MYSTERIOUS
  { id: "cipher", baseName: "Cipher", vibes: ["mysterious", "clean", "oneword"], prefix: "Cipher", suffix: "", length: "short", dna: "Mysterious • Cryptic • One Word", concept: "Secret key nobody can decode" },
  { id: "unknownx", baseName: "UnknownX", vibes: ["mysterious"], prefix: "Unknown", suffix: "X", length: "medium", dna: "Mysterious • Anonymous • Two-Part", concept: "Unidentified battlefield threat" },
  { id: "enigma", baseName: "Enigma", vibes: ["mysterious", "oneword"], prefix: "Enigma", suffix: "", length: "short", dna: "Mysterious • Puzzling • One Word", concept: "Unsolvable player riddle" },
  { id: "veil", baseName: "Veil", vibes: ["mysterious", "clean", "oneword"], prefix: "Veil", suffix: "", length: "short", dna: "Mysterious • Hidden • One Word", concept: "Concealing true intentions" },
  { id: "hollowvex", baseName: "HollowVex", vibes: ["mysterious", "dark"], prefix: "Hollow", suffix: "Vex", length: "medium", dna: "Mysterious • Empty • Two-Part", concept: "Echoing void in combat" },
  { id: "echorift", baseName: "EchoRift", vibes: ["mysterious"], prefix: "Echo", suffix: "Rift", length: "medium", dna: "Mysterious • Resonant • Two-Part", concept: "Faint signals between dimensions" },
  { id: "phantomx", baseName: "PhantomX", vibes: ["mysterious", "dark"], prefix: "Phantom", suffix: "X", length: "medium", dna: "Mysterious • Spectral • Two-Part", concept: "Disappearing before return fire" },
  { id: "hiddennova", baseName: "HiddenNova", vibes: ["mysterious"], prefix: "Hidden", suffix: "Nova", length: "medium", dna: "Mysterious • Latent • Two-Part", concept: "Quiet player harboring explosive power" },
  { id: "obscura", baseName: "Obscura", vibes: ["mysterious", "oneword"], prefix: "Obscura", suffix: "", length: "medium", dna: "Mysterious • Camera Dark • One Word", concept: "Dark chamber perspective" },
  { id: "silentomen", baseName: "SilentOmen", vibes: ["mysterious", "dark"], prefix: "Silent", suffix: "Omen", length: "medium", dna: "Mysterious • Foreboding • Two-Part", concept: "Quiet sign of impending defeat" },
  { id: "arcanex", baseName: "ArcaneX", vibes: ["mysterious"], prefix: "Arcane", suffix: "X", length: "medium", dna: "Mysterious • Esoteric • Two-Part", concept: "Secret knowledge of circle mechanics" },
  { id: "mistwalker", baseName: "MistWalker", vibes: ["mysterious"], prefix: "Mist", suffix: "Walker", length: "medium", dna: "Mysterious • Shrouded • Two-Part", concept: "Moving through smoke grenades" },
  { id: "nullbyte", baseName: "NullByte", vibes: ["mysterious", "clean"], prefix: "Null", suffix: "Byte", length: "medium", dna: "Mysterious • Zero-State • Two-Part", concept: "Absence of data identity" },
  { id: "whisperrift", baseName: "WhisperRift", vibes: ["mysterious"], prefix: "Whisper", suffix: "Rift", length: "medium", dna: "Mysterious • Faint • Two-Part", concept: "Barely audible squad communication" },

  // ONE WORD
  { id: "vexora", baseName: "Vexora", vibes: ["oneword", "mysterious"], prefix: "Vexora", suffix: "", length: "short", dna: "Clean • Mysterious • One Word", concept: "Flowing synthetic moniker" },
  { id: "zephyr", baseName: "Zephyr", vibes: ["oneword", "aesthetic"], prefix: "Zephyr", suffix: "", length: "short", dna: "Clean • Swift • One Word", concept: "Gentle breeze with sudden force" },
  { id: "valen", baseName: "Valen", vibes: ["oneword", "clean"], prefix: "Valen", suffix: "", length: "short", dna: "Clean • Valiant • One Word", concept: "Brave, composed gaming alias" },
  { id: "kestrel", baseName: "Kestrel", vibes: ["oneword", "competitive"], prefix: "Kestrel", suffix: "", length: "medium", dna: "Competitive • Aerial • One Word", concept: "Falcon hovering above prey" },
  { id: "onyx", baseName: "Onyx", vibes: ["oneword", "dark", "clean"], prefix: "Onyx", suffix: "", length: "short", dna: "Dark • Solid • One Word", concept: "Deep black gemstone armor" },
  { id: "solas", baseName: "Solas", vibes: ["oneword", "aesthetic"], prefix: "Solas", suffix: "", length: "short", dna: "Aesthetic • Light • One Word", concept: "Comforting beacon of hope" },
  { id: "vortex", baseName: "Vortex", vibes: ["oneword", "competitive"], prefix: "Vortex", suffix: "", length: "short", dna: "Competitive • Spiraling • One Word", concept: "Pulling squads into the fight" },
  { id: "cinder", baseName: "Cinder", vibes: ["oneword", "dark"], prefix: "Cinder", suffix: "", length: "short", dna: "Dark • Ember • One Word", concept: "Remaining spark after fire" },
  { id: "zenith", baseName: "Zenith", vibes: ["oneword", "competitive"], prefix: "Zenith", suffix: "", length: "short", dna: "Competitive • Apex • One Word", concept: "Highest point of performance" },
  { id: "eclipse", baseName: "Eclipse", vibes: ["oneword", "dark"], prefix: "Eclipse", suffix: "", length: "medium", dna: "Dark • Celestial • One Word", concept: "Sun obscured by shadow" },
  { id: "astra", baseName: "Astra", vibes: ["oneword", "aesthetic"], prefix: "Astra", suffix: "", length: "short", dna: "Aesthetic • Stellar • One Word", concept: "Star fleet identifier" },
  { id: "ronin", baseName: "Ronin", vibes: ["oneword", "clean"], prefix: "Ronin", suffix: "", length: "short", dna: "Clean • Lone Warrior • One Word", concept: "Masterless samurai on solo drop" },
  { id: "valkyr", baseName: "Valkyr", vibes: ["oneword", "competitive"], prefix: "Valkyr", suffix: "", length: "short", dna: "Competitive • Mythic • One Word", concept: "Chooser of the fallen" },
  { id: "specter", baseName: "Specter", vibes: ["oneword", "mysterious"], prefix: "Specter", suffix: "", length: "medium", dna: "Mysterious • Ghostly • One Word", concept: "Haunting apparition in smoke" },
  { id: "mirage", baseName: "Mirage", vibes: ["oneword", "aesthetic"], prefix: "Mirage", suffix: "", length: "short", dna: "Aesthetic • Illusion • One Word", concept: "Optical distortion in wasteland" }
];

// Rich combinatorial vocabulary for live seed generation & lock exploration
const VOCABULARY_BANKS = {
  // Curated prefixes by vibe
  prefixes: {
    competitive: ["Apex", "Rush", "Blitz", "Clutch", "Strike", "Nova", "Rapid", "Prime", "Ace", "Bolt", "Vector", "Talon", "Flux", "Volt", "Iron", "Alpha"],
    dark: ["Shadow", "Night", "Void", "Grim", "Shade", "Ghost", "Ash", "Nether", "Dusk", "Eclipse", "Black", "Nocturne", "Phantom", "Dark", "Grave"],
    clean: ["Vex", "Nyx", "Rift", "Kiro", "Zyn", "Raze", "Nox", "Kael", "Varo", "Zyro", "Jinx", "Vane", "Dash", "Axel", "Milo", "Kade", "True"],
    funny: ["Oops", "Loot", "Panic", "Missed", "Camp", "Couch", "Sneaky", "Potato", "Lag", "Snack", "NoAmmo", "Wrong", "Blame", "Friendly"],
    aesthetic: ["Luna", "Nova", "Sol", "Velvet", "Astra", "Iris", "Serein", "Vesper", "Echo", "Halo", "Aura", "Caelum", "Zephyr", "Luster", "Opal"],
    mysterious: ["Cipher", "Enigma", "Veil", "Hollow", "Echo", "Phantom", "Obscura", "Arcane", "Silent", "Null", "Secret", "Mist", "Whisper", "Unknown"],
    oneword: ["Zephyr", "Valen", "Kestrel", "Onyx", "Solas", "Vortex", "Cinder", "Zenith", "Eclipse", "Astra", "Ronin", "Valkyr", "Specter", "Vexora"]
  },

  // Curated suffixes by vibe
  suffixes: {
    competitive: ["Vex", "Rush", "Rift", "Ace", "Nova", "Strike", "Core", "Byte", "Pulse", "Fang", "Blade", "Claw", "Titan", "Zone", "Apex"],
    dark: ["Hex", "Vex", "Rift", "Void", "Shade", "Nyx", "Pulse", "Fang", "Ghost", "Grim", "Storm", "Soul", "Mist", "Omen", "Ash"],
    clean: ["X", "Ace", "Vex", "Rift", "Nova", "Core", "Zen", "Lux", "Ray", "Fly", "Fox", "Sky", "Bay", "Kai"],
    funny: ["Rush", "Goblin", "Again", "Aim", "Way", "Snack", "Sniper", "Potato", "Thief", "Bait", "Trap", "Noob", "Ghost"],
    aesthetic: ["Muse", "Rift", "Vex", "Bloom", "Glow", "Mist", "Grace", "Aura", "Dusk", "Dawn", "Breeze", "Wave", "Soul"],
    mysterious: ["X", "Vex", "Rift", "Nova", "Omen", "Veil", "Mask", "Crypt", "Echo", "Shadow", "Byte", "Walker", "Key"],
    oneword: ["ora", "ix", "en", "us", "is", "a", "ex", "or", "an"]
  },

  // Semantic cousins / cluster mapping for "More Like This"
  semanticRelatives: {
    "shadow": ["Shade", "Night", "Dark", "Dusk", "Void", "Ghost", "Grim", "Nocturne"],
    "shade": ["Shadow", "Ghost", "Veil", "Night", "Dusk", "Phantom"],
    "night": ["Dark", "Shadow", "Nocturne", "Eclipse", "Dusk", "Moon"],
    "void": ["Abyss", "Null", "Hollow", "Nether", "Silent", "Echo"],
    "vex": ["Hex", "Nyx", "Rift", "Nova", "Apex", "Fox", "Dash"],
    "hex": ["Vex", "Spell", "Rift", "Omen", "Pulse", "Crypt"],
    "rift": ["Fracture", "Vex", "Nova", "Gate", "Apex", "Echo"],
    "nova": ["Astra", "Star", "Sol", "Pulse", "Burst", "Strike"],
    "rush": ["Blitz", "Strike", "Dash", "Speed", "Volt", "Rapid"],
    "clutch": ["Apex", "Ace", "Prime", "Iron", "Alpha", "Titan"],
    "ace": ["Apex", "Prime", "Alpha", "King", "Master", "Strike"],
    "ghost": ["Phantom", "Specter", "Shade", "Echo", "Veil", "Whisper"],
    "cipher": ["Enigma", "Secret", "Veil", "Crypt", "Null", "Code"],
    "luna": ["Moon", "Astra", "Stella", "Noire", "Sol", "Vesper"]
  }
};
