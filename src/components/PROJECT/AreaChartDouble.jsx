import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from 'next-themes';

const AreaChartDouble = ({ size, dataInsight, dataTypeOne, dataTypeTwo }) => {
    const { theme } = useTheme();

    const isDarkMode = theme === 'dark';

    // Filtra as datas e valores com base no dataTypeOne e dataTypeTwo
    const filteredDataOne = dataInsight.map(item => ({
        x: new Date(item.date).getTime(),
        y: parseFloat(item[dataTypeOne]) || 0,
    }));

    const filteredDataTwo = dataInsight.map(item => ({
        x: new Date(item.date).getTime(),
        y: parseFloat(item[dataTypeTwo]) || 0,
    }));

    const options = {
        chart: {
            id: "chart2",
            type: "area",
            height: 230,
            foreColor: isDarkMode ? "#ccc" : "#333",
            toolbar: {
                autoSelected: "pan",
                show: false
            },
            stacked: true
        },
        colors: [isDarkMode ? "#9A4FE1" : "#9858d3", isDarkMode ? "#24e9a7" : "#03a9f4"],
        stroke: {
            width: [3, 3],
            curve: 'smooth',
        },
        grid: {
            borderColor: isDarkMode ? "#555" : "#ddd",
            clipMarkers: false,
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            type: 'gradient'
        },
        markers: {
            size: 5,
            colors: [isDarkMode ? "#333" : "#fff", isDarkMode ? "#24e9a7" : "#03a9f4"],
            strokeColor: [isDarkMode ? "#9A4FE1" : "#9858d3", isDarkMode ? "#24e9a7" : "#03a9f4"],
            strokeWidth: 3
        },
        series: [
            {
                name: dataTypeTwo,
                data: filteredDataTwo
            },
            {
                name: dataTypeOne,
                data: filteredDataOne

            }
        ],
        tooltip: {
            theme: isDarkMode ? "dark" : "light"
        },
        xaxis: {
            type: "datetime",
            labels: {
                style: {
                    colors: isDarkMode ? "#ccc" : "#333",
                },
            },
        },
        yaxis: {
            min: 0,
            tickAmount: 4,
            forceNiceScale: false, // Adicionada propriedade forceNiceScale
            labels: {
                style: {
                    colors: isDarkMode ? "#ccc" : "#333",
                },
            },
        }
    };

    return (
        <div id="chart">
            <ReactApexChart options={options} series={options.series} type="area" height={size} />
        </div>
    );
}

export default AreaChartDouble;
