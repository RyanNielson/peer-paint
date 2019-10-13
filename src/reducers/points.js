const initialState = {
  isReported: false,
  items: [],
};

const pointsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POINTS': {
      return { isReported: true, items: action.points };
    }
    default:
      return state;
  }
};

export default pointsReducer;
