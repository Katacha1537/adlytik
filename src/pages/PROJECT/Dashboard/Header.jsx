
import { Card, Select, SelectItem, Spacer } from '@nextui-org/react';

export default function Header({ setActiveTab, activeTab }) {
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
                    <Select className="w-36 max-w-xs" selectedKeys={['EsteMês']} size="sm" radius="sm">
                        <SelectItem key="EsteMês" value="EsteMês">
                            Este mês
                        </SelectItem>
                        <SelectItem key="EstaSemana" value="EstaSemana">
                            Esta semana
                        </SelectItem>
                        <SelectItem key="Ontem" value="Ontem">
                            Ontem
                        </SelectItem>
                        <SelectItem key="Hoje" value="Hoje">
                            Hoje
                        </SelectItem>
                        <SelectItem key="Ultimos14Dias" value="Ultimos14Dias">
                            Últimos 14 dias
                        </SelectItem>
                    </Select>
                </div>
            </div>
        </Card>
    )
}
