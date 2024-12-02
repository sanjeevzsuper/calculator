import { useState } from "react";
import "./App.css";
import { AppContextProvider } from "./contexts";
import { INITIAL_APP_CONTEXT } from "./constants";
import { IAppContextType } from "./types";
import { History, UserInput } from "./components";

const App = () => {
  const [appState, setAppState] =
    useState<IAppContextType>(INITIAL_APP_CONTEXT);

  const addInput = () => {
    setAppState({
      ...appState,
      userInputs: [...appState.userInputs, INITIAL_APP_CONTEXT.userInputs[0]],
    });
  };

  const setHistory = (index: number, value: string) => {
    let newHistory = appState.history;
    if (
      appState.history.length > index ||
      appState.history.length - 1 > index
    ) {
      newHistory[index] = value;
    } else {
      newHistory.push(value);
    }
    setAppState({
      ...appState,
      history: [...newHistory],
    });
  };

  const clearHistory = () => {
    setAppState({
      ...appState,
      history: [],
    });
  };

  const removeInput = () => {
    if (appState.userInputs.length > 1) {
      setAppState({
        ...appState,
        userInputs: appState.userInputs.slice(0, -1),
      });
    }
  };

  return (
    <AppContextProvider value={{ ...appState, setHistory }}>
      <div className="container">
        <div className="subContainer">
          {appState.userInputs.map((value, index) => (
            <UserInput
              count={index + 1}
              data={value}
              key={index}
              onCloseClick={removeInput}
              onEnterPress={addInput}
            />
          ))}
        </div>
        <History data={appState.history} onClearClick={clearHistory} />
      </div>
    </AppContextProvider>
  );
};

export default App;
