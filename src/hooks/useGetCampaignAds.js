import { useEffect, useState } from 'react';

const useGetCampaignAds = (adAccountId, periodSelection, accessToken) => {
    const [campaignData, setCampaignData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);

    const fetchData = async (status) => {
        try {
            const url = `https://graph.facebook.com/v18.0/${adAccountId}/insights?fields=campaign_name,objective,optimization_goal,cost_per_action_type,campaign_id,spend,cpm,ctr,cpc,actions,reach&date_preset=${periodSelection}&level=campaign&filtering=[{"field":"ad.effective_status","operator":"IN","value":["${status}"]}]&access_token=${accessToken}`;

            console.log(url);

            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            return data.data;
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const processCampaignData = (data, status) => {
        return data.map(campaign => {
            const {
                campaign_id: id,
                campaign_name: name,
                spend,
                cpm,
                ctr,
                cpc,
                actions,
                reach
            } = campaign;

            // Encontrar os valores específicos dentro de "actions"
            const linkClickAction = actions.find(action => action.action_type === 'link_click') || { value: 0 };
            const leadsAction = actions.find(action => action.action_type === 'offsite_conversion.fb_pixel_lead') || { value: 0 };
            const conversationAction = actions.find(action => action.action_type === 'onsite_conversion.messaging_conversation_started_7d') || { value: 0 };
            const purchaseAction = actions.find(action => action.action_type === 'purchase') || { value: 0 };

            // Calculando os custos por conversa e compra
            const conversationCount = parseInt(conversationAction.value) || 0;
            const leadsCount = parseInt(leadsAction.value) || 0;
            const purchaseCount = parseInt(purchaseAction.value) || 0;

            const costPerConversation = conversationCount !== 0 ? spend / conversationCount : 0;
            const costPerPurchase = purchaseCount !== 0 ? spend / purchaseCount : 0;

            // Montar o objeto processado sem formatação
            const processedCampaign = {
                id,
                name,
                status: status,
                spend,
                cpm,
                ctr,
                cpc,
                leads: leadsCount,
                conversation: conversationCount, // Assumindo que 'onsite_conversion.messaging_conversation_started_7d' é o mesmo que 'conversation'
                cost_per_conversation: costPerConversation, // Assumindo o mesmo princípio
                purchase: purchaseCount,
                cost_per_purchase: costPerPurchase,
                reach: parseInt(reach)
            };

            return processedCampaign;
        });
    };



    const refetchData = async () => {
        try {
            setLoading(true);

            if (!dataFetched && periodSelection) {
                const activeData = await fetchData("ACTIVE");
                const pausedData = await fetchData("CAMPAIGN_PAUSED");

                const activeCampaigns = processCampaignData(activeData, 'Ativo');
                const pausedCampaigns = processCampaignData(pausedData, 'Desativado');

                const mergedData = [...activeCampaigns, ...pausedCampaigns];

                setCampaignData(mergedData)

            }

            setLoading(false);
            setError(null);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const fetchDataForBothStatus = async () => {
        try {
            setLoading(true);

            if (periodSelection) {
                const activeData = await fetchData("ACTIVE");
                const pausedData = await fetchData("CAMPAIGN_PAUSED");

                const activeCampaigns = processCampaignData(activeData, 'Ativo');
                const pausedCampaigns = processCampaignData(pausedData, 'Desativado');

                const mergedData = [...activeCampaigns, ...pausedCampaigns];

                setCampaignData(mergedData);
            }

            setLoading(false);
            setError(null);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Se accessToken e adAccountId estiverem presentes e os dados ainda não foram buscados, então fazer a busca
        if (accessToken && adAccountId && !dataFetched) {
            refetchData();
        }
    }, [accessToken, adAccountId, periodSelection, dataFetched])

    return { campaignData, loading, error, refetchData };
};

export default useGetCampaignAds;
