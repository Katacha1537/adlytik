import React from 'react';
import { Divider, Input, Textarea, Button } from '@nextui-org/react';

export default function ChangePassword() {
    return (
        <div className='bg-content1 shadow-md rounded-lg mb-5 border-1 border-content3 w-full '>
            <div className='p-4'>
                <h3 className='text-lg font-semibold'>Configurações de senha</h3>
                <p className='text-sm text-foreground-500'>Altere ou redefina a senha da sua conta</p>
            </div>
            <Divider />
            <div className='p-4 pt-8'>
                <Input
                    type="password"
                    label="Senha Antiga:"
                    labelPlacement="outside"
                    value='   '
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
                <Input
                    type="password"
                    label="Nova Senha:"
                    labelPlacement="outside"
                    value='   '
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
                <Button className='' color='secondary'>
                    Alterar a senha
                </Button>
            </div>
        </div>
    );
}
