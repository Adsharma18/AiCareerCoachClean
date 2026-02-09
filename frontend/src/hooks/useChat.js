// useChat.js - API call hook using TanStack Query

import { useMutation } from '@tanstack/react-query';
import { sendChatMessage } from '../services/api';

export const useChat = () => {
  return useMutation({
    mutationFn: sendChatMessage,
  });
};