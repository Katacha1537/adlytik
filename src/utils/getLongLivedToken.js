export const getLongLivedToken = async (shortLivedToken) => {
    const graphApiVersion = "v18.0";
    const appId = "1445241209543990";
    const appSecret = "98eb1b94c6088144b568d432cd8398bd";

    const url = `https://graph.facebook.com/${graphApiVersion}/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        if (data.access_token) {
            return data.access_token;
        } else {
            throw new Error("Erro ao obter token de longa duração");
        }
    } catch (error) {
        console.error("Erro ao obter token de longa duração:", error.message);
        throw error;
    }
};
