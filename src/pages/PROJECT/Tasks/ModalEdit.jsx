import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Textarea,
    Select,
    SelectItem,
    ModalFooter,
    Input, Button, Avatar
} from "@nextui-org/react"
import { useEffect, useState } from "react";
import { useFirestore } from "../../../hooks/useFirestore";
import { useParams } from 'react-router-dom'

export default function ModalEdit({ isOpen, onOpenChange, users, newTask, tasks, updateTaskField, viewTask, setNewTask }) {
    const [isDataReady, setIsDataReady] = useState(false)
    const { id: projectId } = useParams()
    const { updateSubDocument } = useFirestore("projects")
    // Atualiza o estado newTask com as informações da tarefa existente no modo de edição
    useEffect(() => {
        console.log(users)
        if (viewTask && viewTask[0]) {
            setNewTask(prevNewTask => ({
                ...prevNewTask,
                id: viewTask[0].id || '',
                nameTask: viewTask[0].nameTask || '',
                descriptionTask: viewTask[0].descriptionTask || '',
                status: viewTask[0].status || '',
                priority: viewTask[0].priority || '',
                responsible: viewTask[0].responsible || '',
                responsibleId: viewTask[0].responsibleId || '',
                avatar: viewTask[0].avatar || '',
            }));
            setIsDataReady(true); // Marcamos os dados como prontos
        }
    }, [viewTask, tasks]);

    // Efeito colateral para limpar newTask quando o modal for fechado
    useEffect(() => {
        return () => {
            setNewTask({
                id: '',
                nameTask: '',
                descriptionTask: '',
                status: '',
                priority: '',
                responsible: '',
                avatar: '',
            });
            setIsDataReady(false); // Resetar isDataReady ao fechar o modal
        };
    }, [isOpen]);

    const handleEditTask = async (onClose) => {

        await updateSubDocument(projectId, "tasks", newTask.id, newTask)

        setNewTask(prevNewTask => ({
            ...prevNewTask,
            id: '',
            nameTask: '',
            descriptionTask: '',
            status: '',
            priority: '',
            responsible: '',
            responsibleId: '',
            avatar: '',
        }))

        setIsDataReady(false)
        onClose()
    }


    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Editar Tarefa
                        </ModalHeader>
                        <ModalBody>
                            {isDataReady && (
                                // Renderizar os campos do formulário somente quando os dados estiverem prontos
                                <>
                                    <Input
                                        type="text"
                                        label="Nome da Tarefa:"
                                        labelPlacement="outside"
                                        radius="sm"
                                        size="md"
                                        classNames={{
                                            label: [
                                                "font-semibold"
                                            ]
                                        }}
                                        value={newTask.nameTask}
                                        onChange={(e) => updateTaskField('nameTask', e.target.value)}
                                    />
                                    <Textarea
                                        type="text"
                                        label="Descrição tarefa:"
                                        labelPlacement="outside"
                                        radius="sm"
                                        size="md"
                                        classNames={{
                                            label: [
                                                "font-semibold"
                                            ]
                                        }}
                                        value={newTask.descriptionTask}
                                        onChange={(e) => updateTaskField('descriptionTask', e.target.value)}
                                    />
                                    <div className="flex gap-4">
                                        <Select
                                            radius="sm"
                                            label="Status da tarefa"
                                            placeholder="status"
                                            value={newTask.status}
                                            defaultSelectedKeys={[`${newTask.status}`]}
                                            onChange={(e) => updateTaskField('status', e.target.value)}
                                            className="max-w-[50%]"
                                        >
                                            <SelectItem className="bg-yellow-500 text-white" key="Pendente" value="Pendente">
                                                Pendente
                                            </SelectItem>
                                            <SelectItem className="bg-blue-500 text-white" key="Em andamento" value="Em andamento">
                                                Em andamento
                                            </SelectItem>
                                            <SelectItem className="bg-green-500 text-white" key="Finalizado" value="Finalizado">
                                                Finalizado
                                            </SelectItem>
                                        </Select>
                                        <Select
                                            radius="sm"
                                            label="Prioridade da tarefa"
                                            placeholder="Prioridade"
                                            className="max-w-[50%]"
                                            value={newTask.priority}
                                            defaultSelectedKeys={[`${newTask.priority}`]}
                                            onChange={(e) => updateTaskField('priority', e.target.value)}
                                        >
                                            <SelectItem className="bg-green-500 text-white" key="Baixa" value="Baixa">
                                                Baixa
                                            </SelectItem>
                                            <SelectItem className="bg-yellow-500 text-white" key="Média" value="Média">
                                                Média
                                            </SelectItem>
                                            <SelectItem className="bg-red-500 text-white" key="Alta" value="Alta">
                                                Alta
                                            </SelectItem>
                                        </Select>
                                    </div>
                                    <Select
                                        items={users}
                                        label="Responsável:"
                                        placeholder="selecione o responsável"
                                        labelPlacement="outside"
                                        classNames={{
                                            trigger: "h-12",
                                        }}
                                        defaultSelectedKeys={[`${newTask.responsibleId}`]}
                                        value={newTask.responsibleId}
                                        onChange={(e) => updateTaskField('responsibleId', e.target.value)}
                                    >
                                        {(user) => (
                                            <SelectItem key={user.idMember} textValue={user.name}>
                                                <div className="flex gap-2 items-center">
                                                    <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.urlPhoto} />
                                                    <div className="flex flex-col">
                                                        <span className="text-small">{user.name}</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        )}
                                    </Select>

                                </>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Fechar
                            </Button>
                            <Button color="secondary" radius="sm" onPress={() => { handleEditTask(onClose) }}>
                                Salvar Edições
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
