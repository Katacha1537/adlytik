import React from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Card, CardHeader } from "@nextui-org/react";

const columns = [
    { name: "Nome do Projeto", uid: "projectName" },
    { name: "Status", uid: "status" },
    { name: "Responsável", uid: "responsible" },
    { name: "Ação", uid: "action" }
];

const projects = [
    { id: 1, projectName: "Projeto Alpha", status: "Ativo", responsible: "João Silva" },
    { id: 2, projectName: "Projeto Beta", status: "Inativo", responsible: "Maria Santos" },
    // Adicione mais projetos conforme necessário
];
const renderCell = (project, columnKey) => {
    const cellValue = project[columnKey];

    switch (columnKey) {
        case "projectName":
            return <p>{cellValue}</p>;
        case "status":
            // Ajuste a cor baseado no status do projeto
            const statusColor = cellValue === "Ativo" ? "success" : "error";
            return (
                <Chip color={statusColor} size="sm" variant="flat">
                    {cellValue}
                </Chip>
            );
        case "responsible":
            return <p>{cellValue}</p>;
        case "action":
            return (
                <button className="cursor-pointer bg-blue-500 text-white rounded-md p-2">
                    Entrar no Projeto
                </button>
            );
        default:
            return cellValue;
    }
};
export default function MyProjectsDashboard() {
    return (
        <div>
            <Card className="p-4 mb-8">
                <CardHeader>
                    <h4 className="font-bold text-large">Projetos</h4>
                </CardHeader>
                <Table aria-label="Tabela de Projetos" radius="none" shadow="none">
                    <TableHeader columns={columns}>
                        {column => (
                            <TableColumn key={column.uid} align={column.uid === "action" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={projects}>
                        {item => (
                            <TableRow key={item.id}>
                                {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
