import { IAppContextType } from "../types";

export const INITIAL_APP_CONTEXT: IAppContextType = {
  userInputs: [
    {
      value: "",
      setValue: () => {},
      variables: {},
      setVariables: () => {},
      result: 0,
      setResult: () => {},
    },
  ],
  setUserInputs: () => {},
  history: [],
  setHistory: () => {},
};
