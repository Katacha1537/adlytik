import ChartBarDouble from '../../components/ChartBarDouble';
import CongratulationsCard from '../../components/CongratulationsCard';
import Header from '../../components/Header';
import MyCalendar from '../../components/MyCalendar';
import MyProjectsDashboard from '../../components/MyProjectsDashboard';
import MyTasks from '../../components/MyTasks';

export default function Home() {
    return (
        <div className='w-full overflow-x-hidden'>
            <div className="p-4 md:p-5 pt-20 md:pt-24">
                <div className='mb-4'>
                    <h1 className='text-2xl md:text-3xl font-bold'>Olá, Lucas Katacha</h1>
                    <p className='text-sm md:text-lg'>Você tem 5 tarefas em mãos</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <ChartBarDouble className="mb-4" />
                        <MyTasks />
                    </div>
                    <div className="md:col-span-1">
                        <CongratulationsCard className="mb-4" />
                        <MyCalendar className="mb-4" />
                        <MyProjectsDashboard />
                    </div>
                </div>
            </div>
        </div>
    );
}
