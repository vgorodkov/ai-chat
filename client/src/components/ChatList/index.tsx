import { FlatList, ListRenderItem } from 'react-native';
import React, { forwardRef } from 'react';
import { ChatMessage } from '@/types/chat';
import { ChatListMessage } from '@/components/ChatListMessage';
import { ChatListProps } from './types';
import { styles } from './styles';
import { ChatListLoadingMessage } from '@/components/ChatListLoadingMessage';
import { ChatCommonTopicRow } from '@/components/ChatCommonTopicRow';

const renderChatListMessage: ListRenderItem<ChatMessage> = ({ item }) => {
  return <ChatListMessage chatMessage={item} />;
};

export const ChatList = forwardRef<FlatList, ChatListProps>(
  ({ chatMessages, isLoading, sendMessage }, ref) => {
    return (
      <FlatList
        ref={ref}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatListContentContainer}
        ListEmptyComponent={<ChatCommonTopicRow sendMessage={sendMessage} />}
        ListFooterComponent={<ChatListLoadingMessage isLoading={isLoading} />}
        renderItem={renderChatListMessage}
        data={chatMessages}
      />
    );
  }
);
