export const setChat = (chats) => {
  return {
    type: 'SET_CHAT',
    payload: {
      chats,
    },
  };
};
