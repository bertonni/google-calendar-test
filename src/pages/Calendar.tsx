import MyCalendar from '../components/MyCalendar';
import Layout from '../components/Layout';
import { useCalendarContext } from '../contexts/CalendarContext';

const Calendar = () => {

  const { currentCalendar } = useCalendarContext();

  let lab = '';

  switch(currentCalendar) {
    case 0:
      lab = "LAB F01";
      break;
    case 1:
      lab = "LAB F02";
      break;
    case 2:
      lab = "LAB F03";
      break;
    case 3:
      lab = "LAB F04";
      break;
    default:
      break;
  }

  return (
    <Layout>
      <div className="w-full flex flex-col items-center gap-2 px-20 justify-center">
        <h1 className="text-4xl text-gray-600 font-medium">Agenda {lab}</h1>
        <MyCalendar />
      </div>
    </Layout>
  )
}

export default Calendar;