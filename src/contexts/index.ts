import { createContext } from "react";
import { IAppContextType } from "../types";
import { INITIAL_APP_CONTEXT } from "../constants";

export const AppContext = createContext<IAppContextType>(INITIAL_APP_CONTEXT);

export const AppContextProvider = AppContext.Provider;
