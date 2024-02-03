import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from 'next-themes';

const AreaChart = ({ size, dataInsight, dataType }) => {
    const { theme } = useTheme();

    const isDarkMode = theme === 'dark';

    // Filtra as datas e valores com base no dataType
    const filteredData = dataInsight.map(item => ({
        x: new Date(item.date).getTime(),
        y: parseFloat(item[dataType]) || 0,
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
        colors: [isDarkMode ? "#9A4FE1" : "#9858d3"],
        stroke: {
            width: 3,
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
            colors: [isDarkMode ? "#333" : "#fff"],
            strokeColor: isDarkMode ? "#9A4FE1" : "#9A4FE1",
            strokeWidth: 3
        },
        series: [
            {
                name: dataType,
                data: filteredData
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

export default AreaChart;