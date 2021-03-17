export const setChat = (chats) => {
  return {
    type: 'SET_CHAT',
    payload: {
      chats,
    },
  };
};

export const setChatList = (chats) => {
  return {
    type: 'SET_CHAT_LIST',
    payload: {
      chatList: chats,
    },
  };
};
