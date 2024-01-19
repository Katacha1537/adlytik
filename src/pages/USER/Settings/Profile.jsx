import React, { useState } from 'react';
import { Divider, Input, Textarea, Button } from '@nextui-org/react';
import { useUserDocument } from '../../../hooks/useUserDocument';

export default function Profile() {
    const { userDocument } = useUserDocument()

    const [formData, setFormData] = useState({
        name: userDocument?.userName || '',
        phone: userDocument?.phone || '',
        companyName: userDocument?.companyName || '',
        companyWebsite: userDocument?.companyWebsite || '',
        aboutMe: userDocument?.aboutMe || '',
        roleInCompany: userDocument?.roleInCompany || '',
    })

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    }

    const handleUpdateProfile = () => {
        // Lógica para atualizar o perfil no Firebase ou no seu backend
        // Utilize o formData para enviar os dados atualizados
        // ...

        // Exemplo de console.log para visualizar os dados
        console.log('Dados atualizados:', formData);
    }

    return (
        <div className='bg-content1 shadow-md rounded-lg mb-5 border-1 border-content3 w-full '>
            <div className='p-4'>
                <h3 className='text-lg font-semibold'>Editar Perfil</h3>
                <p className='text-sm text-foreground-500'>Configure suas informações pessoais</p>
            </div>
            <Divider />
            <div className='p-4 space-y-12'>
                <Input
                    type="text"
                    label="Nome:"
                    labelPlacement="outside"
                    placeholder="Digite seu nome"
                    radius="sm"
                    size="md"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    classNames={{
                        label: [
                            "font-semibold"
                        ]
                    }}
                />
                <Input
                    type="tel"
                    label="Telefone:"
                    labelPlacement="outside"
                    placeholder="Digite seu telefone"
                    radius="sm"
                    size="md"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    classNames={{
                        label: [
                            "font-semibold"
                        ]
                    }}
                />
                <Input
                    type="text"
                    label="Nome da empresa:"
                    labelPlacement="outside"
                    placeholder="Digite o nome da sua empresa"
                    radius="sm"
                    size="md"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    classNames={{
                        label: [
                            "font-semibold"
                        ]
                    }}
                />
                <Input
                    type="url"
                    label="Site da empresa:"
                    labelPlacement="outside"
                    placeholder="Digite o site da sua empresa"
                    radius="sm"
                    size="md"
                    value={formData.companyWebsite}
                    onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                    classNames={{
                        label: [
                            "font-semibold"
                        ]
                    }}
                />
                <Textarea
                    label="Sobre Você e a empresa:"
                    labelPlacement="outside"
                    placeholder="Descreva sobre você e a empresa"
                    radius='sm'
                    value={formData.aboutMe}
                    onChange={(e) => handleInputChange('aboutMe', e.target.value)}
                    classNames={{
                        label: "font-semibold"
                    }}
                />
                <Input
                    type="text"
                    label="Função na empresa:"
                    labelPlacement="outside"
                    placeholder="Digite sua função na empresa"
                    radius="sm"
                    size="md"
                    value={formData.roleInCompany}
                    onChange={(e) => handleInputChange('roleInCompany', e.target.value)}
                    classNames={{
                        label: [
                            "font-semibold"
                        ]
                    }}
                />
                <Button color='secondary'>
                    Atualizar Perfil
                </Button>
            </div>
        </div>
    );
}
