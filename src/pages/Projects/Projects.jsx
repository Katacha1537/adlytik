
import {
    Button
} from "@nextui-org/react";
import { GoPlusCircle } from "react-icons/go";
import ProjectsCard from "./ProjectsCard";


const projectTotal = [
    {
        id: '1',
        nameProject: 'Dr. Fernando',
        decriptionProject: 'Começando a fazer anúncios agora e testando como funciona bla bla bla',
        tasksFinish: '12',
        tasksTotal: '25',
        membersProject: [
            {
                name: 'Lucas Katacha',
                urlPhoto: 'https://pbs.twimg.com/profile_images/1409730538236170241/h47IxksM_400x400.jpg'
            }
        ]
    },
    {
        id: '2',
        nameProject: 'Projeto Solaris',
        decriptionProject: 'Projeto focado em energia renovável e sustentabilidade.',
        tasksFinish: '20',
        tasksTotal: '30',
        membersProject: [
            {
                name: 'Mariana Silva',
                urlPhoto: 'https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg'
            },
            {
                name: 'Rafael Costa',
                urlPhoto: 'https://static.generated.photos/vue-static/face-generator/landing/demo-previews/sex.jpg'
            }
        ]
    },
    {
        id: '3',
        nameProject: 'Tech Revolution',
        decriptionProject: 'Desenvolvimento de novas tecnologias para educação digital.',
        tasksFinish: '15',
        tasksTotal: '20',
        membersProject: [
            {
                name: 'Carlos Pereira',
                urlPhoto: 'https://static.generated.photos/vue-static/face-generator/landing/demo-previews/sex.jpg'
            }
        ]
    },
    {
        id: '4',
        nameProject: 'Health Bridge',
        decriptionProject: 'Plataforma de telemedicina conectando pacientes e médicos.',
        tasksFinish: '18',
        tasksTotal: '25',
        membersProject: [
            {
                name: 'Juliana Martins',
                urlPhoto: 'https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg'
            },
            {
                name: 'Pedro Alvarez',
                urlPhoto: 'https://static.generated.photos/vue-static/face-generator/landing/demo-previews/sex.jpg'
            }
        ]
    }
]

export default function Projects() {
    return (
        <div className='w-full p-6'>
            <div className='mt-20 flex items-center justify-between w-full'>
                <h2 className='font-bold text-xl'>Lista de Projetos</h2>
                <Button color="secondary" startContent={<GoPlusCircle />}>
                    Novo Projeto
                </Button>
            </div>
            <div className="w-full mt-8 flex flex-wrap gap-4">
                {
                    projectTotal.map((project, index) => (
                        <ProjectsCard
                            key={index}
                            idProject={index}
                            nameProject={project.nameProject}
                            descriptionProject={project.decriptionProject}
                            tasksProject={`${project.tasksFinish}/${project.tasksTotal}`}
                            membersProject={project.membersProject}
                        />
                    ))
                }
            </div>
        </div>
    )
}
