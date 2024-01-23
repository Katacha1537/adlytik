import React from 'react'
import { User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner } from '@nextui-org/react'
import { useLogout } from '../../hooks/useLogout'
import { useUserDocument } from '../../hooks/useUserDocument'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function AvatarDropDown() {
    const { user } = useAuthContext()

    const { logout, error, isPending } = useLogout()

    const { userDocument } = useUserDocument()

    return (
        <Dropdown placement="bottom-start">
            <DropdownTrigger>
                <User
                    as="button"
                    avatarProps={{
                        isBordered: true,
                        color: "secondary",
                        size: "md",
                        src: `${user.photoURL}`,
                    }}
                    className="transition-transform"
                    description={`@${userDocument?.userName}`}
                    name={userDocument?.nameComplete}
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
