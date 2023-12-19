import React from 'react';
import { Divider, Input, Textarea, Button } from '@nextui-org/react';

export default function Config() {
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
                    value="Katacha"
                    radius="sm"
                    size="md"
                    classNames={{
                        label: [
                            "font-semibold"
                        ],
                        inputWrapper: [
                            "mb-2"
                        ]
                    }}
                />
                <p className='text-sm text-foreground-400'>URL do seu painel: http://dashboard.com/clayton</p>
                <Input
                    type="email"
                    label="E-mail:"
                    labelPlacement="outside"
                    value="lucasgabrieljaci20@gmail.com"
                    radius="sm"
                    size="md"
                    classNames={{
                        label: [
                            "font-semibold"
                        ],
                        inputWrapper: [
                            "mb-7 mt-6"
                        ]
                    }}
                />
                    <Button color='secondary'>
                        Salvar mudanças
                    </Button>
            </div>
        </div>
    );
}
