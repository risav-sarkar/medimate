const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_USER_START':
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case 'FETCH_USER_FOUND':
      return {
        ...state,
        token: action.payload,
        isFetching: false,
        error: false,
      };
    case 'FETCH_USER_NOTFOUND':
      return {
        ...state,
        token: null,
        isFetching: false,
      };
    case 'FETCH_USER_ERROR':
      return {
        ...state,
        error: true,
      };
    case 'LOGIN_USER_START':
      return {
        ...state,
        token: null,
        isLoading: true,
      };
    case 'LOGIN_USER_SUCCESS':
      return {
        ...state,
        token: action.payload,
        isLoading: false,
      };
    case 'LOGIN_USER_FAILURE':
      return {
        token: null,
        profile: null,
        isFetching: false,
        isLoading: false,
      };
    case 'SET_PROFILE':
      return {...state, error: false, profile: action.payload};
    case 'USER_SIGNOUT':
      return {
        token: null,
        profile: null,
        isFetching: false,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
