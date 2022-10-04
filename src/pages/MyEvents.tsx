import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { IAuthContext, ICalendarContext, IEvent } from "../@types/types";
import Layout from "../components/Layout";
import { useAuthContext } from "../contexts/AuthContext";
import { useCalendarContext } from "../contexts/CalendarContext";

const MyEvents = () => {
  const { accessToken } = useAuthContext() as IAuthContext;
  const { events, listEvents } = useCalendarContext() as ICalendarContext;

  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center justify-center relative gap-4 px-4">
        <h1 className="text-2xl text-gray-600 font-medium">My Events</h1>
        <div className="flex flex-col items-center justify-center">
          {events?.length > 0 &&
            events.map((event: IEvent) => (
              <div key={event.id} className="w-full flex flex-col gap-1 rounded border px-6 py-2">
                <p>Link: {event.creator?.email}</p>
                <p>Summary: {event.summary}</p>
                <p>Description: {event.description}</p>
                <p>Calendar: {event.organizer?.displayName}</p>
                <p>Start: {event.start.dateTime}</p>
                <p>End: {event.end.dateTime}</p>
                <p>Recurrence{event.recurrence}</p>
              </div>
            ))}
        </div>
        <button
          className="px-4 py-2 bg-amber-500 text-white font-medium rounded hover:brightness-110"
          onClick={listEvents}
        >
          Get Events
        </button>
      </div>
    </Layout>
  );
};

export default MyEvents;
