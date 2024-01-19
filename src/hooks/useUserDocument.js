import { useContext } from "react";
import { UserDocContext } from "../context/UserDocContext";

export const useUserDocument = () => {
    const context = useContext(UserDocContext);
    if (!context) {
        throw new Error('useUserDocument deve ser usado dentro de UserDocProvider');
    }
    return context;
};