import { createContext, Dispatch, SetStateAction } from 'react';

interface userContextType {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

const defaultState = {
  userId: '',
  setUserId: (userId: string) => {},
  token: '',
  setToken: (token: string) => {},
} as userContextType;

export const userContext = createContext(defaultState);
