import React, { createContext, useContext, useState } from 'react';

export const RerenderUpdateContext = createContext();

export const RerenderUpdateProvider = ({ children }) => {
    const [rerender, setRerender] = useState(false);

    const updateRerender = () => setRerender((prev) => !prev);

    return (
        <RerenderUpdateContext.Provider value={{ updateRerender, rerender }}>
            {children}
        </RerenderUpdateContext.Provider>
    );
}
