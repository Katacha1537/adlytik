import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Textarea,
    Select,
    SelectItem,
    ModalFooter,
    Input,
    Button,
    Avatar,
} from "@nextui-org/react";

export default function ModalGoal({ isOpen, onOpenChange, newGoal, handleAddGoal, updateGoalField }) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Adicionar Nova Meta</ModalHeader>
                        <ModalBody>
                            <Input
                                type="text"
                                label="Nome da Meta:"
                                labelPlacement="outside"
                                placeholder="Nome da Meta"
                                radius="sm"
                                size="md"
                                classNames={{
                                    label: ["font-semibold"],
                                }}
                                value={newGoal.nameGoal}
                                onChange={(e) => updateGoalField('nameGoal', e.target.value)}
                            />
                            <div className="flex gap-4">
                                <Select
                                    radius="sm"
                                    label="Periodo"
                                    value={newGoal.status}
                                    onChange={(e) => updateGoalField('status', e.target.value)}
                                    className="max-w-[50%]"
                                >
                                    <SelectItem className="text-white" key="Mensal" value="Mensal">
                                        Mensal
                                    </SelectItem>
                                    <SelectItem className=" text-white" key="Diario" value="Diario">
                                        Diario
                                    </SelectItem>
                                </Select>
                                <Input
                                    type="text"
                                    placeholder="Meta"
                                    radius="sm"
                                    size="md"
                                    classNames={{
                                        label: ["font-semibold"],
                                    }}
                                    value={newGoal.goal}
                                    onChange={(e) => updateGoalField('goal', e.target.value)}
                                />
                            </div>
                            <Select
                                radius="sm"
                                label="Métrica da Meta:"
                                value={newGoal.metric}
                                onChange={(e) => updateGoalField('metric', e.target.value)}
                            >
                                <SelectItem className="text-white" key="clicks" value="30">
                                    Cliques
                                </SelectItem>
                                <SelectItem className="text-white" key="impressions" value="1000">
                                    Impressões
                                </SelectItem>
                                <SelectItem className="text-white" key="conversions" value="100">
                                    Conversões
                                </SelectItem>
                                <SelectItem className="text-white" key="ctr" value="10">
                                    Taxa de Cliques (CTR)
                                </SelectItem>
                                <SelectItem className="text-white" key="cpc" value="20">
                                    Custo por Clique (CPC)
                                </SelectItem>
                                <SelectItem className="text-white" key="cpm" value="30">
                                    Custo por Mil Impressões (CPM)
                                </SelectItem>
                                <SelectItem className="text-white" key="reach" value="03">
                                    Alcance
                                </SelectItem>
                                <SelectItem className="text-white" key="video_views" value="02">
                                    Visualizações de Vídeo
                                </SelectItem>
                                <SelectItem className="text-white" key="engagement" value="65">
                                    Envolvimento
                                </SelectItem>
                                <SelectItem className="text-white" key="leads" value="30">
                                    Leads
                                </SelectItem>
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Fechar
                            </Button>
                            <Button color="secondary" radius="sm" onPress={handleAddGoal}>
                                Criar Meta
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
