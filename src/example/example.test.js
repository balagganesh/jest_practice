// example.test.js
const sum = require('./example');

test('add 1 + 2 to equals 3', () => {
  expect(sum(1, 2)).toBe(3);
});