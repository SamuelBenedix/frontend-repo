import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "../constant";

const initialState = {
  loading: false,
  user: null,
  error: null,
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
    default:
      return state;
  }
}
