import { useContext } from 'react';
import { RerenderUpdateContext } from '../context/RerenderUpdateContext';

export const useRerenderUpdate = () => {
    const context = useContext(RerenderUpdateContext);

    if (!context) {
        throw new Error('useRerenderUpdate must be used within a RerenderUpdateProvider');
    }

    return context;
};