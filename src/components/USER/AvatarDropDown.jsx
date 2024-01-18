import React from 'react'
import { User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner } from '@nextui-org/react'
import { useLogout } from '../../hooks/useLogout'
export default function AvatarDropDown() {
    const { logout, error, isPending } = useLogout()

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
                <DropdownItem onClick={logout} key="logout" className="text-danger" color="danger">
                    {isPending ? <Spinner color="default" size="lg" /> : "Sair da conta"}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
