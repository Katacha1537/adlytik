import React, { useState } from 'react';
import { Divider, Input, Button } from '@nextui-org/react';
import useChangePassword from '../../../hooks/useChangePassword';

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const { changePassword, error, isLoading } = useChangePassword();

    const handleSubmit = async (e) => {
        e.preventDefault()

        await changePassword(oldPassword, newPassword);

        setOldPassword('');
        setNewPassword('');
    };

    return (
        <div className='bg-content1 shadow-md rounded-lg mb-5 border-1 border-content3 w-full '>
            <div className='p-4'>
                <h3 className='text-lg font-semibold'>Configurações de senha</h3>
                <p className='text-sm text-foreground-500'>Altere ou redefina a senha da sua conta</p>
            </div>
            <Divider />
            <div className='p-4 pt-3'>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="password"
                        label="Senha Antiga:"
                        labelPlacement="outside"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
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
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        radius="sm"
                        size="md"
                        classNames={{
                            label: [
                                "font-semibold"
                            ],
                            inputWrapper: [
                                "mb-7 mt-4"
                            ]
                        }}
                    />
                    <Button type="submit" className='' color='secondary' loading={isLoading}>
                        Alterar a senha
                    </Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
}
