import React from 'react'
import { User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
export default function AvatarDropDown() {
    return (
        <Dropdown placement="bottom-start">
            <DropdownTrigger>
                <User
                    as="button"
                    avatarProps={{
                        isBordered: true,
                        color: "secondary",
                        size: "md",
                        src: "https://pbs.twimg.com/profile_images/1409730538236170241/h47IxksM_400x400.jpg",
                    }}
                    className="transition-transform"
                    description="@katachalucas"
                    name="Lucas Katacha"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="team_settings">Perfil</DropdownItem>
                <DropdownItem key="logout" className="text-danger" color="danger">
                    Sair da conta
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
