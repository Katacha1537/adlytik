import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useOwnedProjects = () => {
    const { user } = useAuthContext();
    const [ownedProjects, setOwnedProjects] = useState([]);
    const [loading, setLoading] = useState(true); // Adiciona um estado de carregamento
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
                const projectsRef = collection(db, 'projects');
                const querySnapshot = await getDocs(projectsRef);

                // Verifica se há documentos na coleção
                if (querySnapshot.empty) {
                    setOwnedProjects([]); // Define como array vazio
                    setLoading(false); // Define carregamento como falso
                    return;
                }

                const allProjects = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

                // Filtra os projetos para incluir apenas aqueles em que o usuário é proprietário
                const userOwnedProjects = allProjects.filter((project) => {
                    const isOwner = project.membersProject.some(member => member.idMember === user.uid && member.ownerProject);
                    return isOwner;
                });

                setOwnedProjects(userOwnedProjects);
                setError(null);
                setLoading(false); // Define carregamento como falso
            } catch (err) {
                setError(err.message);
                console.error(err.message);
                setLoading(false); // Define carregamento como falso em caso de erro
            }
        };

        if (user) {
            fetchAllProjects();
        }

    }, [user]);

    return { ownedProjects, loading, error };
};
