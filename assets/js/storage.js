/**
 * Link Page - Storage Module
 * Manages LocalStorage persistence, defaults, export, and import.
 */

const STORAGE_KEY = 'linkpage_settings_v12';

export const DEFAULT_SETTINGS = {
  brand: {
    name: 'Eldoctor',
    description: 'الدكتور للمستلزمات الطبية ومستحضرات التجميل',
    website: ''
  },
  logo: {
    url: './logo.svg', // Base64 data URL or external image URL
    badgeText: 'نشط'
  },
  profile: {
    avatar: './logo.svg',
    badge: 'نشط',
    verified: true
  },
  theme: {
    mode: 'light', // 'light', 'dark', 'custom', 'auto'
    preset: 'clean-minimalism',
    glassmorphism: true,
    glassBlur: '16px'
  },
  colors: {
    primary: '#ec4899',
    secondary: '#f472b6',
    background: '#fdf2f8',
    surface: '#ffffff',
    text: '#1f2937',
    textSecondary: '#4b5563',
    buttonBg: '#ffffff',
    buttonText: '#1f2937',
    buttonBorder: '#fbcfe8',
    buttonHover: '#fce7f3',
    accent: '#f43f5e'
  },
  typography: {
    fontFamily: 'Cairo',
    fontSize: 'medium',
    fontWeight: '500',
    rtl: true
  },
  auth: {
    username: 'admin',
    password: 'admin123',
    enabled: true
  },
  links: [
    {
      id: 'l_map',
      platform: 'Google Maps',
      label: 'مصر, القاهرة · القاهرة · قسم النزهة',
      url: 'https://maps.app.goo.gl/NjzRfcmJhzs8SFoCA',
      enabled: true,
      featured: true,
      badge: 'الموقع'
    },
    {
      id: 'l_wa',
      platform: 'WhatsApp',
      label: 'تواصل عبر واتساب',
      url: 'https://wa.me/201103131373',
      enabled: true,
      featured: true,
      badge: 'مميّز'
    },
    {
      id: 'l_phone',
      platform: 'Phone',
      label: 'اتصل بنا الآن (+201507006060)',
      url: 'tel:+201507006060',
      enabled: true,
      featured: true,
      badge: 'اتصال'
    },
    {
      id: 'l_fb',
      platform: 'Facebook',
      label: 'صفحتنا على فيسبوك',
      url: 'https://www.facebook.com/profile.php?id=61573099820423',
      enabled: true,
      featured: false,
      badge: ''
    },
    {
      id: 'l_tg',
      platform: 'Telegram',
      label: 'قناتنا على تليجرام',
      url: 'https://t.me/eldocstor',
      enabled: true,
      featured: false,
      badge: ''
    },
    {
      id: 'l_ig',
      platform: 'Instagram',
      label: 'حسابنا على إنستغرام',
      url: 'https://www.instagram.com/eldoc.cosmetics/',
      enabled: true,
      featured: false,
      badge: ''
    }
  ],
  seo: {
    metaTitle: 'Eldoctor | الدكتور للمستلزمات الطبية ومستحضرات التجميل',
    metaDescription: 'الصفحة الرسمية للدكتور للمستلزمات الطبية ومستحضرات التجميل - تواصل معنا عبر فيسبوك، إنستغرام، تليجرام، وواتساب.',
    keywords: 'Eldoctor, الدكتور, مستلزمات طبية, مستحضرات تجميل, تجميل, طبية'
  },
  qr: {
    color: '#ec4899',
    bgColor: '#ffffff',
    showLogo: true
  }
};

let inMemorySettings = null;

