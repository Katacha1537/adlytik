import React from 'react';
import { useLocation } from 'react-router-dom';
import { MdNotificationsNone } from 'react-icons/md';
import { ThemeSwitcher } from './ThemeSwitcher';
import AvatarDropDown from './AvatarDropDown';

export default function Header() {
    const location = useLocation();
    const getTitle = (path) => {
        switch (path) {
            case '/':
                return 'Dashboard';
            case '/projects':
                return 'Projetos';
            case '/usersteam':
                return 'Equipe de Usuários';
            case '/integrations':
                return 'Integrações';
            case '/settings':
                return 'Configurações';
            default:
                return 'Página';
        }
    };

    return (
        <div className="flex fixed top-0 left-[16%] w-[84%] z-20 justify-between items-center px-4 pr-6 py-4 bg-background border-b-1 border-content3">
            <h1 className="text-2xl font-bold">{getTitle(location.pathname)}</h1>
            <div className="flex items-center gap-3">
                <MdNotificationsNone size={28} className="cursor-pointer" />
                <ThemeSwitcher />
                <AvatarDropDown />
            </div>
        </div>
    );
}
