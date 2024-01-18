import React from 'react';
import { MapContainer, TileLayer, Circle, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Chart from 'react-apexcharts';
import { useTheme } from 'next-themes';

const MapChart = ({ size }) => {
    const cities = [
        { name: 'Brasília', location: [-15.7801, -47.9292], population: 5 },
        { name: 'São Paulo', location: [-23.5505, -46.6333], population: 12 },
        { name: 'Rio de Janeiro', location: [-22.9068, -43.1729], population: 6 },
        { name: 'Salvador', location: [-12.9714, -38.5014], population: 4 },
        { name: 'Fortaleza', location: [-3.7172, -38.5433], population: 3 },
        // Adicione mais cidades conforme necessário
    ];

    const { theme } = useTheme();

    const isDarkMode = theme === 'dark';

    const mapStyle = {
        height: `${size}px`,
        width: '100%',
        borderRadius: '8px'
    }

    return (
        <MapContainer scrollWheelZoom={false} center={[-14.235, -51.9253]} zoom={3.5} style={mapStyle}>
            <TileLayer
                url={isDarkMode ? "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {cities.map((city, index) => (
                <Circle
                    key={index}
                    center={city.location}
                    radius={Math.min(city.population * 25000, 300000)} // Ajuste o raio conforme necessário
                    pathOptions={{ fillColor: 'blue', color: 'blue' }}
                >
                    <Tooltip>{`Cidade: ${city.name}, População: ${city.population}`}</Tooltip>
                </Circle>
            ))}
        </MapContainer>
    );
};

export default MapChart;
