import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoIntegrations() {
    const navigate = useNavigate();

    const handleNavigateToIntegrations = () => {
        navigate('/integrations');
    };

    return (
        <div className="flex flex-col w-full items-center justify-center h-screen bg-foreground-50">
            <h1 className="text-2xl font-bold mb-3">Não há integração com o Facebook</h1>
            <p className="text-center mb-5 max-w-md">
                Para poder criar dashboards, é necessário integrar uma conta do Facebook.
                Conecte sua conta para começar a usar todas as funcionalidades.
            </p>
            <button
                onClick={handleNavigateToIntegrations}
                className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors"
            >
                Configurar Integrações
            </button>
        </div>
    );
}
