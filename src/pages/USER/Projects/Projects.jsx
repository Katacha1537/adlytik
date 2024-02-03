
import {
    Button, useDisclosure
} from "@nextui-org/react";
import { GoPlusCircle } from "react-icons/go";
import ProjectsCard from "./ProjectsCard";
import ModalProjectCreate from "./ModalProjectCreate";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useUserDocument } from "../../../hooks/useUserDocument";
import { useFirestore } from "../../../hooks/useFirestore";
import { useOwnedProjects } from "../../../hooks/useOwnedProjects";

const initialNewProject = {
    nameProject: '',
    descriptionProject: '',
    adAccount: "",
    membersProject: [],
}

export default function Projects() {
    const { user } = useAuthContext()
    const { userDocument } = useUserDocument()
    const { addDocument } = useFirestore('projects')

    const { ownedProjects, error } = useOwnedProjects()


    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [newProject, setNewProject] = useState(initialNewProject)
    const [projects, setProjects] = useState([])
    console.log(projects)
    useEffect(() => {
        setProjects(ownedProjects)
    }, [ownedProjects])


    const handleAddProject = async () => {
        if (newProject.nameProject && newProject.descriptionProject && newProject.adAccount) {
            // Cria um novo objeto de projeto antes de atualizar o estado ou adicioná-lo ao Firestore
            const newProjectData = {
                ...newProject,
                tasksFinish: "0",
                tasksTotal: "0",
                membersProject: [
                    {
                        idMember: user.uid,
                        name: userDocument.nameComplete,
                        urlPhoto: user.photoURL,
                        ownerProject: true
                    },
                ],
            }

            // Atualiza o estado das tarefas para valores padrão
            console.log(newProjectData)
            // Adiciona o novo projeto ao Firestore
            await addDocument(newProjectData);

            setProjects((prevProjects) => [...prevProjects, newProjectData]);

            setNewProject(initialNewProject);
            // Adiciona o novo projeto à lista de projetos

            // Fecha o modal
            onOpenChange(false);
        } else {
            alert("Preencha todos os campos obrigatórios!");
        }
    };





    const updateProjectField = (field, value) => {
        setNewProject((prevProject) => ({
            ...prevProject,
            [field]: value,
        }));
    }

    return (
        <div className='w-full p-6'>
            {projects && <></>}
            <div className='mt-20 flex items-center justify-between w-full'>
                <h2 className='font-bold text-xl' onClick={() => { console.log(ownedProjects, error) }}>Lista de Projetos</h2>
                <Button onClick={onOpen} color="secondary" startContent={<GoPlusCircle />}>
                    Novo Projeto
                </Button>
            </div>
            <div className="w-full mt-8 flex flex-wrap gap-4">
                {
                    projects.map((project) => (
                        <ProjectsCard
                            key={project.id}
                            idProject={project.id}
                            nameProject={project.nameProject}
                            descriptionProject={project.descriptionProject}
                            tasksProject={`${project.tasksFinish || "0"}/${project.tasksTotal || "0"}`}
                            membersProject={project.membersProject}
                        />
                    ))
                }
            </div>
            <ModalProjectCreate
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                newProject={newProject}
                handleAddProject={handleAddProject}
                updateProjectField={updateProjectField}
            />
        </div>
    )
}
