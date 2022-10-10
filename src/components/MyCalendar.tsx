import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { useState } from "react";
import AddEventModal from "./AddEventModal";

const MyCalendar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleClick = (val: string) => {
    const value = val.split("T");
    const time = value[1].split(".")[0];

    const [hour, minute, second] = time.split(":");

    const date = value[0];
    const newTime = `${hour}:${minute}`;
    setSelectedDate(date);
    setSelectedTime(newTime);
    setShowModal(true);
  };

  return (
    <div className="w-full">
      <FullCalendar
        selectable={true}
        timeZone={"UTC"}
        dayMaxEventRows={3}
        headerToolbar={{
          left: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          center: "title",
          right: "today,prevYear,prev,next,nextYear",
        }}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          googleCalendarPlugin,
          interactionPlugin,
          listPlugin,
        ]}
        height={600}
        googleCalendarApiKey={import.meta.env.VITE_CALENDAR_API_KEY}
        events={{
          googleCalendarId: import.meta.env.VITE_CALENDAR_ID,
        }}
        locale={ptBrLocale}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          if (info.event.url) {
            window.open(info.event.url);
          }
        }}
        dateClick={(info) => {
          handleClick(info.date.toISOString());
        }}
      />
      <AddEventModal
        show={showModal}
        close={() => setShowModal(false)}
        date={selectedDate}
        time={selectedTime}
      />
      <span className="text-gray-600">Clique em qualquer data para criar um evento</span>
    </div>
  );
};

export default MyCalendar;
