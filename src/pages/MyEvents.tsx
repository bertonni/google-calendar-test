import { IAuthContext, ICalendarContext, IEvent } from "../@types/types";
import Alert from "../components/Alert";
import EventCard from "../components/EventCard";
import Layout from "../components/Layout";
import { useAuthContext } from "../contexts/AuthContext";
import { useCalendarContext } from "../contexts/CalendarContext";

const MyEvents = () => {
  const { accessToken } = useAuthContext() as IAuthContext;
  const { events, listEvents, message, setMessage } = useCalendarContext() as ICalendarContext;

  const getEvents = () => {
    listEvents(accessToken);
  };

  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center relative gap-4 px-4">
        <h1 className="text-3xl text-gray-600 font-medium">Eventos</h1>
        <div className="flex items-center justify-center gap-2">
          {events?.length > 0 &&
            events.map((event: IEvent) => (
              <EventCard key={event.id} event={event} />
              // <div key={event.id} className="w-full flex flex-col gap-1 rounded border px-6 py-2">
              //   <p>Creator: {event.creator?.email}</p>
              //   <p>Link: <a href={event.htmlLink} target="_blank">View Event</a> </p>
              //   <p>Summary: {event.summary}</p>
              //   <p>Description: {event.description}</p>
              //   <p>Calendar: {event.organizer?.displayName}</p>
              //   <p>Start: {event.start.dateTime}</p>
              //   <p>End: {event.end.dateTime}</p>
              //   <p>Recurrence{event.recurrence}</p>
              // </div>
            ))}
        </div>
        <button
          className="px-4 py-2 bg-amber-500 text-white font-medium rounded hover:brightness-110"
          onClick={getEvents}
        >
          Get Events
        </button>
        <Alert
          close={() => {
            setMessage(null);
          }}
          message={message}
        />
      </div>
    </Layout>
  );
};

export default MyEvents;
