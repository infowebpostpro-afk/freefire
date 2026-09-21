/**
 * Free Fire Symbols Database & Metadata
 * Over 220+ curated symbols with category, keywords, Unicode codepoints, and rendering notes
 */

const SYMBOLS_DATA = [
  // 🔥 POPULAR & SIGNATURE
  { char: '亗', name: 'Trident Crown', cat: 'popular', keywords: ['trident', 'crown', 'king', 'pro', 'signature', 'ff'], unicode: 'U+4E57', status: 'common', notes: 'Top signature Free Fire symbol. Universal display.' },
  { char: '꧁', name: 'Left Wing Ornamental Bracket', cat: 'popular', keywords: ['wing', 'left', 'banner', 'frame', 'bracket', 'ornament'], unicode: 'U+0F12', status: 'common', notes: 'Widely used as left name border.' },
  { char: '꧂', name: 'Right Wing Ornamental Bracket', cat: 'popular', keywords: ['wing', 'right', 'banner', 'frame', 'bracket', 'ornament'], unicode: 'U+0F13', status: 'common', notes: 'Widely used as right name border.' },
  { char: '༒', name: 'Tibetan Cross Honor', cat: 'popular', keywords: ['cross', 'tibetan', 'dark', 'honor', 'pro', 'royal'], unicode: 'U+0F12', status: 'common', notes: 'Classic tournament crest symbol.' },
  { char: '☬', name: 'Khanda Warrior Emblem', cat: 'popular', keywords: ['khanda', 'sword', 'warrior', 'crest', 'weapon', 'pro'], unicode: 'U+0A74', status: 'common', notes: 'Sign of warrior strength and combat.' },
  { char: '★', name: 'Black Star', cat: 'popular', keywords: ['star', 'solid', 'rank', 'heroic', 'fav'], unicode: 'U+2605', status: 'common', notes: 'Classic 5-point star. Universal support.' },
  { char: '⚡', name: 'High Voltage Spark', cat: 'popular', keywords: ['lightning', 'bolt', 'electric', 'energy', 'speed', 'thunder'], unicode: 'U+26A1', status: 'common', notes: 'High voltage electricity symbol.' },
  { char: '☠', name: 'Skull and Crossbones', cat: 'popular', keywords: ['skull', 'death', 'dark', 'poison', 'kill', 'danger'], unicode: 'U+2620', status: 'common', notes: 'Represents deadly accuracy and lethality.' },
  { char: '乂', name: 'Cross Slash Blades', cat: 'popular', keywords: ['slash', 'ninja', 'cross', 'scissors', 'katana'], unicode: 'U+4E42', status: 'common', notes: 'Popular ninja sword slash aesthetic.' },
  { char: '彡', name: 'Triple Wind Slash', cat: 'popular', keywords: ['wind', 'slash', 'speed', 'whisk', 'ninja'], unicode: 'U+5F61', status: 'common', notes: 'Triple speed strike symbol.' },
  { char: '〆', name: 'Japanese Shime Mark', cat: 'popular', keywords: ['shime', 'tag', 'pro', 'clan', 'guild', 'japanese'], unicode: 'U+3006', status: 'common', notes: 'Standard guild tag symbol in esports.' },
  { char: 'ツ', name: 'Katakana Smile Tsu', cat: 'popular', keywords: ['tsu', 'smile', 'wink', 'cute', 'japanese'], unicode: 'U+30C4', status: 'common', notes: 'Iconic anime smile symbol.' },

  // ★ STARS & SPARKLES
  { char: '☆', name: 'White Star (Hollow)', cat: 'stars', keywords: ['star', 'hollow', 'white', 'clean'], unicode: 'U+2606', status: 'common', notes: 'Hollow minimal star outline.' },
  { char: '✦', name: 'Black Four Pointed Star', cat: 'stars', keywords: ['star', 'sparkle', 'diamond', 'celestial', 'four'], unicode: 'U+2726', status: 'common', notes: 'Sharp sparkle star for aesthetic names.' },
  { char: '✧', name: 'White Four Pointed Star', cat: 'stars', keywords: ['star', 'sparkle', 'diamond', 'hollow'], unicode: 'U+2727', status: 'common', notes: 'Hollow 4-point shimmer.' },
  { char: '✪', name: 'Circled White Star', cat: 'stars', keywords: ['star', 'circle', 'badge', 'military', 'army'], unicode: 'U+272A', status: 'common', notes: 'Military badge star.' },
  { char: '✯', name: 'Pinwheel Star', cat: 'stars', keywords: ['star', 'pinwheel', 'burst', 'spark'], unicode: 'U+272F', status: 'common', notes: 'Dynamic glowing flare star.' },
  { char: '✰', name: 'Shadowed White Star', cat: 'stars', keywords: ['star', 'shadow', 'cool', 'badge'], unicode: 'U+2730', status: 'common', notes: 'Star with built-in shadow bevel.' },
  { char: '⟡', name: 'White Concave Diamond', cat: 'stars', keywords: ['diamond', 'sparkle', 'concave', 'rare'], unicode: 'U+27E1', status: 'special', notes: 'Modern aesthetic concave diamond.' },
  { char: '✬', name: 'Black Center Star', cat: 'stars', keywords: ['star', 'center', 'dual', 'rare'], unicode: 'U+272C', status: 'common', notes: 'Star with shaded interior.' },
  { char: '✭', name: 'Outlined Black Star', cat: 'stars', keywords: ['star', 'bold', 'hero'], unicode: 'U+272D', status: 'common', notes: 'Heavy accented star.' },
  { char: '✲', name: 'Open Centre Asterisk', cat: 'stars', keywords: ['asterisk', 'spark', 'snow', 'flower'], unicode: 'U+2732', status: 'common', notes: 'Radial sparkle point.' },
  { char: '✴', name: 'Eight Pointed Black Star', cat: 'stars', keywords: ['star', 'eight', 'sun', 'flare'], unicode: 'U+2734', status: 'common', notes: 'Eight-pointed radiant star.' },
  { char: '✵', name: 'Eight Pointed Pinwheel', cat: 'stars', keywords: ['star', 'pinwheel', 'whirl'], unicode: 'U+2735', status: 'common', notes: 'Eight-point pinwheel star.' },

  // ♛ CROWNS & ROYAL
  { char: '👑', name: 'Imperial Crown Emoji', cat: 'crowns', keywords: ['crown', 'king', 'queen', 'royal', 'gold'], unicode: 'U+1F451', status: 'common', notes: 'Renders in color on most mobile platforms.' },
  { char: '♛', name: 'Black Queen Chess Crown', cat: 'crowns', keywords: ['crown', 'queen', 'chess', 'royal', 'black'], unicode: 'U+265B', status: 'common', notes: 'Classic chess queen crown. Highly reliable.' },
  { char: '♚', name: 'Black King Chess Crown', cat: 'crowns', keywords: ['crown', 'king', 'chess', 'royal', 'black'], unicode: 'U+265A', status: 'common', notes: 'Classic chess king crown.' },
  { char: '♕', name: 'White Queen Chess Crown', cat: 'crowns', keywords: ['crown', 'queen', 'chess', 'hollow', 'white'], unicode: 'U+2655', status: 'common', notes: 'Hollow chess queen crown.' },
  { char: '♔', name: 'White King Chess Crown', cat: 'crowns', keywords: ['crown', 'king', 'chess', 'hollow', 'white'], unicode: 'U+2654', status: 'common', notes: 'Hollow chess king crown.' },
  { char: '༗', name: 'Tibetan Coronet Crest', cat: 'crowns', keywords: ['crown', 'coronet', 'tibetan', 'rare', 'crest'], unicode: 'U+0F17', status: 'special', notes: 'Tibetan ceremonial royal coronet.' },
  { char: '☬', name: 'Royal Khanda Diadem', cat: 'crowns', keywords: ['crown', 'royal', 'warrior', 'diadem'], unicode: 'U+0A74', status: 'common', notes: 'Warrior royal insignia.' },

  // ♥ HEARTS & LOVE
  { char: '♥', name: 'Black Heart Suit', cat: 'hearts', keywords: ['heart', 'love', 'card', 'solid'], unicode: 'U+2665', status: 'common', notes: 'Solid text heart suit. Universal.' },
  { char: '♡', name: 'White Heart Outline', cat: 'hearts', keywords: ['heart', 'hollow', 'love', 'cute', 'aesthetic'], unicode: 'U+2661', status: 'common', notes: 'Clean hollow aesthetic heart.' },
  { char: '❥', name: 'Rotated Floral Heart Bullet', cat: 'hearts', keywords: ['heart', 'bullet', 'floral', 'cute', 'stylish'], unicode: 'U+2765', status: 'common', notes: 'Tilted elegant bullet heart.' },
  { char: '❣', name: 'Heavy Heart Exclamation', cat: 'hearts', keywords: ['heart', 'exclamation', 'bold', 'alert'], unicode: 'U+2763', status: 'common', notes: 'Exclamation mark with heart head.' },
  { char: '❦', name: 'Floral Heart Fleuron', cat: 'hearts', keywords: ['heart', 'leaf', 'fleuron', 'vintage', 'aesthetic'], unicode: 'U+2766', status: 'common', notes: 'Decorative vine heart.' },
  { char: '❧', name: 'Rotated Floral Heart', cat: 'hearts', keywords: ['heart', 'leaf', 'curled', 'fleuron'], unicode: 'U+2767', status: 'common', notes: 'Curled aesthetic leaf heart.' },
  { char: 'ღ', name: 'Georgian Letter Ghani', cat: 'hearts', keywords: ['heart', 'cute', 'georgian', 'soft', 'love'], unicode: 'U+10E6', status: 'common', notes: 'Georgian script used as decorative heart.' },
  { char: 'დ', name: 'Georgian Letter Doni', cat: 'hearts', keywords: ['heart', 'cute', 'georgian', 'smile'], unicode: 'U+10D3', status: 'common', notes: 'Georgian script heart with smile curve.' },

  // ⚔ WEAPONS & COMBAT
  { char: '⚔', name: 'Crossed Swords', cat: 'weapons', keywords: ['swords', 'battle', 'war', 'combat', 'fight', 'duel'], unicode: 'U+2694', status: 'common', notes: 'Universal combat blades indicator.' },
  { char: '🗡', name: 'Dagger Knife', cat: 'weapons', keywords: ['dagger', 'knife', 'blade', 'assassin', 'ninja'], unicode: 'U+1F5E1', status: 'common', notes: 'Tanto / combat dagger.' },
  { char: '🏹', name: 'Bow and Arrow', cat: 'weapons', keywords: ['bow', 'arrow', 'sniper', 'hunter', 'aim'], unicode: 'U+1F3F9', status: 'common', notes: 'Long range hunter symbol.' },
  { char: '𓊈', name: 'Shield Guard Left', cat: 'weapons', keywords: ['shield', 'armor', 'guard', 'bracket', 'left'], unicode: 'U+13288', status: 'special', notes: 'Hieroglyph shield bracket.' },
  { char: '𓊉', name: 'Shield Guard Right', cat: 'weapons', keywords: ['shield', 'armor', 'guard', 'bracket', 'right'], unicode: 'U+13289', status: 'special', notes: 'Hieroglyph shield bracket.' },
  { char: '⌖', name: 'Crosshair Aim Scope', cat: 'weapons', keywords: ['crosshair', 'aim', 'scope', 'sniper', 'target', 'headshot'], unicode: 'U+2316', status: 'common', notes: 'Tactical sniper reticle target.' },
  { char: '🎯', name: 'Direct Hit Target', cat: 'weapons', keywords: ['target', 'bullseye', 'hit', 'headshot', 'aim'], unicode: 'U+1F3AF', status: 'common', notes: 'Bullseye headshot icon.' },
  { char: '⚒', name: 'Hammer and Pick', cat: 'weapons', keywords: ['hammer', 'pick', 'tools', 'craft', 'mine'], unicode: 'U+2692', status: 'common', notes: 'Combat artisan tool symbol.' },
  { char: '🛡', name: 'Defensive Shield', cat: 'weapons', keywords: ['shield', 'defense', 'tank', 'armor', 'guard'], unicode: 'U+1F6E1', status: 'common', notes: 'Vanguard defensive crest.' },
  { char: '💣', name: 'Grenade Explosive Bomb', cat: 'weapons', keywords: ['bomb', 'grenade', 'explosion', 'blast'], unicode: 'U+1F4A3', status: 'common', notes: 'Ordnance explosive badge.' },

  // ꧁ FRAMES & BORDERS
  { char: '༺', name: 'Left Winged Lotus Flourish', cat: 'frames', keywords: ['flourish', 'frame', 'wing', 'left', 'bracket'], unicode: 'U+0F3A', status: 'common', notes: 'Tibetan arched bracket left.' },
  { char: '༻', name: 'Right Winged Lotus Flourish', cat: 'frames', keywords: ['flourish', 'frame', 'wing', 'right', 'bracket'], unicode: 'U+0F3B', status: 'common', notes: 'Tibetan arched bracket right.' },
  { char: '『', name: 'Left White Corner Bracket', cat: 'frames', keywords: ['bracket', 'corner', 'japanese', 'left', 'clean', 'pro'], unicode: 'U+300E', status: 'common', notes: 'Japanese corner box bracket.' },
  { char: '』', name: 'Right White Corner Bracket', cat: 'frames', keywords: ['bracket', 'corner', 'japanese', 'right', 'clean', 'pro'], unicode: 'U+300F', status: 'common', notes: 'Japanese corner box bracket.' },
  { char: '「', name: 'Left Corner Bracket', cat: 'frames', keywords: ['bracket', 'corner', 'simple', 'clean', 'left'], unicode: 'U+300C', status: 'common', notes: 'Light Asian corner bracket.' },
  { char: '」', name: 'Right Corner Bracket', cat: 'frames', keywords: ['bracket', 'corner', 'simple', 'clean', 'right'], unicode: 'U+300D', status: 'common', notes: 'Light Asian corner bracket.' },
  { char: '【', name: 'Left Heavy Black Lenticular', cat: 'frames', keywords: ['bracket', 'lenticular', 'heavy', 'bold', 'pro', 'tag'], unicode: 'U+3010', status: 'common', notes: 'Standard tag bracket (e.g. 【PRO】).' },
  { char: '】', name: 'Right Heavy Black Lenticular', cat: 'frames', keywords: ['bracket', 'lenticular', 'heavy', 'bold', 'pro', 'tag'], unicode: 'U+3011', status: 'common', notes: 'Standard tag bracket.' },
  { char: '〖', name: 'Left White Lenticular Bracket', cat: 'frames', keywords: ['bracket', 'lenticular', 'hollow', 'clean', 'left'], unicode: 'U+3014', status: 'common', notes: 'Hollow curved frame bracket.' },
  { char: '〗', name: 'Right White Lenticular Bracket', cat: 'frames', keywords: ['bracket', 'lenticular', 'hollow', 'clean', 'right'], unicode: 'U+3015', status: 'common', notes: 'Hollow curved frame bracket.' },
  { char: '《', name: 'Left Double Angle Bracket', cat: 'frames', keywords: ['bracket', 'angle', 'double', 'chevrons', 'left'], unicode: 'U+300A', status: 'common', notes: 'Double chevron enclosure.' },
  { char: '》', name: 'Right Double Angle Bracket', cat: 'frames', keywords: ['bracket', 'angle', 'double', 'chevrons', 'right'], unicode: 'U+300B', status: 'common', notes: 'Double chevron enclosure.' },
  { char: '⟦', name: 'Mathematical White Square Left', cat: 'frames', keywords: ['bracket', 'cyber', 'matrix', 'math', 'left'], unicode: 'U+27E6', status: 'common', notes: 'Cyberpunk white square bracket.' },
  { char: '⟧', name: 'Mathematical White Square Right', cat: 'frames', keywords: ['bracket', 'cyber', 'matrix', 'math', 'right'], unicode: 'U+27E7', status: 'common', notes: 'Cyberpunk white square bracket.' },
  { char: '𓆩', name: 'Hieroglyph Aesthetic Wing L', cat: 'frames', keywords: ['wing', 'aesthetic', 'feather', 'angel', 'bracket'], unicode: 'U+131A9', status: 'special', notes: 'Aesthetic hieroglyph wing left.' },
  { char: '𓆪', name: 'Hieroglyph Aesthetic Wing R', cat: 'frames', keywords: ['wing', 'aesthetic', 'feather', 'angel', 'bracket'], unicode: 'U+131AA', status: 'special', notes: 'Aesthetic hieroglyph wing right.' },

  // ⚡ GAMING & SIGNATURE
  { char: '父', name: 'Father Kanji Pillar', cat: 'gaming', keywords: ['kanji', 'ninja', 'father', 'pillar', 'pro'], unicode: 'U+7236', status: 'common', notes: 'Popular Japanese symbol in clan tags.' },
  { char: '气', name: 'Chi Spirit Energy', cat: 'gaming', keywords: ['chi', 'energy', 'spirit', 'ninja', 'power'], unicode: 'U+6C14', status: 'common', notes: 'Aura / spiritual energy kanji.' },
  { char: 'シ', name: 'Katakana Shi Wink', cat: 'gaming', keywords: ['shi', 'wink', 'smile', 'anime', 'cute'], unicode: 'U+30B7', status: 'common', notes: 'Anime smirk symbol.' },
  { char: '々', name: 'Noma Repetition Mark', cat: 'gaming', keywords: ['noma', 'clean', 'clan', 'japanese'], unicode: 'U+3005', status: 'common', notes: 'Clean Asian accent mark.' },
  { char: 'Ø', name: 'Latin O with Stroke', cat: 'gaming', keywords: ['zero', 'slash', 'cyber', 'minimal'], unicode: 'U+00D8', status: 'common', notes: 'Tactical zero / Scandinavian letter.' },
  { char: '☠', name: 'Skull Crossbones Death', cat: 'gaming', keywords: ['skull', 'dark', 'headshot', 'toxic'], unicode: 'U+2620', status: 'common', notes: 'Fatal elimination marker.' },
  { char: '☣', name: 'Biohazard Contamination', cat: 'gaming', keywords: ['biohazard', 'toxic', 'danger', 'hazard', 'dark'], unicode: 'U+2623', status: 'common', notes: 'Toxic waste / infectious threat.' },
  { char: '☢', name: 'Radioactive Radiation', cat: 'gaming', keywords: ['nuclear', 'radioactive', 'hazard', 'fallout'], unicode: 'U+2622', status: 'common', notes: 'Nuclear hazard symbol.' },
  { char: 'ψ', name: 'Greek Letter Psi Pitchfork', cat: 'gaming', keywords: ['psi', 'greek', 'pitchfork', 'devil', 'trident'], unicode: 'U+03C8', status: 'common', notes: 'Greek letter shaped like a trident.' },
  { char: '♾', name: 'Infinity Eternity Loop', cat: 'gaming', keywords: ['infinity', 'forever', 'loop', 'eternal'], unicode: 'U+267E', status: 'common', notes: 'Mathematical infinity symbol.' },

  // ➤ ARROWS & POINTERS
  { char: '➤', name: 'Black Rightwards Arrowhead', cat: 'arrows', keywords: ['arrow', 'pointer', 'next', 'direction', 'spear'], unicode: 'U+27A4', status: 'common', notes: 'Heavy triangle arrowhead.' },
  { char: '➜', name: 'Heavy Round Right Arrow', cat: 'arrows', keywords: ['arrow', 'right', 'next', 'heavy'], unicode: 'U+279C', status: 'common', notes: 'Rounded heavy arrow.' },
  { char: '→', name: 'Rightwards Arrow', cat: 'arrows', keywords: ['arrow', 'right', 'simple', 'clean'], unicode: 'U+2192', status: 'common', notes: 'Standard directional arrow.' },
  { char: '←', name: 'Leftwards Arrow', cat: 'arrows', keywords: ['arrow', 'left', 'back', 'clean'], unicode: 'U+2190', status: 'common', notes: 'Standard left arrow.' },
  { char: '↑', name: 'Upwards Arrow', cat: 'arrows', keywords: ['arrow', 'up', 'rank', 'level'], unicode: 'U+2191', status: 'common', notes: 'Level up arrow.' },
  { char: '↓', name: 'Downwards Arrow', cat: 'arrows', keywords: ['arrow', 'down', 'drop'], unicode: 'U+2193', status: 'common', notes: 'Directional drop arrow.' },
  { char: '➳', name: 'Right Feathered Arrow', cat: 'arrows', keywords: ['arrow', 'feather', 'bow', 'spear', 'fletching'], unicode: 'U+27B3', status: 'common', notes: 'Archery arrow with fletching.' },
  { char: '➽', name: 'Heavy Concave Pointed Arrow', cat: 'arrows', keywords: ['arrow', 'bullet', 'concave', 'heavy'], unicode: 'U+27BD', status: 'common', notes: 'Concave bullet arrowhead.' },
  { char: '➹', name: 'Top Right Spear Arrow', cat: 'arrows', keywords: ['arrow', 'spear', 'angled', 'aim'], unicode: 'U+27B8', status: 'common', notes: 'Angled precision spear arrow.' },

  // ❀ NATURE & FLOWERS
  { char: '✿', name: 'Black Florette Flower', cat: 'nature', keywords: ['flower', 'blossom', 'cute', 'aesthetic', 'florette'], unicode: 'U+273F', status: 'common', notes: 'Cherry blossom florette.' },
  { char: '❀', name: 'White Florette Petals', cat: 'nature', keywords: ['flower', 'open', 'blossom', 'cute', 'hollow'], unicode: 'U+2740', status: 'common', notes: 'Open petals aesthetic bloom.' },
  { char: '❁', name: 'Eight Petalled Outline', cat: 'nature', keywords: ['flower', 'eight', 'sunflower', 'bloom'], unicode: 'U+2741', status: 'common', notes: 'Eight-petal flower frame.' },
  { char: '❃', name: 'Heavy Teardrop Spoked Asterisk', cat: 'nature', keywords: ['flower', 'spoke', 'burst', 'nature'], unicode: 'U+2743', status: 'common', notes: 'Teardrop petal burst.' },
  { char: '❋', name: 'Heavy Eight Teardrop Propeller', cat: 'nature', keywords: ['flower', 'propeller', 'star', 'burst'], unicode: 'U+2745', status: 'common', notes: 'Propeller floral burst.' },
  { char: '✤', name: 'Heavy Four Diamond Florette', cat: 'nature', keywords: ['diamond', 'floral', 'florette', 'vintage'], unicode: 'U+2724', status: 'common', notes: 'Four diamond geometric flower.' },
  { char: '✥', name: 'Four Club Spoke Florette', cat: 'nature', keywords: ['club', 'cross', 'florette', 'royal'], unicode: 'U+2725', status: 'common', notes: 'Royal club spoke emblem.' },

  // ☯ SPECIAL & UNIQUE
  { char: '☯', name: 'Yin Yang Balance', cat: 'special', keywords: ['yinyang', 'balance', 'zen', 'ninja', 'tao'], unicode: 'U+262F', status: 'common', notes: 'Balance of light and dark forces.' },
  { char: '☬', name: 'Sikh Khanda Emblem', cat: 'special', keywords: ['khanda', 'swords', 'warrior', 'crest'], unicode: 'U+0A74', status: 'common', notes: 'Traditional warrior coat of arms.' },
  { char: '☫', name: 'Farsi Emblem of Honor', cat: 'special', keywords: ['farsi', 'honor', 'crescent', 'tulip'], unicode: 'U+262B', status: 'common', notes: 'Decorative tulip crest.' },
  { char: 'ੴ', name: 'Ek Onkar Divinity', cat: 'special', keywords: ['ek', 'onkar', 'sacred', 'rare'], unicode: 'U+0A74', status: 'special', notes: 'Sacred glyph with flowing curves.' },
  { char: '༆', name: 'Tibetan Sacred Wind Flourish', cat: 'special', keywords: ['wind', 'feathers', 'tibetan', 'rare'], unicode: 'U+0F06', status: 'special', notes: 'Graceful wind flourish.' },
  { char: '༇', name: 'Tibetan Sacred Angel Plume', cat: 'special', keywords: ['plume', 'wing', 'sacred', 'rare'], unicode: 'U+0F07', status: 'special', notes: 'Angelic plume scroll.' },

  // ✓ CHECK & VERIFIED
  { char: '✓', name: 'Check Mark (Tick)', cat: 'verified', keywords: ['check', 'tick', 'verified', 'done', 'yes', 'v'], unicode: 'U+2713', status: 'common', notes: 'Universal verified checkmark.' },
  { char: '✔', name: 'Heavy Check Mark', cat: 'verified', keywords: ['check', 'heavy', 'bold', 'verified', 'tick'], unicode: 'U+2714', status: 'common', notes: 'Bold verified gamer tick.' },
  { char: '☑', name: 'Ballot Box with Check', cat: 'verified', keywords: ['check', 'box', 'ballot', 'verified'], unicode: 'U+2611', status: 'common', notes: 'Square box checkmark.' },
  { char: 'Ⓥ', name: 'Circled Latin Capital V (V Badge)', cat: 'verified', keywords: ['v', 'vbadge', 'badge', 'verified', 'influencer'], unicode: 'U+24CB', status: 'common', notes: 'Text substitute for influencer V Badge.' },
  { char: '✕', name: 'Multiplication Cross (No)', cat: 'verified', keywords: ['cross', 'x', 'no', 'cancel', 'eliminate'], unicode: 'U+2715', status: 'common', notes: 'Clean diagonal strike cross.' },
  { char: '✖', name: 'Heavy Multiplication X', cat: 'verified', keywords: ['cross', 'x', 'heavy', 'bold', 'strike'], unicode: 'U+2716', status: 'common', notes: 'Heavy cross strike mark.' },

  // ♫ MUSIC & SOUND
  { char: '♪', name: 'Eighth Note', cat: 'music', keywords: ['music', 'note', 'sound', 'song', 'audio'], unicode: 'U+266A', status: 'common', notes: 'Single musical tone note.' },
  { char: '♫', name: 'Beamed Eighth Notes', cat: 'music', keywords: ['music', 'notes', 'beam', 'tune', 'rhythm'], unicode: 'U+266B', status: 'common', notes: 'Double beamed music notes.' },
  { char: '♬', name: 'Beamed Sixteenth Notes', cat: 'music', keywords: ['music', 'notes', 'sixteenth', 'fast'], unicode: 'U+266C', status: 'common', notes: 'Fast tempo sixteenth musical beam.' },
  { char: '♭', name: 'Music Flat Sign', cat: 'music', keywords: ['music', 'flat', 'tone', 'sound'], unicode: 'U+266D', status: 'common', notes: 'Musical flat modulation.' },
  { char: '♯', name: 'Music Sharp Sign', cat: 'music', keywords: ['music', 'sharp', 'pitch', 'sound', 'tag'], unicode: 'U+266F', status: 'common', notes: 'Musical sharp frequency.' },

  // ☾ ZODIAC & ASTROLOGY
  { char: '♈', name: 'Aries Ram Horns', cat: 'zodiac', keywords: ['aries', 'zodiac', 'astrology', 'ram', 'fire'], unicode: 'U+2648', status: 'common', notes: 'Fire sign Aries symbol.' },
  { char: '♉', name: 'Taurus Bull', cat: 'zodiac', keywords: ['taurus', 'zodiac', 'astrology', 'bull', 'earth'], unicode: 'U+2649', status: 'common', notes: 'Earth sign Taurus bull.' },
  { char: '♊', name: 'Gemini Twins', cat: 'zodiac', keywords: ['gemini', 'zodiac', 'astrology', 'twins', 'air'], unicode: 'U+264A', status: 'common', notes: 'Air sign Gemini twins pillar.' },
  { char: '♋', name: 'Cancer Crab', cat: 'zodiac', keywords: ['cancer', 'zodiac', 'astrology', 'crab', 'water'], unicode: 'U+264B', status: 'common', notes: 'Water sign Cancer spirals.' },
  { char: '♌', name: 'Leo Lion', cat: 'zodiac', keywords: ['leo', 'zodiac', 'astrology', 'lion', 'fire', 'king'], unicode: 'U+264C', status: 'common', notes: 'Fire sign Leo royal lion.' },
  { char: '♍', name: 'Virgo Maiden', cat: 'zodiac', keywords: ['virgo', 'zodiac', 'astrology', 'maiden', 'earth'], unicode: 'U+264D', status: 'common', notes: 'Earth sign Virgo crest.' },
  { char: '♎', name: 'Libra Scales', cat: 'zodiac', keywords: ['libra', 'zodiac', 'astrology', 'scales', 'balance'], unicode: 'U+264E', status: 'common', notes: 'Air sign Libra balance scale.' },
  { char: '♏', name: 'Scorpio Scorpion', cat: 'zodiac', keywords: ['scorpio', 'zodiac', 'astrology', 'scorpion', 'dark'], unicode: 'U+264F', status: 'common', notes: 'Water sign Scorpio tail sting.' },
  { char: '♐', name: 'Sagittarius Archer', cat: 'zodiac', keywords: ['sagittarius', 'zodiac', 'astrology', 'archer', 'arrow'], unicode: 'U+2650', status: 'common', notes: 'Fire sign Sagittarius arrow.' },
  { char: '♑', name: 'Capricorn Sea Goat', cat: 'zodiac', keywords: ['capricorn', 'zodiac', 'astrology', 'goat'], unicode: 'U+2651', status: 'common', notes: 'Earth sign Capricorn horn.' },
  { char: '♒', name: 'Aquarius Water Bearer', cat: 'zodiac', keywords: ['aquarius', 'zodiac', 'astrology', 'water', 'wave'], unicode: 'U+2652', status: 'common', notes: 'Air sign Aquarius dual wave.' },
  { char: '♓', name: 'Pisces Fish Pair', cat: 'zodiac', keywords: ['pisces', 'zodiac', 'astrology', 'fish'], unicode: 'U+2653', status: 'common', notes: 'Water sign Pisces dual fish.' },

  // 💎 RARE & INVISIBLE SPACES
  { char: 'ㅤ', name: 'Hangul Filler (Invisible Name Space)', cat: 'rare', keywords: ['invisible', 'space', 'blank', 'hidden', 'hangul', 'u3164'], unicode: 'U+3164', status: 'special', notes: 'Classic blank character used for invisible nicknames.' },
  { char: ' ', name: 'Four-Per-Em Space (Mid Space)', cat: 'rare', keywords: ['space', 'small', 'gap', 'half'], unicode: 'U+2005', status: 'check', notes: 'Subtle separator between nickname parts.' },
  { char: ' ', name: 'Six-Per-Em Space (Thin Space)', cat: 'rare', keywords: ['space', 'thin', 'gap', 'minimal'], unicode: 'U+2006', status: 'check', notes: 'Micro spacing character.' },
  { char: '💎', name: 'Gem Stone Diamond', cat: 'rare', keywords: ['diamond', 'gem', 'luxury', 'rich', 'vip'], unicode: 'U+1F48E', status: 'common', notes: 'Prestige diamond gemstone.' },
  { char: '🔥', name: 'Fire Flame Blaze', cat: 'rare', keywords: ['fire', 'flame', 'blaze', 'hot', 'energy'], unicode: 'U+1F525', status: 'common', notes: 'Signature Free Fire flame.' },
  { char: '☄', name: 'Fiery Meteor Comet', cat: 'rare', keywords: ['comet', 'meteor', 'fire', 'space', 'falling'], unicode: 'U+2604', status: 'common', notes: 'Blazing falling comet.' }
];

