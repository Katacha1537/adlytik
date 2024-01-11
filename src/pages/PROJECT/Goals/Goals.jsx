import React, { useState } from 'react';
import CardGoals from "./CardGoals";
import { Button, useDisclosure } from "@nextui-org/react";
import { GoPlusCircle } from "react-icons/go";
import ModalGoal from './ModalGoalsCreate';
import { v4 as uuidv4 } from 'uuid'
import ModalGoalsEdit from './ModalGoalsEdit';

export default function Goals() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit } = useDisclosure()

    const [newGoals, setNewGoals] = useState({ nameGoal: '', status: '', metric: '', goal: '' })
    const [editingGoal, setEditingGoal] = useState(null)
    const [newValue, setNewValue] = useState(0)
    const [viewGoals, setViewGoals] = useState(null)
    const [goals, setGoals] = useState([{
        id: 1,
        nameGoal: "Aumentar Cliques",
        goal: 500,
        metric: 350,
        responsible: "https://example.com/avatar1.jpg",
    },
    {
        id: 2,
        nameGoal: "Conversões",
        goal: 50,
        metric: 30,
        responsible: "https://example.com/avatar2.jpg",
    }])

    const updateGoalField = (field, value) => {
        if (field === "metric") {
            console.log(value)
            switch (value) {
                case "clicks":
                    setNewValue(30)
                    break;
                case "impressions":
                    setNewValue(100)
                    break;
                case "conversions":
                    setNewValue(100)
                    break;
                case "ctr":
                    setNewValue(10)
                    break;
                case "cpc":
                    setNewValue(20)
                    break;
                case "cpm":
                    setNewValue(30)
                    break;
                case "reach":
                    setNewValue(3)
                    break;
                case "video_views":
                    setNewValue(2)
                    break;
                case "engagement":
                    setNewValue(65)
                    break;
                case "leads":
                    setNewValue(30)
                    break;
                default:
                    break;
            }
            return setNewGoals({ ...newGoals, [field]: newValue });
        }

        setNewGoals({ ...newGoals, [field]: value });

    }

    const handleAddGoal = () => {
        console.log(newGoals)
        // Verifique se todos os campos necessários foram preenchidos
        if (newGoals.nameGoal && newGoals.status && newGoals.metric && newGoals.goal) {
            // Adicione a nova meta à lista
            const newGoalsObject = {
                id: uuidv4(), // Utilizando uuid para gerar um ID único
                ...newGoals
            }

            setGoals([...goals, newGoalsObject]);
            // Limpe os campos do novo objetivo
            setNewGoals({ nameGoal: '', status: '', metric: '', goal: '' });
            // Feche o modal
            onOpenChange(false);
        } else {
            // Caso contrário, exiba uma mensagem de erro ou tome a ação apropriada
            console.error("Preencha todos os campos obrigatórios!");
        }
    }

    const deleteGoal = (id) => {
        // Filtra as metas para manter todas, exceto aquela com o ID fornecido
        const updatedGoals = goals.filter((goal) => goal.id !== id);
        setGoals(updatedGoals);
    }

    const handleEditGoal = () => {
        const updatedGoals = goals.map((goal) =>
            goal.id === editingGoal.id ? { ...goal, ...newGoals } : goal
        );
        setGoals(updatedGoals);
        setEditingGoal(null); // Limpe a meta em edição
        onOpenChangeEdit(false); // Feche o modal de edição
    }

    const handleEditGoals = (goalId) => {
        const viewTaskHere = goals.filter(goal => goal.id === goalId)
        setViewGoals(viewTaskHere)
        onOpenEdit()
    }

    return (
        <div className='mt-20 p-4'>
            <div className='flex items-center justify-between w-full'>
                <h2 className='font-bold text-xl'>Lista de Metas</h2>
                <Button onPress={onOpen} color="secondary" startContent={<GoPlusCircle />}>
                    Nova Meta
                </Button>
            </div>
            <div className="w-full mt-8 flex flex-wrap gap-4">
                {goals.map((goal) => (
                    <CardGoals
                        deleteGoal={deleteGoal}
                        key={goal.id}
                        idGoals={goal.id}
                        nameGoals={goal.nameGoal}
                        goals={goal.goal}
                        metric={goal.metric}
                        responsible={goal.responsible}
                        onOpenEdit={() => {
                            handleEditGoals(goal.id)
                        }}
                    />

                ))}
            </div>
            <ModalGoal
                isOpen={isOpen}
                newGoal={newGoals}
                onOpenChange={onOpenChange}
                updateGoalField={updateGoalField}
                handleAddGoal={handleAddGoal}
            />
            <ModalGoalsEdit
                isOpen={isOpenEdit}
                newGoal={newGoals}
                setNewGoals={setNewGoals}
                onOpenChange={onOpenChangeEdit}
                updateGoalField={updateGoalField}
                handleAddGoal={handleAddGoal}
                handleEditGoal={handleEditGoal}
                viewGoals={viewGoals}
            />
        </div>
    );
}
