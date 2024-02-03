import { Card } from '@nextui-org/react';
import MetricCard from '../../../components/PROJECT/MetricCard';
import FunnelChart from '../../../components/PROJECT/FunnelChart';
import AreaChart from '../../../components/PROJECT/AreaChart';
import TableDashboard from '../../../components/PROJECT/TableDashboard';
import MapChart from '../../../components/PROJECT/MapChart';
import AgeChart from '../../../components/PROJECT/AgeChart';
import PlatformChart from '../../../components/PROJECT/PlatformChart';
import AreaChartDouble from '../../../components/PROJECT/AreaChartDouble';
import GenderChart from '../../../components/PROJECT/GenderChart';
const MetricGrid = ({ metrics, gridConfig }) => (
    <div className={`w-full ${gridConfig ? "sm:w-1/2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4"} gap-4`}>
        {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
        ))}
    </div>
)

export default function GeneralDashboard({ insigtsAgeGenderData, insigtsRangeData, generalMetrics, conversionMetrics, investmentMetrics, customerData }) {

    return (
        <div>
            <MetricGrid metrics={generalMetrics} gridConfig={false} />
            <MetricGrid metrics={conversionMetrics} gridConfig={false} />
            <div className='flex flex-col w-full gap-4 mt-4 sm:flex-row'>
                <Card className="w-full sm:w-1/2  items-center">
                    <h3 className='text-xl font-bold'>Investimento por Dia</h3>
                    <div className='w-full'>
                        <AreaChart size="200" dataInsight={insigtsRangeData} dataType="spend" />
                    </div>
                </Card>
                <MetricGrid metrics={investmentMetrics} gridConfig={true} />
            </div>

            <div className="flex gap-4 mt-4">
                <Card className="w-full p-2 items-center sm:w-1/2">
                    <h3 className='text-xl font-bold'>Clique no Link X Conversas por Dia</h3>
                    <div className='w-full'>
                        <AreaChartDouble size="200" dataInsight={insigtsRangeData} dataTypeOne="link_click" dataTypeTwo="purchase" />
                    </div>
                </Card>
                <Card className="w-full p-2 items-center sm:w-1/2">
                    <h3 className='text-xl font-bold'>Lead por Dia</h3>
                    <div className='w-full'>
                        <AreaChart size="200" dataInsight={insigtsRangeData} dataType="purchase" />
                    </div>
                </Card>
            </div>

            <div className='flex flex-col gap-4 mt-4 sm:flex-row'>
                <div className="flex flex-col gap-4 w-full sm:w-1/2">
                    <Card className="w-full p-2 items-center ">
                        <h3 className='text-xl font-bold'>Clique no Link por Dia</h3>
                        <div className='w-full'>
                            <AreaChart size="157" dataInsight={insigtsRangeData} dataType="link_click" />
                        </div>
                    </Card>
                    <Card className="w-full p-2 items-center ">
                        <h3 className='text-xl font-bold'>Conversas por Dia</h3>
                        <div className='w-full'>
                            <AreaChart size="157" dataInsight={insigtsRangeData} dataType="purchase" />
                        </div>
                    </Card>
                </div>
                <GenderChart insigtsAgeGenderData={insigtsAgeGenderData} objectivity="purchase" />
            </div>
            <div className='flex gap-4 w-full'>
                <Card className="w-1/2 p-4 mt-4 items-center ">
                    <h3 className='text-xl font-bold mb-2'>Regiãos de mais vendas</h3>
                    <MapChart customerData={customerData} size={400} />
                </Card>
                <AgeChart insigtsAgeGenderData={insigtsAgeGenderData} objectivity="purchase" />
            </div>
            <div className='flex flex-col gap-4 mt-4 sm:flex-row'>
                <TableDashboard title="Melhores Criativos" adSet={true} />
            </div>
            <div className='flex flex-col gap-4 mt-4 sm:flex-row'>
                <TableDashboard title="Melhores Conjuntos" />
            </div>
            <div className='flex flex-col gap-4 mt-4 sm:flex-row'>
                <TableDashboard title="Melhores Campanhas" />
            </div>
        </div>
    )
}
