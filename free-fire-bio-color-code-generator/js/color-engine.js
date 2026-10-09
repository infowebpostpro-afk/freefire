/**
 * Free Fire Bio Color Studio — Engine & Code Synthesis
 * Handles HEX color validation, candidate syntax compilation,
 * contrast/luminance analysis, and plain-text fallback generation.
 */

const ColorEngine = {
  // Normalize and validate HEX color string
  sanitizeHex(input) {
    if (!input) return "#FFFFFF";
    let clean = input.toString().trim().replace(/^#/, '');
    
    // Expand 3-digit hex (e.g. F00 -> FF0000)
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }

    if (/^[0-9A-Fa-f]{6}$/.test(clean)) {
      return `#${clean.toUpperCase()}`;
    }
    return "#FFFFFF";
  },

  // Strip '#' from hex
  rawHex(hex) {
    return this.sanitizeHex(hex).replace('#', '');
  },

  // Calculate relative luminance for sRGB
  getRelativeLuminance(hex) {
    const clean = this.rawHex(hex);
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;

    const sRGB = [r, g, b].map(val => {
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  },

  // Check readability against dark profile background (#10141d)
  evaluateContrast(hex) {
    const lum = this.getRelativeLuminance(hex);
    // Dark background luminance is ~0.015.
    // If text luminance is < 0.06, contrast is low.
    if (lum < 0.06) {
      return {
        isLowContrast: true,
        message: `Caution: ${hex} has very low luminance against dark surfaces and may be hard to read.`
      };
    }
    return {
      isLowContrast: false,
      message: null
    };
  },

  // Generate candidate markup code for given format
  generateCandidateCode(parts = [], formatId = "standard") {
    if (!Array.isArray(parts) || parts.length === 0) return "";

    const validParts = parts.filter(p => p && (p.text !== undefined && p.text !== null));
    if (validParts.length === 0) return "";

    let body = "";

    validParts.forEach((part) => {
      const hexRaw = this.rawHex(part.hex);
      const text = part.text || "";

      if (formatId === "hash") {
        body += `[#${hexRaw}]${text}`;
      } else {
        // standard, bold, center_bold all use [RRGGBB] inside
        body += `[${hexRaw}]${text}`;
      }
    });

    if (formatId === "bold") {
      return `[b]${body}`;
    } else if (formatId === "center_bold") {
      return `[c][b]${body}`;
    }

    return body;
  },

  // Extract clean plain-text fallback
  generatePlainText(parts = []) {
    if (!Array.isArray(parts)) return "";
    return parts.map(p => p.text || "").join("");
  },

  // Character length budget inspector
  analyzeLengths(parts = [], formatId = "standard") {
    const rawCode = this.generateCandidateCode(parts, formatId);
    const plainText = this.generatePlainText(parts);

    return {
      rawLength: rawCode.length,
      visibleLength: plainText.length,
      overhead: rawCode.length - plainText.length
    };
  },

  // Generate comparison map across all 4 formats
  generateAllFormats(parts = []) {
    return CANDIDATE_FORMATS.map(fmt => {
      const code = this.generateCandidateCode(parts, fmt.id);
      return {
        id: fmt.id,
        name: fmt.name,
        shortLabel: fmt.shortLabel,
        desc: fmt.desc,
        badge: fmt.badge,
        code: code,
        rawLength: code.length
      };
    });
  }
};
