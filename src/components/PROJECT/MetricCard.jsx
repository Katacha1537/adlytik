import { Card, Chip, Tooltip } from '@nextui-org/react'
import { FaArrowUp, FaArrowDown } from "react-icons/fa6"

export default function MetricCard({ title, value, description, growth, tooltip }) {
    const isNegative = growth.startsWith("-");
    const chipColor = isNegative ? "danger" : "success";

    return (
        <Card className="p-3 flex flex-row items-end justify-between gap-3">
            {tooltip ? (
                <Tooltip content={tooltip}>
                    <div className='flex flex-col gap-2 items-start'>
                        <h3 className={`font-bold text-sm`}>{title}</h3>
                        <p className={`font-bold text-2xl`}>{value}</p>
                        <p className={`text-md`}>{description}</p>
                    </div>
                </Tooltip>
            ) : (
                <div className='flex flex-col gap-2 items-start'>
                    <h3 className={`font-bold text-sm`}>{title}</h3>
                    <p className={`font-bold text-2xl`}>{value}</p>
                    <p className={`text-md`}>{description}</p>
                </div>
            )}
            <div>
                <Chip
                    startContent={isNegative ? <FaArrowDown size={18} /> : <FaArrowUp size={18} />}
                    variant="faded"
                    color={chipColor}
                >
                    {growth}
                </Chip>
            </div>
        </Card>
    );
}
