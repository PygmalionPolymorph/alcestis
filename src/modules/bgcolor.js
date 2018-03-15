import { regexRule } from '../speech';

export const setBackgroundColor = (result) => {
  document.querySelector('html').style.backgroundColor = result;
}

export const bgcolor = regexRule('to (.*)$', 1, setBackgroundColor);
