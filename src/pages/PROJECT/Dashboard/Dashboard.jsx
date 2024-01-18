import { useEffect, useState } from 'react';
import ConversationDashboard from './ConversationDashboard';
import GeneralDashboard from './GeneralDashboard';
import Header from './Header';
import LeadsDashboard from './LeadsDashboard';
import SellsDashboard from './SellsDashboard';




const customerData = [
    { latitude: -15.7801, longitude: -47.9292 }, // Brasília
    { latitude: -23.5505, longitude: -46.6333 }, // São Paulo
    // Adicione mais clientes conforme necessário
]

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('general')

    const clientName = "Dr. Fernando Silva";

    const generalMetrics = [
        { title: "Valor Investido", value: "R$1.500,00", description: "Último Mês", growth: "25.32%" },
        { title: "Impressão", value: "2.000", description: "Último Mês", growth: "25.32%" },
        { title: "Alcance", value: "1.200", description: "Último Mês", growth: "-25.32%" },
        { title: "Cliques no Link", value: "862", description: "Último Mês", growth: "25.32%" },
    ];

    const conversionMetrics = [
        { title: "Leads", tooltip: "Taxa de cliques no link", value: "1520", description: "Último Mês", growth: "25.32%" },
        { title: "Conversas", tooltip: "Custo por clique", value: "1205", description: "Último Mês", growth: "25.32%" },
        { title: "Vendas", tooltip: "Custo por mil impressão", value: "125", description: "Último Mês", growth: "-25.32%" },
        { title: "Custo por Conversa", tooltip: "Custo por aquisição", value: "R$59,63", description: "Último Mês", growth: "-25.32%" },
    ];

    const investmentMetrics = [
        { title: "CPM", tooltip: "Custo por mil impressão", value: "R$0,75", description: "Último Mês", growth: "-25.32%" },
        { title: "CPC", tooltip: "Custo por clique", value: "R$1,74", description: "Último Mês", growth: "25.32%" },
        { title: "CTR", tooltip: "Taxa de cliques no link", value: "1.89%", description: "Último Mês", growth: "25.32%" },
        { title: "CPA", tooltip: "Custo por aquisição", value: "R$59,63", description: "Último Mês", growth: "-25.32%" },
    ];

    const leadsMetrics = [
        { title: "Leads", tooltip: "Taxa de cliques no link", value: "1520", description: "Último Mês", growth: "25.32%" },
        { title: "CPM", tooltip: "Custo por clique", value: "1205", description: "Último Mês", growth: "25.32%" },
        { title: "CPC", tooltip: "Custo por mil impressão", value: "125", description: "Último Mês", growth: "-25.32%" },
        { title: "CTR", tooltip: "Custo por aquisição", value: "R$59,63", description: "Último Mês", growth: "-25.32%" },
    ];

    const conversationMetrics = [
        { title: "Conversas", tooltip: "Taxa de cliques no link", value: "1520", description: "Último Mês", growth: "25.32%" },
        { title: "CPM", tooltip: "Custo por clique", value: "1205", description: "Último Mês", growth: "25.32%" },
        { title: "Custo por Conversa", tooltip: "Custo por mil impressão", value: "125", description: "Último Mês", growth: "-25.32%" },
        { title: "CTR", tooltip: "Custo por aquisição", value: "R$59,63", description: "Último Mês", growth: "-25.32%" },
    ];

    const vendasMetrics = [
        { title: "Vendas", tooltip: "Taxa de cliques no link", value: "1520", description: "Último Mês", growth: "25.32%" },
        { title: "CPM", tooltip: "Custo por clique", value: "1205", description: "Último Mês", growth: "25.32%" },
        { title: "CPA", tooltip: "Custo por mil impressão", value: "125", description: "Último Mês", growth: "-25.32%" },
        { title: "CTR", tooltip: "Custo por aquisição", value: "R$59,63", description: "Último Mês", growth: "-25.32%" },
    ];

    return (
        <div id="report" className="mt-20 p-4">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex items-center gap-4 mb-4">
                <div className="flex flex-col">
                    <h3 className="text-md font-bold">CLIENTE</h3>
                    <h3 className="text-lg font-bold">{clientName}</h3>
                </div>
                @
            </div>

            {activeTab === 'general' && (
                <GeneralDashboard
                    customerData={customerData}
                    generalMetrics={generalMetrics}
                    conversionMetrics={conversionMetrics}
                    investmentMetrics={investmentMetrics}
                />
            )}
            {activeTab === 'leads' && (
                <LeadsDashboard
                    customerData={customerData}
                    generalMetrics={generalMetrics}
                    conversionMetrics={leadsMetrics}
                    investmentMetrics={investmentMetrics}
                />
            )}
            {activeTab === 'conversations' && (
                <ConversationDashboard
                    customerData={customerData}
                    generalMetrics={generalMetrics}
                    conversionMetrics={conversationMetrics}
                    investmentMetrics={investmentMetrics}
                />
            )}
            {activeTab === 'sells' && (
                <SellsDashboard
                    customerData={customerData}
                    generalMetrics={generalMetrics}
                    conversionMetrics={vendasMetrics}
                    investmentMetrics={investmentMetrics}
                />
            )}

        </div>
    );
}

export default Dashboard;