// Pre-made Copyable Frames (Wrappers around text)
const PREMADE_FRAMES = [
  { prefix: '亗', suffix: '亗', name: 'Trident Monarch', example: '亗Shadow亗' },
  { prefix: '꧁', suffix: '꧂', name: 'Winged Crest', example: '꧁Shadow꧂' },
  { prefix: '༺', suffix: '༻', name: 'Lotus Flourish', example: '༺Shadow༻' },
  { prefix: '『', suffix: '』', name: 'Japanese Corner Bracket', example: '『Shadow』' },
  { prefix: '「', suffix: '」', name: 'Clean Asian Bracket', example: '「Shadow」' },
  { prefix: '【', suffix: '】', name: 'Heavy Lenticular Box', example: '【Shadow】' },
  { prefix: '〖', suffix: '〗', name: 'Hollow Lenticular Frame', example: '〖Shadow〗' },
  { prefix: '乂', suffix: '乂', name: 'Ninja Dual Katana', example: '乂Shadow乂' },
  { prefix: '★', suffix: '★', name: 'Heroic Star Commander', example: '★Shadow★' },
  { prefix: '𓊈', suffix: '𓊉', name: 'Vanguard Aegis Shield', example: '𓊈Shadow𓊉' },
  { prefix: '𓆩', suffix: '𓆪', name: 'Aesthetic Feather Wings', example: '𓆩Shadow𓆪' },
  { prefix: '⟦', suffix: '⟧', name: 'Cyber Matrix White Square', example: '⟦Shadow⟧' },
  { prefix: '《', suffix: '》', name: 'Double Chevron Bracket', example: '《Shadow》' },
  { prefix: '⚡', suffix: '⚡', name: 'Volt Surge Insignia', example: '⚡Shadow⚡' },
  { prefix: '👑', suffix: '👑', name: 'Imperial Sovereign', example: '👑Shadow👑' }
];

