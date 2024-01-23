import React, { useState } from 'react';
import { Textarea, Button } from '@nextui-org/react';
import { useFirestore } from '../../../hooks/useFirestore';
import { useAuthContext } from '../../../hooks/useAuthContext';

export default function Feedback() {
    const { user } = useAuthContext()

    const [suggestion, setSuggestion] = useState('')

    const { addDocument } = useFirestore("feedbacks")

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!suggestion) {
            alert('Por favor, forneça um comentário ou sugestão.');
            return;
        }

        try {
            // Estrutura do dado a ser adicionado
            const feedbackData = {
                comment: suggestion,
                userId: user.uid, // Certifique-se de ter a variável 'user' disponível no escopo (por exemplo, usando useAuthContext)
            };

            // Adiciona o documento ao Firestore
            await addDocument(feedbackData);

            alert('Sugestão enviada com sucesso!');
            setSuggestion('');
        } catch (error) {
            console.error('Erro ao enviar a sugestão:', error.message);
            alert('Erro ao enviar a sugestão. Por favor, tente novamente mais tarde.');
        }
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
