import {
    Select,
    SelectItem,
    Card,
    CardHeader
} from "@nextui-org/react"
import CampaignTable from "./CampaignTable"

export default function Campaign() {
    return (
        <div className='mt-20 p-4'>
            <Card className="p-4 mb-8 bg-transparent shadow-none">
                <CardHeader>
                    <div className='flex items-center justify-between w-full'>
                        <h2 className='font-bold text-xl'>Lista de Metas</h2>

                        <div className="flex gap-3 items-center">
                            <h2 className='text-sm'>Período:</h2>

                            <Select
                                className="w-36 max-w-xs"
                                selectedKeys={["itMoth"]}
                                size="sm"
                                radius="sm"
                            >

                                <SelectItem key="itMoth" value="31">
                                    Este Mês
                                </SelectItem>
                                <SelectItem key="beforeMoth" value="60">
                                    Mês Anterior
                                </SelectItem>
                                <SelectItem key="today" value="0">
                                    Hoje
                                </SelectItem>
                                <SelectItem key="yesterday" value="1">
                                    Ontem
                                </SelectItem>
                                <SelectItem key="lastSevenDays" value="7">
                                    Últimos 7 dias
                                </SelectItem>
                                <SelectItem key="lastFourteenDays" value="14">
                                    Últimos 14 dias
                                </SelectItem>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CampaignTable />
            </Card>
        </div>
    )
}
