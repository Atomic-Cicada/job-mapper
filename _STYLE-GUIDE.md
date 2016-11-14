(check out airbnbs)

1.1 Primitives: When you access a primitive type you work directly on its value.

string
number
boolean
null
undefined
const foo = 1;
let bar = foo;

bar = 9;

console.log(foo, bar); // => 1, 9

1.2 Complex: When you access a complex type you work on a reference to its value.

object
array
function
const foo = [1, 2];
const bar = foo;

bar[0] = 9;

console.log(foo[0], bar[0]); // => 9, 9
⬆ back to top

References


2.1 Use const for all of your references; avoid using var. eslint: prefer-const, no-const-assign

Why? This ensures that you can't reassign your references, which can lead to bugs and difficult to comprehend code.
// bad
var a = 1;
var b = 2;

// good
const a = 1;
const b = 2;

2.2 If you must reassign references, use let instead of var. eslint: no-var jscs: disallowVar

Why? let is block-scoped rather than function-scoped like var.
// bad
var count = 1;
if (true) {
  count += 1;
}

// good, use the let.
let count = 1;
if (true) {
  count += 1;
}

2.3 Note that both let and const are block-scoped.

// const and let only exist in the blocks they are defined in.
{
  let a = 1;
  const b = 1;
}
console.log(a); // ReferenceError
console.log(b); // ReferenceError
⬆ back to top

Objects


3.1 Use the literal syntax for object creation. eslint: no-new-object

// bad
const item = new Object();

// good
const item = {};

3.2 Use computed property names when creating objects with dynamic property names.

Why? They allow you to define all the properties of an object in one place.
function getKey(k) {
  return `a key named ${k}`;
}

// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};

3.3 Use object method shorthand. eslint: object-shorthand jscs: requireEnhancedObjectLiterals

// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};

3.4 Use property value shorthand. eslint: object-shorthand jscs: requireEnhancedObjectLiterals

Why? It is shorter to write and descriptive.
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// good
const obj = {
  lukeSkywalker,
};

3.5 Group your shorthand properties at the beginning of your object declaration.

Why? It's easier to tell which properties are using the shorthand.
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};

3.6 Only quote properties that are invalid identifiers. eslint: quote-props jscs: disallowQuotedKeysInObjects

Why? In general we consider it subjectively easier to read. It improves syntax highlighting, and is also more easily optimized by many JS engines.
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};

3.7 Do not call Object.prototype methods directly, such as hasOwnProperty, propertyIsEnumerable, and isPrototypeOf.

Why? These methods may be shadowed by properties on the object in question - consider { hasOwnProperty: false } - or, the object may be a null object (Object.create(null)).
// bad
console.log(object.hasOwnProperty(key));

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best
const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
/* or */
import has from 'has';
…
console.log(has.call(object, key));

3.8 Prefer the object spread operator over Object.assign to shallow-copy objects. Use the object rest operator to get a new object with certain properties omitted.

// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
delete copy.a; // so does this

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy; // noA => { b: 2, c: 3 }