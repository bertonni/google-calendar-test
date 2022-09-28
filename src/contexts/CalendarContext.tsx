import { gapi } from "gapi-script";
import { createContext, FC, PropsWithChildren, ReactNode, useContext, useMemo, useState } from "react";
import { CalendarContextType, IEvent } from "../@types/types";

const CalendarContext = createContext<CalendarContextType | null>(null);

export const useProductStock = () => {
  return useContext(CalendarContext);
};

const CalendarProvider: FC<PropsWithChildren<ReactNode>> = ({ children }) => {

  const [event, setEvent] = useState(null);
  // const getEvents = (calendarID, apiKey) => {
  //   function initiate() {
  //     gapi.client.init({
        
  //     })
  //   }
  // }

  const memoedValues = useMemo(() => event, [event])

  return (
    <CalendarContext.Provider value={memoedValues}>
      {children}
    </CalendarContext.Provider>
  );
};

