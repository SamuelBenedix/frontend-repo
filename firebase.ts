import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import fbConfig from './lib/fbconfig.json';

const firebaseConfig = {
 apiKey: fbConfig.apiKey,
 authDomain: fbConfig.authDomain,
 projectId: fbConfig.projectId,
 storageBucket: fbConfig.storageBucket,
 messagingSenderId: fbConfig.messagingSenderId,
 appId: fbConfig.appId,
 measurementId: fbConfig.measurementId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
