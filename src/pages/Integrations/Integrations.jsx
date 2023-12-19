import React, { useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip } from "@nextui-org/react";
import { FaEdit as EditIcon, FaTrashAlt as DeleteIcon, FaEye as EyeIcon } from "react-icons/fa"

const statusColorMap = {
    connected: "success",
    disconnected: "danger",
    pending: "warning",
};

// Exemplo de colunas para a tabela
const columns = [
    { name: "Name", uid: "name" },
    { name: "Status", uid: "status" },
    { name: "Actions", uid: "actions" },
];

// Exemplo de dados de integrações
const integrations = [
    {
        id: 1,
        name: "Facebook Integration 1",
        status: "connected",
        // Adicione mais propriedades conforme necessário
    },
    {
        id: 2,
        name: "Facebook Integration 2",
        status: "disconnected",
        // Adicione mais propriedades conforme necessário
    },
    {
        id: 3,
        name: "Facebook Integration 3",
        status: "pending",
        // Adicione mais propriedades conforme necessário
    },
    // ... outras integrações
];

export default function Integrations() {
    const renderCell = useCallback((integration, columnKey) => {
        const cellValue = integration[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <p className="text-bold text-sm">{cellValue}</p>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[integration.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit integration">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete integration">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="mt-20">
            <div>
                <h1>Lista de Integrações</h1>
            </div>
            <Table aria-label="Example table with integration cells" >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={integrations}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
