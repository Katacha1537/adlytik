
import { Button } from "@nextui-org/react"
import { FaFacebookSquare } from "react-icons/fa";
import { SiGoogleads, SiGooglesheets } from "react-icons/si";

export default function Integrations() {
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
                <Button color="secondary" className="w-[150px]">Conectar</Button>
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
