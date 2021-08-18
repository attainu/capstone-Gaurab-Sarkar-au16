import {
  SET_CURRENT_USER,
  SUCCESSFUL_REGISTER,
  ERRORS,
  FAILURE_REGISTER,
  AUTH_ERROR,
  SUCCESSFUL_LOGIN,
  FAILURE_LOGIN,
  LOGOUT,
} from "../actions/types";
import { isEmpty } from "lodash";

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  user: {},
  errors: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case SUCCESSFUL_REGISTER:
    case SUCCESSFUL_LOGIN:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case FAILURE_REGISTER:
    case AUTH_ERROR:
    case FAILURE_LOGIN:
    case LOGOUT:
      localStorage.removeItem("token");
      // console.log("Reducer.Login")
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    case ERRORS:
      localStorage.removeItem("token");
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
}
