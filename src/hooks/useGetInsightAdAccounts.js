import { useEffect, useState } from 'react';

const useGetInsightAdAccounts = (adAccountId, periodSelection, accessToken) => {
    const [accountData, setAccountData] = useState({});
    const [insigtsRangeData, setInsigtsRangeData] = useState([]);
    const [insigtsAgeGenderData, setInsigtsAgeGenderData] = useState([]);
    const [regionsData, setRegionsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataFetched, setDataFetched] = useState(false)

    const fetchData = async () => {
        try {
            const url = `https://graph.facebook.com/v18.0/${adAccountId}/insights?fields=account_name,spend,impressions,reach,cpm,cpc,actions&date_preset=${periodSelection}&level=account&access_token=${accessToken}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            return processAccountData(data.data[0]) // Considerando que estamos buscando dados de uma única conta
        } catch (err) {
            handleFetchError(err);
        }
    }

    const fetchDataDemographic = async () => {
        try {
            const url = `https://graph.facebook.com/v18.0/${adAccountId}/insights?&breakdowns=age,gender&fields=actions&date_preset=${periodSelection}&level=account&access_token=${accessToken}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error.message);
            }

            return processAgeGenderData(data.data) // Considerando que estamos buscando dados de uma única conta
        } catch (err) {
            handleFetchError(err);
        }
    }

    const fetchDataRegion = async () => {
        let dataFetch = [];

        try {
            let hasNextPage = true;
            let url = `https://graph.facebook.com/v18.0/${adAccountId}/insights?&breakdowns=region&fields=actions&date_preset=${periodSelection}&level=account&access_token=${accessToken}`;

            while (hasNextPage) {
                const response = await fetch(url);
                const data = await response.json();
                console.log((data.data))
                /*if (data.error) {
                    throw new Error(data.error.message);
                }

                dataFetch = [...dataFetch, ...processRegionData(data.data)];

                // Check if there is a 'next' property in the paging section
                if (data.paging && data.paging.next) {
                    url = data.paging.next;
                } else {
                    hasNextPage = false;
                }*/
            }

            // Now 'dataFetch' contains all the data from multiple pages
            return dataFetch;
        } catch (err) {
            handleFetchError(err);
        }
    };


    function getStartDate(periodSelection) {
        const today = new Date();
        let startDate;

        switch (periodSelection) {
            case 'today':
                startDate = today;
                break;
            case 'yesterday':
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 1);
                break;
            case 'last_7d':
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 7);
                break;
            case 'last_14d':
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 14);
                break;
            case 'this_month':
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                break;
            case 'last_month':
                startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                break;
            case 'maximum':
                startDate = new Date(today);
                startDate.setMonth(today.getMonth() - 37); // 3 anos atrás
                break;
            default:
                // Lógica para outros valores de periodSelection, se necessário
                break;
        }

        // Formata a data para 'yyyy-mm-dd'
        const formattedStartDate = formatDateToYYYYMMDD(startDate);

        return formattedStartDate;
    }

    function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é base 0, então somamos 1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getFetchType(periodSelection) {
        switch (periodSelection) {
            case 'today':
            case 'yesterday':
            case 'last_7d':
            case 'last_14d':
            case 'this_month':
                return 'daily';
            case 'last_month':
                return 'weekly';
            case 'maximum':
                return 'monthly';
            default:
                // Adicione lógica para outros valores de periodSelection, se necessário
                return null;
        }
    }

    const fetchDataHistorical = async (startDatePeriod, endDatePeriod) => {
        try {
            const url = endDatePeriod
                ? `https://graph.facebook.com/v18.0/${adAccountId}/insights?fields=spend,actions&time_range={"since":"${startDatePeriod}","until":"${endDatePeriod}"}&level=account&access_token=${accessToken}`
                : `https://graph.facebook.com/v18.0/${adAccountId}/insights?fields=spend,actions&time_range={"since":"${startDatePeriod}","until":"${startDatePeriod}"}&level=account&access_token=${accessToken}`
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            return processDailyData(data.data[0]) // Considerando que estamos buscando dados de uma única conta
        } catch (err) {
            handleFetchError(err);
        }
    }

    const fetchDataDaily = async () => {
        const startDate = getStartDate(periodSelection);
        const today = new Date();
        let currentDate = new Date(startDate);

        // Array para armazenar os resultados diários
        const dailyData = [];

        while (currentDate <= today) {
            const formattedCurrentDate = formatDateToYYYYMMDD(currentDate);
            const result = await fetchDataHistorical(formattedCurrentDate);

            // Adicione os resultados ao array
            dailyData.push({
                date: formattedCurrentDate,
                ...result,
            });

            // Incrementa um dia
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Aqui, você pode salvar ou processar o array de dados diários conforme necessário
        setInsigtsRangeData(dailyData)
        //console.log('Dados Diários:', dailyData);
    }

    const fetchDataWeekly = async () => {
        const startDate = getStartDate(periodSelection);
        const today = new Date();
        let currentDate = new Date(startDate);

        // Array para armazenar os resultados semanais
        const weeklyData = [];

        while (currentDate <= today) {
            const formattedCurrentDate = formatDateToYYYYMMDD(currentDate);
            const endDate = new Date(currentDate);
            endDate.setDate(endDate.getDate() + 6); // Adiciona 6 dias para obter uma semana

            const formattedEndDate = formatDateToYYYYMMDD(endDate);
            const result = await fetchDataHistorical(formattedCurrentDate, formattedEndDate);

            // Adicione os resultados ao array
            weeklyData.push({
                start_date: formattedCurrentDate,
                end_date: formattedEndDate,
                ...result,
            });

            // Incrementa uma semana
            currentDate.setDate(currentDate.getDate() + 7);
        }
        setInsigtsRangeData(weeklyData)
        // Aqui, você pode salvar ou processar o array de dados semanais conforme necessário
        //console.log('Dados Semanais:', weeklyData);
    }

    const fetchDataMonthly = async () => {
        const startDate = getStartDate(periodSelection);
        const today = new Date();
        let currentDate = new Date(startDate);

        // Array para armazenar os resultados mensais
        const monthlyData = [];

        while (currentDate <= today) {
            const formattedCurrentDate = formatDateToYYYYMMDD(currentDate);

            // Obtém o último dia do mês atual
            const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            const formattedEndDate = formatDateToYYYYMMDD(lastDayOfMonth);

            const result = await fetchDataHistorical(formattedCurrentDate, formattedEndDate);

            // Adicione os resultados ao array
            monthlyData.push({
                start_date: formattedCurrentDate,
                end_date: formattedEndDate,
                ...result,
            });

            // Avança para o próximo mês
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        setInsigtsRangeData(monthlyData)
        // Aqui, você pode salvar ou processar o array de dados mensais conforme necessário
        //console.log('Dados Mensais:', monthlyData);
    }

    const handleFetchError = (err) => {
        setError(err.message);
        setLoading(false);
        // Adicione qualquer outra lógica de tratamento de erro necessário
    }

    const formatNumber = (number, type) => {
        const options = {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        };

        switch (type) {
            case 'float':
                return new Intl.NumberFormat('pt-BR').format(number);
            case 'inteiro':
                return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(number);
            case 'real':
                return new Intl.NumberFormat('pt-BR', options).format(number);
            case 'porcentagem':
                return `${number.toFixed(2)}%`;
            default:
                return number;
        }
    }

    const processAgeGenderData = (data) => {
        const result = {
            purchase: { age: {}, gender: {} },
            conversation: { age: {}, gender: {} },
            leads: { age: {}, gender: {} },
        };

        data.forEach(entry => {
            const ageRange = entry.age;
            const gender = entry.gender.toLowerCase();

            // Purchase
            const purchaseAction = entry.actions.find(action => action.action_type === 'purchase') || { value: 0 };
            result.purchase.age[ageRange] = (result.purchase.age[ageRange] || 0) + parseInt(purchaseAction.value);
            result.purchase.gender[gender] = (result.purchase.gender[gender] || 0) + parseInt(purchaseAction.value);

            // Conversation
            const conversationAction = entry.actions.find(action => action.action_type === 'onsite_conversion.messaging_conversation_started_7d') || { value: 0 };
            result.conversation.age[ageRange] = (result.conversation.age[ageRange] || 0) + parseInt(conversationAction.value);
            result.conversation.gender[gender] = (result.conversation.gender[gender] || 0) + parseInt(conversationAction.value);

            // Leads
            const leadsAction = entry.actions.find(action => action.action_type === 'offsite_conversion.fb_pixel_lead') || { value: 0 };
            result.leads.age[ageRange] = (result.leads.age[ageRange] || 0) + parseInt(leadsAction.value);
            result.leads.gender[gender] = (result.leads.gender[gender] || 0) + parseInt(leadsAction.value);
        });

        return result;
    };

    const processRegionData = async (data) => {
        const result = [];

        for (const entry of data) {
            const regionName = entry.region;

            // Search for longitude and latitude based on region name
            const { longitude, latitude } = await getRegionCoordinates(regionName);

            // Purchase
            const purchaseAction = entry.actions.find(action => action.action_type === 'purchase') || { value: 0 };
            const purchaseData = {
                objective: 'purchase',
                region: regionName,
                value: parseInt(purchaseAction.value),
                longitude,
                latitude,
            };
            result.push(purchaseData);

            // Conversation
            const conversationAction = entry.actions.find(action => action.action_type === 'onsite_conversion.messaging_conversation_started_7d') || { value: 0 };
            const conversationData = {
                objective: 'conversation',
                region: regionName,
                value: parseInt(conversationAction.value),
                longitude,
                latitude,
            };
            result.push(conversationData);

            // Leads
            const leadsAction = entry.actions.find(action => action.action_type === 'offsite_conversion.fb_pixel_lead') || { value: 0 };
            const leadsData = {
                objective: 'leads',
                region: regionName,
                value: parseInt(leadsAction.value),
                longitude,
                latitude,
            };
            result.push(leadsData);
        }

        return result;
    };

    const getRegionCoordinates = async (regionName) => {
        // Replace this map with your actual data or API call to fetch coordinates
        const regionCoordinates = {
            'Acre (state)': { latitude: -9.0238, longitude: -70.812 },
            'Alagoas': { latitude: -9.5713, longitude: -36.7819 },
            'Amapá': { latitude: 0.9026, longitude: -52.003 },
            'Amazonas': { latitude: -3.4168, longitude: -65.8561 },
            'Bahia': { latitude: -12.9714, longitude: -38.5014 },
            'Ceará': { latitude: -3.7172, longitude: -38.5433 },
            'Espírito Santo': { latitude: -19.1834, longitude: -40.3089 },
            'Distrito Federal': { latitude: -15.8267, longitude: -47.9297 },
            'Goiás': { latitude: -15.827, longitude: -49.8362 },
            'Maranhão': { latitude: -5.7945, longitude: -35.211 },
            'Mato Grosso': { latitude: -15.5989, longitude: -56.0949 },
            'Mato Grosso do Sul': { latitude: -20.4428, longitude: -54.6464 },
            'Minas Gerais': { latitude: -18.918, longitude: -44.093 },
            'Pará': { latitude: -1.475, longitude: -48.4528 },
            'Paraíba': { latitude: -7.1219, longitude: -34.8829 },
            'Paraná': { latitude: -25.2521, longitude: -52.0215 },
            'Pernambuco': { latitude: -8.0476, longitude: -34.877 },
            'Piauí': { latitude: -5.0919, longitude: -42.8034 },
            'Rio de Janeiro (state)': { latitude: -22.9068, longitude: -43.1729 },
            'Rio Grande do Norte': { latitude: -5.7945, longitude: -35.211 },
            'Rio Grande do Sul': { latitude: -30.0346, longitude: -51.2177 },
            'Rondônia': { latitude: -8.7608, longitude: -63.9019 },
            'Roraima': { latitude: 2.8199, longitude: -60.6715 },
            'Santa Catarina': { latitude: -27.5954, longitude: -48.548 },
            'São Paulo (state)': { latitude: -23.5505, longitude: -46.6333 },
            'Sergipe': { latitude: -10.9472, longitude: -37.0731 },
            'Tocantins': { latitude: -10.9472, longitude: -37.0731 },
        };

        // Convert region name to lowercase for case-insensitive matching
        const lowercaseRegionName = regionName.toLowerCase();

        // Check if the region name exists in the map
        if (lowercaseRegionName in regionCoordinates) {
            return regionCoordinates[lowercaseRegionName];
        } else {
            // If the region name is not found, you might want to handle it accordingly
            console.error(`Coordinates not found for region: ${regionName}`);
            return { latitude: 0, longitude: 0 }; // Default coordinates
        }
    }


    const processAccountData = (data) => {

        const {
            account_name: name,
            spend,
            impressions,
            reach,
            cpm,
            cpc,
            actions
        } = data;

        // Encontrar os valores específicos dentro de "actions"
        const linkClickAction = actions.find(action => action.action_type === 'link_click') || { value: 0 };
        const initiateCheckoutAction = actions.find(action => action.action_type === 'offsite_conversion.fb_pixel_initiate_checkout') || { value: 0 };
        const leadsAction = actions.find(action => action.action_type === 'offsite_conversion.fb_pixel_lead') || { value: 0 };
        const conversationAction = actions.find(action => action.action_type === 'onsite_conversion.messaging_conversation_started_7d') || { value: 0 };
        const purchaseAction = actions.find(action => action.action_type === 'purchase') || { value: 0 };

        // Calculando os custos e contagens
        const linkClickCount = parseInt(linkClickAction.value) || 0;
        const initiateCheckoutCount = parseInt(initiateCheckoutAction.value) || 0;
        const leadsCount = parseInt(leadsAction.value) || 0;
        const conversationCount = parseInt(conversationAction.value) || 0;
        const purchaseCount = parseInt(purchaseAction.value) || 0;
        const ctrCount = (linkClickAction.value / impressions) * 100
        const costPerLinkClick = linkClickCount !== 0 ? spend / linkClickCount : 0;
        const costPerInitiateCheckout = initiateCheckoutCount !== 0 ? spend / initiateCheckoutCount : 0;
        const costPerLead = leadsCount !== 0 ? spend / leadsCount : 0;
        const costPerConversation = conversationCount !== 0 ? spend / conversationCount : 0;
        const costPerPurchase = purchaseCount !== 0 ? spend / purchaseCount : 0;

        // Montar o objeto processado sem formatação
        const processedAccount = {
            name,
            spend: formatNumber(spend, 'real'),
            impressions: formatNumber(impressions, 'inteiro'),
            reach: formatNumber(reach, 'inteiro'),
            cpm: formatNumber(cpm, 'real'),
            cpc: formatNumber(cpc, 'real'),
            ctr: formatNumber(ctrCount, 'porcentagem'),
            linkClick: formatNumber(linkClickCount, 'inteiro'),
            initiateCheckout: formatNumber(initiateCheckoutCount, 'inteiro'),
            leads: formatNumber(leadsCount, 'inteiro'),
            conversation: formatNumber(conversationCount, 'inteiro'),
            purchase: formatNumber(purchaseCount, 'inteiro'),
            cost_per_link_click: formatNumber(costPerLinkClick, 'real'),
            cost_per_initiate_checkout: formatNumber(costPerInitiateCheckout, 'real'),
            cost_per_lead: formatNumber(costPerLead, 'real'),
            cost_per_conversation: formatNumber(costPerConversation, 'real'),
            cost_per_purchase: formatNumber(costPerPurchase, 'real'),
        };

        return processedAccount;
    };

    const processDailyData = (data) => {
        const {
            spend,
            actions,
            date_start: dateStart,
            date_stop: dateStop
        } = data;

        // Encontrar os valores específicos dentro de "actions"
        const conversationAction = actions.find(action => action.action_type === 'onsite_conversion.messaging_conversation_started_7d') || { value: 0 };
        const leadsAction = actions.find(action => action.action_type === 'offsite_conversion.fb_pixel_lead') || { value: 0 };
        const linkClickAction = actions.find(action => action.action_type === 'link_click') || { value: 0 };
        const purchaseAction = actions.find(action => action.action_type === 'purchase') || { value: 0 };

        // Converter para float com 2 casas decimais
        const spendFloat = parseFloat(spend).toFixed(2);
        const conversationFloat = conversationAction.value;
        const leadsFloat = leadsAction.value;
        const linkClickFloat = linkClickAction.value;
        const purchaseFloat = purchaseAction.value;

        // Montar o objeto processado
        const processedData = {
            spend: spendFloat,
            conversation: conversationFloat,
            leads: leadsFloat,
            purchase: purchaseFloat,
            link_click: linkClickFloat,
        };

        return processedData;
    };


    const refetchData = async () => {
        try {
            setLoading(true);
            if (!dataFetched && periodSelection) {
                const result = await fetchData();
                setAccountData(result);

                const ageGenderData = await fetchDataDemographic()
                setInsigtsAgeGenderData(ageGenderData)

                const regionData = await fetchDataRegion()
                setRegionsData(regionData)

                const fetchType = getFetchType(periodSelection);

                // Lógica de acordo com o tipo de busca
                switch (fetchType) {
                    case 'daily':
                        await fetchDataDaily()
                        break;
                    case 'weekly':
                        await fetchDataWeekly()
                        break;
                    case 'monthly':
                        await fetchDataMonthly()
                        break;
                    default:
                        // Adicione lógica para outros tipos de busca, se necessário
                        break;
                }
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
        if (accessToken && adAccountId) {
            refetchData();
        }
    }, [accessToken, adAccountId, periodSelection])

    return { accountData, loading, error, insigtsRangeData, insigtsAgeGenderData, regionsData };
};

export default useGetInsightAdAccounts;
