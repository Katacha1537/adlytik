import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdNotificationsNone, MdMenu } from 'react-icons/md';
import { ThemeSwitcher } from './ThemeSwitcher';
import AvatarDropDown from './USER/AvatarDropDown';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useRerenderUpdate } from '../hooks/useRerenderUpdate';

export default function Header() {

    const { rerender } = useRerenderUpdate()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    const navigate = useNavigate();
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
            case '/feedback':
                return 'FeedBack';
            case '/help':
                return 'Ajuda';
            default:
                return 'Página';
        }
    }

    const handlePages = (hr) => {
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
            navigate(hr); // Navega após a animação
        }, 150);
    }

    const menuItems = [
        { key: '/', label: 'Dashboard' },
        { key: '/projects', label: 'Projetos' },
        { key: '/integrations', label: 'Integrações' },
        { key: '/settings', label: 'Configurações' },
        { key: '/feedback', label: 'FeedBack' },
        { key: '/help', label: 'Ajuda' },
    ]

    return (
        <div className="flex fixed top-0 lg:left-[16%] lg:w-[84%] w-full z-20 justify-between items-center px-4 pr-6 py-4 bg-background/70 backdrop-blur-sm border-b-1 border-content3">
            <div className='flex gap-3'>
                <Dropdown >
                    {rerender && <div className='hidden'></div>}
                    <DropdownTrigger className="lg:hidden">
                        <Button className='bg-transparent'>
                            <MdMenu size={28} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions">
                        {menuItems.map((item) => (
                            <DropdownItem key={item.key}>
                                <div onClick={() =>
                                    handlePages(item.key)}
                                >
                                    {item.label}
                                </div>
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <h1 className="text-2xl font-bold">{getTitle(location.pathname)}</h1>
            </div>

            <div className="flex items-center gap-3">


                {/* Ícones para telas maiores */}
                <MdNotificationsNone size={28} className="cursor-pointer hidden lg:block" />
                <ThemeSwitcher />
                <AvatarDropDown />
                {rerender && <></>}
            </div>
        </div>
    );
}
