import React, { useEffect, useState } from 'react';
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
    DropdownItem,
    Progress
} from "@nextui-org/react";

import { BiTask } from "react-icons/bi";
import { MdMoreVert } from 'react-icons/md';


export default function CardGoals({ nameGoals, idGoals, goals, metric, responsible, deleteGoal, onOpenEdit }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Calcula o progresso em termos percentuais
        const calculatedProgress = (metric / goals) * 100;
        setProgress(calculatedProgress);
    }, [goals, metric])

    return (
        <Card className="flex flex-col w-full max-w-full md:max-w-[48.6%] lg:max-w-[32%] 2xl:max-w-[24%]">
            <CardHeader className="flex gap-3">
                <div className="flex items-center justify-between w-full">
                    <p className="text-md font-bold">{nameGoals}</p>

                    <Dropdown>
                        <DropdownTrigger role="button">
                            <Button className='bg-transparent'>
                                <MdMoreVert size={24} className="rotate-90" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions" >
                            <DropdownItem key="edit" onPress={onOpenEdit}>Editar</DropdownItem>
                            <DropdownItem onPress={() => deleteGoal(idGoals)} key="delete" className="text-danger" color="danger">
                                Deleta
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="p-4 pt-5 pb-5">
                <div className='flex justify-between items-center gap-4'>
                    <p className='text-foreground-500 text-sm'>{metric}</p>
                    <Progress
                        size="sm"
                        radius="sm"
                        value={progress}
                    />
                    <p className='text-foreground-500 text-sm'>{goals}</p>
                </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex-grow justify-center">
                <Avatar src={responsible} name="123" />
            </CardFooter>
        </Card>
    );
}
