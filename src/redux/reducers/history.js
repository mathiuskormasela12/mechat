// ===== History
const initialState = {
  histories: [],
  page: 1,
  loading: false,
  message: null,
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_HISTORY': {
      return {
        ...state,
        page: 1,
        histories: action.payload.histories,
      };
    }

    case 'SET_HISTORY_NEXT': {
      const data = [...state.histories, ...action.payload.histories];
      return {
        ...state,
        histories: data,
      };
    }

    case 'SET_MESSAGE': {
      return {
        ...state,
        message: action.payload.message,
      };
    }

    case 'SET_LOADING': {
      return {
        ...state,
        loading: !state.loading,
      };
    }

    case 'SET_HISTORY_PAGE': {
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

export default historyReducer;
