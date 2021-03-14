// ===== User
const initialState = {
  picture: null,
  phoneNumber: null,
  about: null,
  fullName: null,
  email: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_PROFILE': {
      return {
        ...state,
        picture: action.payload.picture,
        fullName: action.payload.fullName,
        phoneNumber: action.payload.phoneNumber,
        about: action.payload.about,
        email: action.payload.email,
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
