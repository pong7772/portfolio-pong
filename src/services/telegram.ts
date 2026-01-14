/**
 * Telegram Bot Service
 * Sends messages to Telegram using the Bot API
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export interface TelegramMessageOptions {
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  disable_web_page_preview?: boolean;
}

/**
 * Sends a message to Telegram
 * @param text - The message text to send
 * @param options - Optional Telegram API options
 * @returns Promise with success status
 */
export const sendTelegramMessage = async (
  text: string,
  options: TelegramMessageOptions = {},
): Promise<{ success: boolean; error?: string }> => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn(
      'Telegram credentials not configured. Skipping Telegram notification.',
    );
    return { success: false, error: 'Telegram not configured' };
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: options.parse_mode || 'HTML',
        disable_web_page_preview: options.disable_web_page_preview ?? true,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error('Telegram API error:', data);
      return {
        success: false,
        error: data.description || 'Failed to send Telegram message',
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error sending Telegram message:', error);
    return {
      success: false,
      error: error?.message || 'Unknown error',
    };
  }
};

/**
 * Formats and sends a contact form notification
 */
export const notifyNewContact = async (
  name: string,
  email: string,
  message: string,
): Promise<void> => {
  const text = `📧 <b>New Contact Form Message</b>

👤 <b>Name:</b> ${escapeHtml(name)}
📮 <b>Email:</b> ${escapeHtml(email)}
💬 <b>Message:</b>
${escapeHtml(message.substring(0, 500))}${message.length > 500 ? '...' : ''}`;

  await sendTelegramMessage(text);
};

/**
 * Formats and sends a comment notification
 */
export const notifyNewComment = async (
  name: string,
  slug: string,
  type: string,
  message: string,
): Promise<void> => {
  const typeLabel =
    type === 'blog' ? '📝 Blog' : type === 'ppd' ? '🎓 PPD' : '📚 Learning';
  const text = `💬 <b>New Comment</b>

${typeLabel}
🔗 <b>Slug:</b> ${escapeHtml(slug)}
👤 <b>Name:</b> ${escapeHtml(name)}
💬 <b>Message:</b>
${escapeHtml(message.substring(0, 300))}${message.length > 300 ? '...' : ''}`;

  await sendTelegramMessage(text);
};

/**
 * Formats and sends a visitor notification
 */
export const notifyNewVisit = async (
  path: string,
  country?: string,
  city?: string,
): Promise<void> => {
  const location = country
    ? `${getCountryFlag(country)} ${country}${city ? `, ${city}` : ''}`
    : '🌍 Unknown';
  const text = `👁️ <b>New Visitor</b>

📍 <b>Path:</b> ${escapeHtml(path)}
${location}`;

  await sendTelegramMessage(text);
};

/**
 * Escapes HTML special characters
 */
const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Gets country flag emoji from country code
 */
const getCountryFlag = (countryCode: string): string => {
  // Convert country code to flag emoji
  // This is a simplified version - you might want to use a library for this
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};
