import { useState } from 'react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';

const auth = getAuth();

const useChangePassword = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const changePassword = async (oldPassword, newPassword) => {
        setError(null);
        setIsLoading(true);

        try {
            const user = auth.currentUser;

            if (!user) {
                throw new Error('User not authenticated.');
            }

            // Reauthenticate the user with email and password
            const credential = EmailAuthProvider.credential(
                user.email,
                oldPassword
            );

            // Reauthenticate the user before updating the password
            await reauthenticateWithCredential(user, credential);

            // Update the password
            await updatePassword(user, newPassword);

            console.log('Password changed successfully!');
        } catch (error) {
            console.error('Error changing password:', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { changePassword, error, isLoading };
};

export default useChangePassword;
