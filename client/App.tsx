import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import { ChatList } from '@/components/ChatList';
import { colors } from '@/constants/colors';
import { PromptInput } from '@/components/PromptInput';
import { useChatMessages } from '@/hooks/useChatMessages';
import { StatusBar } from 'expo-status-bar';
import { spacings } from '@/constants/layout';
import { Typography } from '@/components/UI';

export default function App() {
  const { chatMessages, sendUserMessage, isLoading, connectionStatus } =
    useChatMessages();
  const [promptQuery, setPromptQuery] = useState('');
  const chatListRef = useRef<FlatList | null>(null);

  const scrollToEnd = () => {
    chatListRef.current?.scrollToEnd();
  };

  const handleSend = () => {
    try {
      sendUserMessage(promptQuery);
      setPromptQuery('');
      Keyboard.dismiss();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    scrollToEnd();
  }, [chatMessages]);

  if (connectionStatus === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Typography>Trying to connect..</Typography>
      </SafeAreaView>
    );
  }

  if (connectionStatus === 3) {
    return (
      <SafeAreaView style={styles.container}>
        <Typography>Network error. Cannot connect</Typography>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} style="auto" />
      <ChatList
        sendMessage={sendUserMessage}
        isLoading={isLoading}
        ref={chatListRef}
        chatMessages={chatMessages}
      />
      <PromptInput
        isLoading={isLoading}
        onChangeText={setPromptQuery}
        promptQuery={promptQuery}
        sendPrompt={handleSend}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacings.m,
    backgroundColor: colors.bg,

    gap: spacings.l,
  },
});
