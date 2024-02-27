import { isNumber, isString, isStringNumber } from './is';
export function addUnit(value, defaultUnit = 'px') {
  if (!value) return '';
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
  // debugWarn(SCOPE, 'binding value must be a string or number');
}
