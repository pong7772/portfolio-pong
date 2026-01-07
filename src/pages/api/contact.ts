import { NextApiRequest, NextApiResponse } from 'next';

import { sendMessage } from '@/services/contact';

const FORM_API_KEY = process.env.CONTACT_FORM_API_KEY as string;

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

    if (!FORM_API_KEY) {
      console.error('CONTACT_FORM_API_KEY is not set');
      return res.status(500).json({
        error:
          'Contact form is not configured. Please contact the administrator.',
      });
    }

    // Create FormData for Web3Forms API
    const web3FormData = new FormData();
    web3FormData.append('access_key', FORM_API_KEY);
    web3FormData.append(
      'subject',
      `New Contact Form Message from ${formData.name}`,
    );
    web3FormData.append('from_name', formData.name);
    web3FormData.append('email', formData.email);
    web3FormData.append('message', formData.message);
    web3FormData.append('redirect', 'false');

    const response = await sendMessage(web3FormData);

    if (response.status >= 400) {
      return res.status(response.status).json({
        error: response.message || 'Failed to send message',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Message sent successfully',
      data: response.data,
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: error?.message || 'Something went wrong! Please try again later.',
    });
  }
}
