import { User } from "firebase/auth";
import { ReactNode } from "react";

export interface IAuthContext {
  loggedUser: User | null;
  error: string | null;
  loadingInitial: boolean;
  setError: (value: string | null) => void;
  setLoggedUser: (user: User) => void;
  signin: () => void;
  logout: () => void;
  accessToken: string;
}

export interface IEventCardProps {
  event: IEvent;
}

export interface IMessage {
  type: "successo" | "erro";
  text: string;
  code?: number;
}

export interface IAddEventModalProps {
  show: boolean;
  close: () => void;
  date: string;
  time: string;
  children?: ReactNode;
}

export interface ILoggedUser {
  uid: string;
  name: string;
  email: string;
  accessToken: string;
}

export type CalendarContextType = {
  events: IEvent[] | [];
  message: IMessage | null;
  urlBase: string;
  eventColor: string;
  currentCalendar: number;
  currentCalendarId: string;
  setCurrentCalendar: (value: number) => void;
  setMessage: (value: IMessage | null) => void;
  listEvents: (accessToken: string) => void;
  insertEvent: (event: IEvent, accessToken: string) => void;
  deleteEvent: (eventId: string, accessToken: string) => void;
};

export interface IInputProps {
  name?: string;
  id?: string;
  label?: string;
  autocomplete?: boolean;
  placeholder?: string;
  refs?: any;
  type?: string;
  min?: string;
  max?: string;
  value?: string;
  fullWidth?: boolean;
  handleChange?: (val: string) => void;
};

export interface IAtendees {
  email: string
}

export interface IEvent {
  kind?: string;
  etag?: string;
  id?: string;
  status?: string;
  htmlLink?: string;
  created?: Date;
  updated?: Date;
  summary: string;
  description?: string;
  location?: string;
  colorId?: string;
  creator?: {
    id?: string;
    email?: string;
    displayName?: string;
    self?: boolean;
  };
  organizer?: {
    id?: string;
    email?: string;
    displayName?: string;
    self?: boolean;
  };
  start: IDate;
  end: IDate;
  endTimeUnspecified?: boolean;
  recurrence?: string[];
  recurringEventId?: string;
  originalStartTime?: {
    date?: Date;
    dateTime?: Date;
    timeZone?: string;
  };
  transparency?: string;
  visibility?: string;
  iCalUID?: string;
  sequence?: number;
  attendees?: [
    {
      id?: string;
      email?: string;
      displayName?: string;
      organizer?: boolean;
      self?: boolean;
      resource?: boolean;
      optional?: boolean;
      responseStatus?: string;
      comment?: string;
      additionalGuests?: number;
    }
  ];
  attendeesOmitted?: boolean;
  extendedProperties?: {
    private?: {
      (key: string): string;
    };
    shared?: {
      (key: string): string;
    };
  };
  hangoutLink?: string;
  conferenceData?: {
    createRequest?: {
      requestId?: string;
      conferenceSolutionKey?: {
        type?: string;
      };
      status?: {
        statusCode?: string;
      };
    };
    entryPoints?: [
      {
        entryPointType?: string;
        uri?: string;
        label?: string;
        pin?: string;
        accessCode?: string;
        meetingCode?: string;
        passcode?: string;
        password?: string;
      }
    ];
    conferenceSolution?: {
      key?: {
        type?: string;
      };
      name?: string;
      iconUri?: string;
    };
    conferenceId?: string;
    signature?: string;
    notes?: string;
  };
  gadget?: {
    type?: string;
    title?: string;
    link?: string;
    iconLink?: string;
    width?: number;
    height?: number;
    display?: string;
    preferences?: {
      (key: string): string;
    };
  };
  anyoneCanAddSelf?: boolean;
  guestsCanInviteOthers?: boolean;
  guestsCanModify?: boolean;
  guestsCanSeeOtherGuests?: boolean;
  privateCopy?: boolean;
  locked?: boolean;
  reminders?: {
    useDefault?: boolean;
    overrides?: [
      {
        method?: string;
        minutes?: number;
      }
    ];
  };
  source?: {
    url?: string;
    title?: string;
  };
  attachments?: [
    {
      fileUrl?: string;
      title?: string;
      mimeType?: string;
      iconLink?: string;
      fileId?: string;
    }
  ];
  eventType?: string;
}

export interface IDate {
  dateTime: string;
  timeZone: string;
}

export interface IFormInputs {
  title: string;
  description?: string;
  date: string;
  start: string;
  end: string;
  location?: string;
  recurrence?: string;
}

export interface IAlertProps {
  message: IMessage | null;
  close?: () => void;
}

export interface LayoutCompProps {
  children: ReactNode;
  dontShowLogin?: boolean;
}