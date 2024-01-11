import React, { useState } from 'react';
import { Divider } from '@nextui-org/react';
import { MdOutlineDashboardCustomize, MdOutlineCampaign, MdOutlineReport } from 'react-icons/md'
import { BsFillGridFill, BsListCheck } from 'react-icons/bs'
import { FaBullseye, FaRegEye } from 'react-icons/fa'
import DropDownProjects from './USER/DropDownProjects';
import { useNavigate, useLocation } from 'react-router-dom';
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
        if (href === '/project/id') {
            return pathname === '/project/id';
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

export default function SideBarProject() {
    const navigate = useNavigate()
    return (
        <div className="hidden lg:flex lg:w-[16%]  fixed z-30 h-screen flex-col bg-background border-r-1 border-content3 p-5 pb-2">
            <h1 onClick={() => { navigate("/") }} role='button' className="text-4xl font-bold text-purple-500 mb-3">Ad.Lytik</h1>

            <div className="mt-4 w-full">
                <DropDownProjects />
            </div>

            <Divider className="my-4" />

            <h2 className='font-bold text-foreground mb-2'>MENU</h2>

            <div className="flex flex-col  mb-4">
                <MenuItem href="/project/id" icon={<FaRegEye size={24} />} label="Visão Geral" />
                <MenuItem href="/project/id/dashboard" icon={<BsFillGridFill size={24} />} label="Dashboard" />
                <MenuItem href="/project/id/tasks" icon={<BsListCheck size={24} />} label="Tarefas" />
                <MenuItem href="/project/id/goals" icon={<FaBullseye size={24} />} label="Metas" />
                <MenuItem href="/project/id/campaign" icon={<MdOutlineCampaign size={24} />} label="Campanha" />
                <MenuItem href="/project/id/report" icon={<MdOutlineReport size={24} />} label="Relatório" />
            </div>
        </div>
    );
}
