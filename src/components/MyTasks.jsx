import React from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Card, CardHeader } from "@nextui-org/react";

const columns = [
    { name: "Nome da Tarefa", uid: "nameTask" },
    { name: "Descrição", uid: "description" },
    { name: "Status", uid: "status" },
    { name: "Prioridade", uid: "priority" },
    { name: "Responsável", uid: "responsible" }
];

const tasks = [
    { id: 1, nameTask: "Desenvolvimento Frontend", description: "Criar a interface do usuário", status: "Em andamento", priority: "Alta", responsible: "João Silva" },
    { id: 2, nameTask: "Testes de Backend", description: "Implementar testes unitários", status: "Pendente", priority: "Média", responsible: "Maria Santos" },
    { id: 3, nameTask: "Design do Produto", description: "Desenhar novas telas", status: "Concluído", priority: "Baixa", responsible: "Ana Pereira" },
    { id: 4, nameTask: "Revisão de Código", description: "Revisar o código da nova funcionalidade", status: "Em andamento", priority: "Alta", responsible: "Carlos Magno" },
    { id: 5, nameTask: "Documentação Técnica", description: "Elaborar documentação do projeto", status: "Pendente", priority: "Média", responsible: "Roberta Dias" }
    // Adicione mais tarefas conforme necessário
];

const renderCell = (task, columnKey) => {
    const cellValue = task[columnKey];

    switch (columnKey) {
        case "nameTask":
            return <p>{cellValue}</p>;
        case "description":
            return <p>{cellValue}</p>;
        case "status":
            return (
                <Chip color="success" size="sm" variant="flat">
                    {cellValue}
                </Chip>
            );
        case "priority":
            return <p>{cellValue}</p>;
        case "responsible":
            return <p>{cellValue}</p>;
        case "actions":
            return (
                <div className="flex items-center gap-2">
                    <Tooltip content="Detalhes">
                        <span className="cursor-pointer">
                            <FaEye />
                        </span>
                    </Tooltip>
                    <Tooltip content="Editar">
                        <span className="cursor-pointer">
                            <FaEdit />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Deletar">
                        <span className="cursor-pointer">
                            <FaTrashAlt />
                        </span>
                    </Tooltip>
                </div>
            );
        default:
            return cellValue;
    }
};

export default function App() {

    const tableStyle = {
        border: "none",
        boxShadow: "none"
    }
    return (
        <div>
            <Card>
                <CardHeader className="no-border-table">
                    <h2 className="text-lg font-bold">Minhas Tarefas</h2>
                </CardHeader>
                <Table aria-label="Tabela de tarefas com células customizadas" style={tableStyle}>
                    <TableHeader columns={columns}>
                        {column => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={tasks}>
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
