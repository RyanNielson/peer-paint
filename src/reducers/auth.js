const initialState = {
  isReported: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isReported: true,
        user: action.user,
      };
    default:
      return state;
  }
};

export default authReducer;
