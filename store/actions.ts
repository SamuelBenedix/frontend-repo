/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { AppDispatch } from './store';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsersRequest = () => ({
 type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users: any[]) => ({
 type: FETCH_USERS_SUCCESS,
 payload: users,
});

export const fetchUsersFailure = (error: string) => ({
 type: FETCH_USERS_FAILURE,
 payload: error,
});

export const fetchAllUsers = () => {
 return async (dispatch: AppDispatch) => {
  dispatch(fetchUsersRequest());
  try {
   const db = getFirestore();
   const snapshot = await getDocs(collection(db, 'users'));
   console.log('snapshot', snapshot)
   const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
   }));
   dispatch(fetchUsersSuccess(users));
  } catch (error: any) {
   dispatch(fetchUsersFailure(error.message || 'Failed to fetch users'));
  }
 };
};
