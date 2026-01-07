import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';
import { notifyNewContact } from '@/services/telegram';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formData } = req.body;

    if (!formData) {
      return res.status(400).json({ error: 'Form data is required' });
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return res.status(400).json({
        error: 'Name, email, and message are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Validate message length
    if (formData.message.trim().length < 10) {
      return res.status(400).json({
        error: 'Message must be at least 10 characters long',
      });
    }

    // Save to database
    const savedMessage = await prisma.contact_messages.create({
      data: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        is_read: false,
      },
    });

    // Send Telegram notification (non-blocking)
    notifyNewContact(
      formData.name.trim(),
      formData.email.trim(),
      formData.message.trim(),
    ).catch((err) => {
      console.error('Failed to send Telegram notification:', err);
    });

    return res.status(200).json({
      status: 200,
      message: 'Message sent successfully',
      data: {
        id: savedMessage.id,
        name: savedMessage.name,
        email: savedMessage.email,
        created_at: savedMessage.created_at.toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: error?.message || 'Something went wrong! Please try again later.',
    });
  }
}
