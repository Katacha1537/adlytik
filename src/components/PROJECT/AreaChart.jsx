import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from 'next-themes';

const AreaChart = ({size}) => {
    const { theme } = useTheme();

    const data = generateDayWiseTimeSeries(new Date("01 Jan 2024").getTime(), 7, {
        min: 30,
        max: 90
    });

    const isDarkMode = theme === 'dark';

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
                data: data
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

    function generateDayWiseTimeSeries(baseval, count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = baseval;
            var y =
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push([x, y]);
            baseval += 86400000;
            i++;
        }
        return series;
    }

    return (
        <div id="chart">
            <ReactApexChart options={options} series={options.series} type="area" height={size} />
        </div>
    );
}

export default AreaChart;
