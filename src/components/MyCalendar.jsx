import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importar o estilo padrão

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { MdKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";


import './MyCalendar.css'
import { useTheme } from 'next-themes';
const MyCalendar = () => {
    const [value, onChange] = useState(new Date());
    const { theme: isDark } = useTheme()

    const tileClassName = ({ date, view }) => {
        // Aplica estilos apenas para a visualização do mês
        if (view === 'month') {
            // Verifica se a data corresponde ao valor atual (dia selecionado)
            if (date.getDate() === value.getDate() &&
                date.getMonth() === value.getMonth() &&
                date.getFullYear() === value.getFullYear()) {
                // Estilos para o dia atual selecionado
                return 'bg-purple-500 text-white rounded-full';
            }
        }
        return 'rounded-full'
    }

    const formatShortWeekday = (locale, date) => {
        return date.toLocaleDateString(locale, { weekday: 'short' }).substring(0, 3);
    }

    const formatMonthYear = (locale, date) => {
        return `${date.toLocaleDateString(locale, { month: 'short' })} ${date.getFullYear()}`;
    }

    return (
        <div className={`my-calendar-container transition-colors duration-300 rounded-lg shadow-lg overflow-hidden flex justify-center mb-8`}>
            <div className="square-container">
                <Calendar
                    value={value}
                    className={`${isDark === 'dark' ? 'border-0' : 'border-1 border-content3'} p-3 text-foreground bg-content1 rounded-lg`}
                    tileClassName={tileClassName}
                    formatShortWeekday={formatShortWeekday}
                    formatMonthYear={formatMonthYear}
                    prevLabel={<IoIosArrowBack className="text-foreground text-lg" />}
                    nextLabel={<IoIosArrowForward className="text-foreground text-lg" />}
                    prev2Label={<MdOutlineKeyboardDoubleArrowLeft className="text-foreground text-2xl" />}
                    next2Label={<MdKeyboardDoubleArrowRight className="text-foreground text-2xl" />}
                    navigationLabel={({ date, label, locale, view }) =>
                        <div className="flex justify-center items-center font-bold">
                            {formatMonthYear(locale, date)}
                        </div>
                    }
                    showNeighboringMonth={false}
                    showNavigation={true}
                    showFixedNumberOfWeeks={true}
                />
            </div>
        </div>
    );
};


export default MyCalendar;
