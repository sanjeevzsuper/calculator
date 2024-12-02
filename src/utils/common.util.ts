import { ALPHABET_REGEX, KNOWN_FUNCTIONS } from "../constants";

/**
 * This function used to computing Triganometric functions and logarithms
 * @param expression : string
 * @returns : number | string
 */
export const preprocessTrigoLogarithmicExpression = (
  expression: string
): string => {
  let processedExpression = expression;

  KNOWN_FUNCTIONS.forEach((fn) => {
    if (processedExpression.includes(fn)) {
      processedExpression = processedExpression.replace(fn, `Math.${fn}`);
    }
  });
  try {
    const computedResult = Function(
      `"use strict"; return (${processedExpression})`
    )();

    return parseFloat(`${computedResult}`).toString();
  } catch (error) {
    return expression;
  }
};

/**
 * This function is used to compute power equations like a^2 + b^2 etc.
 * @param expression :string
 * @returns string
 */

export const preprocessExpression = (expression: string): string => {
  const processedExpression = expression.replace(
    /(\d+)\^(\d+)/g,
    (_, base, exp) => `Math.pow(${base}, ${exp})`
  );
  return processedExpression;
};

/**
 * This function is used to calculate the equation result
 * @param expression :string
 * @param result :string
 * @returns string | number
 */
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

/**
 * This function is used to replacing respecting variable values in formulae
 * @param value :string
 * @param variables : {[key:string]: number}
 * @returns
 */
export const computeVariableValue = (
  value: string,
  variables: { [key: string]: number }
) => {
  if (variables[value] || variables[value] === 0) {
    return variables[value];
  }
  return value;
};
