import ChartBarDouble from '../../components/ChartBarDouble';
import Header from '../../components/Header';

import MyCalendar from '../../components/MyCalendar';
import MyTasks from '../../components/MyTasks';
export default function Home() {


    return (
        <div className='w-full '>
            <Header />

            <div className="p-5  pt-24">
                <div className='mb-4'>
                    <h1 className='text-3xl font-bold'>Olá, Lucas Katacha</h1>
                    <p className='text-lg'>Você tem 5 tarefas em mãos</p>
                </div>
                <div className="flex gap-6">
                    <div className="w-2/3">
                        <ChartBarDouble className="mb-4"/>
                        <MyTasks />
                    </div>
                    <div className="w-1/3">
                        <MyCalendar />
                    </div>
                </div>
            </div>


        </div>
    );
}
