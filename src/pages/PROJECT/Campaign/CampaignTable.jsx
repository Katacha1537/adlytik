import React, { useState, useMemo } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem
} from "@nextui-org/react";

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const campaigns = [
    { id: 1, name: "Campanha 1", status: "active", reach: 5000, impressions: 10000, clicks: 800, cpc: 0.5, leads: 50, actions: "Ações 1" },
    { id: 2, name: "Campanha 2", status: "paused", reach: 3000, impressions: 7000, clicks: 500, cpc: 0.6, leads: 30, actions: "Ações 2" },
    { id: 3, name: "Campanha 3", status: "completed", reach: 8000, impressions: 15000, clicks: 1200, cpc: 0.4, leads: 80, actions: "Ações 3" },
    // Adicione mais campanhas conforme necessário
]

export default function CampaignTable() {
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "status",
        direction: "ascending",
    });

    const headerColumns = useMemo(() => {
        return [
            { uid: "name", name: "Nome", sortable: true },
            { uid: "status", name: "Status", sortable: true },
            { uid: "reach", name: "Valor Investido", sortable: true },
            { uid: "impressions", name: "Impressões", sortable: true },
            { uid: "clicks", name: "Cliques", sortable: true },
            { uid: "cpc", name: "CPC", sortable: true },
            { uid: "leads", name: "Leads", sortable: true },
            { uid: "actions", name: "Ações", sortable: false },
        ];
    }, []);

    const sortedCampaigns = useMemo(() => {
        return [...campaigns].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor]);

    return (
        <Table
            aria-label="Example table with sorting"
            isHeaderSticky
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"Nenhuma Campanha foi encontrada!"} items={sortedCampaigns}>
                {(campaign) => (
                    <TableRow key={campaign.id}>
                        {(columnKey) => (
                            <TableCell>
                                {columnKey === "actions" ? (
                                    <div className="relative flex justify-end items-center gap-2">
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button isIconOnly size="sm" variant="light">
                                                    dots
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu>
                                                <DropdownItem>Visualizar</DropdownItem>
                                                <DropdownItem>Editar</DropdownItem>
                                                <DropdownItem>Excluir</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                ) : columnKey === "status" ? (
                                    <Chip
                                        className="capitalize"
                                        color={statusColorMap[campaign.status]}
                                        size="sm"
                                        variant="flat"
                                    >
                                        {campaign[columnKey]}
                                    </Chip>
                                ) : (
                                    campaign[columnKey]
                                )}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}