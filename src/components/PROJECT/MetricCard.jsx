import { useState } from 'react';
import { Card, Tooltip } from '@nextui-org/react';
import { FaArrowUp, FaDollarSign, FaEye, FaBullseye, FaMousePointer, FaUser, FaComments, FaShoppingCart, FaExchangeAlt, FaHandPointer, FaChartLine, FaPercentage, FaInfoCircle } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function MetricCard({ title, value, tooltip }) {
    const iconMap = {
        'Valor Investido': FaDollarSign,
        'Impressão': FaEye,
        'Alcance': FaBullseye,
        'Cliques no Link': FaMousePointer,
        'Leads': FaUser,
        'Conversas': FaComments,
        'Vendas': FaShoppingCart,
        'Custo por Conversa': FaExchangeAlt,
        'CPC': FaHandPointer,
        'CPM': FaChartLine,
        'CTR': FaPercentage,
        'CPA': FaDollarSign,
    };

    const Icon = iconMap[title] || FaArrowUp;

    const bgColorMap = {
        'Valor Investido': 'bg-amber-500',
        'Impressão': 'bg-green-500',
        'Alcance': 'bg-blue-500',
        'Cliques no Link': 'bg-purple-500',
        'Leads': 'bg-pink-500',
        'Conversas': 'bg-blue-300',
        'Vendas': 'bg-red-500',
        'Custo por Conversa': 'bg-yellow-500',
        'CPC': 'bg-gray-500',
        'CPM': 'bg-purple-300',
        'CTR': 'bg-green-300',
        'CPA': 'bg-amber-500',
    };

    const bgColor = bgColorMap[title] || '#9370DB';

    return (
        <Card className="p-4 flex flex-row items-stretch justify-between gap-3">
            <div className='flex flex-col gap-2 items-start justify-between'>
                <h3 className={`text-sm text-white mt-0`}>{title}</h3>
                <p className={`font-bold text-2xl text-white mb-0`}>{value}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
                <Tooltip content={tooltip} placement="top" color="secondary">
                    <div>
                        <IoIosInformationCircleOutline size={20} color='#fff' />
                    </div>
                </Tooltip>
                <div
                    className={`w-12 h-12 rounded-full ${bgColor} justify-center items-center flex`}
                >
                    <Icon size={12} color='#fff' />
                </div>
            </div>
        </Card>

    );
}
