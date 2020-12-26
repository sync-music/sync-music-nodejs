import { auth } from 'firebase-admin/lib/auth';
import moment from 'moment';
import UserRepository from '../repositories/UserRepository';
import { confirmEmailVerification, sendVerificationEmail } from './firebase';
import ApiError from '../errors/ApiError';
import DecodedIdToken = auth.DecodedIdToken;

export const registerUser = async (user: DecodedIdToken, idToken: string): Promise<void> => {
    await UserRepository.saveData({
        firebaseId: user.uid,
        email: user.email,
        registrationDate: moment().unix(),
    });

    await sendVerificationEmail(idToken);
};

export const acitveUser = async (oobCode: string): Promise<void> => {
    const result = await confirmEmailVerification(oobCode);

    if (!result.data.emailVerified) {
        throw new ApiError();
    }

    UserRepository.updateOneBy({ email: result.data.email }, { isActive: true });
};
