import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { GoChevronDown } from "react-icons/go"

export default function DropDownProjects() {
    return (
        <Dropdown className="w-full">
            <DropdownTrigger>
                <Button
                    shadow
                    color="secondary"
                    size="md"
                    className="items-center w-full"
                >
                    Abrir Projetos
                    <GoChevronDown size={24} />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" onAction={(key) => alert(key)} >
                <DropdownItem key="drfernando">Dr Fernando</DropdownItem>
                <DropdownItem key="katacha">Lucas Katacha</DropdownItem>
                <DropdownItem key="roberta">Roberta Carbonari</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
