import { IAuthContext, IEvent } from "../@types/types";
import Alert from "../components/Alert";
import EventCard from "../components/EventCard";
import Layout from "../components/Layout";
import { useAuthContext } from "../contexts/AuthContext";
import { useCalendarContext } from "../contexts/CalendarContext";

const MyEvents = () => {
  const { accessToken } = useAuthContext() as IAuthContext;
  const { events, listEvents, message, setMessage } = useCalendarContext();

  const getEvents = () => {
    listEvents(accessToken);
  };

  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center relative gap-4 px-4">
        <h1 className="text-3xl text-gray-600 font-medium">Eventos</h1>
        <div className="flex items-center justify-center flex-wrap gap-2">
          {events?.length > 0 &&
            events.map((event: IEvent) => (
              <EventCard key={event.id} event={event} />
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
