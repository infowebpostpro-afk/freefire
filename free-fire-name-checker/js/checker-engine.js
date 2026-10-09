/**
 * Free Fire Name Checker & Unicode Inspector — Engine
 * Core text analysis, Unicode classification, normalization, and simplification logic.
 */

(function(window) {
  'use strict';

  // 1. INVISIBLE & FORMATTING CHARACTERS MAP
  const INVISIBLE_MAP = {
    0x3164: { code: 'U+3164', name: 'Hangul Filler', desc: 'Fullwidth blank Hangul filler often used for invisible Free Fire names' },
    0xFFA0: { code: 'U+FFA0', name: 'Halfwidth Hangul Filler', desc: 'Halfwidth blank filler sometimes used for shorter blank gaps' },
    0x2800: { code: 'U+2800', name: 'Braille Pattern Blank', desc: 'Braille cell with no dots; blank glyph in many fonts' },
    0x200B: { code: 'U+200B', name: 'Zero Width Space (ZWSP)', desc: 'Invisible space with zero width; invisible separator' },
    0x200C: { code: 'U+200C', name: 'Zero Width Non-Joiner (ZWNJ)', desc: 'Invisible formatting character preventing typographic ligature' },
    0x200D: { code: 'U+200D', name: 'Zero Width Joiner (ZWJ)', desc: 'Invisible character used to glue emojis or glyph sequences' },
    0x00A0: { code: 'U+00A0', name: 'No-Break Space (NBSP)', desc: 'Non-breaking space character' },
    0x2060: { code: 'U+2060', name: 'Word Joiner (WJ)', desc: 'Zero width no-break space variant' },
    0xFEFF: { code: 'U+FEFF', name: 'Zero Width No-Break Space / BOM', desc: 'Byte order mark or invisible non-breaking space' },
    0x180E: { code: 'U+180E', name: 'Mongolian Vowel Separator', desc: 'Invisible separator with zero width in modern Unicode' },
    0x2000: { code: 'U+2000', name: 'En Quad', desc: 'Fixed typographic space' },
    0x2001: { code: 'U+2001', name: 'Em Quad', desc: 'Fixed typographic space' },
    0x2002: { code: 'U+2002', name: 'En Space', desc: 'Half-em wide space' },
    0x2003: { code: 'U+2003', name: 'Em Space', desc: 'Full-em wide space' },
    0x2004: { code: 'U+2004', name: 'Three-Per-Em Space', desc: 'Third-em space' },
    0x2005: { code: 'U+2005', name: 'Four-Per-Em Space', desc: 'Quarter-em space' },
    0x2006: { code: 'U+2006', name: 'Six-Per-Em Space', desc: 'Sixth-em space' },
    0x2007: { code: 'U+2007', name: 'Figure Space', desc: 'Digit-width space' },
    0x2008: { code: 'U+2008', name: 'Punctuation Space', desc: 'Punctuation-width space' },
    0x2009: { code: 'U+2009', name: 'Thin Space', desc: 'Narrow space' },
    0x200A: { code: 'U+200A', name: 'Hair Space', desc: 'Ultra-thin space' },
    0x202F: { code: 'U+202F', name: 'Narrow No-Break Space', desc: 'Narrow non-breaking space' },
    0x205F: { code: 'U+205F', name: 'Medium Mathematical Space', desc: 'Mathematical formula space' },
    0x3000: { code: 'U+3000', name: 'Ideographic Space', desc: 'Fullwidth CJK whitespace' }
  };

  // Decorative brackets & flourishes commonly added to gaming nicknames
  const ORNAMENT_PATTERN = /[꧁꧂༺༻𓊈𓊉亗★☆⚡☠☬⚔️⚔ᴳᴼᴰ࿐༒☬༒᚛᚜〘〙⟦⟧⟨⟩⦅⦆〖〗【】〔〕]/gu;

  // Segmenter instance for grapheme clusters
  let graphemeSegmenter = null;
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    try {
      graphemeSegmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    } catch (e) {
      graphemeSegmenter = null;
    }
  }

  /**
   * Safe grapheme cluster count
   */
  function countGraphemeClusters(text) {
    if (!text) return 0;
    if (graphemeSegmenter) {
      return Array.from(graphemeSegmenter.segment(text)).length;
    }
    // Fallback: match base characters plus optional combining marks
    const matches = text.match(/(\P{M}\p{M}*)/gu);
    return matches ? matches.length : Array.from(text).length;
  }

  /**
   * Unicode Block Identification
   */
  function getUnicodeBlock(cp) {
    if (cp <= 0x007F) return 'Basic Latin';
    if (cp <= 0x00FF) return 'Latin-1 Supplement';
    if (cp <= 0x017F) return 'Latin Extended-A';
    if (cp <= 0x024F) return 'Latin Extended-B';
    if (cp >= 0x0300 && cp <= 0x036F) return 'Combining Diacritical Marks';
    if (cp >= 0x0F00 && cp <= 0x0FFF) return 'Tibetan (Ornaments)';
    if (cp >= 0x1800 && cp <= 0x18AF) return 'Mongolian';
    if (cp >= 0x2000 && cp <= 0x206F) return 'General Punctuation';
    if (cp >= 0x2070 && cp <= 0x209F) return 'Superscripts and Subscripts';
    if (cp >= 0x20A0 && cp <= 0x20CF) return 'Currency Symbols';
    if (cp >= 0x2100 && cp <= 0x214F) return 'Letterlike Symbols';
    if (cp >= 0x2190 && cp <= 0x21FF) return 'Arrows';
    if (cp >= 0x2200 && cp <= 0x22FF) return 'Mathematical Operators';
    if (cp >= 0x2300 && cp <= 0x23FF) return 'Miscellaneous Technical';
    if (cp >= 0x2400 && cp <= 0x243F) return 'Control Pictures';
    if (cp >= 0x2460 && cp <= 0x24FF) return 'Enclosed Alphanumerics';
    if (cp >= 0x2500 && cp <= 0x257F) return 'Box Drawing';
    if (cp >= 0x25A0 && cp <= 0x25FF) return 'Geometric Shapes';
    if (cp >= 0x2600 && cp <= 0x26FF) return 'Miscellaneous Symbols';
    if (cp >= 0x2700 && cp <= 0x27BF) return 'Dingbats';
    if (cp >= 0x2800 && cp <= 0x28FF) return 'Braille Patterns';
    if (cp >= 0x3000 && cp <= 0x303F) return 'CJK Symbols and Punctuation';
    if (cp >= 0x3130 && cp <= 0x318F) return 'Hangul Compatibility Jamo';
    if (cp >= 0x4E00 && cp <= 0x9FFF) return 'CJK Unified Ideographs';
    if (cp >= 0xFF00 && cp <= 0xFFEF) return 'Halfwidth and Fullwidth Forms';
    if (cp >= 0x1D400 && cp <= 0x1D7FF) return 'Mathematical Alphanumeric Symbols';
    if (cp >= 0x1F300 && cp <= 0x1F5FF) return 'Miscellaneous Symbols and Pictographs';
    if (cp >= 0x1F600 && cp <= 0x1F64F) return 'Emoticons (Emoji)';
    if (cp >= 0x1F680 && cp <= 0x1F6FF) return 'Transport and Map Symbols';
    if (cp >= 0x1F900 && cp <= 0x1F9FF) return 'Supplemental Symbols and Pictographs';
    return 'Other Unicode Block';
  }

  /**
   * Character Classification
   */
  function classifyCodePoint(char, cp) {
    const isAscii = cp <= 0x007F;
    const isInvisible = Boolean(INVISIBLE_MAP[cp]);
    const isCombining = /\p{M}/u.test(char);
    const isMathStyled = cp >= 0x1D400 && cp <= 0x1D7FF;
    const isFullwidth = (cp >= 0xFF01 && cp <= 0xFF5E) || (cp >= 0xFFE0 && cp <= 0xFFEE);
    const isEnclosed = cp >= 0x2460 && cp <= 0x24FF;
    const isEmoji = /\p{Extended_Pictographic}/u.test(char);
    const isOrnament = ORNAMENT_PATTERN.test(char);

    let category = 'Standard Character';
    let typeClass = 'type-standard';

    if (isInvisible) {
      category = 'Invisible Character';
      typeClass = 'type-invisible';
    } else if (isCombining) {
      category = 'Combining Mark';
      typeClass = 'type-combining';
    } else if (isMathStyled || isFullwidth || isEnclosed) {
      category = 'Styled Alphanumeric';
      typeClass = 'type-styled';
    } else if (isOrnament) {
      category = 'Decorative Ornament';
      typeClass = 'type-ornament';
    } else if (isEmoji) {
      category = 'Emoji / Symbol';
      typeClass = 'type-emoji';
    } else if (isAscii) {
      category = 'Basic Latin (ASCII)';
      typeClass = 'type-ascii';
    }

    return {
      isAscii,
      isInvisible,
      isCombining,
      isMathStyled,
      isFullwidth,
      isEnclosed,
      isEmoji,
      isOrnament,
      category,
      typeClass
    };
  }

  /**
   * Full Nickname Analysis
   */
  function inspectNickname(text) {
    if (!text) {
      return {
        isEmpty: true,
        original: '',
        counts: {
          codePoints: 0,
          graphemeClusters: 0,
          utf16CodeUnits: 0,
          utf8Bytes: 0,
          communityGuideline: 12,
          communityPercentage: 0,
          communityStatus: 'ok'
        },
        diagnostics: {
          invisibleList: [],
          combiningList: [],
          styledList: [],
          ornamentList: [],
          emojiList: [],
          totalIssues: 0
        },
        breakdown: [],
        normalization: {
          nfc: '',
          nfd: '',
          nfkc: '',
          nfkd: '',
          hasNormalizedDifferences: false
        },
        simplified: {
          text: '',
          changes: [],
          codePoints: 0
        },
        rawHex: '',
        rawEscape: ''
      };
    }

    const codePointArray = Array.from(text);
    const codePointCount = codePointArray.length;
    const graphemeCount = countGraphemeClusters(text);
    const utf16Count = text.length;
    const utf8Count = new TextEncoder().encode(text).length;

    // Community Reference Comparison (12 characters guideline)
    const communityGuideline = 12;
    const communityPercentage = Math.min(100, Math.round((codePointCount / communityGuideline) * 100));
    let communityStatus = 'ok';
    if (codePointCount > communityGuideline) {
      communityStatus = 'exceeded';
    } else if (codePointCount === communityGuideline) {
      communityStatus = 'at-limit';
    }

    // Diagnostics and Breakdown
    const invisibleList = [];
    const combiningList = [];
    const styledList = [];
    const ornamentList = [];
    const emojiList = [];
    const breakdown = [];

    codePointArray.forEach((char, index) => {
      const cp = char.codePointAt(0);
      const hex = 'U+' + cp.toString(16).toUpperCase().padStart(4, '0');
      const block = getUnicodeBlock(cp);
      const info = classifyCodePoint(char, cp);

      let glyphDisplay = char;
      let label = char;

      if (info.isInvisible) {
        glyphDisplay = '[SPACE]';
        label = INVISIBLE_MAP[cp] ? INVISIBLE_MAP[cp].name : 'Invisible Character';
        invisibleList.push({ index: index + 1, char, cp, hex, name: label });
      } else if (info.isCombining) {
        glyphDisplay = '◌' + char;
        label = `Combining Mark (${hex})`;
        combiningList.push({ index: index + 1, char, cp, hex, name: label });
      } else if (info.isMathStyled || info.isFullwidth || info.isEnclosed) {
        styledList.push({ index: index + 1, char, cp, hex });
      } else if (info.isOrnament) {
        ornamentList.push({ index: index + 1, char, cp, hex });
      } else if (info.isEmoji) {
        emojiList.push({ index: index + 1, char, cp, hex });
      }

      breakdown.push({
        position: index + 1,
        char,
        cp,
        hex,
        glyphDisplay,
        label,
        block,
        ...info
      });
    });

    const totalIssues = invisibleList.length + combiningList.length + styledList.length;

    // Normalization Forms
    const nfc = text.normalize('NFC');
    const nfd = text.normalize('NFD');
    const nfkc = text.normalize('NFKC');
    const nfkd = text.normalize('NFKD');
    const hasNormalizedDifferences = (text !== nfkc) || (text !== nfd);

    // Simplified Fallback Generation
    const simplification = generateSimplifiedNickname(text);

    // Hex and Escape String
    const rawHex = codePointArray.map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' ');
    const rawEscape = codePointArray.map(c => {
      const cp = c.codePointAt(0);
      return cp <= 0xFFFF ? `\\u${cp.toString(16).toUpperCase().padStart(4, '0')}` : `\\u{${cp.toString(16).toUpperCase()}}`;
    }).join('');

    return {
      isEmpty: false,
      original: text,
      counts: {
        codePoints: codePointCount,
        graphemeClusters: graphemeCount,
        utf16CodeUnits: utf16Count,
        utf8Bytes: utf8Count,
        communityGuideline,
        communityPercentage,
        communityStatus
      },
      diagnostics: {
        invisibleList,
        combiningList,
        styledList,
        ornamentList,
        emojiList,
        totalIssues
      },
      breakdown,
      normalization: {
        nfc,
        nfd,
        nfkc,
        nfkd,
        hasNormalizedDifferences
      },
      simplified: simplification,
      rawHex,
      rawEscape
    };
  }

  /**
   * Generates a clean, simplified plain-text alternative of the nickname
   */
  function generateSimplifiedNickname(rawText) {
    if (!rawText) return { text: '', changes: [], codePoints: 0 };

    const changes = [];

    // Step 1: Detect and count styled characters before normalization
    let styledCount = 0;
    for (const char of rawText) {
      const cp = char.codePointAt(0);
      if ((cp >= 0x1D400 && cp <= 0x1D7FF) || (cp >= 0xFF01 && cp <= 0xFF5E) || (cp >= 0x2460 && cp <= 0x24FF)) {
        styledCount++;
      }
    }

    // Step 2: Unicode NFKD decomposition (decomposes styled math letters, fullwidth forms, etc. into plain ASCII)
    let processed = rawText.normalize('NFKD');
    if (styledCount > 0) {
      changes.push(`Converted ${styledCount} styled/mathematical character${styledCount > 1 ? 's' : ''} to standard Latin`);
    }

    // Step 3: Strip combining marks (accents, strike-throughs)
    const combiningMatches = processed.match(/\p{M}/gu);
    if (combiningMatches && combiningMatches.length > 0) {
      changes.push(`Stripped ${combiningMatches.length} combining mark${combiningMatches.length > 1 ? 's' : ''} (strike-through / accents)`);
      processed = processed.replace(/\p{M}/gu, '');
    }

    // Step 4: Handle invisible characters
    let invisibleFound = 0;
    let replacedInvisible = '';
    for (const char of processed) {
      const cp = char.codePointAt(0);
      if (INVISIBLE_MAP[cp]) {
        invisibleFound++;
        // If it was a Hangul filler or Braille blank, convert to normal space
        replacedInvisible += ' ';
      } else {
        replacedInvisible += char;
      }
    }
    if (invisibleFound > 0) {
      changes.push(`Replaced ${invisibleFound} invisible character${invisibleFound > 1 ? 's' : ''} with standard spacing`);
      processed = replacedInvisible;
    }

    // Step 5: Strip decorative brackets / wings / ornaments
    const ornamentMatches = processed.match(ORNAMENT_PATTERN);
    if (ornamentMatches && ornamentMatches.length > 0) {
      changes.push(`Removed ${ornamentMatches.length} decorative ornament${ornamentMatches.length > 1 ? 's' : ''} / bracket${ornamentMatches.length > 1 ? 's' : ''}`);
      processed = processed.replace(ORNAMENT_PATTERN, '');
    }

    // Step 6: Collapse whitespace & trim
    const trimmed = processed.replace(/\s+/g, ' ').trim();
    if (trimmed !== processed) {
      processed = trimmed;
    }

    // If nothing changed but original has special symbols, provide fallback
    if (changes.length === 0 && processed === rawText) {
      changes.push('Name already uses standard clean characters');
    }

    return {
      text: processed || rawText,
      changes,
      codePoints: Array.from(processed || rawText).length
    };
  }

  // Export engine
  window.NameCheckerEngine = {
    inspectNickname,
    generateSimplifiedNickname,
    countGraphemeClusters,
    INVISIBLE_MAP,
    ORNAMENT_PATTERN
  };

})(window);
