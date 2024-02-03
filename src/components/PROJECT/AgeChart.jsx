import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { useTheme } from 'next-themes';

const AgeChart = ({ insigtsAgeGenderData, objectivity }) => {
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
        const getCategoryData = () => {
            if (insigtsAgeGenderData) {
                const ageData = insigtsAgeGenderData[objectivity]?.age || {};
                return Object.keys(ageData).map(ageRange => ({ x: ageRange, y: ageData[ageRange] }));
            }
            return [];
        }
        setChartData(getCategoryData());
    }, [insigtsAgeGenderData, objectivity]);
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
        colors: ['#9A4FE1'],
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
            data: chartData, // O valor de 'y' será 0, pois não há dados de gênero aqui
            zIndex: 0,
        },
    ];

    return (
        <Card className="w-1/2 p-4 mt-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col gap-6">
                <h4 className="font-bold text-xl">Distribuição por Idade - {getNameObjective()}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
            </CardBody>
        </Card>
    );
};

export default AgeChart;