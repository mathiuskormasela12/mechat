// ===== Loading
const initialState = {
  showWrapper: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WRAPPER': {
      return {
        ...state,
        showWrapper: !state.showWrapper,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default loadingReducer;
