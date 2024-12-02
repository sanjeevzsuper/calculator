export interface IUserInputType {
  result: number;
  setResult: (value: number) => void;
  setValue: (value: string) => void;
  setVariables: (value: { [key: string]: number }) => void;
  value: string;
  variables: { [key: string]: number };
}
export interface IAppContextType {
  history: string[];
  setHistory: (index: number, value: string) => void;
  setUserInputs: (value: IUserInputType) => void;
  userInputs: IUserInputType[];
}
