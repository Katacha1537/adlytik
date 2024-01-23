import React from "react";
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { GoChevronDown } from "react-icons/go";
import { useOwnedProjects } from "../../hooks/useOwnedProjects";

export default function DropDownProjects() {
    const navigate = useNavigate();

    const { ownedProjects, error } = useOwnedProjects()

    const handleAction = (key) => {
        // Navega para a rota desejada com base na chave
        navigate(`/project/${key}`);
    };

    return (
        <Dropdown className="w-full">
            <DropdownTrigger>
                <Button
                    shadow
                    variant="bordered"
                    radius="sm"
                    color="secondary"
                    size="md"
                    className="items-center w-full"
                >
                    Abrir Projetos
                    <GoChevronDown size={24} />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" onAction={handleAction}>

                {ownedProjects.map(ownedProject => {
                    return (
                        <DropdownItem key={ownedProject.id}>{ownedProject.nameProject}</DropdownItem>
                    )
                })}
            </DropdownMenu>
        </Dropdown>
    );
}
