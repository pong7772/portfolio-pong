import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { MessageProps } from '@/common/types/chat';

import GuestbookForm from './GuestbookForm';
import ChatList from './ChatList';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Chat = ({ isWidget = false }: { isWidget?: boolean }) => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const { data, error, mutate } = useSWR<MessageProps[]>(
    '/api/guestbook',
    fetcher,
    {
      refreshInterval: 5000, // Refresh every 5 seconds
      revalidateOnFocus: true,
    },
  );

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  const handleSendMessage = async (
    name: string,
    email: string,
    message: string,
    image?: string,
  ) => {
    await axios.post('/api/guestbook', {
      name,
      email,
      message,
      image: image || session?.user?.image || null,
    });
    mutate(); // Refresh the messages
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await axios.delete(`/api/guestbook?id=${id}`);
      mutate(); // Refresh the messages
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <>
      <ChatList
        isWidget={isWidget}
        messages={messages}
        onDeleteMessage={handleDeleteMessage}
      />
      <GuestbookForm
        onSendMessage={handleSendMessage}
        isWidget={isWidget}
        session={session}
      />
    </>
  );
};

export default Chat;
