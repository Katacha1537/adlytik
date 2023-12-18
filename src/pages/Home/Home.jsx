import ChartBarDouble from '../../components/ChartBarDouble';
import CongratulationsCard from '../../components/CongratulationsCard';
import Header from '../../components/Header';
import MyCalendar from '../../components/MyCalendar';
import MyProjectsDashboard from '../../components/MyProjectsDashboard';
import MyTasks from '../../components/MyTasks';

export default function Home() {
    return (
        <div className='w-full overflow-x-hidden'>

            <div className="p-4 xl:p-5 pt-20 xl:pt-24">
                <div className='mb-4'>
                    <h1 className='text-2xl xl:text-3xl font-bold'>Olá, Lucas Katacha</h1>
                    <p className='text-sm xl:text-lg'>Você tem 5 tarefas em mãos</p>
                </div>
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="xl:w-2/3 w-full">
                        <ChartBarDouble className="mb-4" />
                        <MyTasks />
                    </div>
                    <div className="2xl:w-1/3 xl:w-2/3 w-full">
                        <MyCalendar />
                        <MyProjectsDashboard />
                    </div>
                </div>
            </div>
        </div>
    );
}
