import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Chip, Avatar
} from "@nextui-org/react"

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

export default function ModalView({ isOpen, onOpenChange, viewTask }) {
    return (
        <Modal
            isOpen={isOpen}
            placement="center"
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-2xl">{viewTask[0].nameTask}</ModalHeader>
                        <ModalBody>
                            <p className="font-bold">
                                Descrição:
                            </p>
                            <p>
                                {viewTask[0].descriptionTask}
                            </p>
                            <p className="font-bold">
                                responsável:
                            </p>
                            <p className="flex gap-3 items-center">
                                <Avatar
                                    src={viewTask[0].avatar}
                                    color="primary"
                                    size="sm"
                                />
                                {viewTask[0].responsible}
                            </p>
                            <div className="flex justify-between pr-10">
                                <div>
                                    <p className="font-bold mb-2">
                                        Prioridade:
                                    </p>
                                    <p>
                                        <Chip color={statusColorMap[viewTask[0].status] || "default"} size="sm" variant="flat">
                                            {viewTask[0].status}
                                        </Chip>
                                    </p>
                                </div>

                                <div>
                                    <p className="font-bold mb-2">
                                        Status:
                                    </p>
                                    <p>
                                        <Chip color={priorityColorMap[viewTask[0].priority] || "default"} size="sm" variant="flat">
                                            {viewTask[0].priority}
                                        </Chip>
                                    </p>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Fechar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
