/**
 * Free Fire Nickname Pro - Central Site Configuration
 * Single source of truth for canonical production domain, branding, and route architecture.
 */
const SITE_CONFIG = {
  name: "Free Fire Nickname Pro",
  shortName: "FreeFireNicknamePro",
  domain: "freefirenicknamepro.com",
  origin: "https://freefirenicknamepro.com",
  canonicalUrl: "https://freefirenicknamepro.com/",
  description: "Free Fire nickname generator, stylish text transforms, gaming symbols, invisible space codes, and gamer identity studio.",
  routes: {
    home: "/",
    symbols: "/free-fire-symbols/",
    invisibleSpace: "/free-fire-invisible-space/",
    bioCopy: "/free-fire-bio-copy/",
    guildNames: "/free-fire-guild-name-generator/",
    boys: "/free-fire-nicknames-for-boys/",
    girls: "/free-fire-nicknames-for-girls/",
    cool: "/cool-free-fire-nicknames/",
    stylish: "/stylish-free-fire-nicknames/",
    attitude: "/attitude-free-fire-nicknames/",
    about: "/about-us/",
    contact: "/contact-us/",
    privacy: "/privacy-policy/",
    terms: "/terms-and-conditions/",
    disclaimer: "/disclaimer/",
    cookie: "/cookie-policy/",
    dmca: "/dmca/"
  },
  getCanonicalUrl(path = "/") {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${this.origin}${cleanPath.endsWith("/") ? cleanPath : cleanPath + "/"}`;
  }
};

// Export for Node environments if required, otherwise available globally on window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
} else if (typeof window !== 'undefined') {
  window.SITE_CONFIG = SITE_CONFIG;
}
