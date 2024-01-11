import React from 'react'

import Chart from "react-apexcharts";
import { Card, CardHeader, CardBody, Tabs, Tab } from "@nextui-org/react"

import { useTheme } from 'next-themes';

import { useState } from 'react';

export default function ChartBarDouble() {
    const { theme } = useTheme()
    const [date, setDate] = useState(new Date())

    const uniqueVisitorsData = {
        series: [
            {
                name: 'Em andamento',
                data: [30, 40, 45, 50, 55, 60, 65], // Exemplo de dados para tarefas em andamento
            },
            {
                name: 'Finalizadas',
                data: [20, 25, 30, 35, 40, 45, 50], // Exemplo de dados para tarefas finalizadas
            },
        ],
    }

    // Definindo as opções do gráfico
    const options = {
        chart: {
            toolbar: {
                show: false, // Desativa a barra de ferramentas do gráfico
            },
            background: theme === 'dark' ? '#3333330' : '#fff', // Altera o fundo do gráfico para o tema escuro
        },
        colors: ['#9A4FE1', '#24e9a7'], // Altera as cores das barras para o tema escuro
        plotOptions: {
            bar: {
                borderRadius: 5, // Arredonda as bordas das barras
                dataLabels: {
                    position: 'top', // Posiciona as labels no topo das barras
                },
            },
        },
        dataLabels: {
            enabled: false,
            style: {
                colors: [theme === 'dark' ? '#fff' : '#000'], // Altera a cor do texto para o tema escuro
            },
        },
        xaxis: {
            // ... suas configurações de eixo x
            categories: ['1 Jan', '10 Fev', '20 Mar', '30 Abr', '10 Mai', '20 Jun', '1 Jul'],
            labels: {
                style: {
                    colors: theme === 'dark' ? '#fff' : '#000', // Altera a cor do texto dos labels do eixo x para o tema escuro
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: theme === 'dark' ? '#fff' : '#000', // Altera a cor do texto dos labels do eixo y para o tema escuro
                },
            },
        },
        grid: {
            borderColor: theme === 'dark' ? '#555' : '#e0e0e0', // Altera a cor das linhas da grade para o tema escuro
        },
        tooltip: {
            theme: theme === 'dark' ? 'dark' : 'light', // Define o tema da tooltip de acordo com o tema do gráfico
            style: {
                fontSize: '12px',
            },
            x: {
                show: true,
            },
            y: {
                title: {
                    formatter: (seriesName) => seriesName, // Você pode formatar como desejar
                },
            },
        }
        // ... outras opções que você possa querer configurar
    }

    return (
        <Card className="p-4 mb-8">
            <CardHeader className="pb-0 pt-2 px-4 flex-col gap-6">
                <div className='flex w-full justify-between items-center'>
                    <h4 className="font-bold text-large">Tarefas do Projeto</h4>
                    <Tabs radius="full" aria-label="Periodo">
                        <Tab key="photos" title="Mensal" />
                        <Tab key="music" title="Semanal" />
                        <Tab key="videos" title="Diário" />
                    </Tabs>
                </div>
                <div className='flex w-full justify-between items-center'>
                    <div>
                        <p className='font-bold text-xl'>383</p>
                        <p>Tarefas Totais</p>
                    </div>
                    <div className='flex gap-10'>
                        <div className='flex items-center gap-3'>
                            <div className="w-3 h-3 rounded-lg bg-purple-500"></div>
                            <div>
                                <p className='font-bold text-xl'>270</p>
                                <p>Em andamento</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className="w-3 h-3 rounded-lg bg-[#5EE2C0]"></div>
                            <div>
                                <p className='font-bold text-xl'>113</p>
                                <p>Finalizadas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Chart
                    options={options} // Ajustado para fornecer as opções esperadas
                    series={uniqueVisitorsData.series}
                    height={410}
                    type="bar"
                />
            </CardBody>
        </Card>
    )
}
