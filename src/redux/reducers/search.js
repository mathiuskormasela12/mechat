// ===== Search
const initialState = {
  isASC: true,
  keyword: '',
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH': {
      return {
        ...state,
        keyword: action.payload.keyword,
      };
    }

    case 'SET_SORT': {
      return {
        ...state,
        isASC: !state.isASC,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default searchReducer;
