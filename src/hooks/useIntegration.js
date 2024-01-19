import { useContext } from "react";
import { IntegrationContext } from "../context/IntegrationContext";

export const useIntegration = () => {
    const context = useContext(IntegrationContext);
    if (!context) {
        throw new Error('useIntegration must be used within an IntegrationProvider');
    }
    return context;
};