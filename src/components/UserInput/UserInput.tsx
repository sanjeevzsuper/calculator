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

  const showResult = !!value && !isNaN(parseFloat(`${result}`));
  const showError = !!value && !showResult;

  const { setHistory } = useContext(AppContext);

  /**
   * This function is used to calculate the formulae result
   * @param rawExpression :string
   */
  const getComputedValue = (rawExpression: string) => {
    const trigoProcessedValue =
      preprocessTrigoLogarithmicExpression(rawExpression);
    const splittedValues = trigoProcessedValue.split("");
    const newSplittedValue = splittedValues.map((value) =>
      computeVariableValue(value, variables)
    );
    const newValues = newSplittedValue.join("");
    const computed = evaluateExpression(newValues, result.toString());
    setResult(computed);
    setHistory(
      count - 1,
      `${rawExpression} = ${isNaN(parseFloat(`${computed}`)) ? 0 : computed}`
    );
  };

  /**
   * This function is used to handle the input value change
   * @param newValue :string
   * @returns void
   */
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

  /**
   * This function is used to update variable values
   * @param variable :string
   * @param newValue : string
   * @returns void
   */
  const handleVariableValue = (variable: string, newValue: string) => {
    const newVariables = { ...variables };
    newVariables[variable] = parseFloat(newValue);
    setVariables(newVariables);
  };

  /**
   * This function is used to add new formulae input field whenever user press enter
   * @param event: React.KeyboardEvent<HTMLInputElement>
   */
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnterPress && onEnterPress();
    }
  };

  //This functions is used to render input box for variable values
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

  /**
   * This useEffect is used to compute the formulae results whenever variable value changes
   */
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
          placeholder="eg: a^2+b^2 or sin(30) etc..."
        />
        <img
          onClick={onCloseClick}
          className="inputCloseIcon"
          src={CloseIcon}
        />
      </div>
      {renderVariableInput()}
      {showError
        ? "Invalid Expression"
        : showResult && <div className="inputResult">{result}</div>}
    </div>
  );
};

export default Input;
