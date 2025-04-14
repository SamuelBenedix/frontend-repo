import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  GET_USER_SUCCESS
} from "../constant";


const initialState = {
  loading: false,
  user: null,
  error: '',
  token: null,
  userId: null,
};


export default function userReducer(state = initialState, action: {
  type: string;
  payload: unknown
}) {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true };
    case FETCH_USER_SUCCESS:
      return { loading: false, user: action.payload, error: null };
    case FETCH_USER_FAILURE:
      return { loading: false, user: null, error: action.payload };
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { loading: false, token: action.payload, error: null };
    case LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case GET_USER_SUCCESS:
      return { loading: false, userId: action.payload };

    default:
      return state;
  }
}
