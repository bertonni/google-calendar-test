import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

const MyCalendar = () => {
  const [view, setView] = useState<string>("dayGridMonth");

  return (
    <div className="w-full">
      <FullCalendar
        selectable={true}
        headerToolbar={{ left: 'dayGridMonth,timeGridWeek,timeGridDay', center: 'title', right: 'today,prevYear,prev,next,nextYear' }}
        plugins={[dayGridPlugin, timeGridPlugin]}
        height={600}
        initialView={view}
        locale={ptBrLocale}
      />
    </div>
  );
};

export default MyCalendar;
