import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { useCalendarContext } from "../contexts/CalendarContext";
import { memo, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

interface ICalendarProps {
  showModal: (value: boolean) => void;
  setDate: (value: string) => void;
  setTime: (value: string) => void;
}

const FullCalendarComponent = ({
  showModal,
  setDate,
  setTime,
}: ICalendarProps) => {
  const { eventColor, currentCalendarId } = useCalendarContext();
  const { loggedUser } = useAuthContext();

  useEffect(() => {
    console.log("re-rendered");
  }, []);

  const handleClick = (val: string) => {
    if (!loggedUser) return alert("Faça o login para criar um evento");
    const value = val.split("T");
    const time = value[1].split(".")[0];

    const [hour, minute, second] = time.split(":");

    const date = value[0];
    const newTime = `${hour}:${minute}`;
    setDate(date);
    setTime(newTime);
    showModal(true);
  };
  return (
    <FullCalendar
      selectable={true}
      timeZone={"UTC"}
      dayMaxEventRows={3}
      headerToolbar={{
        left: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        center: "title",
        right: "today,prevYear,prev,next,nextYear",
      }}
      eventColor={eventColor}
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
        googleCalendarId: currentCalendarId,
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
  );
};

export default memo(FullCalendarComponent);
