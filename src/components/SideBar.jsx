import React, { useState } from 'react';
import { Divider } from '@nextui-org/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { MdOutlineDashboardCustomize, MdOutlineLiveHelp } from 'react-icons/md';
import { GoProject, GoPeople } from "react-icons/go"
import { TbPlugConnected } from "react-icons/tb";
import { RiSettings3Line } from "react-icons/ri";
import DropDownProjects from './DropDownProjects';
import { SlNote } from "react-icons/sl";
import { useNavigate, useLocation } from 'react-router-dom';
import AvatarDropDown from './AvatarDropDown';
import { useTheme } from 'next-themes';



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

    const isActive = (href, pathname) => {
        // Se o href é a raiz, só retorna true se o pathname também é exatamente a raiz
        if (href === '/') {
            return pathname === '/';
        }
        // Para outros casos, verifica se o pathname começa com o href
        return pathname.includes(href);
    }

    const active = isActive(href, location.pathname)

    return (
        <div
            onClick={() =>
                handlePages(href)}
            className={`flex items-center gap-3 mb-2 p-2 text-sm text-foreground-500 rounded-md cursor-pointer transition transform  
            ${active ? isDark === 'dark' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-500 font-semibold' : isDark === 'dark' ? 'hover:bg-purple-500 hover:text-white' : 'hover:bg-purple-500 hover:text-white'}
            ${isClicked ? 'scale-95' : 'scale-100'} `}
        >
            {icon}
            <p>{label}</p>
        </div>
    );
}

export default function SideBar() {
    return (
        <div className="hidden lg:flex lg:w-[16%]  fixed z-30 h-screen flex-col bg-background border-r-1 border-content3 p-5 pb-2">
            <h1 className="text-4xl font-bold text-purple-500 mb-3">Ad.Lytik</h1>

            <div className="mt-4 w-full">
                <DropDownProjects />
            </div>

            <Divider className="my-4" />

            <h2 className='font-bold text-foreground mb-2'>MENU</h2>

            <div className="flex flex-col  mb-4">
                <MenuItem href="/" icon={<MdOutlineDashboardCustomize size={24} />} label="Dashboard" />
                <MenuItem href="/projects" icon={<GoProject size={24} />} label="Projetos" />
                <MenuItem href="/integrations" icon={<TbPlugConnected size={24} />} label="Integrações" />

            </div>

            <h2 className='font-bold mb-2'>FERRAMENTAS</h2>

            <div className="flex flex-col ">
                <MenuItem href="/settings" icon={<RiSettings3Line size={24} />} label="Configuração" />
                <MenuItem href="/feedback" icon={<SlNote size={24} />} label="FeedBack" />
                <MenuItem href="/help" icon={<MdOutlineLiveHelp size={24} />} label="Ajuda" />

            </div>
        </div>
    );
}
