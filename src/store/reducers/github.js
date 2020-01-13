import * as actionTypes from "../actions/github";

const initialState = {
  user: null,
  repos: null
};

const Github = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return {
          ...state,
          user: action.user      
        };
    case actionTypes.SET_USER_REPOS:
        return{
            ...state,
            repos: action.repos
        }
    default:
      return {
        ...state
      };
  }
};

export default Github;