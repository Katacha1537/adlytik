import { useState } from 'react';
import { Input, Button, Spinner } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../../hooks/useLogin';

const Login = () => {
    const { login, isPending, error } = useLogin()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        login(email, password)
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-400 to-purple-800">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-4xl font-bold text-purple-600 mb-6">Ad.Lytic</h1>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Bem Vindo de Volta!</h2>
                <p className="text-gray-600 mb-8">Acesse agora e vamos analisar.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        color="primary"
                        type="email"
                        label="Email"
                        variant="filled"
                        className="text-gray-800"
                        fullWidth
                        autoComplete="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />

                    <Input
                        color="primary"
                        variant="filled"
                        type="password"
                        label="Senha"
                        className="text-gray-800"
                        fullWidth
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />

                    <Button
                        type="submit"
                        color="secondary"
                        size="lg"
                        shadow
                        fullWidth
                    >
                        {isPending ? <Spinner color="default" size="lg" /> : "Entrar na conta"}
                    </Button>
                    {error && <p>{error}</p>}
                </form>

                <div className="text-center mt-4">
                    <a href="#" className="text-purple-500 hover:underline">Esqueci a senha!</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
