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
    DropdownItem,
    Card,
} from "@nextui-org/react";

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const campaigns = [
    {
        id: 1,
        image:
            "https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg",
        name: "Campanha 1",
        status: "active",
        reach: 6000,
        impressions: 12000,
        clicks: 900,
        cpc: 0.6,
        leads: 60,
        actions: "Ações 1",
    },
    {
        id: 2,
        image:
            "https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg",
        name: "Campanha 2",
        status: "paused",
        reach: 3500,
        impressions: 8000,
        clicks: 550,
        cpc: 0.5,
        leads: 35,
        actions: "Ações 2",
    },
    {
        id: 3,
        image:
            "https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg",
        name: "Campanha 3",
        status: "completed",
        reach: 9000,
        impressions: 18000,
        clicks: 1500,
        cpc: 0.7,
        leads: 90,
        actions: "Ações 3",
    },
    {
        id: 4,
        image:
            "https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg",
        name: "Campanha 4",
        status: "completed",
        reach: 7500,
        impressions: 16000,
        clicks: 1300,
        cpc: 0.8,
        leads: 75,
        actions: "Ações 4",
    },
    {
        id: 5,
        image:
            "https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg",
        name: "Campanha 5",
        status: "active",
        reach: 4500,
        impressions: 10000,
        clicks: 700,
        cpc: 0.4,
        leads: 40,
        actions: "Ações 5",
    },
    {
        id: 6,
        image:
            "https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg",
        name: "Campanha 6",
        status: "paused",
        reach: 3000,
        impressions: 7000,
        clicks: 500,
        cpc: 0.6,
        leads: 30,
        actions: "Ações 6",
    },
    {
        id: 7,
        image:
            "https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg",
        name: "Campanha 7",
        status: "completed",
        reach: 8000,
        impressions: 15000,
        clicks: 1200,
        cpc: 0.4,
        leads: 80,
        actions: "Ações 7",
    },
    {
        id: 8,
        image:
            "https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg",
        name: "Campanha 8",
        status: "active",
        reach: 5500,
        impressions: 11000,
        clicks: 850,
        cpc: 0.7,
        leads: 55,
        actions: "Ações 8",
    },
    {
        id: 9,
        image:
            "https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg",
        name: "Campanha 9",
        status: "paused",
        reach: 3200,
        impressions: 7500,
        clicks: 480,
        cpc: 0.5,
        leads: 32,
        actions: "Ações 9",
    },
    {
        id: 10,
        image:
            "https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg",
        name: "Campanha 10",
        status: "completed",
        reach: 8800,
        impressions: 17000,
        clicks: 1400,
        cpc: 0.6,
        leads: 88,
        actions: "Ações 10",
    },
];

const itemsPerPage = 3;

const TableDashboard = ({ adSet, title }) => {
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "status",
        direction: "ascending",
    });

    const [visibleRows, setVisibleRows] = useState(itemsPerPage);

    const headerColumns = useMemo(() => {
        const columns = [
            { uid: "name", name: "Nome", sortable: true },
            { uid: "status", name: "Status", sortable: true },
            { uid: "reach", name: "Valor Investido", sortable: true },
            { uid: "impressions", name: "Impressões", sortable: true },
            { uid: "clicks", name: "Cliques", sortable: true },
            { uid: "cpc", name: "CPC", sortable: true },
            { uid: "leads", name: "Leads", sortable: true },
            { uid: "actions", name: "Ações", sortable: false },
        ];

        if (adSet) {
            columns.splice(0, 0, { uid: "image", name: "Imagem", sortable: false });
        }

        return columns;
    }, [adSet]);

    const sortedCampaigns = useMemo(() => {
        return [...campaigns].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor]);

    const loadMoreRows = () => {
        setVisibleRows((prevVisibleRows) =>
            Math.min(prevVisibleRows + itemsPerPage, campaigns.length)
        );
    };

    return (
        <Card className="flex flex-col items-center p-2 w-full overflow-auto">
            <h3 className="font-bold text-xl">{title}</h3>
            <div className="overflow-x-auto w-full max-h-[280px]">
                <Table
                    aria-label="Example table with sorting"
                    isHeaderSticky
                    sortDescriptor={sortDescriptor}
                    onSortChange={setSortDescriptor}
                    radius="none"
                    shadow="none"
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
                    <TableBody
                        emptyContent={"Nenhuma Campanha foi encontrada!"}
                        items={sortedCampaigns.slice(0, visibleRows)}
                    >
                        {(campaign) => (
                            <TableRow key={campaign.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {columnKey === "image" && adSet ? (
                                            <img
                                                src={campaign.image}
                                                alt="Imagem do Criativo"
                                                className="w-20 h-20 rounded-md"
                                            />
                                        ) : columnKey === "actions" ? (
                                            <div className="relative flex justify-end items-center gap-2">
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="light"
                                                        >
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
            </div>
            {visibleRows < campaigns.length && (
                <div className="flex w-full justify-center mt-2">
                    <Button
                        isDisabled={false} // Pode adicionar lógica de desativação aqui
                        variant="flat"
                        onPress={loadMoreRows}
                    >
                        Load More
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default TableDashboard;
