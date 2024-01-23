import { useContext } from "react";
import { ProjectIdContext } from "../context/ProjectIdContext";

export const useProjectId = () => {
    const context = useContext(ProjectIdContext);
    if (!context) {
        throw new Error('useProjectId must be used within a ProjectIdProvider');
    }
    return context;
}