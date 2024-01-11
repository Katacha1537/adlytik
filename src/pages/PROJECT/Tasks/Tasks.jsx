import {
    useDisclosure,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Card,
    CardHeader,
    Avatar,
    Button,
    Tooltip,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Textarea,
    Select,
    SelectItem,
    ModalFooter,
    Input
} from "@nextui-org/react";
import { useState } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { v4 as uuidv4 } from 'uuid'
import ModalTask from "./ModalTask";
import ModalView from "./ModalView";
import ModalEdit from "./ModalEdit";

const columns = [
    { name: "Nome da Tarefa", uid: "nameTask" },
    { name: "Status", uid: "status" },
    { name: "Prioridade", uid: "priority" },
    { name: "Responsável", uid: "responsible" },
    { name: "Ações", uid: "actions" }
]

const statusColorMap = {
    "Em andamento": "primary", // Azul para "Em andamento"
    "Pendente": "warning", // Amarelo para "Pendente"
    "Finalizado": "success" // Verde para "Finalizado"
};

const priorityColorMap = {
    "Baixa": "success", // Verde para "Baixa"
    "Média": "warning", // Amarelo para "Média"
    "Alta": "danger" // Vermelho para "Alta"
};

const users = [
    {
        id: "efca0d61-e64c",
        name: "Tony Reichert",
        role: "CEO",
        team: "Management",
        status: "active",
        age: "29",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
        email: "tony.reichert@example.com",
    },
    {
        id: "fa300597-9d00",
        name: "Zoey Lang",
        role: "Tech Lead",
        team: "Development",
        status: "paused",
        age: "25",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
        email: "zoey.lang@example.com",
    },
    {
        id: "8421fc3c-3e2f",
        name: "Jane Fisher",
        role: "Sr. Dev",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
        email: "jane.fisher@example.com",
    }
]

const renderCell = (task, columnKey, handleDeleteTask, handleViewTask, handleEditTask) => {
    const cellValue = task[columnKey];

    switch (columnKey) {
        case "nameTask":
            return <p>{cellValue}</p>;
        case "description":
            return <p>{cellValue}</p>;
        case "status":
            return (
                <Chip color={statusColorMap[cellValue] || "default"} size="sm" variant="flat">
                    {cellValue}
                </Chip>
            );
        case "priority":
            return (
                <Chip color={priorityColorMap[cellValue] || "default"} size="sm" variant="flat">
                    {cellValue}
                </Chip>
            );
        case "responsible":
            return <Avatar
                src={task.avatar}
                color="primary"
                size="sm"
            />;
        case "actions":
            return (
                <div className="flex items-center gap-2">
                    <Tooltip content="Detalhes">
                        <span className="cursor-pointer" onClick={() => handleViewTask(task.id)}>
                            <FaEye />
                        </span>
                    </Tooltip>
                    <Tooltip content="Editar">
                        <span className="cursor-pointer" onClick={() => handleEditTask(task.id)}>
                            <FaEdit />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Deletar">
                        <span className="cursor-pointer" onClick={() => handleDeleteTask(task.id)}>
                            <FaTrashAlt className="text-red-500" />
                        </span>
                    </Tooltip>
                </div>
            );
        default:
            return cellValue;
    }
};

export default function Tasks() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { isOpen: isOpenView, onOpen: onOpenView, onOpenChange: onOpenChangeView } = useDisclosure()
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit } = useDisclosure()
    const [newTask, setNewTask] = useState({ nameTask: '', descriptionTask: '', status: '', priority: '', responsible: "", responsibleId: "", avatar: '' })
    const [tasks, setTasks] = useState([
        {
            "id": "005d06ab-be24-452e-9f0f-670d29110a77",
            "nameTask": "teste123",
            "descriptionTask": "descriçao123",
            "status": "Pendente",
            "priority": "Média",
            "responsible": "Zoey Lang",
            "responsibleId": "fa300597-9d00",
            "avatar": "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png"
        },
        {
            "id": "005d06ab-be24-452e-9f0f-66632652622a5",
            "nameTask": "teste1",
            "descriptionTask": "descriçao1",
            "status": "Em andamento",
            "priority": "Média",
            "responsible": "Jane Fisher",
            "responsibleId": "8421fc3c-3e2f",
            "avatar": "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png"
        }
    ])
    const [viewTask, setViewTask] = useState([])

    const handleAddTask = () => {
        const newTaskObject = {
            id: uuidv4(), // Utilizando uuid para gerar um ID único
            ...newTask
        };
        setTasks([...tasks, newTaskObject]);
        setNewTask({ nameTask: '', descriptionTask: '', status: '', priority: '', responsible: "", responsibleId: "", avatar: '' });
        onOpenChange(false);
    }

    const handleDeleteTask = (taskId) => {
        console.log(tasks);

        // Use a função de callback no setState para garantir que você está trabalhando com o estado mais recente
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }

    const updateTaskField = (field, value) => {
        if (field === "responsibleId") {
            const selectedUser = users.find(user => user.id === value);

            console.log("Value:", value);
            console.log("Users:", users);
            console.log("Selected User:", selectedUser);

            if (selectedUser) {
                setNewTask({
                    ...newTask,
                    responsibleId: selectedUser.id,
                    responsible: selectedUser.responsible,
                    avatar: selectedUser.avatar
                });
            }
        } else {
            setNewTask({ ...newTask, [field]: value });
        }
    }


    const handleViewTask = (taskId) => {
        const viewTaskHere = tasks.filter(task => task.id === taskId)
        setViewTask(viewTaskHere)
        onOpenView()
    }

    const handleEditTask = (taskId) => {
        const viewTaskHere = tasks.filter(task => task.id === taskId)
        setViewTask(viewTaskHere)
        onOpenEdit()
    }

    return (
        <div className='p-4 mt-20'>
            <Card className='rounded-md bg-content1'>
                <CardHeader className='flex justify-between w-full p-4 items-center'>
                    <h2 className='font-bold text-lg'>Lista de Tarefas</h2>
                    <Button onPress={onOpen} color='secondary' startContent={<GoPlusCircle />}>Add Nova Tarefa</Button>
                </CardHeader>
                <Table aria-label="Tabela de tarefas com células customizadas" radius="none" shadow="none">
                    <TableHeader columns={columns}>
                        {column => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={tasks}>
                        {item => (
                            <TableRow key={item.id}>
                                {columnKey => <TableCell>{renderCell(item, columnKey, handleDeleteTask, handleViewTask, handleEditTask)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
            <ModalTask
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                users={users}
                newTask={newTask}
                handleAddTask={handleAddTask}
                updateTaskField={updateTaskField}
            />
            <ModalEdit
                isOpen={isOpenEdit}
                onOpenChange={onOpenChangeEdit}
                newTask={newTask}
                viewTask={viewTask}
                users={users}
                setTasks={setTasks}
                tasks={tasks}
                updateTaskField={updateTaskField}
                setNewTask={setNewTask}
            />
            <ModalView
                isOpen={isOpenView}
                onOpenChange={onOpenChangeView}
                viewTask={viewTask}
                users={users}
            />
        </div>
    );
}