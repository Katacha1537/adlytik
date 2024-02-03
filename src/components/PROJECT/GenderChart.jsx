import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { useTheme } from 'next-themes';

const GenderChart = ({ insigtsAgeGenderData, objectivity }) => {
    const { theme } = useTheme();
    const [chartData, setChartData] = useState([])
    const getNameObjective = () => {
        switch (objectivity) {
            case "purchase":
                return "Compras"
                break;
            case "conversation":
                return "Conversas"
                break;
            case "leads":
                return "Leads"
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        const getGenderData = () => {
            if (insigtsAgeGenderData) {
                const genderData = insigtsAgeGenderData[objectivity]?.gender || {};
                return Object.keys(genderData).map(gender => ({ x: gender, y: genderData[gender] || 0 }));
            }
            return [];
        }
        setChartData(getGenderData());
    }, [insigtsAgeGenderData])



    const chartOptions = {
        chart: {
            foreColor: theme === 'dark' ? '#fff' : '#333',
            fontFamily: 'Roboto',
            background: '#ffffff0',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 5,
                columnWidth: '70%',
                dataLabels: {
                    position: 'top', // Posiciona as labels no topo das barras
                },
            },
        },
        colors: ['#24e9a7'],
        dataLabels: {
            enabled: false,
            style: {
                colors: [theme === 'dark' ? '#fff' : '#000'], // Altera a cor do texto para o tema escuro
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
        },
        xaxis: {
            categories: ['Homem', 'Mulher', 'Desconhecido'],
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
        theme: {
            mode: theme === 'dark' ? 'dark' : 'light'
        }
    };

    const chartSeries = [
        {
            name: objectivity,
            data: chartData,
            zIndex: 0,
        },
    ]

    return (
        <Card className="w-1/2 p-4 mt-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col gap-6">
                <h4 className="font-bold text-xl">Distribuição por Gênero - {getNameObjective()}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
            </CardBody>
        </Card>
    );
};

export default GenderChart;