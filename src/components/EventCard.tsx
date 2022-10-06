import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { IAuthContext, ICalendarContext, IEventCardProps } from "../@types/types";
import { useAuthContext } from "../contexts/AuthContext";
import { useCalendarContext } from "../contexts/CalendarContext";

const EventCard = ({event}: IEventCardProps) => {

  const { deleteEvent } = useCalendarContext() as ICalendarContext;
  const { accessToken } = useAuthContext() as IAuthContext;

  const getDate = (dateTime: string) => {
    const date = dateTime.split("T")[0].split('-');
    return `${date[2]}/${date[1]}/${date[0]}`;
  };

  const getTime = (dateTime: string) => {
    const time = dateTime.split("T")[1].split('-');
    const formattedTime = time[0].split(':');
    
    return `${formattedTime[0]}:${formattedTime[1]}`;
  };

  const handleDelete = () => {
    if (event.id) deleteEvent(event.id, accessToken);
  }

  return (
    <div className="flex flex-col rounded border min-w-[300px] min-h-[120px] border-blue-400 bg-blue-100 relative">
      <div className="absolute top-1 right-1">
        <div className="flex items-center">
          <a href={event.htmlLink} target="_blank" title="Ver agenda"><EyeIcon className="h-6 w-6 text-sky-500 p-1 cursor-pointer hover:text-sky-600" /></a>
          <TrashIcon className="h-6 w-6 text-rose-500 p-1 cursor-pointer hover:text-rose-600" onClick={handleDelete} />
        </div>
      </div>
      <div className="w-full border-b px-4 pt-2 border-gray-300 bg-blue-200">
        <h1 className="text-2xl text-sky-700 capitalize">{event.summary}</h1>
        <div className="flex items-center justify-between pb-1">
          <h3 className="text-sky-500">{event.description}</h3>
          <span className="rounded-full py-1 px-2 bg-green-200 text-xs text-green-700">{event.status}</span>
        </div>
      </div>
      <div className="flex flex-col px-4 pt-1">
        <span className="text-gray-600 text-sm font-medium">{getDate(event.start.dateTime)}</span>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 gap-2">
            Das <span>{getTime(event.start.dateTime)}</span> às{" "}
            <span>{getTime(event.end.dateTime)}</span>
          </p>
          <p className="text-xs text-gray-500">{event.creator?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
