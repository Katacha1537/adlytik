import React, { useState, useMemo, useEffect } from "react";
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
import { useParams } from 'react-router-dom';

import useGetCampaignAds from "../../../hooks/useGetCampaignAds";
import { useDocument } from "../../../hooks/useDocument";
import { useUserDocument } from "../../../hooks/useUserDocument";

const statusColorMap = {
    Ativo: "success",
    Desativado: "danger"
}

export default function CampaignTable({ periodSelection }) {
    const { id: projectId } = useParams();
    const { document: projectDocument } = useDocument("projects", projectId);
    const { userDocument } = useUserDocument();


    const { campaignData, loading, refetchData } = useGetCampaignAds(projectDocument?.adAccount, periodSelection, userDocument?.facebookToken);

    const [sortDescriptor, setSortDescriptor] = useState({
        column: "status",
        direction: "ascending",
    });

    const headerColumns = useMemo(() => {
        return [
            { uid: "name", name: "Nome", sortable: true },
            { uid: "status", name: "Status", sortable: true },
            { uid: "spend", name: "Investimento", sortable: true },
            { uid: "cpm", name: "CPM", sortable: true },
            { uid: "ctr", name: "CTR", sortable: true },
            { uid: "cpc", name: "CPC", sortable: true },
            { uid: "cost_per_purchase", name: "CPA", sortable: true },
            { uid: "leads", name: "Leads", sortable: true },
            { uid: "conversation", name: "Conversas", sortable: true },
            { uid: "cost_per_conversation", name: "Custo p/ conversa", sortable: true },
            { uid: "purchase", name: "Vendas", sortable: true }
        ];
    }, []);

    const sortedCampaigns = useMemo(() => {
        return [...campaignData].sort((a, b) => {
            const first = parseFloat(a[sortDescriptor.column]) || 0;
            const second = parseFloat(b[sortDescriptor.column]) || 0;
            const cmp = first - second;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, campaignData]);


    const formatValue = (columnKey, value) => {
        // Função para formatar valores conforme necessário
        if (columnKey === "status") {
            // Exemplo de formatação para o status
            return <Chip className="capitalize" color={statusColorMap[value]} size="sm" variant="flat">{value}</Chip>;
        } else if (columnKey === "name") {
            // Formatação específica para CTR (%)
            return <p className="font-bold text-[12px]">{value}</p>;
        } else if (columnKey === "ctr") {
            // Formatação específica para CTR (%)
            return `${parseFloat(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
        } else if (columnKey === "spend" || columnKey === "cpm" || columnKey === "cpc" || columnKey === "cost_per_purchase" || columnKey === "cost_per_conversation") {
            // Exemplo de formatação para valores monetários
            return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        } else {
            return value;
        }
    }

    return (
        <div className="overflow-x-auto w-full max-h-[420px] rounded-xl">
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
                                        formatValue(columnKey, campaign[columnKey])
                                    )}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
