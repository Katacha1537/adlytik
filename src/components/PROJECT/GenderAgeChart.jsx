import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { useTheme } from 'next-themes';

const GenderAgeChart = () => {
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
            stackOnlyBar: false,
            toolbar: {
                show: false,
            },
            type: 'bar',
            width: 599,
        },
        plotOptions: {
            bar: {
                columnWidth: '100%',
                borderRadius: 4,
                dataLabels: {
                    position: 'top',
                },
            },
            bubble: {
                zScaling: true,
            },
        },
        colors: [theme === 'dark' ? '#9A4FE1' : '#3f51b5', theme === 'dark' ? '#24e9a7' : '#03a9f4'],
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
            fill: {
                type: 'solid',
                opacity: 0.85,
                gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 100],
                    colorStops: [],
                },
            },
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
            labels: {
                trim: true,
                style: {},
            },
            group: {
                groups: [],
                style: {
                    colors: [],
                    fontSize: '12px',
                    fontWeight: 400,
                    cssClass: '',
                },
            },
            tickPlacement: 'between',
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
                    colors: Array(6).fill(theme === 'dark' ? '#fff' : '#000'),
                },
            },
        },
        theme: {
            palette: 'palette2',
        },
    };

    const chartSeries = [
        {
            name: 'Homem',
            data: [
                { x: '13-17', y: '0' },
                { x: '18-24', y: '0' },
                { x: '25-34', y: '0' },
                { x: '35-44', y: '3' },
                { x: '45-54', y: '0' },
                { x: '55-64', y: '1' },
                { x: '65+', y: '0' },
            ],
            zIndex: 0,
        },
        {
            name: 'Mulher',
            data: [
                { x: '13-17', y: '0' },
                { x: '18-24', y: '0' },
                { x: '25-34', y: '0' },
                { x: '35-44', y: '6' },
                { x: '45-54', y: '5' },
                { x: '55-64', y: '1' },
                { x: '65+', y: '0' },
            ],
            zIndex: 1,
        },
    ];

    return (
        <Card className="w-1/2 p-4 mt-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col gap-6">
                <h4 className="font-bold text-xl">Distribuição de Gênero por Idade</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
            </CardBody>
        </Card>
    );
};

export default GenderAgeChart;
