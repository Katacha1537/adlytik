import {
    Select,
    SelectItem,
    Card,
    CardHeader
} from "@nextui-org/react"
import CampaignTable from "./CampaignTable"
import { useState } from "react"

export default function Campaign() {
    const [periodSelection, setPeriodSelection] = useState("last_7d")
    return (
        <div className='mt-20 p-4'>
            <Card className="p-4 mb-8 bg-transparent shadow-none">
                <CardHeader>
                    <div className='flex items-center justify-between w-full'>
                        <h2 className='font-bold text-xl'>CAMPANHAS</h2>

                        <div className="flex gap-3 items-center">
                            <h2 className='text-sm'>Período:</h2>

                            <Select
                                className="w-36 max-w-xs"
                                defaultSelectedKeys={[`${periodSelection}`]}
                                value={periodSelection}
                                onChange={(e) => { setPeriodSelection(e.target.value) }}
                                size="sm"
                                radius="sm"
                                aria-label="Selecione um período"
                                aria-labelledby="periodLabel"
                            >

                                <SelectItem key="today" value="0">
                                    Hoje
                                </SelectItem>
                                <SelectItem key="yesterday" value="1">
                                    Ontem
                                </SelectItem>
                                <SelectItem key="last_7d" value="7">
                                    Últimos 7 dias
                                </SelectItem>
                                <SelectItem key="last_14d" value="14">
                                    Últimos 14 dias
                                </SelectItem>
                                <SelectItem key="this_month" value="31">
                                    Este Mês
                                </SelectItem>
                                <SelectItem key="last_month" value="60">
                                    Mês Anterior
                                </SelectItem>
                                <SelectItem key="maximum" value="36">
                                    Máximo
                                </SelectItem>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CampaignTable periodSelection={periodSelection} />
            </Card>
        </div>
    )
}
