import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdNotificationsNone, MdMenu } from 'react-icons/md';
import { ThemeSwitcher } from './ThemeSwitcher';
import AvatarDropDown from './USER/AvatarDropDown';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function HeaderProject() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const getTitle = (path) => {
        switch (path) {
            case '/project/id':
                return 'Visão Geral';
            case '/project/id/dashboard':
                return 'Dashboard';
            case '/project/id/tasks':
                return 'Tarefas';
            case '/project/id/goals':
                return 'Metas';
            case '/project/id/campaign':
                return 'Campanha';
            case '/project/id/report':
                return 'Relatório';
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
        { key: '/project/id', label: 'Visão Geral' },
        { key: '/project/id/dashboard', label: 'Dashboard' },
        { key: '/project/id/tasks', label: 'Tarefas' },
        { key: '/project/id/goals', label: 'Metas' },
        { key: '/project/id/campaign', label: 'Campanha' },
        { key: '/project/id/report', label: 'Relatório' },
    ]

    return (
        <div className="flex fixed top-0 lg:left-[16%] lg:w-[84%] w-full z-20 justify-between items-center px-4 pr-6 py-4 bg-background/70 backdrop-blur-sm border-b-1 border-content3">
            <div className='flex gap-3'>
                <Dropdown >
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
            </div>
        </div>
    );
}
