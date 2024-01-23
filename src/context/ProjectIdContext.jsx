import { createContext } from 'react';

export const ProjectIdContext = createContext();

export const ProjectIdProvider = ({ projectId, children }) => (
    <ProjectIdContext.Provider value={projectId}>
        {children}
    </ProjectIdContext.Provider>
);
