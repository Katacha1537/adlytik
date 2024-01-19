import { createContext, useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useDocument } from '../hooks/useDocument';
import { useFirestore } from '../hooks/useFirestore';

export const IntegrationContext = createContext();

export const IntegrationProvider = ({ children }) => {
    const { updateDocument } = useFirestore("users");

    const [integration, setIntegration] = useState(false);
    const [tokenFacebook, setTokenFacebook] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuthContext();
    const { document: userData, error } = useDocument('users', user?.uid);

    const resetToken = async () => {
        try {
            await updateDocument(user.uid, {
                facebookToken: "",
                expireTokenIn: "",
                userIntegration: false,
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                if (!userData) {
                    // Usuário sem dados ou dados ainda não carregados
                    console.log("User data not found or not loaded yet.");
                    return;
                }

                const formatDate = (date) => {
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const year = date.getFullYear();
                    return `${year}-${month}-${day}`;
                };

                const { userIntegration, expireTokenIn, facebookToken } = userData;
                setTokenFacebook(facebookToken);

                const expireToken = formatDate(new Date(expireTokenIn.seconds * 1000));
                const dateToday = formatDate(new Date());

                if (userIntegration && new Date(expireToken) > new Date(dateToday)) {
                    setIntegration(true);
                } else {
                    if (!userIntegration && new Date(expireToken) <= new Date(dateToday)) {
                        console.log("Token expired. Resetting...");
                        resetToken();
                    } else {
                        console.log("Integration is false. Not resetting token.");
                    }
                }

            } catch (error) {
                console.error('Error processing integration data:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (user?.uid && userData) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [user?.uid, userData]);

    const value = {
        integration,
        setIntegration,
        tokenFacebook,
        isLoading,
    };

    return (
        <IntegrationContext.Provider value={value}>
            {children}
        </IntegrationContext.Provider>
    );
}