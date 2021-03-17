// ===== Chat
const initialState = {
  chats: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHAT': {
      return {
        ...state,
        chats: action.payload.chats,
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
