import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { IAuthContext } from "../@types/types";
import Layout from "../components/Layout";
import { useAuthContext } from "../contexts/AuthContext";

const MyEvents = () => {
  const { accessToken } = useAuthContext() as IAuthContext;

  const getEvents = () => {
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events`;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(url, config)
      .then((res: AxiosResponse) => console.log(res.data.items))
      .catch((err: AxiosError) => console.log(err));
  };

  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center justify-center relative gap-4">
        <h1 className="text-2xl text-gray-600 font-medium">My Events</h1>

        <button
          className="px-4 py-2 bg-amber-500 text-white font-medium rounded hover:brightness-110"
          onClick={getEvents}
        >
          Get Events
        </button>
      </div>
    </Layout>
  );
};

export default MyEvents;
