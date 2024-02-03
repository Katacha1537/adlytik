
import { Card, Select, SelectItem, Spacer } from '@nextui-org/react';

export default function Header({ setActiveTab, activeTab, periodSelection, setPeriodSelection }) {
    const handleTabChange = (selectedTab) => {
        setActiveTab(selectedTab);
    };

    

    return (
        <Card className=" p-4 mb-8 " >
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <h3 className="font-bold text-md">CONTA</h3>
                    <Spacer x={2} />
                    <Select color='secondary' className="w-36 max-w-xs" selectedKeys={['Campanhas']} size="sm" radius="sm">
                        <SelectItem key="Campanhas" value="Campanhas">
                            Campanhas
                        </SelectItem>
                    </Select>
                </div>
                <div className="flex items-center">
                    <Select
                        className="w-36 max-w-xs mr-4"
                        defaultSelectedKeys={["general"]}
                        selectedKeys={[activeTab]}
                        size="sm"
                        radius="sm"
                        onChange={(e) => handleTabChange(e.target.value)}
                        aria-label="Selecione um tipo de dashboard"
                        aria-labelledby="dashboardType"
                    >
                        <SelectItem key="general" value="general">
                            Geral
                        </SelectItem>
                        <SelectItem key="leads" value="leads">
                            Leads
                        </SelectItem>
                        <SelectItem key="conversations" value="conversations">
                            Conversas
                        </SelectItem>
                        <SelectItem key="sells" value="sells">
                            Vendas
                        </SelectItem>
                    </Select>
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
        </Card>
    )
}
