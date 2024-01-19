import React, { createContext } from 'react';  // Coloque o caminho correto para o useDocument
import { useDocument } from '../hooks/useDocument';
import { useAuthContext } from '../hooks/useAuthContext';

export const UserDocContext = createContext();

export const UserDocProvider = ({ children }) => {
    const { user } = useAuthContext()

    const { document, error } = useDocument('users', user.uid);

    const value = {
        userDocument: document,
        userDocumentError: error,
    };

    return (
        <UserDocContext.Provider value={value}>
            {children}
        </UserDocContext.Provider>
    );
};