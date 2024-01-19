import { createContext, useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useDocument } from '../hooks/useDocument';
import { useFirestore } from '../hooks/useFirestore';

export const IntegrationContext = createContext();

export const IntegrationProvider = ({ children }) => {
    const { updateDocument } = useFirestore("users")

    const [integration, setIntegration] = useState(false);
    const [tokenFacebook, setTokenFacebook] = useState("");
    const { user } = useAuthContext();
    const { document: userData, error } = useDocument('users', user?.uid)

    const resetToken = async () => {
        try {
            await updateDocument(user.uid, {
                facebookToken: " ",
                expireTokenIn: " ",
                userIntegration: false,
            })
            return
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!userData) {
            return;
        }

        const formatDate = (date) => {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Os meses são baseados em zero
            const year = date.getFullYear();
            return `${year}-${month}-${day}`;
        }

        try {
            const { userIntegration, expireTokenIn, facebookToken } = userData;
            setTokenFacebook(facebookToken);

            console.log(userIntegration, expireTokenIn)

            // Correção aqui - use a propriedade seconds para obter o timestamp
            const expireToken = formatDate(new Date(expireTokenIn.seconds * 1000));
            const dateToday = formatDate(new Date());

            console.log("Current date:", dateToday);
            console.log("Expire date from Firestore:", expireToken);

            // Check if integration is true and expiration date is not reached
            if (userIntegration && new Date(expireToken) > new Date(dateToday)) {
                setIntegration(true);
            } else {
                if (new Date(expireToken) <= new Date(dateToday)) {
                    setIntegration(false);
                    console.log("Token expiredo. Resetting...");
                    resetToken();
                } else {
                    console.log("Integration is false. Not resetting token.");
                }
            }

        } catch (error) {
            console.error('Error processing integration data:', error.message);
        }
    }, [userData]);





    const value = {
        integration,
        setIntegration,
        tokenFacebook
    };

    return (
        <IntegrationContext.Provider value={value}>
            {children}
        </IntegrationContext.Provider>
    );
};
