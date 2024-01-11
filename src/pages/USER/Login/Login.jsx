import React from 'react';
import { Input, Image, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        // Implemente a lógica de envio do formulário aqui
        navigate('/')
    };

    return (
        <div className="flex w-full h-screen bg-foreground-50"> {/* Fundo claro */}
            <div className="w-2/3 flex justify-center items-center">
                <Image
                    width={600}
                    alt="NextUI hero Image"
                    src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                />
            </div>

            <div className="flex w-1/3 flex text-gray-800 bg-default-200 rounded-xl mt-16 mb-16 ml-0 mr-24 "> {/* Cores mais escuras para o texto e fundo mais claro */}
                <form
                    onSubmit={handleSubmit}
                    className="m-auto p-8 w-full max-w-md rounded-lg"
                >
                    <h1 className="text-4xl font-bold text-purple-500 mb-6">Ad.Lytic</h1>
                    <h1 className="text-4xl font-bold mb-6">Bem Vindo de Volta!</h1>
                    <p className="text-foreground mb-6">Acesse agora e vamos analizar.</p>

                    <div className="mb-4">
                        <Input
                            color="secondary"
                            type="email"
                            label="Email"
                            variant="underlined"
                            className="text-gray-800"
                        />
                    </div>

                    <div className="mb-12">
                        <Input
                            color="secondary"
                            variant="underlined"
                            type="password"
                            label="Senha"
                            className="text-gray-800"
                        />
                    </div>

                    <Button
                        type="submit"
                        shadow
                        color="primary"
                        size="lg"
                        className="w-full"
                    >
                        Entrar
                    </Button>

                    <div className="text-center mt-4">
                        <a href="#" className="text-purple-600 hover:text-purple-500">Esqueci senha</a> {/* Cores ajustadas para melhor visibilidade */}
                    </div>
                </form>
            </div>
        </div>
    );
}
