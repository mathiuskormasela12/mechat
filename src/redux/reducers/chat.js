// ===== Chat
const initialState = {
  chats: [],
  chatList: [],
  id: null,
  page: 1,
  contacts: [],
  messageContact: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHAT': {
      console.log(action.payload.chats);
      return {
        ...state,
        page: 1,
        chats: action.payload.chats,
      };
    }

    case 'SET_CONTACT': {
      return {
        ...state,
        contacts: action.payload.contacts,
      };
    }

    case 'REMOVE_CONTACT': {
      return {
        ...state,
        contacts: [],
      };
    }

    case 'SET_MESSAGE_CONTACT': {
      return {
        ...state,
        messageContact: action.payload.message,
      };
    }

    case 'REMOVE_CHAT': {
      return {
        ...state,
        page: 1,
        chats: [],
        chatList: [],
        contacts: [],
      };
    }

    case 'SET_CHAT_NEXT': {
      const data = [...state.chats, ...action.payload.chats];
      return {
        ...state,
        chats: data,
      };
    }

    case 'SET_CHAT_LIST': {
      return {
        ...state,
        chatList: action.payload.chatList,
      };
    }

    case 'SET_ID': {
      return {
        ...state,
        id: action.payload.id,
      };
    }

    case 'SET_PAGE': {
      return {
        ...state,
        page: Number(state.page) + 1,
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