function mergeWithDefaults(parsed) {
  if (!parsed || typeof parsed !== 'object') return { ...DEFAULT_SETTINGS };
  const merged = {
    ...DEFAULT_SETTINGS,
    ...parsed,
    brand: { ...DEFAULT_SETTINGS.brand, ...(parsed.brand || {}) },
    logo: { ...DEFAULT_SETTINGS.logo, ...(parsed.logo || {}) },
    profile: { ...DEFAULT_SETTINGS.profile, ...(parsed.profile || {}) },
    theme: { ...DEFAULT_SETTINGS.theme, ...(parsed.theme || {}) },
    colors: { ...DEFAULT_SETTINGS.colors, ...(parsed.colors || {}) },
    typography: { ...DEFAULT_SETTINGS.typography, ...(parsed.typography || {}) },
    seo: { ...DEFAULT_SETTINGS.seo, ...(parsed.seo || {}) },
    auth: { ...DEFAULT_SETTINGS.auth, ...(parsed.auth || {}) },
    qr: { ...DEFAULT_SETTINGS.qr, ...(parsed.qr || {}) }
  };
  merged.brand.website = '';
  if (!merged.logo.url || merged.logo.url.includes('eldoctor_logo') || merged.logo.url.includes('el doctor logo')) {
    merged.logo.url = './logo.svg';
  }
  if (!merged.profile.avatar || merged.profile.avatar.includes('eldoctor_logo') || merged.profile.avatar.includes('el doctor logo')) {
    merged.profile.avatar = './logo.svg';
  }

  // Exact 6 links specification & order requested by the user:
  // 1. Google Maps (العنوان)
  // 2. WhatsApp
  // 3. Phone
  // 4. Facebook
  // 5. Telegram
  // 6. Instagram
  merged.links = [
    {
      id: 'l_map',
      platform: 'Google Maps',
      label: 'مصر, القاهرة · القاهرة · قسم النزهة',
      url: 'https://maps.app.goo.gl/NjzRfcmJhzs8SFoCA',
      enabled: true,
      featured: true,
      badge: 'الموقع'
    },
    {
      id: 'l_wa',
      platform: 'WhatsApp',
      label: 'تواصل عبر واتساب',
      url: 'https://wa.me/201103131373',
      enabled: true,
      featured: true,
      badge: 'مميّز'
    },
    {
      id: 'l_phone',
      platform: 'Phone',
      label: 'اتصل بنا الآن (+201507006060)',
      url: 'tel:+201507006060',
      enabled: true,
      featured: true,
      badge: 'اتصال'
    },
    {
      id: 'l_fb',
      platform: 'Facebook',
      label: 'صفحتنا على فيسبوك',
      url: 'https://www.facebook.com/profile.php?id=61573099820423',
      enabled: true,
      featured: false,
      badge: ''
    },
    {
      id: 'l_tg',
      platform: 'Telegram',
      label: 'قناتنا على تليجرام',
      url: 'https://t.me/eldocstor',
      enabled: true,
      featured: false,
      badge: ''
    },
    {
      id: 'l_ig',
      platform: 'Instagram',
      label: 'حسابنا على إنستغرام',
      url: 'https://www.instagram.com/eldoc.cosmetics/',
      enabled: true,
      featured: false,
      badge: ''
    }
  ];

  return merged;
}

/**
 * Load settings from LocalStorage, SessionStorage, or window.name fallback
 * Merges missing properties with defaults to safeguard against broken state.
 */
export function loadSettings() {
  let loadedRaw = null;

  // 1. Try LocalStorage
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) loadedRaw = data;
  } catch (e) {
    console.warn('LocalStorage read restricted:', e);
  }

  // 2. Try SessionStorage if LocalStorage was empty
  if (!loadedRaw) {
    try {
      const data = sessionStorage.getItem(STORAGE_KEY);
      if (data) loadedRaw = data;
    } catch (e) {
      console.warn('SessionStorage read restricted:', e);
    }
  }

  // 3. Try window.name fallback (works across navigations in same tab on file:// protocol)
  if (!loadedRaw) {
    try {
      if (window.name && window.name.startsWith('linkpage_data:')) {
        loadedRaw = window.name.substring('linkpage_data:'.length);
      }
    } catch (e) {
      console.warn('window.name read restricted:', e);
    }
  }

  if (loadedRaw) {
    try {
      const parsed = JSON.parse(loadedRaw);
      const merged = mergeWithDefaults(parsed);
      inMemorySettings = merged;
      return merged;
    } catch (e) {
      console.error('Error parsing stored settings:', e);
    }
  }

  return inMemorySettings ? { ...inMemorySettings } : { ...DEFAULT_SETTINGS };
}

