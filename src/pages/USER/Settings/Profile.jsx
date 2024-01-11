import React from 'react';
import { Divider, Input, Textarea, Button } from '@nextui-org/react';

export default function Profile() {
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
