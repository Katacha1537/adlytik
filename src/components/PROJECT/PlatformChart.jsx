import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { useTheme } from 'next-themes';

const PlatformChart = () => {
    const { theme } = useTheme();

    const chartOptions = {
        chart: {
            animations: {
                enabled: false,
                easing: 'swing',
            },
            foreColor: theme === 'dark' ? '#fff' : '#333',
            fontFamily: 'Roboto',
            height: 498,
            id: 'YlaCF',
            stacked: false,
            stackType: '100%',
            toolbar: {
                show: false,
            },
            type: 'bar',
            width: 599,
        },
        plotOptions: {
            bar: {
                columnWidth: '35%',
                borderRadius: 4,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        colors: ['#03a9f4', '#9A4FE1'],
        dataLabels: {
            enabled: false,
            style: {
                fontWeight: 700,
            },
        },
        grid: {
            padding: {
                right: 25,
                left: 15,
            },
        },
        legend: {
            fontSize: 14,
            offsetY: 0,
            markers: {
                shape: 'square',
                size: 8,
            },
            itemMargin: {
                vertical: 0,
            },
        },
        stroke: {
            show: false,
        },
        tooltip: {
            theme: theme === 'dark' ? 'dark' : 'light',
            style: {
                fontSize: '12px',
                background: theme === 'dark' ? '#333' : '#fff',
                color: theme === 'dark' ? '#fff' : '#333',
            },
            x: {
                show: true,
            },
            y: {
                title: {
                    formatter: (seriesName) => seriesName,
                },
            },
        },
        xaxis: {
            categories: ['Instagram', 'Facebook'],
            labels: {
                trim: true,
                style: {},
            },
            title: {
                style: {
                    fontWeight: 700,
                },
            },
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: theme === 'dark' ? '#fff' : '#000',
                },
            },
        },
        theme: {
            palette: 'palette2',
        },
    };

    const chartSeries = [
        {
            name: 'Alcance',
            data: [150, 200], // Substitua com os dados reais
        },
        {
            name: 'Resultados',
            data: [120, 180], // Substitua com os dados reais
        },
    ];

    return (
        <Card className="w-full sm:w-1/2 items-center  p-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col gap-6">
                <h4 className="font-bold text-xl">Alcance e Resultados por Plataforma</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
            </CardBody>
        </Card>
    );
};

export default PlatformChart;
