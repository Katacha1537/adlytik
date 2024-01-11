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
export default function ModalTask({ isOpen, onOpenChange, users, newTask, handleAddTask, updateTaskField }) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Adicionar Nova Tarefa</ModalHeader>
                        <ModalBody>
                            <Input
                                type="text"
                                label="Nome da Tarefa:"
                                labelPlacement="outside"
                                placeholder="Nome da Tarefa"
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
                                placeholder="Descrição tarefa"
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
                                value={newTask.responsibleId}
                                onChange={(e) => updateTaskField('responsibleId', e.target.value)}
                            >
                                {(user) => (
                                    <SelectItem key={user.id} textValue={user.name}>
                                        <div className="flex gap-2 items-center">
                                            <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} />
                                            <div className="flex flex-col">
                                                <span className="text-small">{user.name}</span>
                                                <span className="text-tiny text-default-400">{user.email}</span>
                                            </div>
                                        </div>
                                    </SelectItem>
                                )}
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Fechar
                            </Button>
                            <Button color="secondary" radius="sm" onPress={handleAddTask}>
                                Criar Tarefa
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
