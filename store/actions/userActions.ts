/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../store';
import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from '../constant';
import api from '../../apis/api';


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
 return async (dispatch: AppDispatch,) => {

  dispatch(fetchUsersRequest());
  const authToken = localStorage.getItem('authToken');

  try {

   const response = await api.get('/users', {
    headers: {
     'Authorization': `Bearer ${authToken}`,
     'Content-Type': 'application/json',
    },
   });

   console.log('response', response);
   const users = response.data;

   console.log('users', users);
   dispatch(fetchUsersSuccess(users));
  } catch (error: any) {
   console.log('fetchAllUsers error', error);
   dispatch(fetchUsersFailure(error.message || 'Failed to fetch users'));
  }
 };
};
