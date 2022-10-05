import axios, { AxiosError, AxiosResponse } from "axios";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { ICalendarContext, IEvent, IMessage } from "../@types/types";

const CalendarContext = createContext<ICalendarContext | null>(null);

export const useCalendarContext = () => {
  return useContext(CalendarContext);
};

const CalendarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [urlBase] = useState<string>(
    "https://www.googleapis.com/calendar/v3/calendars"
  );

  const [events, setEvents] = useState<IEvent[] | []>([]);
  const [message, setMessage] = useState<IMessage | null>(null);

  const listEvents = (accessToken: string) => {
    const url = `${urlBase}/${import.meta.env.VITE_CALENDAR_ID}/events`;
    
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
      .catch((err: AxiosError) => console.log(err.message));
  };

  const insertEvent = (event: IEvent, accessToken: string) => {
    const url = `${urlBase}/${import.meta.env.VITE_CALENDAR_ID}/events`;
    const config = {
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    };

    const data = JSON.stringify(event);

    axios
      .post(url, data, config)
      .then((res: AxiosResponse) => setMessage({ type: "successo", message: "Evento criado com sucesso!"}))
      .catch((err: AxiosError) => {
        const message: IMessage = {
          type: "erro",
          message:
            "Houve um erro ao tentar criar o evento!",
        };
        if (err.response?.status === 401) {
          message.code = 401;
          setMessage(message);
        } else {
          message.message = `An error has occurred: ${err.message}`;
          setMessage(message);
        }
      });
  };

  const deleteEvent = (eventId: string, accessToken: string) => {
    const url = `${urlBase}/${
      import.meta.env.VITE_CALENDAR_ID
    }/events/${eventId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .delete(url, config)
      .then((res: AxiosResponse) => console.log(res.data))
      .catch((err: AxiosError) => console.log(err.message));
  };

  const memoedValues = useMemo(
    () => ({
      events,
      message,
      urlBase,
      setMessage,
      listEvents,
      insertEvent,
      deleteEvent,
    }),
    [events, message]
  );

  return (
    <CalendarContext.Provider value={memoedValues}>
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
