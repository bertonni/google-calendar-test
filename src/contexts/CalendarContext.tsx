import axios, { AxiosError, AxiosResponse } from "axios";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CalendarContextType, IEvent, IMessage } from "../@types/types";

const CalendarContext = createContext<CalendarContextType | null>(null);

export const useCalendarContext = () => {
  return useContext(CalendarContext) as CalendarContextType;;
};

const CalendarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [urlBase] = useState<string>(
    "https://www.googleapis.com/calendar/v3/calendars"
  );

  const eventColors: string[] = ["#EF6C00", "#4285F4", "#3F51B5", "#8E24AA"];
  const [events, setEvents] = useState<IEvent[] | []>([]);
  const [message, setMessage] = useState<IMessage | null>(null);
  const [currentCalendar, setCurrentCalendar] = useState<number>(0);
  const [currentCalendarId, setCurrentCalendarId] = useState<string>(import.meta.env.VITE_CALENDAR_LAB_F01_ID);
  const [loading, setLoading] = useState<boolean>(true);
  const [eventColor, setEventColor] = useState<string>(
    eventColors[currentCalendar]
  );

  useEffect(() => {
    let calendarId = "";
    switch (currentCalendar) {
      case 0:
        calendarId = import.meta.env.VITE_CALENDAR_LAB_F01_ID;
        break;
      case 1:
        calendarId = import.meta.env.VITE_CALENDAR_LAB_F02_ID;
        break;
      case 2:
        calendarId = import.meta.env.VITE_CALENDAR_LAB_F03_ID;
        break;
      case 3:
        calendarId = import.meta.env.VITE_CALENDAR_LAB_F04_ID;
        break;
    }
    if (calendarId !== "") setLoading(false);
    setCurrentCalendarId(calendarId);
    setEventColor(eventColors[currentCalendar]);
  }, [currentCalendar]);

  const listEvents = (accessToken: string) => {
    const url = `${urlBase}/${currentCalendarId}/events`;

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(url, config)
      .then((res: AxiosResponse) => {
        setEvents(res.data.items);
      })
      .catch((err: AxiosError) => {
        const message: IMessage = {
          type: "erro",
          text: "Houve um erro ao tentar buscar os evento!",
        };
        if (err.response?.status === 401) {
          message.code = 401;
          setMessage(message);
        } else {
          message.text = `Um erro ocorreu: ${err.message}`;
          setMessage(message);
        }
        console.log(err.message);
      });
  };

  const insertEvent = (event: IEvent, accessToken: string) => {
    const url = `${urlBase}/${currentCalendarId}/events`;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const data = JSON.stringify(event);

    axios
      .post(url, data, config)
      .then((res: AxiosResponse) => {
        setMessage({ type: "successo", text: "Evento criado com sucesso!" });
        listEvents(accessToken);
      })
      .catch((err: AxiosError) => {
        const message: IMessage = {
          type: "erro",
          text: "Houve um erro ao tentar criar o evento!",
        };
        if (err.response?.status === 401) {
          message.code = 401;
          setMessage(message);
        } else {
          message.text = `An error has occurred: ${err.message}`;
          setMessage(message);
        }
      });
  };

  const deleteEvent = (eventId: string, accessToken: string) => {
    const url = `${urlBase}/${
      currentCalendarId
    }/events/${eventId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .delete(url, config)
      .then((res: AxiosResponse) => {
        const message: IMessage = {
          type: "successo",
          text: "Evento removido com sucesso!",
        };
        setMessage(message);
        const updatedEvents = events.filter(
          (event: IEvent) => event.id !== eventId
        );
        setEvents(updatedEvents);
      })
      .catch((err: AxiosError) => {
        const message: IMessage = {
          code: err.response?.status,
          type: "erro",
          text: "Houve um erro ao tentar remover o evento: " + err.message,
        };

        setMessage(message);
        console.log(err.message);
      });
  };

  const memoedValues = useMemo(
    () => ({
      events,
      message,
      urlBase,
      eventColor,
      currentCalendar,
      currentCalendarId,
      setCurrentCalendar,
      setMessage,
      listEvents,
      insertEvent,
      deleteEvent,
    }),
    [events, message, currentCalendar, eventColor]
  );

  return (
    <CalendarContext.Provider value={memoedValues}>
      {!loading && children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
