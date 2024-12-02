import { ALPHABET_REGEX, KNOWN_FUNCTIONS } from "../constants";

export const preprocessTrigoLogarithmicExpression = (
  expression: string
): string => {
  let processedExpression = expression;

  KNOWN_FUNCTIONS.forEach((fn) => {
    if (processedExpression.includes(fn)) {
      processedExpression = processedExpression.replace(fn, `Math.${fn}`);
    }
  });
  let computedResult: string | number = 0;
  try {
    const computedResult = Function(
      `"use strict"; return (${processedExpression})`
    )();

    return parseFloat(`${computedResult}`).toString();
  } catch (error) {
    return expression;
  }
};

export const preprocessExpression = (expression: string): string => {
  const processedExpression = expression.replace(
    /(\d+)\^(\d+)/g,
    (_, base, exp) => `Math.pow(${base}, ${exp})`
  );
  return processedExpression;
};

export const evaluateExpression = (
  expression: string,
  result: string
): string | number => {
  const safeExpression = preprocessExpression(expression);
  let computedResult: string | number = result;
  try {
    computedResult = Function(`"use strict"; return (${safeExpression})`)();

    return computedResult;
  } catch (error) {
    return "Invalid Expression";
  }
};

export const computeVariableValue = (
  value: string,
  variables: { [key: string]: number }
) => {
  return variables[value] || value;
};
