/**
 * Free Fire Bio Color Studio — Color Palette & Template Taxonomies
 * Provides curated gaming color swatches, multi-part signature presets,
 * and candidate syntax format specifications.
 */

const BIO_COLOR_SWATCHES = [
  { name: "Fire Red", hex: "#FF0000", tag: "Aggressive", desc: "Classic intense battle red" },
  { name: "Champion Gold", hex: "#FFD700", tag: "Prestige", desc: "Monarch yellow gold" },
  { name: "Sunset Orange", hex: "#FF5722", tag: "Energy", desc: "Fiery orange burst" },
  { name: "Neon Cyan", hex: "#00E5FF", tag: "Tactical", desc: "Vibrant high-contrast electric cyan" },
  { name: "Toxic Lime", hex: "#00FF00", tag: "Hazard", desc: "Bright radio green" },
  { name: "Cyber Emerald", hex: "#00E676", tag: "Clean", desc: "Crisp emerald fragger green" },
  { name: "Electric Purple", hex: "#B388FF", tag: "Mystic", desc: "Soft radiant violet glow" },
  { name: "Deep Crimson", hex: "#FF2A5F", tag: "Lethal", desc: "Dark rose crimson edge" },
  { name: "Royal Blue", hex: "#1E90FF", tag: "Cold", desc: "Vivid azure blue" },
  { name: "Flash Yellow", hex: "#FFFF00", tag: "Warning", desc: "Pure high-visibility yellow" },
  { name: "Hot Pink", hex: "#FF1493", tag: "Persona", desc: "Punchy bold neon pink" },
  { name: "Pure White", hex: "#FFFFFF", tag: "Neutral", desc: "Maximum brightness text" },
  { name: "Stealth Silver", hex: "#C0C0C0", tag: "Neutral", desc: "Muted metallic readable silver" },
  { name: "Shadow Gray", hex: "#788292", tag: "Subtle", desc: "Secondary bio details" },
  { name: "Deep Obsidian", hex: "#000000", tag: "Void", desc: "Pure black (Caution: low contrast on dark cards)" }
];

const BIO_STARTER_PRESETS = [
  {
    id: "onetap_nofear",
    title: "One Tap | No Fear",
    desc: "Two-tone high impact fragger signature",
    parts: [
      { text: "ONE TAP ", hex: "#FF0000" },
      { text: "| NO FEAR", hex: "#FFD700" }
    ]
  },
  {
    id: "rush_mode_on",
    title: "Rush | Mode | On",
    desc: "Three-tone tactical squad status",
    parts: [
      { text: "RUSH ", hex: "#00E5FF" },
      { text: "MODE ", hex: "#00FF00" },
      { text: "ON", hex: "#FFD700" }
    ]
  },
  {
    id: "peace_war",
    title: "Peace in Mind | War in Sight",
    desc: "Dual contrast composed philosophy",
    parts: [
      { text: "PEACE IN MIND ", hex: "#00E5FF" },
      { text: "| WAR IN SIGHT", hex: "#FF2A5F" }
    ]
  },
  {
    id: "king_of_clutch",
    title: "King of Clutch",
    desc: "Prestigious gold and pure white emblem",
    parts: [
      { text: "KING OF ", hex: "#FFD700" },
      { text: "CLUTCH", hex: "#FFFFFF" }
    ]
  },
  {
    id: "solo_squad",
    title: "Solo Squad | No Rules",
    desc: "Vibrant neon cyberpunk defiance",
    parts: [
      { text: "SOLO SQUAD ", hex: "#B388FF" },
      { text: "| NO RULES", hex: "#FF1493" }
    ]
  },
  {
    id: "dark_viper",
    title: "Dark Viper | Unseen",
    desc: "Stealth emerald and silver mark",
    parts: [
      { text: "DARK VIPER ", hex: "#00E676" },
      { text: "| UNSEEN", hex: "#C0C0C0" }
    ]
  }
];

const CANDIDATE_FORMATS = [
  {
    id: "standard",
    name: "Standard Bracketed [RRGGBB]",
    shortLabel: "[RRGGBB]",
    desc: "Most widely reported community pattern. Strips '#' and encloses hex in square brackets.",
    example: "[FF0000]ONE TAP [FFD700]NO FEAR",
    badge: "Most Common"
  },
  {
    id: "hash",
    name: "Hash Bracketed [#RRGGBB]",
    shortLabel: "[#RRGGBB]",
    desc: "Preserves the '#' symbol inside square brackets.",
    example: "[#FF0000]ONE TAP [#FFD700]NO FEAR",
    badge: "Alternative"
  },
  {
    id: "bold",
    name: "Bold Tagged [b][RRGGBB]",
    shortLabel: "[b][RRGGBB]",
    desc: "Prepends [b] BBCode tag to simulate bold weight across supported clients.",
    example: "[b][FF0000]ONE TAP [FFD700]NO FEAR",
    badge: "Bold Variant"
  },
  {
    id: "center_bold",
    name: "Centered & Bold [c][b][RRGGBB]",
    shortLabel: "[c][b]",
    desc: "Combines [c] centering and [b] bold tags with standard bracketed hex colors.",
    example: "[c][b][FF0000]ONE TAP [FFD700]NO FEAR",
    badge: "Formatted"
  }
];
