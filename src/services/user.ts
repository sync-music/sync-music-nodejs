import { auth } from 'firebase-admin/lib/auth';
import moment from 'moment';
import UserRepository from '../repositories/UserRepository';
import DecodedIdToken = auth.DecodedIdToken;

export const registerUser = async (user: DecodedIdToken): Promise<void> => {
    await UserRepository.saveData({
        firebaseId: user.uid,
        email: user.email,
        registrationDate: moment().unix(),
    });
};
