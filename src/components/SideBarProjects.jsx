import React, { useState } from 'react';
import { Divider } from '@nextui-org/react';
import { MdOutlineCampaign, MdOutlineReport } from 'react-icons/md'
import { BsFillGridFill, BsListCheck } from 'react-icons/bs'
import { FaBullseye, FaRegEye } from 'react-icons/fa'
import DropDownProjects from './USER/DropDownProjects';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useTheme } from 'next-themes';



const MenuItem = ({ icon, label, href, projectId }) => {
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
        if (href === `/project/${projectId}`) {
            return pathname === `/project/${projectId}`;
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

export default function SideBarProject({ projectId }) {
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
                <MenuItem projectId={projectId} href={`/project/${projectId}`} icon={<FaRegEye size={24} />} label="Visão Geral" />
                <MenuItem projectId={projectId} href={`/project/${projectId}/dashboard`} icon={<BsFillGridFill size={24} />} label="Dashboard" />
                <MenuItem projectId={projectId} href={`/project/${projectId}/tasks`} icon={<BsListCheck size={24} />} label="Tarefas" />
                <MenuItem projectId={projectId} href={`/project/${projectId}/goals`} icon={<FaBullseye size={24} />} label="Metas" />
                <MenuItem projectId={projectId} href={`/project/${projectId}/campaign`} icon={<MdOutlineCampaign size={24} />} label="Campanha" />
                <MenuItem projectId={projectId} href={`/project/${projectId}/report`} icon={<MdOutlineReport size={24} />} label="Relatório" />
            </div>
        </div>
    );
}
