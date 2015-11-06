import {Map as map} from 'immutable';

function calculateDefaultProp(type, prop) {
  switch (type.name) {
  case 'any': return 'Default ANY';
  case 'string': return `Default string ${prop}`;
  case 'bool': return true;
  case 'number': return 1;
  case 'func': return () => { alert(prop) };
  case 'enum': return type.value[0].value.replace(/'/g, '');
  case 'shape': return map(type.value)
    .map((shapeType, name) => calculateDefaultProp(shapeType, name))
    .toJS();
  default: return `Default ${prop}`;
  }

  return null;
}

export default function buildDefaultProps(propsDefinition) {
  const props = {};
  map(propsDefinition).map((data, prop) => {
    if (data.required) {
      props[prop] = calculateDefaultProp(data.type, prop);
    }
  });
  return props;
}
