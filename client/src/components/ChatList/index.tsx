import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { ChatMessage } from '@/types/chat';
import { ChatListMessage } from '@/components/ChatListMessage';

export interface ChatListProps {
  chatMessages: ChatMessage[];
}

export const ChatList = ({ chatMessages }: ChatListProps) => {
  return (
    <ScrollView contentContainerStyle={{ gap: 16 }}>
      {chatMessages.map((chatMessage, index) => (
        <ChatListMessage key={index} chatMessage={chatMessage} />
      ))}
    </ScrollView>
  );
};
