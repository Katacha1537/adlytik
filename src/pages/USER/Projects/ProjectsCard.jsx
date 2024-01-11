import React from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    AvatarGroup,
    Avatar,
    Chip,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from "@nextui-org/react";


import { BiTask } from "react-icons/bi";
import { MdMoreVert } from 'react-icons/md';

export default function ProjectsCard({ idProject, nameProject, descriptionProject, tasksProject, membersProject }) {
    return (
        <Card className="flex flex-col w-full max-w-full md:max-w-[48.6%] lg:max-w-[32%] 2xl:max-w-[24%]">
            <CardHeader className="flex gap-3">
                <div className="flex items-center justify-between w-full">
                    <p className="text-md font-bold">{nameProject}</p>


                    <Dropdown placement="bottom-start">
                        <DropdownTrigger role="button">
                            <Button className='bg-transparent'>
                                <MdMoreVert size={24} className="rotate-90" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions" >
                            <DropdownItem key="edit">Editar</DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger">
                                Deleta
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="p-4 pt-5 pb-5">
                <p>{descriptionProject}</p>
            </CardBody>
            <Divider />
            <CardFooter className="flex-grow justify-between">
                <AvatarGroup isBordered max={3}>
                    {
                        membersProject.map((member, index) => (
                            <Avatar key={index} src={member.urlPhoto} name={member.name} />
                        ))
                    }
                </AvatarGroup>
                <Button color="secondary">
                    Entrar
                </Button>
                <Chip
                    startContent={<BiTask size={18} />}
                    variant="faded"
                    color="success"
                >
                    {tasksProject}
                </Chip>
            </CardFooter>
        </Card>
    )
}
