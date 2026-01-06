import type { NextApiRequest, NextApiResponse } from 'next';

const DASHBOARD_PASSWORD = '2404';
const MAX_ATTEMPTS = 5;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password, attempts } = req.body;

  // Check if max attempts reached
  if (attempts >= MAX_ATTEMPTS) {
    return res.status(429).json({
      error: 'Maximum attempts reached. Please refresh the page and try again.',
      maxAttemptsReached: true,
    });
  }

  // Verify password
  if (password === DASHBOARD_PASSWORD) {
    // Password is correct
    return res.status(200).json({
      success: true,
      message: 'Authentication successful',
    });
  } else {
    // Password is incorrect
    const remainingAttempts = MAX_ATTEMPTS - (attempts + 1);
    return res.status(401).json({
      error: 'Incorrect password',
      remainingAttempts,
      maxAttemptsReached: remainingAttempts === 0,
    });
  }
}
