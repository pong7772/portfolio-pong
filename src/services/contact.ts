import axios from 'axios';

const FORM_URL = 'https://api.web3forms.com/submit';

export const sendMessage = async (formData: FormData) => {
  try {
    // Convert FormData to plain object for axios
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const response = await axios.post(FORM_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const status = response?.status;

    if (status >= 400) {
      return {
        status,
        message: response?.statusText || 'Failed to send message',
      };
    }

    return {
      status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: error?.response?.status || 500,
      message:
        error?.response?.data?.message ||
        error?.message ||
        'Failed to send message',
    };
  }
};
