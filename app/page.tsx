'use client';

import UpdateButton from '../components/UpdateButton';
import { Provider } from 'react-redux';
import store from '../store/store';
// import store from '@/store/store';

export default function Home() {
  return (
    <Provider store={store}>
      <UpdateButton />
    </Provider>
  );
}
