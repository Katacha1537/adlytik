import React from "react";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const toggleTheme = (isDarkMode) => {
        setTheme(isDarkMode ? 'dark' : 'light');
    };

    return (
        <div className="flex gap-4 items-center">
            <Switch
                checked={theme === 'dark'}
                onChange={(e) => toggleTheme(e.target.checked)}
                size="lg"
                color="secondary"
                startContent={<FaMoon />} // Icone para o modo escuro
                endContent={<FaSun />} // Icone para o modo claro
            >
                {/*theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'*/}
            </Switch>
        </div>
    );
}
