import { Button } from "@nextui-org/react";
import { FaFacebookSquare } from "react-icons/fa";
import { SiGoogleads, SiGooglesheets } from "react-icons/si";
import FacebookLogin from 'react-facebook-login';
import { useState } from "react";
import { getLongLivedToken } from "../../../utils/getLongLivedToken"

import { useAuthContext } from "../../../hooks/useAuthContext";
import { useFirestore } from "../../../hooks/useFirestore";
import { addDays } from "date-fns";
import { useIntegration } from "../../../hooks/useIntegration";

export default function Integrations() {
    const { updateDocument } = useFirestore("users")
    const { user } = useAuthContext()
    const { integration } = useIntegration()

    function getDayIn60Days() {
        const today = new Date();
        const futureDate = addDays(today, 60)
        return futureDate;
    }

    const responseFacebook = async (response) => {

        if (response.userID) {

            try {
                // Obter token de longa duração
                const longLivedToken = await getLongLivedToken(response.accessToken)

                try {
                    const result = await updateDocument(user.uid, {
                        facebookToken: longLivedToken,
                        expireTokenIn: getDayIn60Days(),
                        userIntegration: true,
                    })
                    return result
                } catch (error) {
                    console.log(error)
                }
            } catch (error) {
                // Tratamento para o caso de erro ao obter o token de longa duração
                console.error("Erro ao obter token de longa duração:", error.message)
            }
        } else {
            // Tratamento para o caso de erro ou login cancelado
        }
    }



    return (
        <div className="mt-20 p-6">
            <div>
                <h2 className="text-2xl font-bold">Lista de Integrações</h2>
            </div>
            <div className="flex justify-between w-full mt-4 border-1 border-content3 rounded-md p-2">
                <div className="flex items-center gap-3">
                    <FaFacebookSquare size={32} className="text-blue-500" />
                    <h3 className="font-bold">Facebook</h3>
                </div>
                {integration ? (
                    <Button color="secondary" isDisabled className="w-[150px]">Conectado</Button>
                ) : (
                    <FacebookLogin
                        appId="1445241209543990"
                        autoLoad={false}
                        fields="name,email,picture"
                        scope="public_profile,email,ads_read,read_insights"
                        textButton="Conectar"
                        cssClass="text-foreground-50 bg-purple-700 pt-2 pb-2 pr-4 pl-4 w-[150px] rounded-lg"
                        callback={responseFacebook}
                    />
                )}
            </div>
            <div className="flex justify-between w-full mt-4 border-1 border-content3 rounded-md p-2">
                <div className="flex items-center gap-3">
                    <SiGoogleads size={32} className="text-yellow-500 opacity-50" />
                    <h3 className="font-bold text-foreground-400">Google Ads (em breve)</h3>
                </div>
                <Button color="secondary" isDisabled className="w-[150px]">Conectar</Button>
            </div>
            <div className="flex justify-between w-full mt-4 border-1 border-content3 rounded-md p-2">
                <div className="flex items-center gap-3">
                    <SiGooglesheets size={32} className="text-green-500 opacity-50" />
                    <h3 className="font-bold text-foreground-400">Google Sheet (em breve)</h3>
                </div>
                <Button color="secondary" isDisabled className="w-[150px]">Conectar</Button>
            </div>
        </div>
    );
}
