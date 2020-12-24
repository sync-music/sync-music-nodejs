import admin from 'firebase-admin';
// @ts-ignore
import serviceAccount from '../../sync-music-b99f0-firebase-adminsdk-9qv66-12abf5d963.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;
