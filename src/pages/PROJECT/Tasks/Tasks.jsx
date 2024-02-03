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
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { v4 as uuidv4 } from 'uuid'
import ModalTask from "./ModalTask";
import ModalView from "./ModalView";
import ModalEdit from "./ModalEdit";
import { useParams } from 'react-router-dom'
import { useSubcollection } from "../../../hooks/useSubcollection";
import { useFirestore } from "../../../hooks/useFirestore";
import { useDocument } from "../../../hooks/useDocument";

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
}

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
                color="secondary"
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
    const [tasks, setTasks] = useState([])
    const [users, setUsers] = useState([])

    const [viewTask, setViewTask] = useState([])

    const { id: projectId } = useParams()

    const { documents: tasksDocument } = useSubcollection("projects", projectId, "tasks")
    const { addSubDocument, deleteSubDocument } = useFirestore("projects")
    const { document: projectDocument } = useDocument("projects", projectId)

    useEffect(() => {
        setTasks(tasksDocument || tasks)
        setUsers(projectDocument?.membersProject || users)
    }, [tasksDocument])


    const handleAddTask = async () => {

        console.log(newTask)

        const { payload } = await addSubDocument(projectId, "tasks", newTask)

        setNewTask({ nameTask: '', descriptionTask: '', status: '', priority: '', responsible: "", responsibleId: "", avatar: '' });

        onOpenChange(false)
    }

    const handleDeleteTask = async (taskId) => {
        await deleteSubDocument(projectId, "tasks", taskId)
    }

    const updateTaskField = (field, value) => {
        if (field === "responsibleId") {
            const selectedUser = users.find(user => user.idMember === value);

            console.log("Value:", value);
            console.log("Users:", users);
            console.log("Selected User:", selectedUser);

            if (selectedUser) {
                setNewTask({
                    ...newTask,
                    responsibleId: selectedUser.idMember,
                    responsible: selectedUser.name,
                    avatar: selectedUser.urlPhoto
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