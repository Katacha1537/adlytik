import React, { useState } from 'react';
import { Divider, Input, Textarea, Button } from '@nextui-org/react';
import { useUserDocument } from '../../../hooks/useUserDocument';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useFirestore } from '../../../hooks/useFirestore';

export default function Config() {
    const { user } = useAuthContext()
    const { userDocument } = useUserDocument()
    const { updateDocument } = useFirestore("users")

    const [formData, setFormData] = useState({
        name: userDocument?.userName || '',
        email: userDocument?.email || ''
    })

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    }

    const handleUpdateConfig = async () => {
        try {
            const result = await updateDocument(user.uid, {
                userName: formData.name
            })
            return
        } catch (error) {
            console.error("Erro ao salvar mudanças configurações:", error.message)
        }
    }

    return (
        <div className='bg-content1 shadow-md rounded-lg mb-5 border-1 border-content3 w-full '>
            <div className='p-4'>
                <h3 className='text-lg font-semibold'>Configurações de Conta</h3>
                <p className='text-sm text-foreground-500'>Atualize seu nome de usuário e gerencie sua conta</p>
            </div>
            <Divider />
            <div className='p-4 '>
                <Input
                    type="text"
                    label="Nome de usuário:"
                    labelPlacement="outside"
                    radius="sm"
                    size="md"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    classNames={{
                        label: [
                            "font-semibold"
                        ],
                        inputWrapper: [
                            "mb-2"
                        ]
                    }}
                />
                <p className='text-sm text-foreground-400'>URL do seu painel: http://dashboard.com/{formData.name}</p>
                <Input
                    type="email"
                    label="E-mail:"
                    labelPlacement="outside"
                    radius="sm"
                    size="md"
                    isDisabled
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    classNames={{
                        label: [
                            "font-semibold"
                        ],
                        inputWrapper: [
                            "mb-7 mt-6"
                        ]
                    }}
                />
                <Button onClick={handleUpdateConfig} color='secondary'>
                    Salvar mudanças
                </Button>
            </div>
        </div>
    );
}
