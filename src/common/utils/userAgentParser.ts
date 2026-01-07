/**
 * Simple User Agent Parser
 * Extracts device, browser, and OS information from user agent strings
 */

export interface DeviceInfo {
  device_type: string; // mobile, tablet, desktop
  browser: string; // Chrome, Firefox, Safari, etc.
  browser_version: string | null;
  os: string; // Windows, macOS, iOS, Android, Linux, etc.
  os_version: string | null;
}

/**
 * Parses user agent string to extract device information
 */
export const parseUserAgent = (userAgent: string | null): DeviceInfo => {
  if (!userAgent) {
    return {
      device_type: 'unknown',
      browser: 'unknown',
      browser_version: null,
      os: 'unknown',
      os_version: null,
    };
  }

  const ua = userAgent.toLowerCase();

  // Detect Device Type
  let device_type = 'desktop';
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    device_type = 'mobile';
  } else if (/tablet|ipad|playbook|silk/i.test(ua)) {
    device_type = 'tablet';
  }

  // Detect Browser
  let browser = 'unknown';
  let browser_version: string | null = null;

  // Chrome (including Edge based on Chromium)
  if (ua.includes('edg/')) {
    browser = 'Edge';
    browser_version = ua.match(/edg\/([\d.]+)/)?.[1] || null;
  } else if (ua.includes('chrome/') && !ua.includes('edg')) {
    browser = 'Chrome';
    browser_version = ua.match(/chrome\/([\d.]+)/)?.[1] || null;
  }
  // Firefox
  else if (ua.includes('firefox/')) {
    browser = 'Firefox';
    browser_version = ua.match(/firefox\/([\d.]+)/)?.[1] || null;
  }
  // Safari
  else if (ua.includes('safari/') && !ua.includes('chrome')) {
    browser = 'Safari';
    browser_version = ua.match(/version\/([\d.]+)/)?.[1] || null;
  }
  // Opera
  else if (ua.includes('opr/') || ua.includes('opera/')) {
    browser = 'Opera';
    browser_version =
      ua.match(/opr\/([\d.]+)/)?.[1] ||
      ua.match(/version\/([\d.]+)/)?.[1] ||
      null;
  }
  // Internet Explorer
  else if (ua.includes('msie') || ua.includes('trident/')) {
    browser = 'IE';
    browser_version = ua.match(/(?:msie |rv:)([\d.]+)/)?.[1] || null;
  }

  // Detect OS
  let os = 'unknown';
  let os_version: string | null = null;

  // Windows
  if (ua.includes('windows')) {
    os = 'Windows';
    if (ua.includes('windows nt 10.0')) os_version = '10/11';
    else if (ua.includes('windows nt 6.3')) os_version = '8.1';
    else if (ua.includes('windows nt 6.2')) os_version = '8';
    else if (ua.includes('windows nt 6.1')) os_version = '7';
    else if (ua.includes('windows nt 6.0')) os_version = 'Vista';
    else if (ua.includes('windows nt 5.1')) os_version = 'XP';
  }
  // macOS
  else if (ua.includes('mac os x') || ua.includes('macintosh')) {
    os = 'macOS';
    const match = ua.match(/mac os x ([\d_]+)/);
    if (match) {
      os_version = match[1].replace(/_/g, '.');
    }
  }
  // iOS
  else if (
    ua.includes('iphone') ||
    ua.includes('ipad') ||
    ua.includes('ipod')
  ) {
    os = 'iOS';
    const match = ua.match(/os ([\d_]+)/);
    if (match) {
      os_version = match[1].replace(/_/g, '.');
    }
  }
  // Android
  else if (ua.includes('android')) {
    os = 'Android';
    const match = ua.match(/android ([\d.]+)/);
    if (match) {
      os_version = match[1];
    }
  }
  // Linux
  else if (ua.includes('linux')) {
    os = 'Linux';
    if (ua.includes('ubuntu')) os_version = 'Ubuntu';
    else if (ua.includes('fedora')) os_version = 'Fedora';
    else if (ua.includes('debian')) os_version = 'Debian';
  }

  return {
    device_type,
    browser,
    browser_version,
    os,
    os_version,
  };
};
