import { ChatRole } from '@/constants/chat';
import { ChatMessage } from '@/types/chat';
import { useEffect, useState } from 'react';

const IP = '192.168.100.19';

export const useChatMessages = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<number>(3);

  const updateChatMessages = (newMessage: string) => {
    setChatMessages((prev) => {
      const chatLength = prev.length;
      if (chatLength > 0 && prev[chatLength - 1].author === ChatRole.AI) {
        let updatedChat = [...prev];
        updatedChat[chatLength - 1].message += newMessage;
        return updatedChat;
      } else {
        return [...prev, { author: ChatRole.AI, message: newMessage }];
      }
    });
  };

  const sendUserMessage = (message: string) => {
    if (ws && connectionStatus === 1) {
      setChatMessages([...chatMessages, { author: ChatRole.USER, message }]);
      ws.send(message);
    }
  };

  useEffect(() => {
    const socket = new WebSocket(`ws://${IP}:8080`);
    setConnectionStatus(0);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      setConnectionStatus(1);
    };

    socket.onmessage = (event) => {
      try {
        const res = JSON.parse(event.data);
        switch (res.event) {
          case 'LOADING':
            setIsLoading(true);
            break;
          case 'TYPING':
            setIsLoading(false);
            updateChatMessages(res.message);
            break;
          case 'DONE':
            setIsLoading(false);
            console.log('Message processing done');
            break;
          default:
            setIsLoading(false);
            updateChatMessages(res.message);
            break;
        }
      } catch (err) {
        console.log('Error parsing message:', err);
      }
    };

    socket.onclose = () => {
      setConnectionStatus(3);
      console.log('WebSocket connection closed');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  return { chatMessages, sendUserMessage, isLoading, connectionStatus };
};
