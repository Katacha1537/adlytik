import ChartBarDouble from '../../../components/PROJECT/ChartBarDouble';
import TasksProjectCard from '../../../components/PROJECT/TasksProjectCard';
import CongratulationsCard from '../../../components/USER/CongratulationsCard';
import MyCalendar from '../../../components/USER/MyCalendar';

export default function HomeProject() {
    return (
        <div className='w-full overflow-x-hidden'>
            <div className="p-4 md:p-5 pt-20 md:pt-24">
                <div className='mb-4'>
                    <h1 className='text-2xl md:text-3xl font-bold'>Bem vindo ao Dr. Fernando Silva</h1>
                    <p className='text-sm md:text-lg'>Este projeto tem 15 tarefas</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <ChartBarDouble className="mb-4" />
                        <TasksProjectCard />
                    </div>
                    <div className="md:col-span-1">
                        <MyCalendar className="mb-4" />
                    </div>
                </div>
            </div>
        </div>
    );
}
