import { useEffect, useState } from 'react';
import ConversationDashboard from './ConversationDashboard';
import GeneralDashboard from './GeneralDashboard';
import Header from './Header';
import { Spinner } from '@nextui-org/react';
import LeadsDashboard from './LeadsDashboard';
import SellsDashboard from './SellsDashboard';
import { useDocument } from "../../../hooks/useDocument";
import { useParams } from 'react-router-dom';
import { useUserDocument } from '../../../hooks/useUserDocument';
import useGetInsightAdAccounts from '../../../hooks/useGetInsightAdAccounts';

const customerData = [
    { latitude: -15.7801, longitude: -47.9292 }, // Brasília
    { latitude: -23.5505, longitude: -46.6333 }, // São Paulo
    // Adicione mais clientes conforme necessário
]

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('general')
    const [periodSelection, setPeriodSelection] = useState("last_7d")

    const { id: projectId } = useParams()
    const { document: projectDocument } = useDocument("projects", projectId)
    const { userDocument } = useUserDocument();

    const { accountData, loading, insigtsRangeData, insigtsAgeGenderData, regionData } = useGetInsightAdAccounts(projectDocument?.adAccount, periodSelection, userDocument?.facebookToken)
    console.log(regionData)
    const generalMetrics = [
        { title: "Valor Investido", tooltip: "Valor Investido", value: `${accountData?.spend || 0}` },
        { title: "Impressão", tooltip: "Impressão", value: `${accountData?.impressions || 0}` },
        { title: "Alcance", tooltip: "Alcance", value: `${accountData?.reach || 0}` },
        { title: "Cliques no Link", tooltip: "Cliques no Link", value: `${accountData?.linkClick || 0}` },
    ];

    const conversionMetrics = [
        { title: "Leads", tooltip: "Leads", value: `${accountData?.leads || 0}` },
        { title: "Conversas", tooltip: "Conversas", value: `${accountData?.conversation || 0}` },
        { title: "Vendas", tooltip: "Vendas", value: `${accountData?.purchase || 0}` },
        { title: "Custo por Conversa", tooltip: "Custo por Conversa", value: `${accountData?.cost_per_conversation || 0}` },
    ];

    const investmentMetrics = [
        { title: "CPM", tooltip: "Custo por mil impressão", value: `${accountData?.cpm || 0}` },
        { title: "CPC", tooltip: "Custo por clique", value: `${accountData?.cpc || 0}` },
        { title: "CTR", tooltip: "Taxa de cliques no link", value: `${accountData?.ctr || 0}` },
        { title: "CPA", tooltip: "Custo por aquisição", value: `${accountData?.cost_per_purchase || 0}` },
    ];

    const leadsMetrics = [
        { title: "Leads", tooltip: "Leads", value: `${accountData?.leads || 0}` },
        { title: "CPM", tooltip: "Custo por mil impressão", value: `${accountData?.cpm || 0}` },
        { title: "CPC", tooltip: "Custo por clique", value: `${accountData?.cpc || 0}` },
        { title: "CTR", tooltip: "Taxa de cliques no link", value: `${accountData?.ctr || 0}` },
    ];

    const conversationMetrics = [
        { title: "Conversas", tooltip: "Conversas", value: `${accountData?.conversation || 0}` },
        { title: "CPM", tooltip: "Custo por mil impressão", value: `${accountData?.cpm || 0}` },
        { title: "Custo por Conversa", tooltip: "Custo por Conversa", value: `${accountData?.cost_per_conversation || 0}` },
        { title: "CTR", tooltip: "Taxa de cliques no link", value: `${accountData?.ctr || 0}` },
    ];

    const vendasMetrics = [
        { title: "Vendas", tooltip: "Vendas", value: `${accountData?.purchase || 0}` },
        { title: "CPM", tooltip: "Custo por mil impressão", value: `${accountData?.cpm || 0}` },
        { title: "CPA", tooltip: "Custo por aquisição", value: `${accountData?.cost_per_purchase || 0}` },
        { title: "CTR", tooltip: "Taxa de cliques no link", value: `${accountData?.ctr || 0}` },
    ];

    useEffect(() => {
        // Adiciona a classe ao body quando o componente montar
        if (loading) {
            document.body.style.overflow = 'hidden';
        }

        // Remove a classe do body quando o componente desmontar
        return () => {
            document.body.style.overflow = '';
        };
    }, [loading])

    return (
        <div id="report" className="mt-20 p-4 relative">
            <Header
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                periodSelection={periodSelection}
                setPeriodSelection={setPeriodSelection}
            />

            <div className="flex items-center gap-4 mb-4">
                <div className="flex flex-col">
                    <h3 className="text-md font-bold">CLIENTE</h3>
                    <h3 className="text-lg font-bold">{projectDocument?.nameProject}</h3>
                </div>
                @
            </div>

            {activeTab === 'general' && (
                <GeneralDashboard
                    customerData={customerData}
                    generalMetrics={generalMetrics}
                    conversionMetrics={conversionMetrics}
                    investmentMetrics={investmentMetrics}
                    insigtsRangeData={insigtsRangeData}
                    insigtsAgeGenderData={insigtsAgeGenderData}
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

            {loading && (
                <div className="absolute inset-0 flex items-start max-h-screen justify-center backdrop-blur-sm bg-slate-950/30 z-50">
                    <div className="flex items-center justify-center w-h-screen h-full">
                        <Spinner color="secondary" size="lg" />
                    </div>
                </div>
            )}

        </div>
    );
}

export default Dashboard;