/**
 * Save settings to LocalStorage, SessionStorage, and window.name
 */
export function saveSettings(settings) {
  inMemorySettings = { ...settings };
  const jsonStr = JSON.stringify(settings);

  // Save to LocalStorage
  try {
    localStorage.setItem(STORAGE_KEY, jsonStr);
  } catch (e) {
    console.warn('LocalStorage save restricted:', e);
  }

  // Save to SessionStorage
  try {
    sessionStorage.setItem(STORAGE_KEY, jsonStr);
  } catch (e) {
    console.warn('SessionStorage save restricted:', e);
  }

  // Save to window.name
  try {
    window.name = 'linkpage_data:' + jsonStr;
  } catch (e) {
    console.warn('window.name save restricted:', e);
  }

  try {
    window.dispatchEvent(new CustomEvent('linkpage:settingsUpdated', { detail: settings }));
  } catch (e) {}

  return true;
}

/**
 * Reset settings back to default
 */
export function resetSettings() {
  inMemorySettings = { ...DEFAULT_SETTINGS };
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
  try {
    if (window.name && window.name.startsWith('linkpage_data:')) {
      window.name = '';
    }
  } catch (e) {}
  window.dispatchEvent(new CustomEvent('linkpage:settingsUpdated', { detail: DEFAULT_SETTINGS }));
  return DEFAULT_SETTINGS;
}

/**
 * Export settings as JSON download
 */
export function exportSettings(settings) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `linkpage-config-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Import settings from JSON string
 */
export function importSettings(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid JSON structure');
    }
    const merged = {
      ...DEFAULT_SETTINGS,
      ...parsed,
      brand: { ...DEFAULT_SETTINGS.brand, ...(parsed.brand || {}) },
      logo: { ...DEFAULT_SETTINGS.logo, ...(parsed.logo || {}) },
      profile: { ...DEFAULT_SETTINGS.profile, ...(parsed.profile || {}) },
      theme: { ...DEFAULT_SETTINGS.theme, ...(parsed.theme || {}) },
      colors: { ...DEFAULT_SETTINGS.colors, ...(parsed.colors || {}) },
      typography: { ...DEFAULT_SETTINGS.typography, ...(parsed.typography || {}) },
      seo: { ...DEFAULT_SETTINGS.seo, ...(parsed.seo || {}) },
      links: Array.isArray(parsed.links) ? parsed.links : DEFAULT_SETTINGS.links
    };
    saveSettings(merged);
    return { success: true, settings: merged };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

let memoryAuthSession = false;

const AUTH_SESSION_KEY = 'linkpage_editor_auth_session';

/**
 * Check if the current browser session is authenticated
 */
export function isEditorAuthenticated() {
  try {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true' || memoryAuthSession;
  } catch (e) {
    return memoryAuthSession;
  }
}

/**
 * Validate credentials against saved settings
 */
export function verifyCredentials(inputUsername, inputPassword) {
  const settings = loadSettings();
  const validUsername = (settings.auth?.username || DEFAULT_SETTINGS.auth.username).trim();
  const validPassword = (settings.auth?.password || DEFAULT_SETTINGS.auth.password).trim();
  
  return (inputUsername || '').trim() === validUsername && (inputPassword || '').trim() === validPassword;
}

/**
 * Authenticate session
 */
export function loginEditorSession() {
  memoryAuthSession = true;
  try {
    sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
  } catch (e) {
    console.warn('sessionStorage restricted:', e);
  }
}

/**
 * Clear authenticated session
 */
export function logoutEditorSession() {
  memoryAuthSession = false;
  try {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  } catch (e) {
    console.warn('sessionStorage restricted:', e);
  }
}

