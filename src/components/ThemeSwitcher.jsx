import React, { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // Verifica o tema atual
    const isDarkMode = () => theme === 'dark';

    useEffect(() => {
        setMounted(true);
        // Define o tema com base na preferência do sistema ou no localStorage
        const savedTheme = localStorage.getItem('theme') ||
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(savedTheme);
    }, [setTheme]);

    const toggleTheme = (checked) => {
        const newTheme = checked ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    if (!mounted) return null;

    return (
        <div className="flex gap-4 items-center">
            <Switch
                {...(isDarkMode() && { defaultSelected: true })}
                onChange={(e) => toggleTheme(e.target.checked)}
                size="lg"
                color="secondary"
                startContent={<FaMoon />} // Icone para o modo escuro
                endContent={<FaSun />} // Icone para o modo claro
                className="hidden lg:block"
            />
        </div>
    );
}
