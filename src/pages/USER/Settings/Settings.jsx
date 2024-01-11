import { useNavigate, useLocation } from 'react-router-dom';
import { GoPerson } from "react-icons/go";
import { useEffect, useState } from 'react';
import { RiSettings3Line } from "react-icons/ri";
import { IoKeyOutline } from "react-icons/io5";
import { CiCamera } from "react-icons/ci";

import { useTheme } from 'next-themes';
import {
    Divider,
    Badge,
    Avatar
} from '@nextui-org/react';
import Profile from './Profile';
import Config from './Config';
import ChangePassword from './ChangePassword';

const MenuItem = ({ icon, label, href }) => {
    const navigate = useNavigate();
    const location = useLocation()
    const [isClicked, setIsClicked] = useState(false)

    const { theme: isDark } = useTheme()

    const handlePages = (hr) => {
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
            navigate(hr); // Navega após a animação
        }, 150);
    };

    const isActive = location.pathname === href

    return (
        <div
            onClick={() =>
                handlePages(href)}
            className={`flex items-center gap-3 mb-2 p-2 text-sm text-foreground-500 rounded-md cursor-pointer transition transform  
            ${isActive ? isDark === 'dark' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-500 font-semibold' : isDark === 'dark' ? 'hover:bg-purple-500 hover:text-white' : 'hover:bg-purple-500 hover:text-white'}
            ${isClicked ? 'scale-95' : 'scale-100'}`}
        >
            {icon}
            <p>{label}</p>
        </div>
    );
}



export default function Settings() {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        // Redireciona se o pathname não corresponder a nenhuma opção válida
        if (location.pathname !== '/settings/profile' &&
            location.pathname !== '/settings/config' &&
            location.pathname !== '/settings/change-password') {
            navigate('/settings/profile');
        }
    }, [location.pathname, navigate])

    const renderSettingsContent = () => {
        switch (location.pathname) {
            case '/settings/profile':
                return <Profile />;
            case '/settings/config':
                return <Config />;
            case '/settings/change-password':
                return <ChangePassword />;
        }
    }
    return (
        <div className='w-full mt-20  p-4'>
            <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-full md:w-1/3 xl:w-1/4 max-h-[391px]'>
                    <div className='bg-content1 shadow-md rounded-lg mb-5 border-1 border-content3 w-full'>
                        <div className='p-4 pt-8 flex flex-col justify-center items-center'>
                            <Badge
                                isOneChar
                                content={<CiCamera />}
                                color="secondary"
                                placement="bottom-right"
                                className='scale-150 hover:bg-purple-500/80 hover:cursor-pointer'
                            >
                                <Avatar
                                    color="success"
                                    size='lg'
                                    src="https://i.pravatar.cc/300?u=a042581f4e290267072"
                                    className='scale-150'
                                />
                            </Badge>
                            <h2 className='mt-4 font-bold'>John Doe</h2>
                            <p>UI/UX Design</p>
                        </div>
                        <Divider />
                        <div className='p-4 pt-8 pb-6'>
                            <MenuItem href="/settings/profile" icon={<GoPerson size={20} />} label="Editar Perfil" />
                            <MenuItem href="/settings/config" icon={<RiSettings3Line size={20} />} label="Configuração" />
                            <MenuItem href="/settings/change-password" icon={<IoKeyOutline size={20} className='rotate-180' />} label="Mudar Senha" />
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-2/3 xl:w-3/4'>
                    {renderSettingsContent()}
                </div>
            </div>
        </div>
    )
}