// Popular Battle Combinations
const POPULAR_COMBINATIONS = [
  { val: '꧁༒꧂', name: 'Winged Cross Dynasty', tags: ['wings', 'cross', 'pro'] },
  { val: '亗★亗', name: 'Trident Star Emperor', tags: ['trident', 'star', 'royal'] },
  { val: '乂⚡乂', name: 'Lightning Katana Slash', tags: ['ninja', 'lightning', 'combat'] },
  { val: '♛༒♛', name: 'Dark Queen Honor', tags: ['crown', 'cross', 'dark'] },
  { val: '★彡★', name: 'Wind Slasher Star', tags: ['star', 'slash', 'speed'] },
  { val: '༒☬༒', name: 'Tibetan Khanda Armor', tags: ['khanda', 'cross', 'pro'] },
  { val: '꧁⚡꧂', name: 'Winged Thunder God', tags: ['wings', 'lightning', 'energy'] },
  { val: '亗👑亗', name: 'Golden Grandmaster Crown', tags: ['crown', 'trident', 'pro'] },
  { val: '☠⚔☠', name: 'Death Dealer Duelist', tags: ['skull', 'swords', 'dark'] },
  { val: '𓆩✧𓆪', name: 'Winged Celestial Shimmer', tags: ['wings', 'diamond', 'aesthetic'] },
  { val: '•亗•', name: 'Bullet Trident Vanguard', tags: ['bullet', 'trident', 'clean'] },
  { val: '꧁💎꧂', name: 'Winged Diamond Billionaire', tags: ['wings', 'diamond', 'luxury'] }
];
