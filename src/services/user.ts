import { auth } from 'firebase-admin/lib/auth';
import moment from 'moment';
import UserRepository from '../repositories/UserRepository';
import { confirmEmailVerification, sendVerificationEmail } from './firebase';
import ApiError from '../errors/ApiError';
import DecodedIdToken = auth.DecodedIdToken;

export const registerUser = async (user: DecodedIdToken, idToken: string): Promise<void> => {
    const userWithSameEmail = await UserRepository.findOneBy({ email: user.email });

    if (userWithSameEmail != null) {
        throw new ApiError('CANNOT_REGISTER_USER');
    }

    await UserRepository.saveData({
        firebaseId: user.uid,
        email: user.email,
        registrationDate: moment().unix(),
    });

    await sendVerificationEmail(idToken);
};

export const activeUser = async (oobCode: string): Promise<void> => {
    const result = await confirmEmailVerification(oobCode);

    if (!result.data.emailVerified) {
        throw new ApiError();
    }

    UserRepository.updateOneBy({ email: result.data.email }, { isActive: true });
};
