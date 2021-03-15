// ===== User
const initialState = {
  picture: null,
  phoneNumber: null,
  about: null,
  fullName: null,
  email: null,
  status: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_PROFILE': {
      return {
        ...state,
        picture: action.payload.picture,
        fullName: action.payload.fullName,
        phoneNumber: action.payload.phoneNumber,
        about:
          action.payload.about !== 'null' &&
          action.payload.about !== 'undefined'
            ? action.payload.about
            : null,
        email: action.payload.email,
        status: action.payload.status,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default userReducer;
