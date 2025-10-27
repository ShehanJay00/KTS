const { test, expect } = require('@jest/globals');

test('hello world!', () => {
	expect('Hello, World!').toBe('Hello, World!');
});