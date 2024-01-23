import React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Textarea,
    ModalFooter,
    Input,
    Button,
    Select,
    SelectItem
} from '@nextui-org/react';
import { useUserDocument } from '../../../hooks/useUserDocument';
import useGetAdAccounts from '../../../hooks/useGetAdAccounts ';

export default function ModalProjectCreate({ isOpen, onOpenChange, newProject, handleAddProject, updateProjectField }) {
    const { userDocument } = useUserDocument()

    const { adAccounts } = useGetAdAccounts(userDocument.facebookToken)

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Adicionar Novo Projeto</ModalHeader>
                        <ModalBody>
                            <Input
                                type="text"
                                label="Nome do Projeto:"
                                labelPlacement="outside"
                                placeholder="Nome do Projeto"
                                radius="sm"
                                size="md"
                                classNames={{
                                    label: ['font-semibold'],
                                }}
                                value={newProject.nameProject}
                                onChange={(e) => updateProjectField('nameProject', e.target.value)}
                            />
                            <Textarea
                                label="Descrição do Projeto:"
                                labelPlacement="outside"
                                placeholder="Descrição do Projeto"
                                radius="sm"
                                size="md"
                                classNames={{
                                    label: ['font-semibold'],
                                }}
                                value={newProject.descriptionProject}
                                onChange={(e) => updateProjectField('descriptionProject', e.target.value)}
                            />
                            <Select
                                radius="sm"
                                label="Conta de Anúncio"
                                value={newProject.adAccount}
                                onChange={(e) => updateProjectField('adAccount', e.target.value)}
                            >
                                {adAccounts.map((account) => (
                                    <SelectItem
                                        className="text-white"
                                        key={account.id}
                                        value={account.id}
                                    >
                                        {account.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Fechar
                            </Button>
                            <Button color="secondary" radius="sm" onPress={handleAddProject}>
                                Criar Projeto
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
