import React from 'react'

export default function Help() {
    return (
        <div className="flex flex-col w-full items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-3">Precisa de Ajuda?</h1>
            <p className="text-center mb-5 max-w-md">
                Se você tiver dúvidas ou dificuldades com nosso sistema, entre em contato pelo WhatsApp para um suporte rápido e personalizado.
            </p>
            <a
                href="https://wa.me/+5566996188393" // Substitua SEUNUMERODEWHATSAPP pelo número do WhatsApp
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors"
            >
                Contate-nos no WhatsApp
            </a>
        </div>

    )
}
