// ===== Chat
const initialState = {
  chats: [],
  chatList: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHAT': {
      return {
        ...state,
        chats: action.payload.chats,
      };
    }

    case 'SET_CHAT_LIST': {
      return {
        ...state,
        chatList: action.payload.chatList,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default chatReducer;
