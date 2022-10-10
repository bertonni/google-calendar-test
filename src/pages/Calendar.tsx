import MyCalendar from '../components/MyCalendar';
import Layout from '../components/Layout';

const Calendar = () => {
  return (
    <Layout>
      <div className="w-full flex flex-col items-center gap-2 px-20 justify-center">
        <h1 className="text-3xl text-gray-600 font-medium">Calendário</h1>
        <MyCalendar />
      </div>
    </Layout>
  )
}

export default Calendar;