import React from 'react';
import { Divider } from '@nextui-org/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { GoProject, GoPeople } from "react-icons/go"
import { TbPlugConnected } from "react-icons/tb";
import { RiSettings3Line } from "react-icons/ri";
import DropDownProjects from './DropDownProjects';
import { useNavigate, useLocation } from 'react-router-dom';
import AvatarDropDown from './AvatarDropDown';


const MenuItem = ({ icon, label, href }) => {
    const navigate = useNavigate();
    const location = useLocation()

    const handlePages = (hr) => {
        navigate(hr);
    };

    const isActive = location.pathname === href

    return (
        <div
            onClick={() =>
                handlePages(href)}
            className={`flex items-center gap-3 mb-2 p-2 rounded-md cursor-pointer transition-colors 
            ${isActive ? 'bg-purple-500 text-foreground-50' : 'hover:bg-purple-500 hover:text-foreground-50'}`}
        >
            {icon}
            <p>{label}</p>
        </div>
    );
}

export default function SideBar() {
    return (
        <div className="w-[16%] flex flex-col bg-foreground-200 p-5 pb-2">
            <h1 className="text-4xl font-bold text-purple-500 mb-3">Ad.Lytik</h1>

            <div className="mt-4">
                <div className='flex items-center gap-2 mb-4'>
                    <AvatarDropDown />
                </div>

                <DropDownProjects />
            </div>

            <Divider className="my-4" />

            <h2 className='font-bold text-foreground mb-4'>MENU</h2>

            <div className="flex flex-col gap-3">
                <MenuItem href="/" icon={<MdOutlineDashboardCustomize size={24} />} label="Dashboard" />
                <MenuItem href="/projects" icon={<GoProject size={24} />} label="Projetos" />
                <MenuItem href="/usersteam" icon={<GoPeople size={24} />} label="Usuários" />
                <MenuItem href="/integrations" icon={<TbPlugConnected size={24} />} label="Integrações" />
                <MenuItem href="/settings" icon={<RiSettings3Line size={24} />} label="Configuração" />
            </div>
            <div className='flex flex-col h-full justify-end'>
                <ThemeSwitcher />
            </div>
        </div>
    );
}
