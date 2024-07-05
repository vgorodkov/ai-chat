import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { PromptInputProps } from './types';

import { spacings } from '@/constants/layout';
import { Input } from '../UI';

export const PromptInput = ({
  promptQuery,
  onChangeText,
  sendPrompt,
  isLoading,
}: PromptInputProps) => {
  const onSendPromtBtnPress = () => {
    sendPrompt(promptQuery);
  };
  return (
    <View style={styles.promptInputContainer}>
      <Input
        placeholder="Message"
        onChangeText={onChangeText}
        value={promptQuery}
      />
      <Pressable disabled={isLoading} onPress={onSendPromtBtnPress}>
        <Image
          style={{
            width: 32,
            height: 32,
            opacity: isLoading ? 0.3 : 1,
          }}
          source={require('@/assets/send.png')}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  promptInputContainer: {
    flexDirection: 'row',
    gap: spacings.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
