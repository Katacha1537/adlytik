import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from 'next-themes';

const FunnelChart = () => {
    const { theme } = useTheme();
    
    const [chartData] = useState({
        series: [
            {
                name: 'Funnel Series',
                data: [1958, 1650, 1205, 950, 740, 548],
            },
        ],
        options: {
            tooltip: {
                theme: theme === 'dark' ? 'dark' : 'light',
                style: {
                    fontSize: '12px',
                    background: theme === 'dark' ? '#1a1a1a' : '#fff',
                    color: theme === 'dark' ? '#ffffff' : '#000',
                },
            },
            chart: {
                type: 'bar',
                height: 350,
                background:'#1a1a1a0',
                foreColor: theme === 'dark' ? '#fff' : '#000',
                toolbar: {
                    show: false,
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 0,
                    horizontal: true,
                    barHeight: '80%',
                    isFunnel: true,
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ': ' + val;
                },
                dropShadow: {
                    enabled: false,
                },
            },
            xaxis: {
                categories: [
                    'Impressões',
                    'Alcance',
                    'Cliques no Link',
                    'Visualização de Página',
                    'Iniciate Checkout',
                    'Comprou',
                ],
                labels: {
                    style: {
                        colors: theme === 'dark' ? '#ffffff' : '#000',
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: theme === 'dark' ? '#ffffff' : '#000',
                    },
                },
            },
            legend: {
                show: false,
            },
            colors: ['#9A4FE1'],
        },
    });

    return (
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    );
};

export default FunnelChart;
