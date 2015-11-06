import {Map as map} from 'immutable';

export default function renderStateAsHash(state, padding = '') {
  return map(state).map((value, key) => {
    if (typeof value === 'object') {
      return `${padding}${key}: {\n${renderStateAsHash(value, `  ${padding}`)}\n${padding}},`;
    } else if (typeof value === 'number') {
      return `${padding}${key}: ${value},`;
    } else if (typeof value === 'function') {
      return `${padding}${key}: () => {},`;
    }
    return `${padding}${key}: '${value}',`;
  }).join('\n');
}
