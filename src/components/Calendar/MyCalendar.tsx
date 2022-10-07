import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

const MyCalendar = () => {

  const handleClick = (val: string) => {
    console.log(val);
  }

  return (
    <div className="w-full">
      <FullCalendar
        selectable={true}
        headerToolbar={{
          left: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          right: "today,prevYear,prev,next,nextYear",
        }}
        plugins={[dayGridPlugin, timeGridPlugin, googleCalendarPlugin, interactionPlugin]}
        height={600}
        googleCalendarApiKey={import.meta.env.VITE_CALENDAR_API_KEY}
        events={{
          googleCalendarId:
            import.meta.env.VITE_CALENDAR_ID,
        }}
        locale={ptBrLocale}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          
          if (info.event.url) {
            window.open(info.event.url);
          }
        }}
        dateClick={(info) => handleClick(info.date.toISOString())}
      />
    </div>
  );
};

export default MyCalendar;
