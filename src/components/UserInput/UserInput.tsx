import { useContext, useEffect, useState } from "react";
import { CloseIcon } from "../../assets";
import CustomInput from "../CustomInput/CustomInput";
import {
  computeVariableValue,
  evaluateExpression,
  preprocessTrigoLogarithmicExpression,
} from "../../utils";
import { AppContext } from "../../contexts";
import { IUserInputType } from "../../types";
import { KNOWN_FUNCTIONS, VARIABLE_MATCH_REGEX } from "../../constants";
import "./userInput.styles.css";

interface IInputProps {
  count: number;
  data: IUserInputType;
  onCloseClick?: () => void;
  onEnterPress?: () => void;
}

const Input = (props: IInputProps) => {
  const { count, data, onCloseClick, onEnterPress } = props;
  const {
    variables: initialVariables,
    value: initialValue,
    result: initialResult,
  } = data;
  const [value, setValue] = useState<string>(initialValue);
  const [variables, setVariables] = useState<{ [key: string]: number }>(
    initialVariables
  );
  const [result, setResult] = useState<string | number>(initialResult);

  const showResult = !!value && !!result && !isNaN(parseFloat(`${result}`));
  const showError = !!value && !!result && isNaN(parseFloat(`${result}`));

  const { setHistory } = useContext(AppContext);

  const getComputedValue = (rawExpression: string) => {
    const trigoProcessedValue =
      preprocessTrigoLogarithmicExpression(rawExpression);
    const splittedValues = trigoProcessedValue.split("");
    const newSplittedValue = splittedValues.map((value) =>
      computeVariableValue(value, variables)
    );
    console.log("After Compute", newSplittedValue);
    const newValues = newSplittedValue.join("");
    const computed = evaluateExpression(newValues, result.toString());
    setResult(computed);
    setHistory(
      count - 1,
      `${rawExpression} = ${isNaN(parseFloat(`${computed}`)) ? 0 : computed}`
    );
  };

  const handleInputChange = (newValue: string) => {
    const userInput = newValue;

    if (!newValue) {
      setResult(0);
    } else if (newValue.includes("=")) {
      return;
    }

    const variableMatches = userInput.match(VARIABLE_MATCH_REGEX);
    const filteredVariables = (variableMatches || []).filter(
      (variable) => !KNOWN_FUNCTIONS.includes(variable)
    );

    const uniqueVariables = Array.from(new Set(filteredVariables));
    const newVariables = Object.fromEntries(
      uniqueVariables.map((v) => [v, variables[v] || 0])
    );
    const updatedVariables = { ...newVariables };

    setVariables(updatedVariables);
    setValue(userInput);
  };

  const handleVariableValue = (variable: string, newValue: string) => {
    const newVariables = { ...variables };
    newVariables[variable] = parseFloat(newValue);
    setVariables(newVariables);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnterPress && onEnterPress();
    }
  };

  const renderVariableInput = () => {
    return (
      <div className="inputVariableContainer">
        {Object.entries(variables).map(([key, value]) => (
          <div className="inputVariableSubContainer" key={key}>
            {key}:
            <CustomInput
              value={value.toString()}
              type="number"
              onChange={(newValue) => handleVariableValue(key, newValue)}
            />
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    getComputedValue(value);
  }, [variables]);

  return (
    <div className={`inputContainer ${showError ? "inputError" : ""}`}>
      <div className="inputSubContainer">
        <div className="inputCounter">{count}</div>
        <CustomInput
          autoFocus
          onKeyPress={onKeyPress}
          value={value}
          onChange={handleInputChange}
        />
        <img
          onClick={onCloseClick}
          className="inputCloseIcon"
          src={CloseIcon}
        />
      </div>
      {renderVariableInput()}
      {showResult && <div className="inputResult">{result}</div>}
    </div>
  );
};

export default Input;
