/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch, RootState } from '../store';
import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from '../constant';


export const fetchUsersRequest = () => ({
 type: FETCH_USER_REQUEST,
});

export const fetchUsersSuccess = (users: any[]) => ({
 type: FETCH_USER_SUCCESS,
 payload: users,
});

export const fetchUsersFailure = (error: string) => ({
 type: FETCH_USER_FAILURE,
 payload: error,
});

export const fetchAllUsers = () => {
 return async (dispatch: AppDispatch, getState: () => RootState) => {

  const state = getState().user;
  dispatch(fetchUsersRequest());

  try {
   const response = await fetch('http://localhost:3001/api/users', {
    method: 'GET',
    headers: {
     'Authorization': `Bearer ${state.token}`,
     'Content-Type': 'application/json',
    },
   });

   if (!response.ok) throw new Error('Failed to fetch users');

   console.log('response', response);
   const users = await response.json();

   console.log('users', users);
   dispatch(fetchUsersSuccess(users));
  } catch (error: any) {
   console.log('fetchAllUsers error', error);
   dispatch(fetchUsersFailure(error.message || 'Failed to fetch users'));
  }
 };
};
