import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { ChatRole } from './src/constants/chat';
import { ChatMessage } from './src/types/chat';
import { ChatList } from '@/components/ChatList';

const IP = '192.168.100.19';

export default function App() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [promptQuery, setPromptQuery] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);

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

  useEffect(() => {
    const socket = new WebSocket(`ws://${IP}:8080`);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
      try {
        const res = JSON.parse(event.data);
        switch (res.event) {
          case 'TYPING':
            updateChatMessages(res.message);
            break;
          case 'DONE':
            console.log('Message processing done');
            break;
          default:
            updateChatMessages(res.message);
            break;
        }
      } catch (err) {
        console.log('Error parsing message:', err);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const handleSend = () => {
    if (ws) {
      setChatMessages([
        ...chatMessages,
        { author: ChatRole.USER, message: promptQuery },
      ]);
      ws.send(promptQuery);
      setPromptQuery('');
    }
  };

  return (
    <View style={styles.container}>
      <ChatList chatMessages={chatMessages} />
      <TextInput
        value={promptQuery}
        onChangeText={setPromptQuery}
        placeholder="Type your message"
        style={styles.textInput}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});
