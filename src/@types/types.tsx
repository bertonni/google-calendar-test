import { IdTokenResult, User } from "firebase/auth";

export interface IAuthContext {
  loggedUser: User | null;
  error: string | null;
  loadingInitial: boolean;
  setError: (value: string | null) => void;
  setLoggedUser: (user: User) => void;
  signin: () => void;
  logout: () => void;
  credentials: IdTokenResult | null;
  accessToken: string;
}

export interface ILoggedUser {
  uid: string;
  name: string;
  email: string;
  accessToken: string;
}

export type CalendarContextType = {
  event: IEvent;
};

export interface IEvent {
  summary: string;
  start: string;
  end: string;
}

export interface IFormInputs {
  title: string;
  description?: string;
  start: string;
  end?: string;
  location?: string;
  recurrence?: string;
}
