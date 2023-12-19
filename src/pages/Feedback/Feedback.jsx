import React, { useState } from 'react';
import { Textarea, Button } from '@nextui-org/react';

export default function Feedback() {
    const [suggestion, setSuggestion] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Sugestão enviada: ${suggestion}`);
        setSuggestion('');
    };

    return (
        <div className="flex flex-col w-full items-center justify-center h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">
                Seu Feedback é Importante
            </h2>
            <p className="text-md text-center mb-6 max-w-md">
                Sua opinião é essencial para melhorarmos nosso sistema.
            </p>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <Textarea
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    placeholder="Deixe aqui seu comentário ou sugestão..."
                    className="mb-4"
                />
                <Button type="submit" color="secondary" className='w-full'>
                    Enviar Feedback
                </Button>
            </form>
        </div>
    );
}
