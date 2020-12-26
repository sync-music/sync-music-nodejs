import admin from 'firebase-admin';
import { AxiosResponse } from 'axios';
// @ts-ignore
import serviceAccount from '../../sync-music-b99f0-firebase-adminsdk-9qv66-12abf5d963.json';
import axios from './axios';

const { FIREBASE_API_KEY } = process.env;
const firebaseRestApiBAseUrl = 'https://identitytoolkit.googleapis.com';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const sendVerificationEmail = async (idToken: string): Promise<AxiosResponse> => {
    const config = {
        url: `${firebaseRestApiBAseUrl}/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`,
        method: 'POST',
        body: { requestType: 'VERIFY_EMAIL', idToken },
    };
    return axios(config);
};

interface ConfirmEmailResponse {
    email: string;
    displayName: string;
    photoUrl: string;
    passwordHash: string
    providerUserInfo: [];
    emailVerified: boolean;
}

export const confirmEmailVerification = (oobCode: string): Promise<AxiosResponse<ConfirmEmailResponse>> => {
    const config = {
        url: `${firebaseRestApiBAseUrl}/v1/accounts:update?key=${FIREBASE_API_KEY}`,
        method: 'POST',
        body: { oobCode },
    };
    return axios(config);
};

export default admin;
